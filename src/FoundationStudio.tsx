import {useEffect,useMemo,useState} from 'react';
import type {Session,SupabaseClient} from '@supabase/supabase-js';
import {FOUNDATION_UNITS,FOUNDATION_PHASES,foundationUnitsFor} from './foundationCurriculum';
import type {FoundationLanguage,FoundationRecord} from './foundationTypes';
import FoundationRecall from './FoundationRecall';
import {makeVocabularyChecks} from './foundationQuiz';
import FoundationDictation from './FoundationDictation';
import FoundationAlphabet from './FoundationAlphabet';
import FoundationNumberDrill from './FoundationNumberDrill';
import {buildFoundationReviewPlan} from './foundationReview';

type Draft={answers:Record<string,number>;notes:string;completed:boolean};
const EMPTY:Draft={answers:{},notes:'',completed:false};
export default function FoundationStudio({client,session,onOpenCourses}:{
 client:SupabaseClient;session:Session;onOpenCourses:()=>void;
}){
 const [language,setLanguage]=useState<FoundationLanguage>('en');
 const [selected,setSelected]=useState('en-fnd-01');
 const [segment,setSegment]=useState(0);
 const [records,setRecords]=useState<Record<string,FoundationRecord>>({});
 const [draft,setDraft]=useState<Draft>(EMPTY);
 const [dirty,setDirty]=useState(false);
 const [busy,setBusy]=useState(false);
 const [loaded,setLoaded]=useState(false);
 const [status,setStatus]=useState('正在读取基础课程的私人进度…');
 const units=useMemo(()=>foundationUnitsFor(language),[language]);
 const unit=FOUNDATION_UNITS.find(u=>u.id===selected)||units[0];
 const finished=units.filter(u=>records[u.id]?.completed).length;
 const reviewPlan=useMemo(()=>buildFoundationReviewPlan(FOUNDATION_UNITS,records),[records]);
 const dueReviews=reviewPlan.filter(row=>row.status==='due');
 useEffect(()=>{
  let alive=true;
  setLoaded(false);
  void client.from('foundation_progress')
   .select('lesson_id,answers,notes,completed,updated_at')
   .eq('user_id',session.user.id).limit(50)
   .then(({data,error})=>{
    if(!alive)return;
    if(error){setStatus('基础学习记录读取失败：'+error.message);setLoaded(false);return;}
    const next:Record<string,FoundationRecord>={};
    for(const item of data||[]){
      if(FOUNDATION_UNITS.some(u=>u.id===item.lesson_id)){
        next[item.lesson_id]={lesson_id:item.lesson_id,
          answers:typeof item.answers==='object'&&item.answers&&!Array.isArray(item.answers)?item.answers:{},
          notes:item.notes||'',completed:!!item.completed,updated_at:item.updated_at};
      }
    }
    setRecords(next);
    const first=next[selected];
    setDraft(first?{answers:first.answers,notes:first.notes,completed:first.completed}:EMPTY);
    setLoaded(true);setStatus('基础课练习已就绪。此处学习进度与 108 节主课程分开保存。');
   });
  return ()=>{alive=false;};
 // The first initialization is per signed-in account; switching lessons reads from records.
 // eslint-disable-next-line react-hooks/exhaustive-deps
 },[client,session.user.id]);
 useEffect(()=>()=>window.speechSynthesis?.cancel(),[]);
 function openUnit(id:string){
  if(busy)return;
  if(dirty){setStatus('本课有未同步的答案或笔记，请先保存，再切换其他基础课。');return;}
  const next=FOUNDATION_UNITS.find(u=>u.id===id);
  if(!next)return;
  setLanguage(next.language);setSelected(id);setSegment(0);
  const record=records[id];
  setDraft(record?{answers:record.answers,notes:record.notes,completed:record.completed}:EMPTY);
  setStatus('已切换到 '+next.title+'；现有笔记及答题记录保持独立。');
 }
 function changeLanguage(next:FoundationLanguage){
  const first=foundationUnitsFor(next)[0];
  if(first)openUnit(first.id);
 }
 function answer(index:number,choice:number){
  setDraft(d=>({...d,completed:false,answers:{...d.answers,[String(index)]:choice}}));
  setDirty(true);
 }
 function appendListeningNote(note:string):boolean{
  const appended=[draft.notes.trim(),note].filter(Boolean).join('\n\n');
  if(appended.length>5000){
   setStatus('听写文本超出了笔记 5000 字符上限，请先删减当前笔记后重新加入。');
   return false;
  }
  setDraft(current=>({...current,notes:appended}));
  setDirty(true);
  setStatus('听写记录已加入当前课程笔记，点击保存后才会同步至 Supabase。');
  return true;
 }
 function pronounce(sentence:string){
  if(!('speechSynthesis' in window)){setStatus('该设备未提供系统语音朗读。');return;}
  const utterance=new SpeechSynthesisUtterance(sentence);
  utterance.lang=unit.language==='fr'?'fr-FR':'en-US';
  utterance.rate=0.82;
  window.speechSynthesis.cancel();
  utterance.onerror=()=>setStatus('设备朗读失败，请检查系统语言包。');
  try{window.speechSynthesis.speak(utterance);
    setStatus('正在使用设备合成语音，不是经过人工审核的标准录音。');}
  catch{setStatus('浏览器无法启动系统语音朗读。');}
 }
 const vocabChecks=makeVocabularyChecks(unit.vocab);
 const allQuestions=[...unit.questions,...vocabChecks];
 const correct=allQuestions.filter((q,i)=>draft.answers[String(i)]===q.answer).length;
 const answered=allQuestions.filter((_,i)=>Number.isInteger(draft.answers[String(i)])).length;
 async function save(complete=false){
  if(!loaded||busy)return;
  if(complete&&answered!==allQuestions.length){setStatus('先尝试完成本课全部 '+allQuestions.length+' 道自检题再标记学完；答错可以继续复习，不会强制评分。');return;}
  setBusy(true);
  const current=unit.id;
  const next={...draft,completed:complete?true:draft.completed};
  const updated_at=new Date().toISOString();
  const {error}=await client.from('foundation_progress').upsert({
    user_id:session.user.id,lesson_id:current,
    answers:next.answers,notes:next.notes,completed:next.completed,updated_at
  },{onConflict:'user_id,lesson_id'});
  if(error){setStatus('保存失败，笔记仍保留在当前页面：'+error.message);}
  else{
    setRecords(prev=>({...prev,[current]:{lesson_id:current,...next,updated_at}}));
    setDraft(next);setDirty(false);
    setStatus(complete?'已保存本课完成标记。此记录不表示通过 CEFR 官方语言能力认证。':'已保存本课答案和笔记到 Supabase。');
  }
  setBusy(false);
 }
 return <section className="cloud-reader foundation-studio" aria-label="基础语言课程与练习">
  <h3>基础衔接课程 · 英语与法语</h3>
  <p className="cloud-disclaimer">
    <strong>共 48 节原创基础及 A2 衔接短课程：</strong>英语 24 节、法语 24 节（各新增 12 节 A1→A2 衔接课程）。
    从字母与声音，过渡到词汇、短句、段落及表达。它们是独立的补充教材，
    不会改写原有 108 课，也不能当作专业审校通过的完整 CEFR A2 教材或语言等级认证。
  </p>
  <div className="foundation-filters" role="group" aria-label="语言选择">
    <button type="button" disabled={busy} aria-pressed={language==='en'}
      className={language==='en'?'foundation-current':''} onClick={()=>changeLanguage('en')}>英语基础</button>
    <button type="button" disabled={busy} aria-pressed={language==='fr'}
      className={language==='fr'?'foundation-current':''} onClick={()=>changeLanguage('fr')}>法语基础</button>
    <span>已标记学完 {finished} / {units.length}</span>
  </div>
  <details className="foundation-review-agenda">
   <summary>跨课程复习建议 · {loaded?dueReviews.length:'…'} 节待回顾</summary>
   <p className="cloud-disclaimer">根据全部 48 节基础与 A2 衔接课现有云端进度、答题结果及上次保存时间生成。
     答错题优先复习；未完成的题目提醒续学；已学完课程约 3 天后建议回顾。
     这只是复习提示，不是经过校准的遗忘曲线模型。</p>
   {!loaded?<p>正在读取个人复习记录…</p>:
    dueReviews.length===0?<p>当前没有超期或未完成的复习项，可以继续新课。</p>:
    <div className="foundation-review-rows">{dueReviews.map(item=>
     <button key={item.lessonId} type="button" disabled={busy||dirty} onClick={()=>openUnit(item.lessonId)}>
      <strong>{item.language.toUpperCase()} · {item.title}</strong>
      <small>{item.reason}</small>
     </button>)}</div>}
   {dirty&&<p role="status">先保存本课尚未同步的练习或笔记，才能跳转复习。</p>}
  </details>
  <div className="foundation-layout">
   <aside className="foundation-menu" aria-label="基础课目录">
     {units.map(item=><button type="button" key={item.id} disabled={busy||!loaded}
       aria-current={unit.id===item.id?'true':undefined}
       className={unit.id===item.id?'foundation-current':''}
       onClick={()=>openUnit(item.id)}>
       <small>{item.id.toUpperCase()} · {item.level} · {FOUNDATION_PHASES[item.phase]}</small>
       <strong>{item.title}</strong>
       <span>{records[item.id]?.completed?'✓ 已标记学完':'继续学习'}</span>
      </button>)}
   </aside>
   <article className="foundation-lesson">
    <header>
      <small>{unit.language.toUpperCase()} · {unit.level} · 原创教材草稿</small>
      <h4>{unit.title}</h4><p>{unit.goal}</p>
    </header>
    <nav className="foundation-stage-tabs" aria-label="本节课学习环节">
      {['情境','知识','词汇','听读','发音','练习'].map((t,i)=>
        <button type="button" aria-current={segment===i?'step':undefined} key={t}
          onClick={()=>setSegment(i)}>{i+1}. {t}</button>)}
    </nav>
    {segment===0&&<section>
      <h5>本课学习目标</h5><p>{unit.goal}</p>
      <p>学习顺序：先阅读情境与示例，再学习语法／规则，练习核心词汇，
        完成听读与跟读，最后做六道自检题并进行开放表达。</p>
      <p className="cloud-disclaimer">当前教材为项目原创初稿；个别口音、专业语音与语言学审校仍需复核。</p>
    </section>}
    {segment===1&&<section>
      <h5>核心规则与常见错误</h5>
      <ol>{unit.concepts.map((s,i)=><li key={i}>{s}</li>)}</ol>
      <p><strong>常见误区：</strong>{unit.commonMistake}</p>
      <h5>例句</h5>
      {unit.examples.map((s,i)=><div className="foundation-example" key={i}>
        <span>{s}</span><button type="button" onClick={()=>pronounce(s)}>听例句</button>
      </div>)}
      {(unit.id==='en-fnd-01'||unit.id==='fr-fnd-01')&&
        <FoundationAlphabet language={unit.language} onSpeak={pronounce}/>}
      {(unit.id==='en-fnd-05'||unit.id==='fr-fnd-06')&&
        <FoundationNumberDrill language={unit.language} onSpeak={pronounce}
          onAddNote={appendListeningNote}/>}
    </section>}
    {segment===2&&<section>
      <h5>词汇与用法</h5>
      <table className="foundation-words"><thead><tr><th>词汇</th><th>中文释义</th><th>发音示范</th></tr></thead>
      <tbody>{unit.vocab.map(([word,meaning],i)=><tr key={i}>
        <td>{word}</td><td>{meaning}</td><td><button type="button" onClick={()=>pronounce(word)}>播放</button></td>
      </tr>)}</tbody></table>
      <p className="cloud-disclaimer">注意词性、固定搭配以及在本课情境中的准确含义。</p>
      <FoundationRecall key={unit.id} id={unit.id} words={unit.vocab} language={unit.language}/>
    </section>}
    {segment===3&&<section>
      <h5>听力练习</h5><p>先不看文字听一遍，再展示原文核对。</p>
      <button type="button" onClick={()=>pronounce(unit.listening)}>播放本课合成听力</button>
      <details><summary>展开本课听力文本</summary><p>{unit.listening}</p></details>
      <FoundationDictation key={unit.id} text={unit.listening} language={unit.language}
        onPlay={()=>pronounce(unit.listening)} onAddNote={appendListeningNote}/>
      <h5>阅读短文</h5><p>{unit.reading}</p>
      <button type="button" onClick={()=>pronounce(unit.reading)}>朗读全文</button>
      <p className="cloud-disclaimer">声音来自当前设备 TTS，不是带时轴的真人教学录音。</p>
    </section>}
    {segment===4&&<section>
      <h5>发音与跟读</h5><p>{unit.pronunciation}</p>
      <button type="button" onClick={()=>pronounce(unit.listening)}>再听本课短句</button>
      <p>听三遍，先模仿关键音，再连成完整短句；重点记录听不清的位置。
        正式音素级评分由独立的 V3 实验模块负责，本课不计算未经验证的发音成绩。</p>
    </section>}
    {segment===5&&<section>
      <h5>本课核心规则与词汇自检（{allQuestions.length} 道）</h5>
      {allQuestions.map((q,i)=><fieldset className="foundation-question" key={i} disabled={!loaded||busy}>
        <legend>{i+1}. {q.prompt}</legend>
        {q.choices.map((choice,j)=><label key={j}>
          <input type="radio" name={unit.id+'-q'+i} checked={draft.answers[String(i)]===j}
            onChange={()=>answer(i,j)}/>{choice}
        </label>)}
        {Number.isInteger(draft.answers[String(i)])&&<p role="status"
          className={draft.answers[String(i)]===q.answer?'foundation-answer-ok':'foundation-answer-review'}>
          {draft.answers[String(i)]===q.answer?'理解正确。':'建议复习本课规则。'} {q.explanation}
        </p>}
       </fieldset>)}
      <p>已回答 {answered}/{allQuestions.length}；选对 {correct} 道。前两题检查本课概念，后续四题来自本课原始词汇表；自检用于复习，不作为考试等级认证。</p>
      <h5>开放表达</h5><p>{unit.production}</p>
      <label>我的答案与学习笔记<textarea value={draft.notes} maxLength={5000}
        disabled={!loaded||busy} rows={5}
        placeholder="写练习答案、自己造的句子，以及听读时发现的困难"
        onChange={e=>{setDraft(d=>({...d,notes:e.target.value}));setDirty(true);}}/></label>
    </section>}
    <div className="foundation-actions">
      <button type="button" disabled={segment===0} onClick={()=>setSegment(x=>Math.max(0,x-1))}>上一步</button>
      <button type="button" disabled={!loaded||busy} onClick={()=>void save(false)}>
        {busy?'保存中…':'保存本课笔记与练习'}
      </button>
      {segment===5&&<button type="button" disabled={!loaded||busy||answered!==allQuestions.length}
        onClick={()=>void save(true)}>标记学完</button>}
      {segment<5&&<button type="button" onClick={()=>setSegment(x=>Math.min(5,x+1))}>下一步</button>}
    </div>
   </article>
  </div>
  <p className="cloud-disclaimer" role="status">{status}{dirty?' · 本课有尚未保存的更改':''}</p>
  <button type="button" onClick={onOpenCourses} disabled={dirty||busy}>
    前往 108 课主课程 →</button>
 </section>;
}
