"""Generate exact-script private French practice narration with local Piper, not cloned voices."""
import argparse,hashlib,json,re,subprocess,wave,io
from pathlib import Path
from piper import PiperVoice,SynthesisConfig
import imageio_ffmpeg
from mutagen.mp3 import MP3
ap=argparse.ArgumentParser();ap.add_argument('--private-work',type=Path,required=True);a=ap.parse_args();root=a.private_work.resolve()
data=root/'personal-data';dest=data/'audio';dest.mkdir(exist_ok=True)
model=root/'models/fr_FR-siwis-medium.onnx';voice=PiperVoice.load(str(model));ffmpeg=imageio_ffmpeg.get_ffmpeg_exe()
courses=json.loads((data/'courses.json').read_text(encoding='utf-8'));records=[]
for course in courses:
    if not course['id'].startswith('fr-a1-'):continue
    for kind,index in [('dialogue',0),('reading',3)]:
        body=course['sections'][index]['body']
        if kind=='dialogue':lines=[re.sub(r'^[AB]\s*:\s*','',l).strip() for l in body.splitlines() if re.match(r'^[AB]\s*:',l)]
        else:lines=[l.strip().strip('"') for l in body.splitlines() if len(l)>80 and not re.search(r'[\u4e00-\u9fff]',l) and not l.startswith('http')][:1]
        assert lines and all(not re.search(r'[\u4e00-\u9fff]',l) for l in lines),course['id']
        transcript='\n'.join(lines);sha=hashlib.sha256(transcript.encode()).hexdigest();id=course['id']+'-'+kind
        target=dest/(id+'.mp3');meta=dest/(id+'.json')
        if target.exists() and meta.exists():
            old=json.loads(meta.read_text(encoding='utf-8'))
            if old['transcript_sha256']==sha and old['sha256']==hashlib.sha256(target.read_bytes()).hexdigest():records.append(old);continue
        chunks=[];cues=[];elapsed=0
        for line in lines:
            mem=io.BytesIO()
            with wave.open(mem,'wb') as w:voice.synthesize_wav(line,w,syn_config=SynthesisConfig(length_scale=1.12))
            mem.seek(0)
            with wave.open(mem,'rb') as r:
                rate=r.getframerate();duration=r.getnframes()/rate;chunks.append(r.readframes(r.getnframes()))
            cues.append({'start':round(elapsed,3),'end':round(elapsed+duration,3),'text':line});elapsed+=duration
            chunks.append(b'\0\0'*int(rate*.25));elapsed+=.25
        wav=io.BytesIO()
        with wave.open(wav,'wb') as w:w.setnchannels(1);w.setsampwidth(2);w.setframerate(rate);w.writeframes(b''.join(chunks))
        p=subprocess.run([ffmpeg,'-y','-v','error','-i','pipe:0','-ac','1','-ar','22050','-b:a','48k',str(target)],input=wav.getvalue(),capture_output=True,timeout=120)
        assert p.returncode==0,p.stderr
        check=subprocess.run([ffmpeg,'-v','error','-xerror','-i',str(target),'-f','null','-'],capture_output=True,timeout=120);assert check.returncode==0
        record={'asset_id':id,'lesson_id':course['id'],'segment':kind,'filename':target.name,'transcript':transcript,'transcript_sha256':sha,'sha256':hashlib.sha256(target.read_bytes()).hexdigest(),'bytes':target.stat().st_size,'duration_seconds':round(MP3(target).info.length,3),'sample_rate_hz':22050,'bitrate':48000,'cues':cues,'engine':'Piper 1.8.0','voice':'fr_FR-siwis-medium','model_sha256':hashlib.sha256(model.read_bytes()).hexdigest(),'source_text_exact':True,'decoded':True,'synthetic':True,'human_listen_through_passed':False,'audio_verified':False,'rights':'Original project text; private practice synthesis. SIWIS model dataset CC BY 4.0; model card retained.'}
        meta.write_text(json.dumps(record,ensure_ascii=False,indent=2),encoding='utf-8');records.append(record);print(id,record['duration_seconds'],record['bytes'],flush=True)
    course['audio']=[r for r in records if r['lesson_id']==course['id']]
for course in courses:course['audio']=[r for r in records if r['lesson_id']==course['id']]
(data/'courses.json').write_text(json.dumps(courses,ensure_ascii=False,indent=2),encoding='utf-8')
(dest/'manifest.json').write_text(json.dumps(records,ensure_ascii=False,indent=2),encoding='utf-8')
print('Generated',len(records),'private practice recordings; human audition remains pending')
