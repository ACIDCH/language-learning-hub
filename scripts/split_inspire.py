import argparse,json,zipfile,sys
from pathlib import Path

from ingest_resources import inspect,digest
ap=argparse.ArgumentParser();ap.add_argument('--private-work',required=True,type=Path);args=ap.parse_args()
root=args.private_work/'inspire'; manifest=json.loads((root/'asset-manifest.local.json').read_text(encoding='utf-8'))
original=manifest['items'][0]; parts=[]
with zipfile.ZipFile(root/original['filename']) as src:
    names=[x for x in src.infolist() if x.filename.lower().endswith('.mp3')]; groups=[[]]; size=0
    for member in names:
        if size+member.file_size>60*1024*1024:groups.append([]);size=0
        groups[-1].append(member);size+=member.file_size
    for i,group in enumerate(groups,1):
        target=root/f'Inspire-A1-official-audio-part-{i:02d}.zip'
        if not target.exists():
            with zipfile.ZipFile(target,'w',compression=zipfile.ZIP_DEFLATED,compresslevel=6) as dst:
                for member in group:info=zipfile.ZipInfo(member.filename,date_time=(2026,10,16,0,0,0));info.compress_type=zipfile.ZIP_DEFLATED;dst.writestr(info,src.read(member))
        with zipfile.ZipFile(target) as check:
            if check.namelist()!=[m.filename for m in group] or any(check.read(m.filename)!=src.read(m) for m in group):raise ValueError('Existing split differs from original; inspect manually')
        part={**original,**inspect(target),'asset_id':f'inspire-a1-audio-part-{i:02d}','filename':target.name,'bytes':target.stat().st_size,'sha256':digest(target),
              'modification':'Archive repackaged below connector 100 MiB limit; all MP3 bytes unchanged.',
              'original_archive_sha256':original['sha256']}
        parts.append(part)
manifest['upload_items']=parts+manifest['items'][1:]
original['upload_blocker']='Connector 100 MiB maximum; all member MP3s uploaded in lossless split archives instead.'
(root/'asset-manifest.local.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2),encoding='utf-8')
print([(x['filename'],x['bytes'],len(x['tracks'])) for x in parts])
