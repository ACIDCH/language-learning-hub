"""Inspect actual private course artifacts; structural checks do not grant editorial approval."""
import argparse
import hashlib
import json
from pathlib import Path

def verify(data: Path):
    courses=json.loads((data/'courses.json').read_text(encoding='utf-8'))
    assert len(courses)==108 and len({c['id'] for c in courses})==108
    rows=[]
    for c in courses:
        row={'lesson_id':c['id'],'characters':len(c['text']),
             'six_nonempty_stages':len(c['sections'])==6 and {s['stage'] for s in c['sections']}==set(range(6)) and all(len(s['body'])>80 for s in c['sections']),
             'explicit_question_answer_pairs':len(c['exercises']),
             'unique_question_ids':len({q['id'] for q in c['exercises']})==len(c['exercises']),
             'stage_characters':[len(s['body']) for s in c['sections']],
             'audio_slots':len(c['audio']),'source_versions_retained':len(c['versions']),
             'full_editorial_approval':False}
        assert row['six_nonempty_stages'] and row['unique_question_ids'] and row['explicit_question_answer_pairs'],row
        for v in c['versions']:assert hashlib.sha256(v['text'].encode()).hexdigest()==v['sha256']
        for a in c['audio']:
            assert hashlib.sha256((data/'audio'/a['filename']).read_bytes()).hexdigest()==a['sha256']
            assert hashlib.sha256(a['transcript'].encode()).hexdigest()==a['transcript_sha256']
            stage=0 if a['segment']=='dialogue' else 3
            assert all(cue['text'] in c['sections'][stage]['body'] for cue in a['cues'])
        rows.append(row)
    assert len({c['text'] for c in courses})==108
    return {'summary':{'units':108,'six_nonempty_stages':108,'units_with_explicit_answers':108,
           'question_answer_pairs':sum(x['explicit_question_answer_pairs'] for x in rows),
           'all_texts_unique':True,'source_versions_sha256_verified':sum(len(c['versions']) for c in courses),
           'tts_files_and_transcripts_sha256_verified':sum(len(c['audio']) for c in courses),
           'full_editorial_approval':0},'units':rows}

if __name__=='__main__':
    parser=argparse.ArgumentParser();parser.add_argument('--data',type=Path,required=True);args=parser.parse_args()
    report=verify(args.data)
    (Path(__file__).resolve().parents[1]/'reports/structural-regression.json').write_text(json.dumps(report,indent=2),encoding='utf-8')
    print(json.dumps(report['summary']))
