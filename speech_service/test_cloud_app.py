import base64

import numpy as np
from fastapi.testclient import TestClient
from .cloud_app import cloud_app


class FakeModel:
    def __init__(self):
        self.audio = None
        self.count = 0

    def evaluate(self, audio, target, language):
        self.audio = audio
        self.count += 1
        return {
            'engine': 'optional-local-evaluator', 'canScore': False,
            'status': 'experimental', 'phones': [], 'target_received': target,
            'practice_reference': {'available': False, 'percent': None, 'calibrated': False}
        }


async def allow(token):
    assert token == 'example-user-token-with-length-12345'
    return 'user-from-supabase'


async def reject(_):
    from fastapi import HTTPException
    raise HTTPException(401, 'Expired session')


def payload(n=16000):
    return {
        'pcm': base64.b64encode(np.ones(n, dtype='<i2').tobytes()).decode('ascii'),
        'target': 'Bonjour, nous allons bien.', 'language': 'fr'
    }


def test_cloud_session_and_ephemeral_audio(tmp_path, monkeypatch):
    monkeypatch.chdir(tmp_path)
    model = FakeModel()
    client = TestClient(cloud_app(evaluator=model, verify=allow,
                                  origins=['https://study.example']))
    headers = {'Authorization': 'Bearer example-user-token-with-length-12345',
               'Origin': 'https://study.example'}
    response = client.post('/evaluate', json=payload(), headers=headers)
    assert response.status_code == 200
    result = response.json()
    assert result['engine'] == 'optional-remote-evaluator'
    assert result['canScore'] is False
    assert result['practice_reference']['calibrated'] is False
    assert response.headers['cache-control'] == 'no-store'
    assert model.count == 1
    assert model.audio is not None and np.all(model.audio == 0)
    assert list(tmp_path.iterdir()) == []


def test_cloud_origin_auth_and_model_errors():
    model = FakeModel()
    client = TestClient(cloud_app(evaluator=model, verify=allow,
                                  origins=['https://study.example']))
    token = 'Bearer example-user-token-with-length-12345'
    assert client.post('/evaluate', json=payload()).status_code == 401
    assert client.post('/evaluate', json=payload(),
                       headers={'Authorization': token, 'Origin':'https://evil.example'}).status_code == 403
    expired = TestClient(cloud_app(evaluator=model, verify=reject,
                                   origins=['https://study.example']))
    assert expired.post('/evaluate', json=payload(),
                        headers={'Authorization': token}).status_code == 401
    unavailable = TestClient(cloud_app(verify=allow, origins=['https://study.example']))
    assert unavailable.post('/evaluate', json=payload(),
                            headers={'Authorization': token}).status_code == 503
    assert model.count == 0
    assert client.get('/health').json()['ready'] is True


def test_cloud_rejects_invalid_audio_input_and_does_not_run_model():
    model=FakeModel()
    client=TestClient(cloud_app(evaluator=model,verify=allow,
                                origins=['https://study.example']))
    hdr={'Authorization':'Bearer example-user-token-with-length-12345'}
    for n in (4,192001):
        assert client.post('/evaluate',json=payload(n),headers=hdr).status_code in (413,422)
    value=payload();value['pcm']='??'
    assert client.post('/evaluate',json=value,headers=hdr).status_code==422
    value=payload();value['language']='zh'
    assert client.post('/evaluate',json=value,headers=hdr).status_code==422
    value=payload();value['target']='中文'
    assert client.post('/evaluate',json=value,headers=hdr).status_code==422
    assert model.count==0


def test_cloud_disallows_insecure_origins():
    import pytest
    with pytest.raises(ValueError, match='HTTPS'):
        cloud_app(origins=['http://study.example'])


def test_no_private_key_is_needed_for_authentication(monkeypatch):
    import httpx
    from .cloud_app import verify_supabase_user

    monkeypatch.setenv('SUPABASE_URL', 'https://identity.example')
    monkeypatch.setenv('SUPABASE_PUBLISHABLE_KEY', 'sb_publishable_example')
    requests = []
    class MockAsyncClient:
        async def __aenter__(self): return self
        async def __aexit__(self, *_): pass
        async def get(self, url, headers):
            requests.append((url,headers))
            return httpx.Response(200,json={'id':'correct-user'})
    monkeypatch.setattr(httpx,'AsyncClient',lambda **_: MockAsyncClient())
    import asyncio
    user = asyncio.run(verify_supabase_user('signed-user-token'))
    assert user=='correct-user'
    assert requests[0][0]=='https://identity.example/auth/v1/user'
    assert requests[0][1]['Authorization']=='Bearer signed-user-token'
    assert requests[0][1]['apikey']=='sb_publishable_example'
