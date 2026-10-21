import {useState} from 'react';
import {linkedSpecialties,type SpecialtyKind,type SpecialtyLesson} from './specialtyLibrary';
import {speakIpaText} from './IpaText';
import Task1VisualEvidence from './Task1VisualEvidence';
import './curriculumStudy.css';

/** Shows a complete, authored specialty *inside* its mapped main-course stage. */
function CourseSpecialtyTopic({unit,rate,onSaveOutput}:{unit:SpecialtyLesson;rate:number;onSaveOutput?:(answer:string)=>void}){
 const [active,setActive]=useState(0);
 const [shown,setShown]=useState<Record<number,boolean>>({});
 const [answer,setAnswer]=useState<Record<number,string>>({});
 const [writing,setWriting]=useState('');
 const part=unit.sections[active];
 return <section className="course-specialty-topic" aria-label={unit.title}>
  <header className="course-specialty-topic-title"><h3>{unit.title}</h3><p>{unit.objective}</p></header>
  <Task1VisualEvidence lessonId={unit.id}/>
  <details className="course-specialty-prerequisite"><summary>前置知识</summary><p>{unit.prerequisite}</p></details>
  <nav className="course-specialty-chapters" aria-label={unit.title+'章节'}>
   {unit.sections.map((s,i)=><button type="button" key={i}
    aria-current={active===i?'step':undefined} aria-pressed={active===i}
    onClick={()=>setActive(i)}>{s.title.replace(/^\d+[.\s、]+/u,'')}</button>)}
  </nav>
  <article className="course-specialty-reading" key={active}>
   <h4>{part.title}</h4>
   <p>{part.concept}</p>
   <div className="course-specialty-pattern"><strong>结构与搭配</strong><p lang={unit.language}>{part.pattern}</p></div>
   {part.table&&<div className="course-specialty-table">
    <h5>{part.table.title}</h5>
    <div className="course-specialty-table-scroll"><table><thead><tr>{part.table.columns.map((col,i)=><th key={i} scope="col">{col}</th>)}</tr></thead>
     <tbody>{part.table.rows.map((row,i)=><tr key={i}>{row.map((val,j)=><td key={j}>{val}</td>)}</tr>)}</tbody>
    </table></div><p className="course-specialty-table-note">{part.table.note}</p></div>}
   <div className="course-specialty-pairs">{part.examples.map((example,i)=><div className="course-specialty-pair" key={i}>
    <div className="course-specialty-phrase"><strong lang={unit.language}>{example.target}</strong>
     <button type="button" aria-label={'朗读 '+example.target}
      onClick={()=>speakIpaText(example.target,unit.language,rate)}>▶</button></div>
    <p lang="zh-Hans">{example.zh}</p><small>{example.analysis}</small>
   </div>)}</div>
   <aside className="course-specialty-caution"><strong>易错辨析</strong><p>{part.caution}</p></aside>
  </article>
  <section className="course-specialty-questions" aria-label={unit.title+'练习'}>
   <h4>应用练习</h4>
   {unit.questions.map((q,i)=><div className="course-specialty-question" key={i}>
    <label htmlFor={'inline-'+unit.id+'-'+i}>{i+1}. {q.question}</label>
    <textarea id={'inline-'+unit.id+'-'+i} rows={2} value={answer[i]||''}
     onChange={e=>setAnswer(a=>({...a,[i]:e.target.value}))}/>
    <button type="button" aria-expanded={!!shown[i]}
     onClick={()=>setShown(old=>({...old,[i]:!old[i]}))}>{shown[i]?'收起解析':'核对答案与解析'}</button>
    {shown[i]&&<div className="course-specialty-answer"><strong>{q.answer}</strong><p>{q.why}</p></div>}
   </div>)}
  </section>
  <details className="course-specialty-production"><summary>综合表达与范文</summary>
   <p>{unit.output}</p>
   <label htmlFor={'course-output-'+unit.id}>我的完整表达</label>
   <textarea id={'course-output-'+unit.id} rows={7} value={writing} onChange={event=>setWriting(event.target.value)}/>
   {onSaveOutput&&<button type="button" disabled={!writing.trim()} onClick={()=>onSaveOutput(writing)}>加入本课笔记</button>}
   <details><summary>查看中外文范文</summary>
    {unit.modelParagraphStarts
     ?unit.modelParagraphStarts.map((start,i)=>{
      const group=unit.model.slice(start,unit.modelParagraphStarts?.[i+1]??unit.model.length);
      return <div className="course-specialty-model-paragraph" key={i}>
       <p lang={unit.language}>{group.map(x=>x.target).join(' ')}</p>
       <p lang="zh-Hans">{group.map(x=>x.zh).join('')}</p>
      </div>;
     })
     :unit.model.map((line,i)=><div className="course-specialty-model-pair" key={i}>
       <p lang={unit.language}>{line.target}</p><p lang="zh-Hans">{line.zh}</p>
       <small>{line.analysis}</small>
      </div>)}
   </details>
  </details>
 </section>;
}
export default function CourseSpecialtyStage({courseId,kind,rate,onSaveOutput}:{courseId:string;kind:SpecialtyKind;rate:number;onSaveOutput?:(answer:string)=>void}){
 const matches=linkedSpecialties(kind,courseId);
 if(!matches.length)return null;
 return <div className="course-specialty-inline" aria-label={kind==='grammar'?'本课完整语法教材':'本课完整词汇教材'}>
  {matches.map(unit=><CourseSpecialtyTopic key={unit.id} unit={unit} rate={rate} onSaveOutput={onSaveOutput}/>)}
 </div>;
}
