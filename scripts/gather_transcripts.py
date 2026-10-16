import argparse,json,time,sys,re
from ingest_resources import fetch
from pathlib import Path
from bs4 import BeautifulSoup
sys.stdout.reconfigure(encoding='utf-8')
ap=argparse.ArgumentParser();ap.add_argument('--private-work',required=True,type=Path);args=ap.parse_args()
out=args.private_work/'oer/transcripts';out.mkdir(parents=True,exist_ok=True)
tracks=[]
for ch in range(14):
    url=f'https://laits.utexas.edu/fi/voc/{ch:02d}/'
    cache=out/f'voc-{ch:02d}.html'
    if cache.exists():raw=cache.read_bytes()
    else:
        with fetch(url) as r: raw=r.read()
    (out/f'voc-{ch:02d}.html').write_bytes(raw)
    soup=BeautifulSoup(raw.decode('utf-8'),'html.parser')
    for source in soup.select('source[src]'):
        src=source['src']
        if not src.endswith('.mp3'):continue
        # Each audio and its bilingual vocabulary table are in the same content block.
        parent=source.parent
        while parent and not parent.find('table'):parent=parent.parent
        if not parent:continue
        table=parent.find('table'); rows=[]
        for row in table.select('tr'):
            cells=[x.get_text(' ',strip=True) for x in row.find_all(['td','th'])]
            if cells: rows.append(cells)
        tracks.append({'official_chapter':ch,'source_url':src,'transcript_page':url,'track':Path(src).stem,'rows':rows})
    time.sleep(.2)
(out/'vocabulary.json').write_text(json.dumps(tracks,ensure_ascii=False,indent=2),encoding='utf-8')
print('Transcript blocks',len(tracks))
