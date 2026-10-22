/** Separate presentation metadata from immutable manuscript text.
 * All source strings remain in the manuscript and are never rewritten or classified as reviewed. */
export type SourceBlock={kind:'heading'|'paragraph'|'task'|'example'|'list';text:string};
const HEADING=/^(?:#{1,4}\s+|[①②③④⑤⑥]\s+|(?:[A-Z][A-Z ,&/\-]{9,})$)/u;
const TASK=/^(?:First[- ]pass|Second[- ]pass|Original worked model|Check|Task|Exercise|Self[- ]review|Practice|Response|Evidence|Example|Model|Review|题目|任务|目标|示范|例句|练习|参考答案|解析|答案|自评|检查|错误提示)\s*[:：]/iu;
const LIST=/^(?:[-•*]\s+|\d{1,2}[.)、]\s+)/u;
export function parseManuscript(text:string):SourceBlock[]{
 const raw=text.replace(/\r\n?/g,'\n');
 const blocks:SourceBlock[]=[];
 for(const paragraph of raw.split(/\n[ \t]*\n+/)){
  if(!paragraph.trim())continue;
  const lines=paragraph.split('\n');
  let body:string[]=[];
  const flush=()=>{if(body.length){blocks.push({kind:'paragraph',text:body.join('\n').trim()});body=[];}};
  for(const rawLine of lines){
   const line=rawLine.trim();
   if(!line){flush();continue;}
   if(HEADING.test(line)){flush();blocks.push({kind:'heading',text:line});}
   else if(TASK.test(line)){flush();blocks.push({kind:/^(?:Example|Model|示范|例句|Original worked model)/iu.test(line)?'example':'task',text:line});}
   else if(LIST.test(line)){flush();blocks.push({kind:'list',text:line});}
   else body.push(rawLine);
  }
  flush();
 }
 return blocks;
}
export function lessonIpaSample(text:string):string{
 const latin=text.match(/[A-Za-zÀ-ÿ][^\n]{12,240}/gu)||[];
 const candidate=latin.find(x=>(x.match(/[A-Za-zÀ-ÿ]+/gu)||[]).length>=4);
 if(!candidate)return '';
 const sentence=candidate.split(/(?<=[.!?。！？])\s+/u)[0];
 return sentence.slice(0,185).trim();
}
