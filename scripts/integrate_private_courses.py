"""Import existing private manuscripts without publishing or discarding versions."""
import argparse,json,re,hashlib,difflib,csv
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
IDS=r'(?:fr-(?:a1|a2|b1|b2|c1|c2)|en-ielts-(?:listening|reading|writing-task1|writing-task2|speaking|language-upgrade))-u\d{2}'
STAGES='①②③④⑤⑥'

def split_units(text,title):
    text=text.lstrip('\ufeff')
    matches=list(re.finditer(r'(?mi)^('+IDS+r')(?=\s|[｜|·—:])',text))
    if matches:
        pre=text[:matches[0].start()]
        return [(m[1].lower(),pre+text[m.start():matches[i+1].start() if i+1<len(matches) else len(text)]) for i,m in enumerate(matches)]
    if 'U04' in title and 'U12' in title and 'A1' in title:
        matches=list(re.finditer(r'(?m)^UNITÉ (\d{2})[^\n]*',text));pre=text[:matches[0].start()]
        return [('fr-a1-u'+m[1],pre+text[m.start():matches[i+1].start() if i+1<len(matches) else len(text)]) for i,m in enumerate(matches)]
    m=re.search(IDS,title,re.I)
    if m:return [(m[0].lower(),text)]
    m=re.search(r'FR\s*-?\s*(A[12]|B[12]|C[12]).*?(?:Unit |U)(\d{2})',title,re.I)
    return [('fr-'+m[1].lower()+'-u'+m[2],text)] if m else []

def questions(text):
    """Conservative extraction: only explicit question-answer pairs, never invent keys."""
    out=[]
    lines=[line for line in text.splitlines() if line.strip()]
    label=r'^\s*(?:Worked answer(?: \+ why)?|Answer(?: \+ evidence| & reason| and explanation| and rationale)?|Corrigé|Réponse(?: commentée| / 参考(?:答案)?)?|答案)\s*[:：]\s*(.+)$'
    for i,line in enumerate(lines):
        m=re.match(r'^\s*(\d{1,2})[.、)]\s*(.+?)\s+(?:—|→)\s+(.+)$',line)
        next_is_answer=i+1<len(lines) and re.match(label,lines[i+1],re.I)
        if m and not next_is_answer and ('?' in m[2] or any(k in m[2].lower() for k in ['complét','conjug','correct','explain','choose','reformul','transform','改','填','否定'])):
            out.append({'id':f'q{len(out)+1}','prompt':m[2],'answer':m[3],'mode':'self_review','explanation':m[3]})
    # Separate numbered questions and A1/A2... answer keys used by editorial workbooks.
    for i,line in enumerate(lines):
        m=re.match(r'^\s*(\d{1,2})\.\s*(.+)$',line)
        if m and i+1<len(lines):
            answer=re.match(label,lines[i+1],re.I)
            if answer and not any(x['prompt']==m[2] for x in out):
                out.append({'id':f'q{len(out)+1}','prompt':m[2],'answer':answer[1],'mode':'self_review','explanation':answer[1]})
        inline=re.match(r'^\s*\d{1,2}\.\s*(.*?)\s*(?:答案|Réponse|Answer)\s*[:：]\s*(.+)$',line,re.I)
        if inline and not any(x['prompt']==inline[1] for x in out):
            out.append({'id':f'q{len(out)+1}','prompt':inline[1],'answer':inline[2],'mode':'self_review','explanation':inline[2]})
        short=re.match(r'^\s*\d{1,2}\.\s*(.+?[.?？])\s+([a-zÀ-ÿ\x27-]+)[。.]$',line)
        if short and ('___' in short[1] or '?' in short[1]) and not any(x['prompt']==short[1] for x in out):
            out.append({'id':f'q{len(out)+1}','prompt':short[1],'answer':short[2],'mode':'self_review','explanation':short[2]})
        if not m or not ('?' in m[2] or any(w in m[2].lower() for w in ['correct','reformule','complétez','rewrite','explain','distinguez','proposez','improve'])):continue
        if any(x['prompt']==m[2] for x in out):continue
        ans=re.search(r'(?m)^\s*(?:A|R|Réponse\s*)'+m[1]+r'[.：:)\s—-]+(.+)$',text)
        if ans:out.append({'id':f'q{len(out)+1}','prompt':m[2],'answer':ans[1],'mode':'self_review','explanation':ans[1]})
    # Content-derived keys remain stable when a newly supported source format adds questions.
    for item in out:
        item['id']='q-'+hashlib.sha256(item['prompt'].encode()).hexdigest()[:12]
        if '解析：' in item['answer']:
            item['answer'],item['explanation']=[part.strip() for part in item['answer'].split('解析：',1)]
            if item['prompt'].startswith('Complétez') and re.fullmatch(r"[A-Za-zÀ-ÿ']+",item['answer']):item['mode']='exact_token'
    return out

