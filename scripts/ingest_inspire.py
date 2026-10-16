"""Archive publisher-provided companion downloads for private personal study only.
No commercial textbook, videos, authentication, or public redistribution.
"""
import argparse,json,re,sys,time
from pathlib import Path
from urllib.parse import urljoin,urlparse
from bs4 import BeautifulSoup
from ingest_resources import ALLOW,fetch,download,digest,save

def main():
    ap=argparse.ArgumentParser(); ap.add_argument('--output',required=True,type=Path); args=ap.parse_args()
    out=args.output.resolve()
    if out.is_relative_to(Path(__file__).resolve().parents[1]): raise SystemExit('Use private external output')
    out.mkdir(parents=True,exist_ok=True)
    ALLOW.add('inspire.hachettefle.fr')
    base='https://inspire.hachettefle.fr/'
    page=urljoin(base,'inspire-1_livre-de-l-eleve_fr.html')
    with fetch(page) as r: html=r.read().decode('utf-8')
    soup=BeautifulSoup(html,'html.parser'); indices={}
    for key in ['audio','pdf']:
        element=soup.find('ressource-card-list',attrs={'list':re.compile('_'+key+r'\.json$')})
        if not element: raise ValueError('Publisher index missing')
        with fetch(urljoin(base,element['list'])) as r: indices[key]=json.load(r)
    ziplink=next(a['href'] for a in soup.select('a[href]') if a['href'].endswith('_audio.zip'))
    sources=[(urljoin(base,ziplink),'Audio',None)]+[(urljoin(base,x['media']),'Documents',x['abstract']) for x in indices['pdf']]
    manifest={'source':page,'copyright':'Hachette Livre; all rights reserved','rights_url':urljoin(base,'credits_fr.html'),
      'usage':'Publisher offers companion downloads; personal private study only. No public redistribution permission.',
      'audio_index':indices['audio'],'items':[],'errors':[]}
    for url,group,title in sources:
        # URL-encode spaces in the observed publisher link.
        url=url.replace(' ','%20'); path=out/Path(urlparse(url).path).name.replace('%20',' ')
        try:
            info=download(url,path)
            item={'asset_id':'inspire-a1-'+path.stem.lower(),'filename':path.name,'source_url':url,'group':group,'title':title,
              'bytes':path.stat().st_size,'sha256':digest(path),'license':'All-Rights-Reserved',
              'license_status':'publisher_offered_private_download_only','status':'downloaded_local',**info}
            manifest['items'].append(item); print(path.name,item['bytes'],len(item.get('tracks',[])),flush=True)
        except Exception as e: manifest['errors'].append({'source_url':url,'error':str(e)}); print('FAILED',str(e),flush=True)
        save(out/'asset-manifest.local.json',manifest); time.sleep(.4)
    return bool(manifest['errors'])

if __name__=='__main__':
    sys.stdout.reconfigure(encoding='utf-8'); raise SystemExit(main())
