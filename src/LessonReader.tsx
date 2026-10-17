import {useMemo, useState, useEffect} from 'react';
import {splitLessonStages,STAGE_NAMES} from './lessonStages';
import IpaText from './IpaText';
import IpaReference from './IpaReference';

type Props={
  text:string;
  language?:string;
  courseId:string;
  stage:number;
  onChangeStage:(next:number)=>void;
};
export default function LessonReader({text,language='fr',courseId,stage,onChangeStage}:Props){
  const lesson=useMemo(()=>splitLessonStages(text),[text]);
  const [showAll,setShowAll]=useState(false);
  const [showIpa,setShowIpa]=useState(false);
  useEffect(()=>{setShowAll(false);setShowIpa(false);},[courseId]);
  const safeStage=Math.max(0,Math.min(5,Number.isInteger(stage)?stage:0));
  return <div className="lesson-reader">
    <section className="ipa-reader-controls" aria-label="课程原文音标控制">
      <label><input type="checkbox" checked={showIpa}
        onChange={e=>setShowIpa(e.target.checked)}/>
        为{showAll?'课程全文':'当前课程正文'}显示 IPA 国际音标
      </label>
      <p className="cloud-disclaimer">英语与法语原文由浏览器端自动生成参考音标，首次启用需加载语言包；
        中文教学说明保留原样。音标不是人工核对的词典读音，同形异音词、法语连诵须结合上下文确认。</p>
      <IpaReference language={language}/>
    </section>
    {lesson.structured && <>
      <p className="cloud-disclaimer">按六阶段分块阅读，原文完整保留。切换阶段后可点击页面下方“保存到 Supabase”同步学习位置。</p>
      <nav className="lesson-stages" aria-label="课程六阶段">
        {lesson.stages.map(s=><button type="button" key={s.index}
          className={s.index===safeStage?'stage-active':''}
          aria-current={s.index===safeStage?'step':undefined}
          onClick={()=>onChangeStage(s.index)}>
          <span aria-hidden="true">{s.symbol}</span> {STAGE_NAMES[s.index]}
        </button>)}
      </nav>
      {lesson.preamble&&<details className="lesson-preamble">
        <summary>查看课程前言及原始状态说明</summary>
        <div className="lesson-paragraphs">{showIpa
          ? <IpaText text={lesson.preamble} language={language}/>
          : lesson.preamble}</div>
      </details>}
    </>}
    {showAll||!lesson.structured?
      <article className="lesson-paper" aria-label="完整课程原文">
        <div className="lesson-paragraphs">{showIpa
          ? <IpaText text={text} language={language}/>
          : text}</div>
      </article>:
      <article className="lesson-paper" aria-label={'阶段：'+STAGE_NAMES[safeStage]}>
        <header className="lesson-stage-head">
          <span className="lesson-index">{lesson.stages[safeStage].symbol}</span>
          <h4>{lesson.stages[safeStage].heading||STAGE_NAMES[safeStage]}</h4>
        </header>
        <div className="lesson-paragraphs">{showIpa
          ? <IpaText text={lesson.stages[safeStage].body} language={language}/>
          : lesson.stages[safeStage].body}</div>
      </article>}
    {lesson.structured&&<div className="lesson-controls">
      {!showAll&&<button type="button" disabled={safeStage===0}
        onClick={()=>onChangeStage(Math.max(0,safeStage-1))}>← 上一阶段</button>}
      <button type="button" className="lesson-toggle" onClick={()=>setShowAll(v=>!v)}>
        {showAll?'返回分阶段阅读':'查看完整原稿'}
      </button>
      {!showAll&&<button type="button" disabled={safeStage===5}
        onClick={()=>onChangeStage(Math.min(5,safeStage+1))}>下一阶段 →</button>}
    </div>}
  </div>;
}
