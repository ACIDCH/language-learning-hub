import base64
import numpy as np
from fastapi.testclient import TestClient
from .app import create_app
from .core import align,signal_info

class Fake:
    def evaluate(self,a,t,l):return {'engine':'optional-local-evaluator','status':'experimental','canScore':False,'phones':[]}

def payload(n=16000):return {'pcm':base64.b64encode(np.zeros(n,dtype='<i2').tobytes()).decode(),'target':'pain','language':'fr'}

def test_no_retention_and_valid_contract(tmp_path,monkeypatch):
    monkeypatch.chdir(tmp_path);client=TestClient(create_app(Fake()))
    r=client.post('/evaluate',json=payload());assert r.status_code==200 and r.json()['canScore'] is False
    assert r.headers['cache-control']=='no-store' and list(tmp_path.iterdir())==[]

def test_origin_host_size_language_and_model_gates():
    c=TestClient(create_app(Fake()))
    assert c.post('/evaluate',json=payload(),headers={'Origin':'https://untrusted.example'}).status_code==403
    assert c.get('/health',headers={'Host':'untrusted.example'}).status_code==400
    assert c.post('/evaluate',content=b'x'*520001).status_code==413
    for n in [10,192001]:assert c.post('/evaluate',json=payload(n)).status_code==422
    d=payload();d['pcm']='!!';assert c.post('/evaluate',json=d).status_code==422
    d=payload();d['pcm']=base64.b64encode(b'odd').decode();assert c.post('/evaluate',json=d).status_code==422
    d=payload();d['language']='zh';assert c.post('/evaluate',json=d).status_code==422
    d=payload();d['target']='中文 Bonjour';assert c.post('/evaluate',json=d).status_code==422
    assert TestClient(create_app()).post('/evaluate',json=payload()).status_code==503

def test_signal_rejections_and_energy_not_stress_score():
    assert signal_info(np.zeros(16000))['rejection']=='silence'
    assert signal_info(np.ones(16000))['rejection']=='clipping'
    assert signal_info(np.ones(2000)*.1)['rejection']=='too_short'
    assert signal_info(np.ones(208000)*.1)['rejection']=='too_long'
    assert signal_info(np.ones(16000)*.1)['rejection'] is None

def test_alignment_preserves_phone_time_and_diacritics():
    observed=[{'phone':'p','start_s':.2,'end_s':.3},{'phone':'ɛ','start_s':.3,'end_s':.6}]
    result=align(['p','ɛ̃'],observed)
    assert result[1]['kind']=='different' and result[1]['expected']=='ɛ̃'
    assert result[1]['start_s']==.3
    assert align(['y'],[])[0]['kind']=='not_detected'
    assert align([],observed)[0]['kind']=='additional'
