import manifest from '../config/curriculum/units.v2.json';
type UnitMetadata={
 id:string;language:string;level:string;unit:number;title:string;can_do:string;
 grammar:string[];vocabulary_domains:string[];pronunciation_focus:string;
 performance_task:string;source_candidates:string[];source_alignment:string;
 prerequisite_unit:string|null;
};
const units=manifest.units as UnitMetadata[];
export type PracticeCheck={grammar?:boolean;vocabulary?:boolean;production?:boolean};
export function getUnitGuide(id:string):UnitMetadata|null{
 return units.find(u=>u.id===id)??null;
}
export const GUIDE_ITEMS=[
 {key:'grammar',label:'我已用自己的例句复习本课语法／表达规则'},
 {key:'vocabulary',label:'我已在新语境中使用至少三个本课核心词汇'},
 {key:'production',label:'我已完成本课口头或书面输出任务'}
] as const;
export function countGuideCompleted(check:PracticeCheck):number{
 return GUIDE_ITEMS.filter(item=>check[item.key]===true).length;
}
export function validateGuideCoverage():{courses:number;errors:string[]}{
 const ids=new Set<string>(),errors:string[]=[];
 for(const unit of units){
  if(ids.has(unit.id))errors.push('Duplicate '+unit.id);
  ids.add(unit.id);
  if(!unit.can_do||!unit.grammar.length||!unit.performance_task||!unit.pronunciation_focus)
   errors.push('Incomplete learning objectives '+unit.id);
  if(unit.prerequisite_unit&&!units.some(u=>u.id===unit.prerequisite_unit))
   errors.push('Unknown prerequisite '+unit.id);
 }
 if(ids.size!==108)errors.push('Expected original 108-course guide inventory');
 return {courses:ids.size,errors};
}
