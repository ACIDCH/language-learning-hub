import data from './mainQuestionChineseData.json';
import {RECEPTION_LESSONS} from './receptionLessons';
import type {LessonDraft} from './v44Courses';
type Translation={prompt:string;answer:string};
type BoundTranslation=Translation&{sourcePrompt:string;sourceAnswer:string};
const rows=data as Record<string,Record<string,BoundTranslation>>;
/** Exact source binding: stale translations never attach to a changed question. */
export function mainQuestionChinese(draft:LessonDraft):(Translation|undefined)[]{
 return draft.questions.map((q,i)=>{
  const authored=rows[draft.id]?.[String(i)];
  if(authored?.sourcePrompt===q.prompt&&authored.sourceAnswer===q.answer)return authored;
  const reused=RECEPTION_LESSONS[draft.id]?.questions.find(x=>
   x.prompt.startsWith(q.prompt+' / ')&&x.answer.startsWith(q.answer+' / '));
  return reused?{prompt:reused.prompt.slice(q.prompt.length+3),answer:reused.answer.slice(q.answer.length+3)}:undefined;
 });
}
