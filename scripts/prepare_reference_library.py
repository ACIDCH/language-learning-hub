"""Materialize verified unique tracks for private playback; preserve every archive locator."""
import argparse, hashlib, json, zipfile
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
parser=argparse.ArgumentParser();parser.add_argument('--private-work',type=Path,required=True);args=parser.parse_args()
work=args.private_work.resolve();target=work/'personal-data/reference-audio'
if target.is_relative_to(ROOT):raise ValueError('Private audio must remain outside repository')
target.mkdir(parents=True,exist_ok=True)
audit=json.loads((ROOT/'reports/audio-all-archives.json').read_text())
references=json.loads((ROOT/'config/assets/lesson-audio.json').read_text(encoding='utf-8'))['mappings']
unique={}
for archive in audit['archives']:
    name=archive['archive'];path=work/('inspire' if name.startswith('Inspire') else 'oer')/name
    assert hashlib.sha256(path.read_bytes()).hexdigest()==archive['archive_sha256']
    category='FI phonetics' if name.startswith('pho_') else 'FI vocabulary' if name.startswith('voc_') else 'Inspire A1'
    chapter=int(name[4:6]) if name.startswith(('pho_','voc_')) else None
    with zipfile.ZipFile(path) as z:
        for e in archive['entries']:
            if not e.get('decode_ok'):continue
            sha=e['sha256'];raw=z.read(e['entry']);assert hashlib.sha256(raw).hexdigest()==sha
            destination=target/(sha+'.mp3')
            if not destination.exists():destination.write_bytes(raw)
            aligned=[r for r in references if r['sha256']==sha]
            if sha not in unique:unique[sha]={'id':sha,'title':aligned[0]['title'] if aligned else Path(e['entry']).stem,'category':category,'chapter':chapter,'duration':e['duration_s'],'sample_rate':e['sample_rate_hz'],'decoded':True,'original_lesson_match':False,'reference_lessons':[r['lesson_id'] for r in aligned],'transcript':aligned[0].get('transcript',[]) if aligned else [],'locations':[]}
            unique[sha]['locations'].append({'archive':name,'entry':e['entry'],'chapter':chapter})
assert len(unique)==352
(target/'index.json').write_text(json.dumps(list(unique.values()),ensure_ascii=False,indent=2),encoding='utf-8')
public={'unique_tracks':len(unique),'categories':{category:sum(v['category']==category for v in unique.values()) for category in {v['category'] for v in unique.values()}},'mapped_vocabulary_references':sum(bool(v['reference_lessons']) for v in unique.values()),'original_full_lesson_matches':0,'tracks':[ {k:v for k,v in t.items() if k!='transcript'} for t in unique.values()]}
(ROOT/'reports/audio-classification.json').write_text(json.dumps(public,ensure_ascii=False,indent=2),encoding='utf-8')
print({k:v for k,v in public.items() if k!='tracks'})
