"""Make hash-manifested, unabridged copies of newly authored review manuscripts."""
import hashlib,json,re
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
def main():
    folder=ROOT/'public/learning-assets'; p=folder/'manifest.json'; manifest=json.loads(p.read_text(encoding='utf-8'))
    assets=[]
    en=(ROOT/'docs/curriculum/revisions/en-ielts-reading-u02-v1.md').read_text(encoding='utf-8')
    assets.append(('en-ielts-reading-u02-v1',en,'en'))
    fr=(ROOT/'docs/curriculum/revisions/fr-a1-audio-workbook-v1.md').read_text(encoding='utf-8')
    intro=fr.split('## fr-a1-u01')[0];ending=fr.split('## 版本与验收记录')[1]
    for m in re.finditer(r'(?ms)^## (fr-a1-u\d{2}) .*?(?=^## |\Z)',fr):
        assets.append((m[1]+'-audio-supplement-v1',intro+m[0]+'\n## 版本与验收记录'+ending,'fr'))
    for id,text,language in assets:
        file=folder/(id+'.txt');file.write_bytes(text.encode('utf-8'))
        record={'id':id,'path':file.relative_to(ROOT).as_posix(),'title':text.splitlines()[0].lstrip('# '),
          'language':language,'author':'Language Learning Hub, original non-personal teaching draft',
          'source_url':'https://github.com/ACIDCH/language-learning-hub',
          'license':'Project-Owned-Public-Display','license_url':'https://github.com/ACIDCH/language-learning-hub/blob/main/docs/public-asset-policy.md',
          'attribution':'Original project teaching content. Review draft; no claim of official IELTS/FLE endorsement.',
          'verified_at':'2026-10-16','reviewed_by':'Codex provenance and integrity check; owner PR review and professional pedagogical review pending',
          'modified':False,'bytes':file.stat().st_size,'sha256':hashlib.sha256(file.read_bytes()).hexdigest()}
        manifest['assets']=[x for x in manifest['assets'] if x['id']!=id]+[record]
    p.write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    print('Added/updated',len(assets),'review assets; old six originals retained')
if __name__=='__main__':main()
