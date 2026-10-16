"""Download official FI assets with bounded retries, integrity checks and resumable manifests.

Binary files and private upload receipts must live OUTSIDE the public repository.
Requires beautifulsoup4, pypdf and mutagen; no credentials required.
"""
from __future__ import annotations
import argparse, hashlib, io, json, re, sys, time, urllib.request, zipfile
from pathlib import Path, PurePosixPath
from urllib.parse import urljoin, urlparse
from bs4 import BeautifulSoup
from mutagen.mp3 import MP3
from pypdf import PdfReader

ALLOW = {'laits.utexas.edu', 'www.laits.utexas.edu'}
MAX_BYTES = 150 * 1024 * 1024
MAP = 'https://laits.utexas.edu/fi/map/'
BOOK = 'https://www.laits.utexas.edu/fi/FrancaisInteractif-textbook.pdf'

def safe_url(url):
    p = urlparse(url)
    if p.scheme != 'https' or p.hostname not in ALLOW or p.username or p.password or p.port not in (None,443):
        raise ValueError('URL outside official HTTPS allowlist')
    return url

class SafeRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        safe_url(newurl)
        return super().redirect_request(req, fp, code, msg, headers, newurl)

def fetch(url):
    return urllib.request.build_opener(SafeRedirect).open(
        urllib.request.Request(safe_url(url), headers={'User-Agent':'LanguageLearningHub-OER/1.0'}), timeout=90)

def digest(path):
    with path.open('rb') as f:
        return hashlib.file_digest(f,'sha256').hexdigest()

def inspect(path):
    head = path.read_bytes()[:8]
    if path.suffix == '.pdf':
        if not head.startswith(b'%PDF-'): raise ValueError('Not a PDF')
        reader=PdfReader(path)
        return {'mime':'application/pdf','pages':len(reader.pages)}
    if path.suffix == '.zip':
        if not head.startswith(b'PK'): raise ValueError('Not ZIP')
        tracks=[]; skipped=[]
        with zipfile.ZipFile(path) as z:
            entries=z.infolist()
            if len(entries)>2000 or sum(i.file_size for i in entries)>500*1024*1024:
                raise ValueError('Archive expansion limit')
            for i in entries:
                p=PurePosixPath(i.filename)
                if p.is_absolute() or '..' in p.parts or '\\' in i.orig_filename or ':' in i.filename or (i.external_attr>>16)&0o170000==0o120000:
                    raise ValueError('Unsafe ZIP member')
                if i.file_size>MAX_BYTES or (i.file_size and i.file_size/max(i.compress_size,1)>200):
                    raise ValueError('ZIP member size/ratio limit')
            bad=z.testzip()
            if bad: raise ValueError('CRC failed: '+bad)
            for i in entries:
                if i.is_dir(): continue
                if i.filename.startswith('__MACOSX/') or PurePosixPath(i.filename).name=='.DS_Store':
                    skipped.append(i.filename); continue
                if PurePosixPath(i.filename).suffix.lower()!='.mp3':
                    if PurePosixPath(i.filename).suffix.lower() not in {'.txt','.md'}:
                        raise ValueError('Unexpected non-audio archive member: '+i.filename)
                    skipped.append(i.filename); continue
                raw=z.read(i); audio=MP3(io.BytesIO(raw))
                tracks.append({'filename':i.filename,'bytes':len(raw),'sha256':hashlib.sha256(raw).hexdigest(),
                    'mime':'audio/mpeg','duration_seconds':round(audio.info.length,3),'sample_rate':audio.info.sample_rate,
                    'bitrate':audio.info.bitrate,'codec':'MPEG audio','playback_check':'header_parsed_not_listened'})
        if not tracks: raise ValueError('No MP3 tracks')
        return {'mime':'application/zip','zip_crc_verified':True,'tracks':tracks,'skipped_members':skipped}
    raise ValueError('Unsupported format')

