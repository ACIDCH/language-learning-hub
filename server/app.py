"""Personal loopback service. Private manuscripts and originals never enter the public build."""
import hashlib
import io
import json
import os
import sqlite3
import subprocess
import uuid
import unicodedata
import zipfile
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import urlparse
import xml.etree.ElementTree as ET

import httpx
from bs4 import BeautifulSoup
from docx import Document
from fastapi import FastAPI, File, HTTPException, Request, UploadFile
from fastapi.responses import FileResponse, JSONResponse
from pydantic import AwareDatetime, BaseModel, Field
from pypdf import PdfReader
from starlette.middleware.trustedhost import TrustedHostMiddleware

ROOT = Path(__file__).resolve().parents[1]
MAX_UPLOAD = 40 * 1024 * 1024

def now():
    return datetime.now(timezone.utc).isoformat()

def extract_document(raw: bytes, suffix: str) -> str:
    if suffix in {'.txt', '.md'}:
        try: return raw.decode('utf-8-sig')
        except UnicodeDecodeError: return raw.decode('gb18030')
    if suffix in {'.docx', '.epub'}:
        with zipfile.ZipFile(io.BytesIO(raw)) as archive:
            if len(archive.infolist()) > 4000 or sum(i.file_size for i in archive.infolist()) > 150 * 1024 * 1024:
                raise ValueError('文档展开后过大')
    if suffix == '.pdf':
        reader = PdfReader(io.BytesIO(raw))
        if reader.is_encrypted: raise ValueError('请先解密 PDF')
        if len(reader.pages) > 1500: raise ValueError('PDF 页数超过 1500')
        text = '\n\n'.join(p.extract_text() or '' for p in reader.pages)
        if not text.strip(): raise ValueError('扫描 PDF 没有可提取文字，请先进行 OCR')
        return text
    if suffix == '.docx':
        document = Document(io.BytesIO(raw))
        # iter_inner_content preserves paragraph/table order.
        return '\n'.join(block.text if hasattr(block, 'text') else '\n'.join(' | '.join(c.text for c in r.cells) for r in block.rows) for block in document.iter_inner_content())
    if suffix == '.epub':
        with zipfile.ZipFile(io.BytesIO(raw)) as z:
            container = ET.fromstring(z.read('META-INF/container.xml'))
            opf = next(e.attrib['full-path'] for e in container.iter() if e.tag.endswith('rootfile'))
            package = ET.fromstring(z.read(opf)); base = Path(opf).parent
            manifest = {e.attrib['id']: e.attrib['href'] for e in package.iter() if e.tag.endswith('}item')}
            paths = [str(base / manifest[e.attrib['idref']]).replace('\\', '/') for e in package.iter() if e.tag.endswith('}itemref')]
            if not paths: raise ValueError('EPUB 缺少阅读顺序')
            return '\n\n'.join(BeautifulSoup(z.read(p), 'html.parser').get_text('\n') for p in paths)
    raise ValueError('不支持该文档格式')

class State(BaseModel):
    stage: int = Field(default=0, ge=0, le=5)
    scroll: float = Field(default=0, ge=0)
    favorite: bool = False
    completed: bool = False
    notes: str = Field(default='', max_length=100000)
    answers: dict = Field(default_factory=dict)
    audio_positions: dict = Field(default_factory=dict)

class Revision(BaseModel):
    text: str = Field(min_length=1, max_length=200000)

class CloudState(BaseModel):
    state: State
    updated_at: AwareDatetime

class ExerciseAttempt(BaseModel):
    exercise_id: str
    answer: str = Field(max_length=20000)

class AIQuery(BaseModel):
    provider: str
    prompt: str = Field(min_length=1, max_length=20000)

class AISettings(BaseModel):
    ollama_model: str = Field(default='', max_length=200)
    remote_model: str = Field(default='', max_length=200)
    remote_url: str = Field(default='https://api.openai.com/v1/chat/completions', max_length=1000)
    remote_key: str | None = Field(default=None, max_length=2000)

