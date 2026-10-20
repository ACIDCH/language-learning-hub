/**
 * Six-stage navigation for personal V4 manuscripts.
 * Keeps the complete original text, including the preamble and every section,
 * without interpreting untrusted manuscript text as HTML.
 */
export type LessonStage = {index:number; symbol:string; heading:string; body:string};
export type LessonOutline = {preamble:string; stages:LessonStage[]; structured:boolean};
const SYMBOLS=['①','②','③','④','⑤','⑥'] as const;
const HEADING=/^[ \t]*(?:#{1,4}[ \t]*)?([①②③④⑤⑥])[ \t]*([^\r\n]*)/gm;
export const STAGE_NAMES=['情境','语法','词汇','听读','发音','表达'] as const;

export function splitLessonStages(text:string):LessonOutline {
  const normalized=text.replace(/\r\n?/g,'\n');
  const found=[...normalized.matchAll(HEADING)];
  if(found.length!==6||found.some((match,i)=>match[1]!==SYMBOLS[i])) {
    return {preamble:'',stages:[{index:0,symbol:'',heading:'原始课程全文',body:normalized}],structured:false};
  }
  const preamble=normalized.slice(0,found[0].index??0).trim();
  const stages=found.map((match,i)=>{
    const first=(match.index??0)+match[0].length;
    const last=i+1<found.length?(found[i+1].index??normalized.length):normalized.length;
    return {index:i,symbol:SYMBOLS[i],heading:match[2].trim(),body:normalized.slice(first,last).trim()};
  });
  if(stages.some(s=>s.body.length===0)){
    return {preamble:'',stages:[{index:0,symbol:'',heading:'原始课程全文',body:normalized}],structured:false};
  }
  return {preamble,stages,structured:true};
}

/** Persisted stages retain their original indices. 4 is an archived speaking segment
 * and is no longer a navigation destination; choosing 3/5 skips it safely. */
export const STUDY_STAGES=[0,1,2,3,5] as const;
export const STUDY_TITLES=['情境','语法','词汇','听读','表达'] as const;
export function visibleStudyStage(stage:number):number{
 return STUDY_STAGES.includes(stage as typeof STUDY_STAGES[number])?stage:(stage>=4?5:0);
}
export function moveStudyStage(stage:number,delta:number):number{
 const current=STUDY_STAGES.indexOf(visibleStudyStage(stage) as typeof STUDY_STAGES[number]);
 return STUDY_STAGES[Math.max(0,Math.min(STUDY_STAGES.length-1,current+delta))];
}
