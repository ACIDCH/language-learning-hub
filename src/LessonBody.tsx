import {parseManuscript} from './manuscriptPresentation';
/** Semantic reading layout; the verbatim manuscript remains available in backup/private source. */
export default function LessonBody({text}:{text:string}){
 // Hide obsolete editorial headers, but preserve any useful explanations under them.
 const parts=parseManuscript(text).map(part=>({
  ...part,
  text:part.text.replace(/(?:^|\n)\s*(?:【V4 校订与入门补充】|原创草稿\s*[·•][^\n]*|课程导入)\s*(?=\n|$)/gu,'').trim()
 })).filter(part=>part.text.length>0);
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
