import {CHINESE_LESSON_NOTES,type ParallelSentence} from './bilingualTeachingNotes';
import {ENGLISH_ORIGINAL_BILINGUAL} from './bilingualOriginalEnglish';
import type {LessonContent} from './v44Courses';
function Parallel({entry}:{entry:ParallelSentence}){
 return <div className="bilingual-line">
  <p lang={/[À-ÿ]/u.test(entry.target)?'fr':undefined} className="bilingual-target">{entry.target}</p>
  <p className="bilingual-chinese">{entry.zh}</p>
  <p className="bilingual-usage">{entry.note}</p>
 </div>;
}
export default function BilingualTeaching({courseId,stage,content,privateSource=false,sourceText}:{
 courseId:string;stage:number;content?:LessonContent|null;privateSource?:boolean;sourceText?:string
}){
 const normalize=(value:string)=>value.toLowerCase().replace(/[’‘]/g,"'").replace(/\s+/g,' ');
 const source=normalize(sourceText||'');
 const special=privateSource&&courseId==='en-ielts-listening-u01'&&
   /study spaces|occupancy|measurement/.test(source);
 const candidate=CHINESE_LESSON_NOTES[special?'en-ielts-listening-u01-study-spaces':courseId]||
  ENGLISH_ORIGINAL_BILINGUAL[courseId];
 // Do not pass a source-specific translation into a wholly different private manuscript.
 const sourceMatched=!privateSource||!source||candidate?.dialogue.some(entry=>
   source.includes(normalize(entry.target).slice(0,25)));
 const info=sourceMatched?candidate:undefined;
 if(!info){
  // Existing Chinese grammar, situational notes and vocabulary remain available
  // through the typed draft; no machine-generated translation is presented as reviewed.
  if(!content?.draft&&!content?.foundation)return null;
  const d=content.draft,u=content.foundation;
  if(stage===0)return <section className="bilingual-teaching" aria-label="中文学习指导">
   <h3>情境与中文目标</h3><p>{d?.context||u?.goal}</p>
   <p>{d?.grammar?.split('。')[0]||u?.concepts[0]}</p></section>;
  if(stage===1)return <section className="bilingual-teaching" aria-label="中文语法讲解">
   <h3>规则理解</h3><p>{d?.grammar||u?.concepts.join('。')}</p>
   <p>{d?.common_mistake||u?.commonMistake}</p></section>;
  if(stage===2)return <section className="bilingual-teaching" aria-label="词汇中文对照">
   <h3>本课词语与中文意思</h3><div className="bilingual-vocab">
   {(d?.vocabulary||u?.vocab||[]).map(([w,zh])=><div key={w}><strong>{w}</strong><span>{zh}</span></div>)}
   </div></section>;
  if(stage===3)return <section className="bilingual-teaching" aria-label="中文阅读指导">
   <h3>阅读理解要点</h3><p>{d?.context||u?.goal}</p>
   {(d?.questions||[]).map((q,i)=><p key={i}><strong>问题 {i+1}：</strong>{q.explanation}</p>)}</section>;
  if(stage===5)return <section className="bilingual-teaching" aria-label="中文表达指导">
   <h3>表达练习要求</h3><p>{d?.production||u?.production}</p>
   <p>{d?.common_mistake||u?.commonMistake}</p></section>;
  return null;
 }
 const title=stage===0?'情境与中文对照':stage===1?'语法精讲与对比例句':
  stage===2?'词汇、释义与搭配':stage===3?'听读材料与中外文对照':'表达训练与参考示范';
 return <section className="bilingual-teaching" aria-label={title}>
  <h3>{title}</h3>
  {stage===0&&<><p className="bilingual-lead">{info.situation}</p>
   <p className="bilingual-goal">{info.goal}</p>
   <div className="bilingual-list">{info.dialogue.map((d,i)=><Parallel entry={d} key={i}/>)}</div></>}
  {stage===1&&<div className="bilingual-topics">{info.grammar.map((section,i)=>
   <section className="bilingual-topic" key={i}><h4>{i+1}. {section.title}</h4>
    <p>{section.explain}</p>{section.examples.map((e,j)=><Parallel key={j} entry={e}/>)}</section>)}</div>}
  {stage===2&&<><div className="bilingual-vocab">{info.vocabulary.map((w,i)=>
   <div className="bilingual-word" key={i}><strong>{w.word}</strong><span>{w.meaning}</span>
    <small>{w.collocation}</small></div>)}</div>
   <p className="bilingual-help">连同冠词、词组或句子一起记忆，不只记孤立中文词义。</p></>}
  {stage===3&&<><h4>{info.reading.title}</h4>
   <div className="bilingual-list">{info.reading.pairs.map((line,i)=><Parallel key={i} entry={line}/>)}</div>
   <p className="bilingual-lead">{info.reading.technique}</p></>}
  {stage===5&&<><p className="bilingual-lead">{info.output.task}</p>
   <h4>分步示范</h4>{info.output.frame.map((line,i)=><Parallel key={i} entry={line}/>)}
   <h4>完成后逐项检查</h4><ul>{info.output.review.map(t=><li key={t}>{t}</li>)}</ul></>}
 </section>;
}
