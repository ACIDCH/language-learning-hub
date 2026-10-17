"""Authenticated cloud inference endpoint for an independently hosted CPU/GPU container.

Public web users sign in through the existing Supabase Auth project; unlike the
loopback-only prototype, this endpoint can serve multiple signed-in devices.
No audio, token, or transcript is logged or saved by the application.
"""
import base64
import binascii
import os
import threading
from contextlib import asynccontextmanager
from pathlib import Path

import httpx
import numpy as np
from fastapi import FastAPI, Header, HTTPException, Request
from fastapi.concurrency import run_in_threadpool
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field
from starlette.middleware.cors import CORSMiddleware

from .core import Evaluator


class CloudAttempt(BaseModel):
    pcm: str = Field(max_length=512000)
    target: str = Field(min_length=1, max_length=400)
    language: str


async def verify_supabase_user(token: str):
    """Validate a CURRENT user session with Supabase; never trust browser-supplied IDs."""
    url = os.environ.get('SUPABASE_URL', '').rstrip('/')
    key = os.environ.get('SUPABASE_PUBLISHABLE_KEY', '')
    if not url.startswith('https://') or not key:
        raise HTTPException(503, 'Speech server authentication is not configured')
    try:
        async with httpx.AsyncClient(timeout=8) as client:
            response = await client.get(
                url + '/auth/v1/user',
                headers={'apikey': key, 'Authorization': 'Bearer ' + token}
            )
    except httpx.HTTPError:
        raise HTTPException(503, 'Authentication service temporarily unavailable')
    if response.status_code != 200:
        raise HTTPException(401, 'Please sign in again to use cloud speech')
    try:
        user = response.json()
    except ValueError:
        raise HTTPException(503, 'Authentication service returned invalid data')
    if not isinstance(user, dict) or not isinstance(user.get('id'), str) or not user['id']:
        raise HTTPException(401, 'Invalid authenticated user')
    return user['id']


def cloud_app(evaluator=None, verify=None, origins=None):
    """Dependency injection keeps smoke tests weight-free and network-independent."""
    allowed = origins if origins is not None else [
        x.strip() for x in os.environ.get('LLH_SPEECH_ORIGINS', '').split(',') if x.strip()
    ]
    if any(not origin.startswith('https://') and origin not in
           ('http://localhost:5174', 'http://127.0.0.1:5174') for origin in allowed):
        raise ValueError('Cloud speech origins must use HTTPS')
    app = FastAPI(docs_url=None, redoc_url=None, openapi_url=None)
    lock = threading.Lock()
    auth = verify or verify_supabase_user
    app.add_middleware(CORSMiddleware, allow_origins=allowed,
                       allow_methods=['GET', 'POST', 'OPTIONS'],
                       allow_headers=['Authorization', 'Content-Type'])

    @app.middleware('http')
    async def limit_requests(request: Request, call_next):
        origin = request.headers.get('origin')
        if origin and origin not in allowed:
            return JSONResponse({'detail': 'Unapproved learning site'}, status_code=403)
        if request.method == 'POST':
            body = bytearray()
            async for part in request.stream():
                body.extend(part)
                if len(body) > 520000:
                    body.clear()
                    return JSONResponse({'detail': 'Audio is too large'}, status_code=413)
            request._body = bytes(body)
            body.clear()
        response = await call_next(request)
        response.headers['Cache-Control'] = 'no-store'
        return response

    @app.get('/health')
    async def health():
        return {'ready': evaluator is not None, 'mode': 'remote',
                'max_seconds': 12, 'model': 'phoneme', 'retention': 'memory-only'}

    @app.post('/evaluate')
    async def evaluate(attempt: CloudAttempt, authorization: str = Header(default='')):
        if not authorization.startswith('Bearer ') or len(authorization) < 30:
            raise HTTPException(401, 'Please sign in to use remote speech')
        await auth(authorization[7:])
        if attempt.language not in ('fr', 'en'):
            raise HTTPException(422, 'English or French only')
        if not attempt.target.strip() or any('\u3400' <= c <= '\u9fff' for c in attempt.target):
            raise HTTPException(422, 'Use an English/French sentence without Chinese text')
        if evaluator is None:
            raise HTTPException(503, 'Cloud acoustic model not loaded')
        if not lock.acquire(blocking=False):
            raise HTTPException(429, 'Speech inference busy; retry after this request')
        audio = None
        try:
            try:
                raw = base64.b64decode(attempt.pcm, validate=True)
                if len(raw) % 2:
                    raise ValueError('odd pcm')
                audio = np.frombuffer(raw, dtype='<i2').astype(np.float32) / 32768
            except (ValueError, binascii.Error):
                raise HTTPException(422, 'Invalid PCM16 audio')
            if not 5600 <= len(audio) <= 192000:
                raise HTTPException(422, 'Use 0.35–12 seconds of 16kHz mono audio')
            result = await run_in_threadpool(evaluator.evaluate, audio, attempt.target, attempt.language)
            if not isinstance(result, dict) or result.get('canScore') is not False:
                raise HTTPException(502, 'Incompatible acoustic model result')
            return {**result, 'engine': 'optional-remote-evaluator'}
        finally:
            if audio is not None:
                audio.fill(0)
            lock.release()

    return app


app = cloud_app()

if __name__ == '__main__':
    import uvicorn
    model_dir = os.environ.get('LLH_SPEECH_MODEL', '/opt/phoneme-model')
    if not os.environ.get('LLH_SPEECH_ORIGINS'):
        raise RuntimeError('Set LLH_SPEECH_ORIGINS to the HTTPS learning website')
    if not os.environ.get('SUPABASE_URL') or not os.environ.get('SUPABASE_PUBLISHABLE_KEY'):
        raise RuntimeError('Supabase authentication environment is required')
    threads = int(os.environ.get('LLH_SPEECH_THREADS', '2'))
    model = Evaluator(Path(model_dir), threads=threads)
    uvicorn.run(cloud_app(model), host='0.0.0.0',
                port=int(os.environ.get('PORT', '7860')), access_log=False)