def download(url,path):
    if path.exists(): return inspect(path)
    tmp=path.with_suffix(path.suffix+'.part')
    for attempt in range(3):
        try:
            with fetch(url) as r:
                mime=r.headers.get('Content-Type','').split(';')[0]
                if mime not in {'application/pdf','application/zip','application/x-zip-compressed','application/octet-stream'}:
                    raise ValueError('Unexpected Content-Type '+mime)
                if int(r.headers.get('Content-Length','0'))>MAX_BYTES: raise ValueError('Size limit')
                total=0
                with tmp.open('wb') as out:
                    while chunk:=r.read(1024*1024):
                        total+=len(chunk)
                        if total>MAX_BYTES: raise ValueError('Size limit')
                        out.write(chunk)
            # Inspect using original suffix before atomic rename.
            checked=path.with_name(path.stem+'.checked'+path.suffix)
            tmp.replace(checked)
            try: result=inspect(checked)
            except Exception:
                checked.unlink(); raise
            checked.replace(path)
            result['http_mime']=mime
            return result
        except Exception:
            tmp.unlink(missing_ok=True)
            if attempt==2: raise
            time.sleep(2**attempt)

def save(path,data):
    tmp=path.with_suffix('.tmp')
    tmp.write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n',encoding='utf-8'); tmp.replace(path)

def main():
    ap=argparse.ArgumentParser(); ap.add_argument('--output',type=Path,required=True); args=ap.parse_args()
    out=args.output.resolve(); repo=Path(__file__).resolve().parents[1]
    if out.is_relative_to(repo): raise SystemExit('Place private binaries outside repository')
    out.mkdir(parents=True,exist_ok=True)
    with fetch(MAP) as r: html=r.read().decode('utf-8')
    (out/'map.html').write_text(html,encoding='utf-8')
    urls={BOOK:('Full-Book',None,'2019-fourth-edition')}
    for a in BeautifulSoup(html,'html.parser').select('a[href]'):
        url=urljoin(MAP,a['href']); name=Path(urlparse(url).path).name
        ch=re.fullmatch(r'Fi_chapter_(\d+)_ed4.pdf',name)
        audio=re.fullmatch(r'(voc|pho)_(\d+)\.zip',name)
        if ch: urls[url]=('Chapters',int(ch[1]),'2019-fourth-edition')
        if audio: urls[url]=('Audio-Vocabulary' if audio[1]=='voc' else 'Audio-Phonetics',int(audio[2]),'legacy-website')
    manifest={'source':MAP,'items':[],'errors':[]}
    for url,(group,chapter,edition) in urls.items():
        path=out/Path(urlparse(url).path).name
        try:
            info=download(url,path)
            item={'asset_id':'fi-'+path.stem.lower().replace('_','-'),'filename':path.name,'source_url':url,
                'group':group,'official_chapter':chapter,'edition':edition,'bytes':path.stat().st_size,'sha256':digest(path),
                'license':'CC-BY-4.0' if group=='Full-Book' else 'CC-BY-3.0',
                'rights_evidence':BOOK+'#page=4' if group=='Full-Book' else 'https://laits.utexas.edu/fi/page/adopt/',
                'license_status':'verified_private_copy','exceptions':'Preserve embedded third-party notices; public redistribution requires item review.',
                'attribution':'COERLL, Department of French and Italian, University of Texas at Austin; Karen Kelton, Nancy Guilloteau, Carl Blyth. Unmodified.',
                'status':'downloaded_local',**info}
            for track in item.get('tracks',[]): track.update(official_chapter=chapter,archive_asset_id=item['asset_id'],license='CC-BY-3.0',source_url=url)
            manifest['items'].append(item)
            print(path.name,item['bytes'],len(item.get('tracks',[])),flush=True)
        except Exception as e:
            manifest['errors'].append({'source_url':url,'error':str(e)}); print('FAILED',url,str(e),flush=True)
        save(out/'asset-manifest.local.json',manifest)
        time.sleep(.25)
    print('Verified',len(manifest['items']),'Failed',len(manifest['errors']))
    return bool(manifest['errors'])

if __name__=='__main__':
    sys.stdout.reconfigure(encoding='utf-8'); raise SystemExit(main())
