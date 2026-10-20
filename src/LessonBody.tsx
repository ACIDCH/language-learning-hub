import {parseManuscript} from './manuscriptPresentation';
/** Semantic reading layout; the verbatim manuscript remains available in backup/private source. */
export default function LessonBody({text}:{text:string}){
 const parts=parseManuscript(text).filter(p=>!/^\s*(?:【?V4\s*校订与入门补充】?|原创草稿\s*[·•]|课程导入\s*$)/u.test(p.text));
 return <div className="lesson-paragraphs lesson-content-flow" aria-label="课程正文">
  {parts.map((part,i)=>{
   if(part.kind==='heading')return <h5 className="lesson-content-section" key={i}>{part.text}</h5>;
   if(part.kind==='task')return <div className="lesson-content-block lesson-content-task" key={i}>{part.text}</div>;
   if(part.kind==='example')return <blockquote className="lesson-content-block lesson-content-example" key={i}>{part.text}</blockquote>;
   if(part.kind==='list')return <p className="lesson-content-list" key={i}>{part.text}</p>;
   return <p className="lesson-content-group" key={i}>{part.text}</p>;
  })}
 </div>;
}
