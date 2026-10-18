"""Build independent, project-original fallback drafts. Never reads private files."""
import json, hashlib, re
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
def build():
    units=json.loads((ROOT/'config/curriculum/units.v2.json').read_text(encoding='utf8'))['units']
    assets=json.loads((ROOT/'public/learning-assets/manifest.json').read_text(encoding='utf8'))['assets']
    seeds={}
    for path in sorted((ROOT/'content/v44-seeds').glob('*.json')):
        for key,value in json.loads(path.read_text(encoding='utf8')).items():
            if key in seeds: raise ValueError('duplicate seed '+key)
            seeds[key]=value
    target=ROOT/'content/lesson-drafts';target.mkdir(exist_ok=True)
    index=[]
    for unit in units:
        uid=unit['id']; original=[a for a in assets if a['id'] in [uid,uid+'-v1']]
        supplements=[a for a in assets if a['id'].startswith(uid+'-audio-supplement')]
        row={'id':uid,'kind':'main','language':unit['language'],'level':unit['level'],
             'content_status':'existing_original' if original else 'original_draft',
             'qa_status':'pending','reviewed':False,'text_complete':True,
             'audio_status':'missing_audio','public_sources':[a['id'] for a in original],
             'supplements':[a['id'] for a in supplements],
             'private_source':'authenticated /v1/private-courses/'+uid}
        if not original:
            seed=seeds[uid]
            examples=re.split(r'(?<=[.!?])\s+(?=[A-ZÀ-Ý])',seed['reading'])[:4]
            assert len(examples)==4,uid
            terms=[x.split('=',1) for x in seed['vocab'].split(';')]
            assert len(terms)>=6 and all(len(x)==2 for x in terms),uid
            draft={
              'id':uid,'title':unit['title'],'language':unit['language'],'level':unit['level'],
              'version':'v44-original-1','content_status':'original_draft','qa_status':'pending',
              'source':'Language Learning Hub · original V4.4 teaching draft, not an external textbook',
              'audio_status':'missing_audio','goal':unit['can_do'],'prerequisite':unit['prerequisite_unit'],
              'context':seed['context'], 'grammar':seed['grammar'],'common_mistake':seed['error'],
              'vocabulary':terms,'examples':[{'text':s,'note':'原文例句：结合本课知识讲解，辨认表达的功能与适用条件。'} for s in examples],
              'reading':seed['reading'],
              'listening_script':seed.get('listening',seed['reading']),
              'listening_label':'原创文本脚本；可用设备 TTS 练习，未配对真人或教材音频',
              'questions':[{'prompt':q[0],'answer':q[1],'explanation':q[2]} for q in seed['questions']],
              'pronunciation':unit['pronunciation_focus']+'。先按意群朗读，再用选词面板练习；浏览器转写不能证明音素正确。',
              'production':seed.get('production',unit['performance_task']),
              'self_review':'核对任务是否回答完整、信息是否有原文证据、目标结构是否准确。记录一次修改及理由；开放题允许不同的有据答案，不计算官方等级分数。'
            }
            assert len(draft['questions'])>=2 and all(all(q.values()) for q in draft['questions']),uid
            p=target/(uid+'.json');p.write_text(json.dumps(draft,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
            row['draft_path']='content/lesson-drafts/'+p.name
            row['sha256']=hashlib.sha256(p.read_bytes()).hexdigest()
        else:
            row['source_hashes']={a['path']:a['sha256'] for a in original}
        index.append(row)
    (ROOT/'content/v44-main-index.json').write_text(json.dumps(index,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
    print(json.dumps({'main':len(index),'existing_original':sum(bool(x['public_sources']) for x in index),'original_draft':sum(not x['public_sources'] for x in index),'human_reviewed':0}))
if __name__=='__main__':build()
