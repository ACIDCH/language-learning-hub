import {useEffect,useMemo,useState} from 'react';
import {splitLessonStages,STUDY_STAGES,STUDY_TITLES,visibleStudyStage,moveStudyStage} from './lessonStages';
import LessonBody from './LessonBody';
import BilingualTeaching from './BilingualTeaching';
import {curatedUnitForSource} from './curatedCurriculum';
import {CHINESE_LESSON_NOTES} from './bilingualTeachingNotes';
import {ENGLISH_ORIGINAL_BILINGUAL} from './bilingualOriginalEnglish';
import type {LessonContent} from './v44Courses';
import CourseSpecialtyStage from './CourseSpecialtyStage';
import {linkedSpecialties} from './specialtyLibrary';
import ReceptionStudy from './ReceptionStudy';
import {RECEPTION_LESSONS} from './receptionLessons';
import Task1WritingWorkshop,{TASK1_WORKSHOPS} from './Task1WritingWorkshop';

type Props={text:string;content?:LessonContent|null;privateSource?:boolean;defaultIpa?:boolean;ttsRate?:number;language?:string;courseId:string;
 stage:number;onChangeStage:(next:number)=>void;onSaveOutput?:(value:string)=>void;hideTabs?:boolean};
/** Original manuscripts keep their source content, but omit editorial prefaces and
 * the old separate pronunciation stage from learner navigation. */
export default function LessonReader({text,courseId,content,privateSource=false,stage,onChangeStage,onSaveOutput,hideTabs=false,ttsRate=.85}:Props){
 const lesson=useMemo(()=>splitLessonStages(text),[text]);
 const [showAll,setShowAll]=useState(false);
 useEffect(()=>{setShowAll(false);},[stage]);
 const curated=lesson.structured?curatedUnitForSource(courseId,text,privateSource):null;
 const alignedGuide=Boolean(!privateSource&&(CHINESE_LESSON_NOTES[courseId]||ENGLISH_ORIGINAL_BILINGUAL[courseId]));
 const current=visibleStudyStage(stage);
 const selected=STUDY_STAGES.indexOf(current as typeof STUDY_STAGES[number]);
 const sections=lesson.structured?STUDY_STAGES.map((id,index)=>({
  ...lesson.stages[id],displayName:STUDY_TITLES[index]
 })):[];
 const source=lesson.structured?
  (showAll?sections.map(s=>s.heading+'\n'+s.body).join('\n\n'):sections[selected]?.body||''):text;
 const kind=current===1?'grammar':current===2?'vocabulary':null;
 const topic=kind&&!curated&&!alignedGuide&&linkedSpecialties(kind,courseId).length>0;
 const enrich=!showAll&&(topic||current===3&&RECEPTION_LESSONS[courseId]||current===5&&TASK1_WORKSHOPS[courseId]);
 return <div className="lesson-reader">
  {lesson.structured&&!hideTabs&&<nav className="lesson-stages" aria-label="课程五个学习环节">
   {sections.map((part,index)=><button key={part.index} type="button"
    aria-current={part.index===current?'step':undefined}
    className={part.index===current?'stage-active':''}
    onClick={()=>{setShowAll(false);onChangeStage(part.index);}}>
    <span aria-hidden="true">{String(index+1).padStart(2,'0')}</span> {part.displayName}
   </button>)}
  </nav>}
  <article className="lesson-paper" aria-label={showAll||!lesson.structured?'完整课程原文':'阶段：'+sections[selected]?.displayName}>
   {!showAll&&lesson.structured&&<header className="lesson-stage-head">
    <span className="lesson-index">{String(selected+1).padStart(2,'0')}</span>
    <h4>{sections[selected]?.displayName}</h4></header>}
   {enrich?<div className="course-enrichment">
    {topic&&kind&&<CourseSpecialtyStage courseId={courseId} kind={kind} rate={ttsRate} onSaveOutput={onSaveOutput}/>}
    {current===3&&<ReceptionStudy courseId={courseId} rate={ttsRate}/>}
    {current===5&&<Task1WritingWorkshop courseId={courseId}/>}
    <details><summary>本环节原有课文</summary><LessonBody text={source}/></details>
   </div>:curated&&!showAll?<><BilingualTeaching key={courseId+'-'+current}
     courseId={courseId} stage={current} content={content} privateSource={privateSource} sourceText={text} onSaveOutput={onSaveOutput}/>
     <details className="curated-source-details"><summary>展开本环节对应原文</summary>
       <LessonBody text={source}/></details></>:
     <>{alignedGuide&&!showAll?<><BilingualTeaching key={courseId+'-'+current}
        courseId={courseId} stage={current} content={content} privateSource={privateSource} sourceText={text} onSaveOutput={onSaveOutput}/>
        <details className="curated-source-details"><summary>展开本环节原始教材</summary>
         <LessonBody text={source}/></details></>:
       <>{!showAll&&current!==3&&<BilingualTeaching key={courseId+'-'+current}
        courseId={courseId} stage={current} content={content} privateSource={privateSource} sourceText={text} onSaveOutput={onSaveOutput}/>}
       <LessonBody text={source}/>
       {!showAll&&current===3&&<BilingualTeaching key={courseId+'-'+current}
        courseId={courseId} stage={current} content={content} privateSource={privateSource} sourceText={text} onSaveOutput={onSaveOutput}/>}</>}</>}
  </article>
  {lesson.structured&&<div className="lesson-controls">
   {!showAll&&<button disabled={selected===0} onClick={()=>onChangeStage(moveStudyStage(current,-1))}>← 上一部分</button>}
   <button className="lesson-toggle" onClick={()=>setShowAll(v=>!v)}>
    {showAll?'分节学习':'连续阅读五个环节'}</button>
   {!showAll&&<button disabled={selected===sections.length-1}
    onClick={()=>onChangeStage(moveStudyStage(current,1))}>下一部分 →</button>}
  </div>}
 </div>;
}
