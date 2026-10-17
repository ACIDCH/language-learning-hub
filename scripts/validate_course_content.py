"""Reject unsupported completion claims and broken public reference mappings."""
import json,re
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]

def validate_status(data):
    errors=[]; units=data['units']; ids=[x['lesson_id'] for x in units]
    if len(set(ids))!=len(ids): errors.append('Duplicate lesson IDs')
    if data['summary']['unit_total']!=len(units): errors.append('Total mismatch')
    for flag in ['text_complete','audio_verified','QA_approved','publishable']:
        if data['summary'][flag]!=sum(x[flag] for x in units):errors.append('Summary mismatch: '+flag)
    for x in units:
        label=x['lesson_id']
        if x['text_complete'] and not (x['six_authored_sections'] and x.get('text_review_evidence')):
            errors.append(label+': text completion requires reviewed six-section evidence')
        if x['audio_verified'] and not x.get('full_lesson_audio_evidence'):
            errors.append(label+': reference vocabulary audio cannot establish lesson audio completion')
        if x['QA_approved'] and not x.get('linguistic_review_evidence'):
            errors.append(label+': missing linguistic reviewer evidence')
        if x['publishable'] and not all(x[k] for k in ['text_complete','audio_verified','QA_approved']):
            errors.append(label+': publication gates unmet')
    return errors

def main():
    data=json.loads((ROOT/'config/course-completeness.json').read_text(encoding='utf-8'))
    errors=validate_status(data)
    curriculum=json.loads((ROOT/'config/curriculum/units.v2.json').read_text(encoding='utf-8'))['units']
    if {x['id'] for x in curriculum}!={x['lesson_id'] for x in data['units']}:errors.append('Curriculum coverage mismatch')
    inventory=json.loads((ROOT/'config/assets/asset-manifest.json').read_text(encoding='utf-8'))['items']
    for x in inventory:
        if not re.fullmatch('[0-9a-f]{64}',x['sha256']) or x['bytes']<=0:errors.append('Invalid integrity fields '+x['filename'])
        if 'drive_file_id' in x or 'drive_url' in x:errors.append('Private locator in public manifest')
    tracks={t['sha256'] for x in inventory for t in x.get('tracks',[])}
    maps=json.loads((ROOT/'config/assets/lesson-audio.json').read_text(encoding='utf-8'))['mappings']
    for m in maps:
        if m['sha256'] not in tracks:errors.append('Reference absent from verified archive: '+m['lesson_id'])
    for x in json.loads((ROOT/'reports/public-snapshot-comparison.json').read_text(encoding='utf-8')):
        if not x['matches_original_git_sha256']:errors.append('Original snapshot changed: '+x['file'])
    if errors:raise SystemExit('\n'.join(errors))
    print(f'Content gates: {len(data["units"])} lessons; {len(inventory)} source files; {len(maps)} reference tracks verified')

if __name__=='__main__':main()
