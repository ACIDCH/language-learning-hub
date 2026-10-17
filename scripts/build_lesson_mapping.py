"""Build evidence-backed vocabulary supplements; never claim complete lesson audio."""
import argparse,json,hashlib,sys,urllib.request
from pathlib import Path
from ingest_resources import ALLOW,fetch,digest
from mutagen.mp3 import MP3

# Explicit instructional mapping after reading source vocabulary tables and project aims.
ALIGNMENTS=[
 ('fr-a1-u01','005','Formal/informal greetings; source includes older Mademoiselle usage: prefer Madame for an adult woman whose preference is unknown.'),
 ('fr-a1-u02','020','Country and nationality vocabulary; does not by itself teach all city/country prepositions.'),
 ('fr-a1-u03','013','Family nouns; possessive agreement still needs the lesson grammar explanation.'),
 ('fr-a1-u04','007','Classroom objects, articles and il y a are present in the source table.'),
 ('fr-a1-u05','018','Present-tense routine activities; no claim that this is a complete routine dialogue.'),
 ('fr-a1-u06','015','Interrogative words; question syntax and negation are separate lesson objectives.'),
 ('fr-a1-u07','026','Leisure activities; original speaking tasks must add preferences and reasons.'),
 ('fr-a1-u08','043','Ordering food/drink at a cafe; quantity grammar is taught separately.'),
 ('fr-a1-u09','051','Location and direction expressions; distinguish tout droit from a droite.'),
 ('fr-a1-u10','060','Home and housing nouns; adjective agreement remains a separate explanation.'),
 ('fr-a1-u11','028','Movement/activity verbs for future plans; vocabulary supplement only, not a futur proche demonstration.'),
 ('fr-a1-u12','055','Irregular past participles; auxiliary selection and agreement require lesson grammar.')]

def main():
    ap=argparse.ArgumentParser();ap.add_argument('--private-work',required=True,type=Path);a=ap.parse_args()
    root=a.private_work.resolve(); repo=Path(__file__).resolve().parents[1]
    source=json.loads((root/'oer/transcripts/vocabulary.json').read_text(encoding='utf-8'))
    archive=json.loads((root/'oer/asset-manifest.local.json').read_text(encoding='utf-8'))
    lookup={Path(t['filename']).stem:t for i in archive['items'] if i['group']=='Audio-Vocabulary' for t in i['tracks']}
    ALLOW.add('media.la.utexas.edu');result=[]
    dest=root/'reference-audio';dest.mkdir(exist_ok=True)
    for lesson,track,why in ALIGNMENTS:
        transcript=next(x for x in source if x['track']==track)
        p=dest/(track+'.mp3')
        if not p.exists():
            with fetch(transcript['source_url']) as response:p.write_bytes(response.read(10*1024*1024))
        sha=digest(p);expected=lookup[track]['sha256']
        if sha!=expected:raise ValueError('Official streamed audio differs from archived version: '+track)
        audio=MP3(p)
        result.append({'lesson_id':lesson,'asset_id':'fi-voc-'+track,'role':'vocabulary_supplement',
          'title':transcript['rows'][0][0],'source_url':transcript['source_url'],'transcript_url':transcript['transcript_page']+'#'+track,
          'official_chapter':transcript['official_chapter'],'archive_asset_id':lookup[track]['archive_asset_id'],
          'duration_seconds':round(audio.info.length,3),'bytes':p.stat().st_size,'sha256':sha,
          'license':'CC-BY-3.0','rights_url':'https://laits.utexas.edu/fi/page/adopt/',
          'attribution':'COERLL / University of Texas at Austin. Original audio unchanged. Vocabulary table reproduced from the legacy FI website.',
          'alignment_reason':why,'transcript_type':'publisher_vocabulary_table_not_time_aligned',
          'transcript':transcript['rows'],'transcript_columns':['法语例句','法语例句'] if track=='055' else ['法语','原站英文释义'],
          'verification':'official_stream_matches_verified_archive',
          'linguistic_review':'pending','manual_listening':'pending'})
        print(lesson,track,round(audio.info.length,1),flush=True)
    path=repo/'config/assets/lesson-audio.json';path.parent.mkdir(parents=True,exist_ok=True)
    path.write_text(json.dumps({'schema_version':1,'mappings':result},ensure_ascii=False,indent=2)+'\n',encoding='utf-8')

if __name__=='__main__':sys.stdout.reconfigure(encoding='utf-8');main()
