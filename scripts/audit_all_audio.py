"""Reconcile the complete private 31-archive inventory with V1.4 inspection."""
import argparse,importlib.util,json,hashlib
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
spec=importlib.util.spec_from_file_location('inspector',ROOT/'docs/editorial/a1-qa-v14/inspect_audio_zip.py');mod=importlib.util.module_from_spec(spec);spec.loader.exec_module(mod)
ap=argparse.ArgumentParser();ap.add_argument('--private-work',type=Path,required=True);a=ap.parse_args()
files=sorted((a.private_work/'oer').glob('*.zip'))+sorted((a.private_work/'inspire').glob('Inspire-A1-official-audio-part-*.zip'))
assert len(files)==31,'Expected exactly 31 source archives'
reports=[];hashes={}
for p in files:
    result=mod.scan_archive(p);reports.append(result)
    for e in result['entries']:
        if e['kind']=='audio_candidate':hashes.setdefault(e['sha256'],[]).append(p.name+'/'+e['entry'])
    print(p.name,result['audio_candidate_count'],result['decode_count'],result['sidecar_count'],flush=True)
summary={'archives':len(reports),'valid_tracks':sum(r['decode_count'] for r in reports),'candidates':sum(r['audio_candidate_count'] for r in reports),'sidecars_excluded':sum(r['sidecar_count'] for r in reports),'unique_track_hashes':len(hashes),'duplicates':{h:v for h,v in hashes.items() if len(v)>1},'decode_failures':sum(r['audio_candidate_count']-r['decode_count'] for r in reports),'exact_lesson_matches':0}
(ROOT/'reports/audio-all-archives.json').write_text(json.dumps({'summary':summary,'archives':reports},indent=2),encoding='utf-8')
print(json.dumps(summary));assert summary['decode_failures']==0
