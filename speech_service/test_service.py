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


def test_empty_phoneme_output_is_unscorable_without_false_error_list():
    from contextlib import nullcontext
    from types import SimpleNamespace
    from .core import Evaluator

    class DummyInput:
        def unsqueeze(self, _): return self

    class DummyTorch:
        def inference_mode(self): return nullcontext()
        def from_numpy(self, _): return DummyInput()

    class DummyLogits:
        def __getitem__(self, _): return self
        def argmax(self, dim=-1): return self
        def tolist(self): return [0, 0, 0, 0]

    evaluator = Evaluator.__new__(Evaluator)
    evaluator.torch = DummyTorch()
    evaluator.model = lambda _: SimpleNamespace(logits=DummyLogits())
    evaluator.expected = lambda text, language: (['ɛ̃'], [])
    result = evaluator.evaluate(np.full(16000, .05, dtype=np.float32), 'un', 'fr')
    assert result['status'] == 'unscorable'
    assert result['canScore'] is False
    assert result['reason'] == 'empty_model_output'
    assert result['observed'] == []
    assert result['phones'] == []
    assert result['reference'] == ['ɛ̃']
    assert result['elapsed_ms'] >= 0


def test_empty_reference_is_unscorable_and_skips_model():
    from .core import Evaluator

    evaluator = Evaluator.__new__(Evaluator)
    evaluator.expected = lambda text, language: ([], ['?'])
    result = evaluator.evaluate(np.full(16000, .05, dtype=np.float32), '?', 'fr')
    assert result['status'] == 'unscorable'
    assert result['reason'] == 'empty_reference'
    assert result['reference_unknown'] == ['?']
    assert result['phones'] == []


def test_practice_reference_is_a_machine_agreement_index_not_an_accuracy_score():
    from .core import practice_reference
    expected = ['h', 'ə', 'l', 'oʊ', 'w']
    observed = [
        {'phone': p, 'start_s': i * .1, 'end_s': (i + 1) * .1}
        for i, p in enumerate(expected)
    ]
    perfect = practice_reference(expected, observed, align(expected, observed))
    assert perfect['available'] is True
    assert perfect['percent'] == 100
    assert perfect['calibrated'] is False
    assert perfect['method'] == 'generated_g2p_vs_greedy_ctc_edit_agreement'
    changed = observed.copy()
    changed[2] = {'phone': 'm', 'start_s': .2, 'end_s': .3}
    estimate = practice_reference(expected, changed, align(expected, changed))
    assert estimate['percent'] == 80
    assert estimate['alignment_edits'] == 1


def test_practice_reference_rejects_short_and_unstable_evidence():
    from .core import practice_reference
    make = lambda chars: [{'phone': x} for x in chars]
    expected = list('abcdef')
    assert practice_reference(['ɛ̃', 'p'], make('xp'), align(['ɛ̃', 'p'], make('xp')))['reason'] == 'short_reference'
    assert practice_reference(expected, [], align(expected, []))['reason'] == 'insufficient_observation'
    assert practice_reference(expected, make('ab'), align(expected, make('ab')))['reason'] == 'insufficient_observation'
    assert practice_reference(expected, make('abc'), align(expected, make('abc')))['available'] is True
    assert practice_reference(expected, make('abcdefghijkl'), align(expected, make('abcdefghijkl')))['reason'] == 'unstable_coverage'
    assert practice_reference(expected, make('abcdef'), align(expected, make('abcdef')), ['?'])['reason'] == 'unsupported_reference'


def test_practice_reference_never_converts_v3_into_professional_score():
    from contextlib import nullcontext
    from types import SimpleNamespace
    from .core import Evaluator

    class Dummy:
        def unsqueeze(self, _): return self
    class Torch:
        def inference_mode(self): return nullcontext()
        def from_numpy(self, _): return Dummy()
    class Logits:
        def __getitem__(self, _): return self
        def argmax(self, dim=-1): return self
        def tolist(self): return [4, 0, 5, 0, 6, 0, 7, 0, 8]
    evaluator = Evaluator.__new__(Evaluator)
    evaluator.torch = Torch()
    evaluator.labels = {4: 'h', 5: 'ə', 6: 'l', 7: 'oʊ', 8: 'w'}
    evaluator.model = lambda _: SimpleNamespace(logits=Logits())
    evaluator.expected = lambda _text, _language: (['h', 'ə', 'l', 'oʊ', 'w'], [])
    result = evaluator.evaluate(np.full(16000, .05, dtype=np.float32), 'hello', 'en')
    assert result['status'] == 'experimental'
    assert result['canScore'] is False
    assert 'score' not in result
    assert result['practice_reference']['available'] is True
    assert result['practice_reference']['percent'] == 100
