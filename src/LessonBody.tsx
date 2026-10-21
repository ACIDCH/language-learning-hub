import {parseManuscript} from './manuscriptPresentation';
import {learnerFacingText} from './lessonPresentationText';
/** Semantic reading layout; the verbatim manuscript remains available in backup/private source. */
function formatted(text:string){
 return text.split(/(\*\*[^*\n]+\*\*)/gu).map((span,i)=>
  span.startsWith('**')&&span.endsWith('**')
   ? <strong key={i}>{span.slice(2,-2)}</strong>:span);
}
export default function LessonBody({text}:{text:string}){
 // Hide obsolete editorial headers, but preserve any useful explanations under them.
 const parts=parseManuscript(learnerFacingText(text)).filter(part=>part.text.trim().length>0);
 return <div className="lesson-paragraphs lesson-content-flow" aria-label="课程正文">
  {parts.map((part,i)=>{
   if(part.kind==='heading')return <h5 className="lesson-content-section" key={i}>{formatted(part.text.replace(/^#{1,4}\s+/u,''))}</h5>;
   if(part.kind==='task')return <div className="lesson-content-block lesson-content-task" key={i}>{formatted(part.text)}</div>;
   if(part.kind==='example')return <blockquote className="lesson-content-block lesson-content-example" key={i}>{formatted(part.text)}</blockquote>;
   if(part.kind==='list')return <p className="lesson-content-list" key={i}>{formatted(part.text)}</p>;
   return <p className="lesson-content-group" key={i}>{formatted(part.text)}</p>;
  })}
 </div>;
}
