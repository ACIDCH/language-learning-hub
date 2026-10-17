"""Synthetic smoke corpus only. Never claim learner/phoneme ground truth.
Run from repository root: python -m scripts.speech.benchmark --engine phoneme
"""
import argparse
import hashlib
import json
import platform
import re
import threading
import time
from pathlib import Path
import numpy as np
import psutil
import soundfile as sf
from scipy.signal import resample_poly

def distance(a,b):
    prev=list(range(len(b)+1))
    for i,x in enumerate(a,1):
        row=[i]
        for j,y in enumerate(b,1): row.append(min(row[-1]+1,prev[j]+1,prev[j-1]+(x!=y)))
        prev=row
    return prev[-1]

def normalize(text): return ' '.join(re.findall(r"[^\W_]+",text.lower().replace('’',"'"),re.UNICODE))

def generate(out,cases):
    from piper import PiperVoice, SynthesisConfig
    for language,model in [('fr','fr_FR-siwis-medium'),('en','en_US-lessac-medium')]:
        voice=PiperVoice.load(str(Path('../models')/(model+'.onnx')))
        for case in [c for c in cases if c['language']==language]:
            for variant,scale in [('clean_synthetic',1.),('slow_synthetic',1.35)]:
                dest=out/(case['id']+'-'+variant+'.wav')
                if dest.exists(): continue
                chunks=list(voice.synthesize(case['text'],SynthesisConfig(length_scale=scale)))
                samples=np.concatenate([c.audio_float_array for c in chunks])
                from math import gcd
                rate=chunks[0].sample_rate;divisor=gcd(rate,16000)
                samples=resample_poly(samples,16000//divisor,rate//divisor)
                samples=np.pad(samples,(1600,1600))
                sf.write(dest,samples,16000,subtype='PCM_16')
            clean,_=sf.read(out/(case['id']+'-clean_synthetic.wav'),dtype='float32')
            rng=np.random.default_rng(20+int(case['id'][-2:]))
            noise=rng.normal(size=len(clean)).astype(np.float32)
            noise*=np.sqrt(np.mean(clean**2)/(10*np.mean(noise**2)))
            sf.write(out/(case['id']+'-noise_10db_synthetic.wav'),np.clip(clean+noise,-1,1),16000,subtype='PCM_16')

def main():
    p=argparse.ArgumentParser();p.add_argument('--engine',choices=['generate','phoneme','whisper'],required=True);p.add_argument('--threads',type=int,default=4);p.add_argument('--limit',type=int,default=90);args=p.parse_args()
    cases=json.loads(Path('tests/fixtures/speech-v3-cases.json').read_text(encoding='utf-8'))
    out=Path('../speech-benchmark-audio');out.mkdir(exist_ok=True)
    if args.engine=='generate':generate(out,cases);print('90 synthetic fixtures generated; not human recordings.');return
    rss=[];stop=threading.Event();process=psutil.Process()
    def sample():
        while not stop.wait(.05):rss.append(process.memory_info().rss)
    thread=threading.Thread(target=sample,daemon=True);thread.start()
    start=time.perf_counter()
    if args.engine=='phoneme':
        from speech_service.core import Evaluator
        model=Evaluator('../speech-models/phoneme',args.threads)
    else:
        from faster_whisper import WhisperModel
        model=WhisperModel('../speech-models/whisper',device='cpu',compute_type='int8',cpu_threads=args.threads,num_workers=1)
    load=time.perf_counter()-start
    results=[]
    for case in cases:
        for condition in case['conditions']:
            if len(results)>=args.limit:break
            path=out/(case['id']+'-'+condition+'.wav');audio,rate=sf.read(path,dtype='float32');start=time.perf_counter()
            row={'id':case['id'],'language':case['language'],'condition':condition,'duration_s':len(audio)/rate,'fixture_sha256':hashlib.sha256(path.read_bytes()).hexdigest()}
            try:
                if args.engine=='phoneme':
                    result=model.evaluate(audio,case['text'],case['language'])
                    row['result']=result
                    row['g2p_phone_edit_proxy']=sum(x['kind']!='match' for x in result['phones'])/max(1,len(result.get('reference',[]))) if result['status']!='unscorable' else None
                else:
                    segments,_=model.transcribe(audio,language=case['language'],beam_size=1,condition_on_previous_text=False,vad_filter=False)
                    transcript=' '.join(s.text.strip() for s in segments);expected=normalize(case['text']);heard=normalize(transcript)
                    row.update(transcript=transcript,synthetic_prompt_word_errors=distance(expected.split(),heard.split()),reference_words=len(expected.split()),synthetic_prompt_char_errors=distance(expected,heard),reference_chars=len(expected))
                row['ok']=True
            except Exception as e:row.update(ok=False,error=type(e).__name__)
            row['elapsed_ms']=(time.perf_counter()-start)*1000;results.append(row)
            print(args.engine,row['id'],condition,round(row['elapsed_ms']),flush=True)
    stop.set();thread.join()
    report={'engine':args.engine,'threads':args.threads,'device':platform.platform(),'processor':platform.processor(),'logical_cpus':psutil.cpu_count(),'physical_memory_bytes':psutil.virtual_memory().total,'load_s':load,'sampled_peak_rss_bytes':max(rss or [process.memory_info().rss]),'weights_bytes':sum(f.stat().st_size for f in (Path('../speech-models')/('phoneme' if args.engine=='phoneme' else 'whisper')).glob('*') if f.is_file()),'human_accuracy':None,'human_recordings':0,'results':results}
    dest=Path('reports')/f'speech-v3-{args.engine}-{args.threads}threads.json';dest.write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    print(dest,flush=True)
if __name__=='__main__':main()
