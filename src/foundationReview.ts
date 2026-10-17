import type {FoundationRecord,FoundationUnit} from './foundationTypes';
import {makeVocabularyChecks} from './foundationQuiz.ts';

export type FoundationReviewItem={
 lessonId:string;title:string;language:'en'|'fr';
 status:'due'|'upcoming'|'unstarted';reason:string;
 lastSavedAt:string|null;
};
/** A review suggestion based on existing saved answers and timestamps.
 * It does not pretend to be a calibrated spaced-repetition memory model.
 */
export function buildFoundationReviewPlan(
 units:readonly FoundationUnit[],
 records:Readonly<Record<string,FoundationRecord>>,
 now:Date=new Date()
):FoundationReviewItem[]{
 const nowTime=now.getTime();
 return units.map(unit=>{
  const base={lessonId:unit.id,title:unit.title,language:unit.language};
  const record=records[unit.id];
  if(!record)return {...base,status:'unstarted' as const,reason:'尚未开始',lastSavedAt:null};
  const questions=[...unit.questions,...makeVocabularyChecks(unit.vocab)];
  const answered=questions.filter((_,i)=>Number.isInteger(record.answers[String(i)])&&
   record.answers[String(i)]>=0&&record.answers[String(i)]<3).length;
  const wrong=questions.filter((q,i)=>Number.isInteger(record.answers[String(i)])&&
   record.answers[String(i)]!==q.answer).length;
  const savedTime=Date.parse(record.updated_at);
  const ageHours=Number.isFinite(savedTime)&&Number.isFinite(nowTime)?
   Math.max(0,(nowTime-savedTime)/3600000):Infinity;
  let status:'due'|'upcoming'='upcoming',reason='';
  if(wrong>0){
   status='due';reason='有 '+wrong+' 道已保存的自检题需要复习';
  }else if(!record.completed&&answered<questions.length){
   status='due';reason='尚有 '+(questions.length-answered)+' 道自检题待完成';
  }else if(ageHours>=(record.completed?72:24)){
   status='due';reason=record.completed?'距离上次保存已满 3 天，建议回顾':'距离上次保存已满 1 天，建议回顾';
  }else{
   reason=record.completed?'近期学完，可在 3 天后回顾':'近期学习过，可在 1 天后回顾';
  }
  return {...base,status,reason,lastSavedAt:record.updated_at};
 }).sort((a,b)=>{
  const rank={due:0,upcoming:1,unstarted:2};
  if(rank[a.status]!==rank[b.status])return rank[a.status]-rank[b.status];
  return a.lessonId.localeCompare(b.lessonId);
 });
}
