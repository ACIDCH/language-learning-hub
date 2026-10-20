import {useMemo, useState, useEffect} from 'react';
import {splitLessonStages,STAGE_NAMES} from './lessonStages';
import IpaText,{speakIpaText} from './IpaText';
import IpaReference from './IpaReference';
import LessonBody from './LessonBody';

type Props={
  text:string;
  defaultIpa?:boolean;
  ttsRate?:number;
  language?:string;
  courseId:string;
  stage:number;
  onChangeStage:(next:number)=>void;
};
export default function LessonReader({text,language='fr',courseId,stage,onChangeStage,defaultIpa=false,ttsRate=.85}:Props){
  const lesson=useMemo(()=>splitLessonStages(text),[text]);
  const [showAll,setShowAll]=useState(false);
  const [showIpa,setShowIpa]=useState(defaultIpa);
  useEffect(()=>{setShowAll(false);setShowIpa(defaultIpa);},[courseId,defaultIpa]);
  const safeStage=Math.max(0,Math.min(5,Number.isInteger(stage)?stage:0));
  return <div className="lesson-reader">
    <section className="ipa-reader-controls" aria-label="课程原文音标控制">
      <label><input type="checkbox" checked={showIpa}
        onChange={e=>setShowIpa(e.target.checked)}/>
        显示 IPA
      </label>
      <div className="ipa-reference-dock"><IpaReference language={language}/></div>
    </section>
    {lesson.structured && <>

      <nav className="lesson-stages" aria-label="课程六阶段">
        {lesson.stages.map(s=><button type="button" key={s.index}
          className={s.index===safeStage?'stage-active':''}
          aria-current={s.index===safeStage?'step':undefined}
          onClick={()=>onChangeStage(s.index)}>
          <span aria-hidden="true">{s.symbol}</span> {STAGE_NAMES[s.index]}
        </button>)}
      </nav>
      {lesson.preamble&&<details className="lesson-preamble">
        <summary>课程导入</summary>
        {showIpa?<div className="lesson-paragraphs"><IpaText onSpeak={value=>speakIpaText(value,language,ttsRate)}
           text={lesson.preamble} language={language}/></div>:<LessonBody text={lesson.preamble}/>}
      </details>}
    </>}
    {showAll||!lesson.structured?
      <article className="lesson-paper" aria-label="完整课程原文">
        {showIpa?<div className="lesson-paragraphs"><IpaText onSpeak={value=>speakIpaText(value,language,ttsRate)}
           text={text} language={language}/></div>:<LessonBody text={text}/>}
      </article>:
      <article className="lesson-paper" aria-label={'阶段：'+STAGE_NAMES[safeStage]}>
        <header className="lesson-stage-head">
          <span className="lesson-index">{lesson.stages[safeStage].symbol}</span>
          <h4>{lesson.stages[safeStage].heading||STAGE_NAMES[safeStage]}</h4>
        </header>
        {showIpa?<div className="lesson-paragraphs"><IpaText onSpeak={value=>speakIpaText(value,language,ttsRate)}
           text={lesson.stages[safeStage].body} language={language}/></div>:<LessonBody text={lesson.stages[safeStage].body}/>}
      </article>}
    {lesson.structured&&<div className="lesson-controls">
      {!showAll&&<button type="button" disabled={safeStage===0}
        onClick={()=>onChangeStage(Math.max(0,safeStage-1))}>← 上一阶段</button>}
      <button type="button" className="lesson-toggle" onClick={()=>setShowAll(v=>!v)}>
        {showAll?'分节阅读':'阅读全文'}
      </button>
      {!showAll&&<button type="button" disabled={safeStage===5}
        onClick={()=>onChangeStage(Math.min(5,safeStage+1))}>下一阶段 →</button>}
    </div>}
  </div>;
}
