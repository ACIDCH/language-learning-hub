import {englishFoundation} from './foundationEnglish.ts';
import {frenchFoundation} from './foundationFrench.ts';
import {englishBridge} from './foundationEnglishBridge.ts';
import {frenchBridge} from './foundationFrenchBridge.ts';
import type {FoundationUnit,FoundationLanguage} from './foundationTypes';
export const FOUNDATION_UNITS:FoundationUnit[]=[...englishFoundation,...englishBridge,...frenchFoundation,...frenchBridge];
export const FOUNDATION_PHASES=[
 '字母、语音与拼读',
 '数字、问候与核心词汇',
 '基础句型与语法',
 '短句组织与段落',
 '复杂句、过去与未来',
 '综合表达与写作'
] as const;
export function foundationUnitsFor(language:FoundationLanguage){
 return FOUNDATION_UNITS.filter(unit=>unit.language===language);
}
export function foundationById(id:string):FoundationUnit|undefined{
 return FOUNDATION_UNITS.find(unit=>unit.id===id);
}
export function validateFoundationUnits(units:FoundationUnit[]){
 const ids=new Set<string>(),errors:string[]=[];
 const perLang:Record<FoundationLanguage,number>={en:0,fr:0};
 for(const unit of units){
  if(ids.has(unit.id))errors.push('Duplicate ID '+unit.id);
  ids.add(unit.id);
  if(!/^(en|fr)-fnd-(0[1-9]|1[0-9]|2[0-4])$/.test(unit.id))errors.push('Bad ID '+unit.id);
  if(!['en','fr'].includes(unit.language))errors.push('Bad language '+unit.id);
  else perLang[unit.language]++;
  if(!unit.title||!unit.goal||unit.concepts.length!==3||unit.examples.length!==3||
    unit.vocab.length<4||unit.questions.length!==2||
    !unit.reading||!unit.listening||!unit.production||!unit.pronunciation)
    errors.push('Incomplete teaching segments '+unit.id);
  if(unit.questions.some(q=>q.choices.length!==3||!Number.isInteger(q.answer)||
      q.answer<0||q.answer>2||!q.explanation||!q.prompt))
    errors.push('Invalid self-check '+unit.id);
 }
 if(perLang.en!==24||perLang.fr!==24)errors.push('Expected 24 original units for each language');
 return errors;
}
