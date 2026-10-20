import {useState} from 'react';
import type {LessonContent,Course,LessonDraft} from './v44Courses';
import type {FoundationUnit} from './foundationTypes';
import {speakIpaText} from './IpaText';
import {LESSON_EXTENSIONS} from './editorialLessonExtensions';
import BilingualTeaching from './BilingualTeaching';
import {outputGuide,exampleVocabulary} from './curriculumTeachingGuide';
import {STUDY_STAGES,STUDY_TITLES,visibleStudyStage,moveStudyStage} from './lessonStages';
const TABS=['情境','语法','词汇','听读','表达'] as const;
type Props={content:LessonContent;course:Course;stage:number;onChangeStage:(stage:number)=>void;
 onOpenSpeech:()=>void;onSaveOutput?:(answer:string)=>void;ttsRate:number};
export default function StructuredLesson({content,course,stage,onChangeStage,onSaveOutput,ttsRate}:Props){
 const [expanded,setExpanded]=useState(false);
 const [ownText,setOwnText]=useState('');
 const [responses,setResponses]=useState<Record<number,string>>({});
 const [shown,setShown]=useState<Record<number,boolean>>({});
 const draft=content.draft,unit=content.foundation;
 const extension=LESSON_EXTENSIONS[course.id];
 if(!draft&&!unit)return null;
 const active=visibleStudyStage(stage);
 const position=STUDY_STAGES.indexOf(active as typeof STUDY_STAGES[number]);
 const goal=draft?.goal||unit!.goal;
 const examples=draft?.examples.map(e=>e.text)||unit!.examples;
 const vocabulary=draft?.vocabulary||unit!.vocab;
 const reading=draft?.reading||unit!.reading;
 const listening=draft?.listening_script||unit!.listening;
  const output=draft?.production||unit!.production;
 const guide=outputGuide(course,content);
 const isDraft=Boolean(draft);
 const play=(value:string)=>speakIpaText(value,course.language,ttsRate);
 const lessonQuestions= isDraft?draft!.questions.map(q=>({prompt:q.prompt,answer:q.answer,explanation:q.explanation})):
  unit!.questions.map(q=>({prompt:q.prompt,answer:q.choices[q.answer],explanation:q.explanation}));
 return <div className="curriculum-lesson" aria-label="结构化课程学习">
  <nav className="curriculum-tabs" aria-label="本课教学环节">
   {STUDY_STAGES.map((id,i)=><button type="button" key={id}
    aria-current={active===id?'step':undefined} aria-pressed={active===id}
    className={active===id?'current':''} onClick={()=>onChangeStage(id)}>
    <span>{String(i+1).padStart(2,'0')}</span>{STUDY_TITLES[i]}</button>)}
  </nav>
  <article className="curriculum-stage" aria-label={'教学环节：'+TABS[position]}>
   <header className="curriculum-stage-title"><span className="microtag">第 {position+1} / 5 部分</span>
    <h2>{TABS[position]}</h2></header>
   {active===0&&<div className="curriculum-stack">
     <section><h3>完成这一课，你能够</h3><p className="curriculum-goal">{goal}</p></section>
     <section><h3>学习情境</h3><p>{draft?.context||goal}</p></section>
     {draft?.prerequisite&&<p className="curriculum-prerequisite">前置课程：{draft.prerequisite}</p>}
     {extension&&<section className="curriculum-editorial"><h3>本课的学习重点</h3><p>{extension.rationale}</p></section>}
     <section><h3>情境示例</h3><blockquote>{examples[0]}</blockquote>
       <button type="button" onClick={()=>play(examples[0])}>听例句</button></section>
   </div>}
   {active===1&&<div className="curriculum-stack">
     <section><h3>核心规则</h3><ol className="curriculum-concepts">
      {(draft?draft.grammar.split(/[。](?![^（]*）)/u).map(t=>t.trim()).filter(Boolean):
      unit!.concepts).map((part,i)=><li key={i}>{part}</li>)}</ol></section>
     <section><h3>例句与应用</h3>{examples.map((example,i)=>
      <div className="curriculum-example" key={i}><span className="microtag">例句 {i+1}</span>
       <p lang={course.language}>{example}</p>
       <button type="button" onClick={()=>play(example)}>播放</button>
       {exampleVocabulary(example,vocabulary).length>0&&<div className="curriculum-example-gloss"
       aria-label="例句词汇中文对照">{exampleVocabulary(example,vocabulary).map(row=>
        <span key={row}>{row}</span>)}</div>}</div>)}</section>
     {extension&&<section className="curriculum-editorial"><h3>规则与原文对应</h3>
       {extension.analysis.map(point=><div className="curriculum-analysis-point" key={point.label}>
        <h4>{point.label}</h4><blockquote>{point.evidence}</blockquote><p>{point.teaching}</p></div>)}</section>}
     <section className="curriculum-warning"><h3>容易混淆的地方</h3>
      <p>{draft?.common_mistake||unit!.commonMistake}</p></section>
   </div>}
   {active===2&&<div className="curriculum-stack">
     <section><h3>本课词汇</h3><div className="curriculum-vocabulary" role="list">
      {vocabulary.map(([word,meaning],i)=><div role="listitem" className="curriculum-word" key={i}>
       <strong lang={course.language}>{word}</strong><span>{meaning}</span>
       <button type="button" aria-label={'播放 '+word} onClick={()=>play(word)}>听</button>
      </div>)}</div></section>
     <section><h3>词语在句子中的作用</h3>
      {examples.slice(0,3).map((ex,i)=><div key={i} className="curriculum-example">
        <p lang={course.language}>{ex}</p>
        {exampleVocabulary(ex,vocabulary).length>0&&<div className="curriculum-example-gloss">
        {exampleVocabulary(ex,vocabulary).map(item=><span key={item}>{item}</span>)}</div>}
      </div>)}</section>
   </div>}
   {active===3&&<div className="curriculum-stack">
     <section><h3>听力</h3><div className="curriculum-actions"><button type="button" onClick={()=>play(listening)}>播放听力</button>
      <button type="button" onClick={()=>setExpanded(v=>!v)} aria-expanded={expanded}>{expanded?'隐藏文本':'显示文本'}</button></div>
      {expanded&&<div className="curriculum-transcript" lang={course.language}>{listening}</div>}</section>
     <section><h3>阅读材料</h3><div className="curriculum-reading" lang={course.language}>
      {reading}</div></section>
     {extension&&<section className="curriculum-editorial"><h3>{extension.modelTitle}</h3>
       <pre className="curriculum-model">{extension.model}</pre>
       <p>{extension.exercise}</p></section>}
     <section><h3>理解检查</h3>{lessonQuestions.map((q,i)=>
      <div className="curriculum-question" key={i}><label htmlFor={'question-'+course.id+'-'+i}>{i+1}. {q.prompt}</label>
       <textarea id={'question-'+course.id+'-'+i} rows={2} value={responses[i]||''}
        onChange={e=>setResponses(p=>({...p,[i]:e.target.value}))}/>
       <button type="button" aria-expanded={!!shown[i]} onClick={()=>setShown(p=>({...p,[i]:!p[i]}))}>
        {shown[i]?'收起参考答案':'核对参考答案'}</button>
       {shown[i]&&<div className="curriculum-answer"><strong>参考答案</strong><p>{q.answer}</p><p>{q.explanation}</p></div>}
      </div>)}</section>
   </div>}
   {active===5&&<div className="curriculum-stack">
     <section><h3>完成表达任务</h3><p className="curriculum-goal">
       {/^Produce an original/u.test(output)?guide.task:output}</p>
      <ol className="curriculum-output-steps">{guide.steps.map((step,i)=><li key={i}>{step}</li>)}</ol></section>
     {extension&&<section className="curriculum-editorial"><h3>本课表达实践</h3><p>{extension.exercise}</p>
       <h4>{extension.modelTitle}</h4><pre className="curriculum-model">{extension.model}</pre></section>}
     <section><h3>我的表达</h3>
      <label className="curriculum-output-editor">输入自己的完整答案
       <textarea rows={6} value={ownText} onChange={e=>setOwnText(e.target.value)}
        placeholder="先完成自己的句子或段落，再和示范对照。"/>
      </label>
      {onSaveOutput&&<button disabled={!ownText.trim()} type="button"
       onClick={()=>onSaveOutput(ownText)}>加入本课笔记</button>}</section>
     <section><h3>自我检查</h3><ul className="curriculum-checklist">
       <li>是否完成题目要求并表达清楚？</li>
       <li>所用信息是否有本课原文或实例支持？</li>
       <li>是否正确使用本课核心词汇和句型？</li>
       <li>是否检查错误并进行至少一次修改？</li>
      </ul><ul className="curriculum-review-extra">{guide.criteria.map(s=><li key={s}>{s}</li>)}</ul>
      {extension&&<div className="curriculum-editorial-check"><h4>本课额外核对</h4>
       <ul>{extension.check.map(item=><li key={item}>{item}</li>)}</ul></div>}
       {isDraft&&draft!.self_review&&!draft!.self_review.startsWith('核对任务是否回答完整')&&<details><summary>额外自查说明</summary><p>{draft!.self_review}</p></details>}</section>
   </div>}
   <BilingualTeaching key={course.id+'-'+active} courseId={course.id} stage={active} content={content}/>
  </article>
  <div className="curriculum-navigation">
   <button type="button" disabled={position===0} onClick={()=>onChangeStage(moveStudyStage(active,-1))}>← 上一部分</button>
   <span>{position+1} / 5</span>
   <button type="button" disabled={position===4} onClick={()=>onChangeStage(moveStudyStage(active,1))}>下一部分 →</button>
  </div>
 </div>;
}
