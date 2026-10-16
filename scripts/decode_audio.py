import argparse,json,subprocess,zipfile,sys
from pathlib import Path
import imageio_ffmpeg
sys.stdout.reconfigure(encoding='utf-8')
ap=argparse.ArgumentParser();ap.add_argument('--private-work',required=True,type=Path);args=ap.parse_args()
ffmpeg=imageio_ffmpeg.get_ffmpeg_exe(); results=[]
for collection in ['oer','inspire']:
    root=args.private_work/collection;m=json.loads((root/'asset-manifest.local.json').read_text(encoding='utf-8'))
    for item in m['items']:
        if item.get('mime')!='application/zip':continue
        with zipfile.ZipFile(root/item['filename']) as z:
            for track in item['tracks']:
                raw=z.read(track['filename'])
                proc=subprocess.run([ffmpeg,'-v','error','-i','pipe:0','-f','null','-'],input=raw,stdout=subprocess.DEVNULL,stderr=subprocess.PIPE)
                results.append({'collection':collection,'archive':item['filename'],'filename':track['filename'],'sha256':track['sha256'],'decode_ok':proc.returncode==0,'diagnostic':proc.stderr.decode('utf-8',errors='replace')})
        print(collection,item['filename'],'decoded',len(item['tracks']),flush=True)
(args.private_work/'audio-decode-results.json').write_text(json.dumps(results,indent=2),encoding='utf-8')
print('Decoded',len(results),'Failures',sum(not x['decode_ok'] for x in results))
raise SystemExit(any(not x['decode_ok'] for x in results))