def main():
    ap=argparse.ArgumentParser();ap.add_argument('--private-work',type=Path,required=True);a=ap.parse_args();work=a.private_work.resolve()
    if work.is_relative_to(ROOT):raise ValueError('Private data must stay outside repository')
    out=work/'personal-data';out.mkdir(exist_ok=True)
    docs=json.loads((work/'latest/editorial-all.json').read_text(encoding='utf-8'))
    baseline=json.loads((work/'drive-baseline.json').read_text(encoding='utf-8'))
    units=json.loads((ROOT/'config/curriculum/units.v2.json').read_text(encoding='utf-8'))['units']
    versions={u['id']:[] for u in units};sources=[]
    for d in docs:
        if d['title'].startswith('PRIVATE') or 'V1.3' in d['title']:continue
        sources.append(d)
        for id,text in split_units(d['text'],d['title']):
            if id not in versions:raise ValueError('Unexpected unit '+id)
            versions[id].append({'source_id':d['id'],'title':d['title'],'text':text,'sha256':hashlib.sha256(text.encode()).hexdigest()})
    # Archive every old source verbatim, including editions that predate canonical unit IDs.
    sources.extend({'id':d['id'],'title':d['title'],'text':d['content']} for d in baseline)
    for d in baseline:
        if not re.match(r'FR.?\s*A1 Unit|FR - A1 Unit',d['title']):continue
        for id,text in split_units(d['content'],d['title']):
            versions[id].append({'source_id':d['id'],'title':d['title'],'text':text,'sha256':hashlib.sha256(text.encode()).hexdigest()})
    for p in (ROOT/'public/learning-assets').glob('*.txt'):
        id=p.stem.removesuffix('-v1')
        if id not in versions:continue
        text=p.read_text(encoding='utf-8-sig');versions[id].append({'source_id':'preserved-public-'+p.stem,'title':'Preserved earlier public draft '+p.stem,'text':text,'sha256':hashlib.sha256(text.encode()).hexdigest()})
    additions=json.loads((ROOT/'content/editorial/a1-v4-additions.json').read_text(encoding='utf-8'))
    courses=[];audit=[];differences=[]
    for u in units:
        vs=versions[u['id']]
        # Corrected A1 first; otherwise retain fullest detailed edition over shorter alternate.
        vs.sort(key=lambda v:('V1.4' in v['title'],not v['source_id'].startswith('preserved-public'),len(v['text'])),reverse=True)
        if not vs:raise ValueError('Missing source '+u['id'])
        current=vs[0];text=current['text'];sections=[]
        marks=list(re.finditer(r'(?m)^\s*([①②③④⑤⑥])[^\n]*',text))
        for i,m in enumerate(marks):
            title=m[0].strip();body=text[m.end():marks[i+1].start() if i+1<len(marks) else len(text)].strip()
            # Some Drive editions put the entire vocabulary list on the heading line.
            # Move inline content into the body instead of silently creating an empty stage.
            inline=re.match(r'^(③[^：:]{1,65})[：:]\s*(.+)$',title)
            if inline:title=inline[1];body=inline[2]+('\n'+body if body else '')
            sections.append({'stage':STAGES.index(m[1]),'title':title,'body':body})
        if {s['stage'] for s in sections}!=set(range(6)):raise ValueError('Six stages missing '+u['id'])
        preamble=text[:marks[0].start()]
        for v in vs[1:]:
            diff=list(difflib.unified_diff(v['text'].replace('\r','').splitlines(),current['text'].replace('\r','').splitlines(),fromfile=v['title'],tofile=current['title']))
            differences.append({'lesson_id':u['id'],'from_sha256':v['sha256'],'to_sha256':current['sha256'],'added_lines':sum(l.startswith('+') and not l.startswith('+++') for l in diff),'removed_lines':sum(l.startswith('-') and not l.startswith('---') for l in diff),'original_retained':True})
        if u['id'] in additions:
            extra=additions[u['id']]
            for stage,key in [(1,'grammar'),(4,'phonetics')]:
                section=next(s for s in sections if s['stage']==stage)
                section['body']+='\n\n【V4 校订与入门补充】\n'+extra[key]
            section=next(s for s in sections if s['stage']==5)
            section['body']+='\n\n【V4 完整表达示范；可按实际情况替换】\n'+extra['model']+'\n\n【V4 巩固练习、答案与解析】\n'
            for i,(prompt,answer,reason) in enumerate(extra['practice'],1):section['body']+=f'{i}. {prompt}\nRéponse: {answer} 解析：{reason}\n'
            text=preamble+'\n\n'.join(s['title']+'\n'+s['body'] for s in sections)
        courses.append({**u,'text':text,'preamble':preamble,'sections':sections,'exercises':questions(text),'versions':vs,'audio':[]})
        audit.append({'lesson_id':u['id'],'source_versions':len(vs),'characters':len(text),'six_stages':True,'exercises_parsed':len(questions(text)),
          'text_complete':False,'audio_verified':False,'QA_approved':False,'publishable':False,'sha256':hashlib.sha256(text.encode()).hexdigest(),
          'grammar_review':'targeted_A1_corrections' if u['id'] in additions else 'pending',
          'exercise_answer_review':'explicit_pairs_extracted_not_all_editorially_approved',
          'audio_status':'24_primary_A1_slots_generated_pending_audition' if u['id'] in additions else 'matching_pending',
          'selected_source_sha256':current['sha256'],
          'quality_status':'merged_source_requires_full_editorial_review'})
    (out/'courses.json').write_text(json.dumps(courses,ensure_ascii=False,indent=2),encoding='utf-8')
    (out/'source-versions.json').write_text(json.dumps(sources,ensure_ascii=False,indent=2),encoding='utf-8')
    (ROOT/'reports/source-version-differences.json').write_text(json.dumps(differences,indent=2),encoding='utf-8')
    (ROOT/'reports/integration-acceptance.json').write_text(json.dumps({'units':audit,'summary':{'units':108,'six_stage_sources':108,'text_complete':0,'audio_verified':0,'QA_approved':0,'publishable':0}},indent=2),encoding='utf-8')
    status_path=ROOT/'config/course-completeness.json'
    status=json.loads(status_path.read_text(encoding='utf-8'))
    for row in status['units']:
        evidence=next(x for x in audit if x['lesson_id']==row['lesson_id'])
        row.update(six_authored_sections=True,content_status='six_section_draft',next_action='Review preserved versions, verify every exercise and complete full-script audio audition',integration_evidence='reports/integration-acceptance.json',source_text_sha256=evidence['sha256'])
    status['summary']['units_with_six_authored_sections']=108
    status['as_of']='2026-10-17 Pacific/Auckland'
    status_path.write_text(json.dumps(status,ensure_ascii=False,indent=2),encoding='utf-8')
    with (ROOT/'reports/integration-acceptance.csv').open('w',newline='',encoding='utf-8') as f:
        w=csv.DictWriter(f,fieldnames=list(audit[0]));w.writeheader();w.writerows(audit)
    print('Integrated',len(courses),'units;',sum(len(c['versions']) for c in courses),'versions;',sum(len(c['exercises']) for c in courses),'explicit exercise pairs')
if __name__=='__main__':main()
