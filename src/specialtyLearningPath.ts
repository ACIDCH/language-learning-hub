import type {SpecialtyLesson,SpecialtyKind,SpecialtyLanguage} from './specialtyLibrary';

const PATH_ORDER:Record<SpecialtyLanguage,Record<SpecialtyKind,string[]>>={
 fr:{
  grammar:['fr-etre','fr-avoir','fr-possessive-determiners-a1','fr-articles','fr-er','fr-questions-a1','fr-imperative-directions-a1','fr-adjective-agreement-a1',
   'fr-futur-proche-a1','fr-articles-partitive','fr-passe-compose','fr-imparfait-a2','fr-object-pronouns-a2','fr-comparisons-a2','fr-futur-simple-a2','fr-negative-scope-a2',
   'fr-conditional-hypothesis-b1','fr-subjunctive-b1','fr-relative-pronouns-b1','fr-mood-concession-b2'],
  vocabulary:['fr-greetings','fr-campus-vocab','fr-countries-languages-lexicon','fr-family','fr-objects','fr-room',
   'fr-routines-lexicon','fr-directions-lexicon','fr-food-vocab','fr-past-events-lexicon','fr-shop-services-lexicon','fr-opinions-lexicon','fr-b1-argument-lexicon','fr-precise-academic-lexicon-c1']
 },
 en:{
  grammar:['en-contrast','en-conditionals','en-signposts','en-modals','en-reported-speech-listening','en-academic-passive',
   'en-relative-clauses','en-task2-contrast-cohesion','en-lecture-hedging'],
  vocabulary:['en-signpost-vocab','en-study-vocab','en-stance-lexicon-listening','en-task1-trend-lexicon','en-lecture-terms',
   'en-evidence-vocab','en-academic-collocations','en-reading-evidence-lexicon','en-task2-reason-evidence-vocab']
 }
};
const LEVEL_RANK:Record<string,number>={A1:0,A2:1,B1:2,B2:3,C1:4,C2:5};
/** Order follows authored prerequisite progression inside each language/type; CEFR remains a level label, not a formal certification. */
export function orderedSpecialties(units:SpecialtyLesson[]):SpecialtyLesson[]{
 return [...units].sort((a,b)=>{
  if(a.language!==b.language)return a.language==='fr'?-1:1;
  if(a.type!==b.type)return a.type==='grammar'?-1:1;
  const l=(LEVEL_RANK[a.level]??99)-(LEVEL_RANK[b.level]??99);
  if(l)return l;
  const order=PATH_ORDER[a.language][a.type];
  const x=order.indexOf(a.id),y=order.indexOf(b.id);
  if(x!==y)return (x===-1?999:x)-(y===-1?999:y);
  return a.title.localeCompare(b.title);
 });
}
export function adjacentSpecialties(unit:SpecialtyLesson,all:SpecialtyLesson[]){
 const path=orderedSpecialties(all.filter(x=>x.type===unit.type&&x.language===unit.language));
 const i=path.findIndex(x=>x.id===unit.id);
 return {previous:i>0?path[i-1]:null,next:i>=0&&i<path.length-1?path[i+1]:null};
}
/** Nearby study units in the other knowledge track are relevant only when actually authored and linked to the same original course. */
export function pairedSpecialties(unit:SpecialtyLesson,all:SpecialtyLesson[]){
 return orderedSpecialties(all.filter(x=>x.language===unit.language&&x.type!==unit.type&&x.unitLink===unit.unitLink));
}
