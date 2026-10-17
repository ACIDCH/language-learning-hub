"""Explicitly started loopback-only acoustic prototype; no files, telemetry or AI calls."""
import base64
import os
import threading
from pathlib import Path

import numpy as np
from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field
from starlette.middleware.cors import CORSMiddleware
from starlette.middleware.trustedhost import TrustedHostMiddleware

from .core import Evaluator

class Attempt(BaseModel):
    pcm: str = Field(max_length=512000)
    target: str = Field(min_length=1, max_length=400)
    language: str

def create_app(evaluator=None):
    app = FastAPI(docs_url=None, redoc_url=None)
    lock = threading.Lock()
    origins = ['http://127.0.0.1:5174', 'http://localhost:5174', 'http://testserver']
    app.add_middleware(TrustedHostMiddleware, allowed_hosts=['127.0.0.1', 'localhost', 'testserver'])
    app.add_middleware(CORSMiddleware, allow_origins=origins, allow_methods=['GET', 'POST'], allow_headers=['Content-Type'])

    @app.middleware('http')
    async def guard(request: Request, call_next):
        if request.headers.get('origin') and request.headers['origin'] not in origins:
            return JSONResponse({'detail': 'Local preview origin required'}, status_code=403)
        # Stream limit also covers missing/forged Content-Length. Never spool uploads.
        if request.method == 'POST':
            body = bytearray()
            async for part in request.stream():
                body.extend(part)
                if len(body) > 520000: return JSONResponse({'detail': 'Audio request too large'}, status_code=413)
            request._body = bytes(body)
        response = await call_next(request)
        response.headers['Cache-Control'] = 'no-store'
        return response

    @app.get('/health')
    def health():
        return {'ready': evaluator is not None, 'retention': 'memory-only', 'experimental': True, 'max_seconds': 12}

    @app.post('/evaluate')
    def evaluate(attempt: Attempt):
        if attempt.language not in ('en', 'fr'): raise HTTPException(422, 'English or French only')
        if not attempt.target.strip() or any('\u3400' <= c <= '\u9fff' for c in attempt.target):
            raise HTTPException(422, 'Select English/French text without Chinese instructions')
        try:
            raw = base64.b64decode(attempt.pcm, validate=True)
            if len(raw) % 2: raise ValueError()
            audio = np.frombuffer(raw, dtype='<i2').astype(np.float32) / 32768
        except ValueError: raise HTTPException(422, 'Invalid PCM16 audio')
        if not 5600 <= len(audio) <= 192000: raise HTTPException(422, 'Use 0.35–12 seconds of mono 16 kHz audio')
        if evaluator is None: raise HTTPException(503, 'Local acoustic model not loaded')
        if not lock.acquire(blocking=False): raise HTTPException(429, 'One evaluation at a time; please retry')
        try: return evaluator.evaluate(audio, attempt.target, attempt.language)
        finally:
            audio.fill(0)
            lock.release()

    return app

# Model loading/downloads never happen on import or in the Cloudflare Worker.
app = create_app()
if __name__ == '__main__':
    import uvicorn
    directory = os.environ.get('LLH_SPEECH_MODEL', str(Path(__file__).resolve().parents[2] / 'speech-models/phoneme'))
    evaluator = Evaluator(directory)
    print(f'Experimental model ready in {evaluator.load_s:.2f}s; no user audio persistence.', flush=True)
    uvicorn.run(create_app(evaluator), host='127.0.0.1', port=8776, access_log=False)