def create_app(data_dir: Path | None = None):
    data = (data_dir or Path(os.environ.get('LLH_DATA_DIR', ROOT.parent / 'personal-data'))).resolve()
    data.mkdir(parents=True, exist_ok=True)
    if data.is_relative_to(ROOT): raise RuntimeError('LLH_DATA_DIR must be outside the repository')
    imports = data / 'imports'; imports.mkdir(exist_ok=True)
    db_path = data / 'learning.sqlite3'
    def db():
        conn = sqlite3.connect(db_path); conn.row_factory = sqlite3.Row
        return conn
    with db() as conn:
        conn.executescript('CREATE TABLE IF NOT EXISTS state (id TEXT PRIMARY KEY, payload TEXT NOT NULL, updated_at TEXT NOT NULL); CREATE TABLE IF NOT EXISTS imports (id TEXT PRIMARY KEY, name TEXT, suffix TEXT, sha256 TEXT UNIQUE, text TEXT, metadata TEXT); CREATE TABLE IF NOT EXISTS revisions (id TEXT PRIMARY KEY, course_id TEXT, text TEXT, created_at TEXT);')
    app = FastAPI(title='Language Learning Hub personal service')
    app.add_middleware(TrustedHostMiddleware, allowed_hosts=['localhost', '127.0.0.1', '[::1]', 'testserver'])
    @app.middleware('http')
    async def local_origin(request: Request, call_next):
        origin = request.headers.get('origin')
        allowed = {'http://localhost:5173', 'http://127.0.0.1:5173', 'http://localhost:8765', 'http://127.0.0.1:8765', 'http://testserver'}
        if origin and origin not in allowed:
            return JSONResponse({'detail': '仅允许本机学习页面访问'}, status_code=403)
        if request.headers.get('sec-fetch-site') == 'cross-site':
            return JSONResponse({'detail': '拒绝跨站请求'}, status_code=403)
        return await call_next(request)
    def courses():
        path = data / 'courses.json'
        if not path.exists(): raise HTTPException(503, '私人教材尚未导入；请运行教材整合脚本')
        return json.loads(path.read_text(encoding='utf-8'))
    def course(id):
        value = next((c for c in courses() if c['id'] == id), None)
        if value is None: raise HTTPException(404, '课程不存在')
        return value
    @app.get('/api/health')
    def health():
        return {'status': 'ok', 'mode': 'personal-loopback', 'courses_ready': (data / 'courses.json').exists()}
    @app.get('/api/courses')
    def catalog():
        return [{k: c.get(k) for k in ('id', 'title', 'language', 'level', 'track', 'unit', 'can_do')} | {'exercise_count': len(c['exercises']), 'audio_count': len(c['audio'])} for c in courses()]
    @app.get('/api/courses/{id}')
    def detail(id: str):
        c = course(id)
        with db() as conn: rows = conn.execute('SELECT * FROM revisions WHERE course_id=? ORDER BY created_at DESC', (id,)).fetchall()
        c['personal_revisions'] = [dict(r) for r in rows]
        return c
    @app.post('/api/courses/{id}/revisions')
    def revise(id: str, revision: Revision):
        course(id); rid = str(uuid.uuid4())
        with db() as conn: conn.execute('INSERT INTO revisions VALUES (?,?,?,?)', (rid, id, revision.text, now()))
        return {'id': rid, 'saved': True}
    @app.post('/api/courses/{id}/check')
    def check_exercise(id: str, attempt: ExerciseAttempt):
        q = next((q for q in course(id)['exercises'] if q['id'] == attempt.exercise_id), None)
        if not q: raise HTTPException(404, '练习不存在')
        if q['mode'] != 'exact_token':
            return {'result': 'self_review', 'answer': q['answer'], 'explanation': q['explanation']}
        normalize = lambda s: unicodedata.normalize('NFC', s).strip().replace('’', "'").casefold()
        return {'result': 'correct' if normalize(attempt.answer) == normalize(q['answer']) else 'review', 'answer': q['answer'], 'explanation': q['explanation']}
    @app.get('/api/state')
    def states():
        with db() as conn: return {r['id']: json.loads(r['payload']) | {'updated_at': r['updated_at']} for r in conn.execute('SELECT * FROM state')}
    @app.put('/api/state/{id}')
    def save_state(id: str, state: State):
        course(id); stamp = now()
        with db() as conn: conn.execute('INSERT INTO state VALUES (?,?,?) ON CONFLICT(id) DO UPDATE SET payload=excluded.payload, updated_at=excluded.updated_at', (id, state.model_dump_json(), stamp))
        return {'saved': True, 'updated_at': stamp}
    @app.post('/api/state/{id}/restore')
    def restore_state(id: str, incoming: CloudState):
        course(id)
        stamp = incoming.updated_at.astimezone(timezone.utc).isoformat()
        with db() as conn:
            conn.execute('BEGIN IMMEDIATE')
            local = conn.execute('SELECT * FROM state WHERE id=?', (id,)).fetchone()
            # A cloud download is not a new edit. Keep its original timestamp,
            # and do not overwrite a newer save from another local tab.
            if local and datetime.fromisoformat(local['updated_at']) >= incoming.updated_at:
                return json.loads(local['payload']) | {'updated_at': local['updated_at']}
            conn.execute('INSERT INTO state VALUES (?,?,?) ON CONFLICT(id) DO UPDATE SET payload=excluded.payload, updated_at=excluded.updated_at', (id, incoming.state.model_dump_json(), stamp))
        return incoming.state.model_dump() | {'updated_at': stamp}
    @app.get('/api/audio/{filename}')
    def audio(filename: str):
        # Names must be present in the generated manifest; arbitrary filesystem paths are never served.
        manifest = data / 'audio/manifest.json'
        records = json.loads(manifest.read_text(encoding='utf-8')) if manifest.exists() else []
        if filename != Path(filename).name or filename not in {r['filename'] for r in records}: raise HTTPException(404)
        path = data / 'audio' / filename
        if not path.is_file(): raise HTTPException(404)
        return FileResponse(path, media_type='audio/mpeg')
    @app.get('/api/library')
    def library():
        with db() as conn: return [dict(r) for r in conn.execute('SELECT id,name,suffix,sha256,metadata FROM imports ORDER BY rowid DESC')]
    @app.get('/api/reference-audio')
    def reference_index():
        path = data / 'reference-audio/index.json'
        return json.loads(path.read_text(encoding='utf-8')) if path.exists() else []
    @app.get('/api/reference-audio/{id}')
    def reference_track(id: str):
        if id not in {r['id'] for r in reference_index()}: raise HTTPException(404)
        path = data / 'reference-audio' / (id + '.mp3')
        if not path.is_file(): raise HTTPException(404)
        return FileResponse(path, media_type='audio/mpeg')
    @app.post('/api/library')
    async def upload(file: UploadFile = File(...)):
        raw = await file.read(MAX_UPLOAD + 1)
        if len(raw) > MAX_UPLOAD: raise HTTPException(413, '单文件上限 40 MB')
        name = Path((file.filename or 'import').replace('\\', '/')).name
        suffix = Path(name).suffix.lower(); digest = hashlib.sha256(raw).hexdigest()
        with db() as conn: existing = conn.execute('SELECT id FROM imports WHERE sha256=?', (digest,)).fetchone()
        if existing: return {'id': existing['id'], 'duplicate': True}
        id = str(uuid.uuid4()); path = imports / (id + suffix); metadata = {'bytes': len(raw), 'imported_at': now()}
        try:
            if suffix in {'.mp3', '.m4a', '.ogg', '.wav', '.flac'}:
                import imageio_ffmpeg
                import mutagen
                path.write_bytes(raw)
                info = mutagen.File(path)
                if not info: raise ValueError('无效音频')
                result = subprocess.run([imageio_ffmpeg.get_ffmpeg_exe(), '-v', 'error', '-xerror', '-i', str(path), '-f', 'null', '-'], capture_output=True, timeout=120)
                if result.returncode: raise ValueError('音频无法完整解码')
                metadata.update(duration=info.info.length, decoded=True); text = ''
            else:
                text = extract_document(raw, suffix)
                if not text.strip(): raise ValueError('文档没有正文')
                path.write_bytes(raw)
        except Exception as error:
            path.unlink(missing_ok=True)
            raise HTTPException(422, '导入失败：' + str(error)[:300]) from error
        with db() as conn: conn.execute('INSERT INTO imports VALUES (?,?,?,?,?,?)', (id, name, suffix, digest, text, json.dumps(metadata)))
        return {'id': id, 'duplicate': False}
    @app.get('/api/library/{id}')
    def imported(id: str):
        with db() as conn: row = conn.execute('SELECT * FROM imports WHERE id=?', (id,)).fetchone()
        if not row: raise HTTPException(404)
        return dict(row)
    @app.get('/api/library/{id}/original')
    def original(id: str):
        with db() as conn: row = conn.execute('SELECT * FROM imports WHERE id=?', (id,)).fetchone()
        if not row: raise HTTPException(404)
        return FileResponse(imports / (row['id'] + row['suffix']), filename=row['name'])
    @app.get('/api/config')
    def config():
        settings_path = data / 'connection.json'
        settings = json.loads(settings_path.read_text(encoding='utf-8')) if settings_path.exists() else {}
        return {'supabase_url': os.getenv('SUPABASE_URL', settings.get('supabase_url', '')), 'supabase_key': os.getenv('SUPABASE_PUBLISHABLE_KEY', settings.get('supabase_key', '')), 'ai': {'ollama': bool(os.getenv('OLLAMA_MODEL')), 'openai_compatible': bool(os.getenv('LLH_AI_KEY') and os.getenv('LLH_AI_MODEL'))}}
    @app.post('/api/ai')
    async def ai(query: AIQuery):
        # Explicit per-request activation; prompts are never sent during ordinary study.
        if query.provider == 'ollama':
            model = os.getenv('OLLAMA_MODEL', ai_settings().get('ollama_model'))
            if not model: raise HTTPException(503, '请配置本机 OLLAMA_MODEL')
            endpoint = 'http://127.0.0.1:11434/api/chat'; headers = {}
            payload = {'model': model, 'stream': False, 'messages': [{'role': 'user', 'content': query.prompt}]}
        elif query.provider == 'openai_compatible':
            settings = ai_settings()
            key, model = os.getenv('LLH_AI_KEY', settings.get('remote_key')), os.getenv('LLH_AI_MODEL', settings.get('remote_model'))
            if not key or not model: raise HTTPException(503, '请在本机环境变量中配置服务密钥和模型')
            endpoint = os.getenv('LLH_AI_URL', settings.get('remote_url', 'https://api.openai.com/v1/chat/completions'))
            if urlparse(endpoint).scheme != 'https': raise HTTPException(503, '远程 AI 服务必须使用 HTTPS')
            headers = {'Authorization': 'Bearer ' + key}
            payload = {'model': model, 'messages': [{'role': 'user', 'content': query.prompt}]}
        else: raise HTTPException(422, '未知服务')
        try:
            async with httpx.AsyncClient(timeout=90) as client:
                response = await client.post(endpoint, headers=headers, json=payload); response.raise_for_status(); result = response.json()
            return {'text': result['message']['content'] if query.provider == 'ollama' else result['choices'][0]['message']['content']}
        except Exception as error: raise HTTPException(502, 'AI 服务请求失败；请检查本机配置和服务状态') from error
    def ai_settings():
        path = data / 'ai-settings.json'
        return json.loads(path.read_text(encoding='utf-8')) if path.exists() else {}
    @app.get('/api/ai/settings')
    def read_ai_settings():
        s = ai_settings()
        return {'ollama_model': os.getenv('OLLAMA_MODEL', s.get('ollama_model', '')), 'remote_model': os.getenv('LLH_AI_MODEL', s.get('remote_model', '')), 'remote_url': os.getenv('LLH_AI_URL', s.get('remote_url', 'https://api.openai.com/v1/chat/completions')), 'key_configured': bool(os.getenv('LLH_AI_KEY', s.get('remote_key', '')))}
    @app.put('/api/ai/settings')
    def save_ai_settings(settings: AISettings):
        if urlparse(settings.remote_url).scheme != 'https' or not urlparse(settings.remote_url).hostname:
            raise HTTPException(422, '远程服务地址必须是完整 HTTPS URL')
        s = settings.model_dump()
        if settings.remote_key is None: s['remote_key'] = ai_settings().get('remote_key', '')
        path = data / 'ai-settings.json'; temporary = data / 'ai-settings.pending'
        temporary.write_text(json.dumps(s), encoding='utf-8'); temporary.replace(path)
        return {'saved': True}
    return app

app = create_app()
