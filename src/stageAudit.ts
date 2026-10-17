export type StageAudit={
 course_id:string;qa_status:string;total_chars:number;stages_in_order:boolean;
 context_chars:number;grammar_chars:number;vocabulary_chars:number;
 reading_chars:number;pronunciation_chars:number;production_chars:number;
 review_signal_count:number;
};
export const STAGE_AUDIT_LIMITS={
 context_chars:200,grammar_chars:180,vocabulary_chars:180,
 reading_chars:200,pronunciation_chars:130
} as const;
export const STAGE_AUDIT_NAMES={
 context_chars:'情境导入',grammar_chars:'语法',vocabulary_chars:'词汇',
 reading_chars:'听力／阅读',pronunciation_chars:'发音'
} as const;
export function stageReviewReasons(item:StageAudit):string[]{
 const reasons:string[]=[];
 if(!item.stages_in_order)reasons.push('分段标题顺序需要人工复核');
 if(item.total_chars<4000)reasons.push('正文少于 4,000 字符，建议检查是否足够支撑教学目标');
 for(const [field,limit] of Object.entries(STAGE_AUDIT_LIMITS) as [keyof typeof STAGE_AUDIT_LIMITS,number][]){
  if(item[field]<limit)reasons.push(STAGE_AUDIT_NAMES[field]+'段较短');
 }
 return reasons;
}
export function auditScore(item:StageAudit):number{
 return item.review_signal_count+(!item.stages_in_order?1:0);
}
