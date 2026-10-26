import type {SpecialtyLesson,SpecialtyKind,SpecialtyLanguage} from './specialtyLibrary';

const PATH_ORDER:Record<SpecialtyLanguage,Record<SpecialtyKind,string[]>>={
 fr:{
  grammar:['fr-etre','fr-a1-countries-languages-grammar','fr-avoir','fr-possessive-determiners-a1','fr-articles','fr-er','fr-questions-a1','fr-a1-leisure-verbs','fr-a1-market-quantities-grammar','fr-imperative-directions-a1','fr-adjective-agreement-a1',
   'fr-futur-proche-a1','fr-a1-first-past-grammar','fr-articles-partitive','fr-passe-compose','fr-imparfait-a2','fr-a2-route-modals-grammar','fr-a2-symptoms-advice-grammar','fr-object-pronouns-a2','fr-comparisons-a2','fr-futur-simple-a2','fr-negative-scope-a2','fr-a2-u08-grammar','fr-a2-u09-grammar','fr-a2-u10-grammar','fr-a2-u11-grammar','fr-a2-u12-grammar',
   'fr-pluperfect-narration-b1','fr-conditional-hypothesis-b1','fr-subjunctive-b1','fr-relative-pronouns-b1','fr-b1-u02-grammar','fr-b1-u05-grammar','fr-b1-u06-grammar','fr-b1-u07-grammar','fr-b1-u08-grammar','fr-b1-u09-grammar','fr-b1-u10-grammar','fr-mood-concession-b2','fr-past-conditional-regret-b2','fr-b2-reported-news-reading','fr-b2-formal-argument-writing','fr-b2-u02-grammar','fr-b2-u05-grammar','fr-b2-u07-grammar','fr-b2-u08-grammar','fr-b2-u09-grammar','fr-b2-u10-grammar','fr-c1-u01-grammar','fr-c1-u02-grammar','fr-c1-u03-grammar','fr-c1-u04-grammar','fr-c1-u05-grammar','fr-c1-u06-grammar','fr-c1-u07-grammar','fr-c1-u08-grammar','fr-c2-u01-grammar','fr-c2-u02-grammar','fr-c2-u03-grammar','fr-c2-u04-grammar','fr-c2-u05-grammar','fr-c2-u06-grammar','fr-c2-u07-grammar','fr-c2-u08-grammar'],
  vocabulary:['fr-greetings','fr-campus-vocab','fr-a1-clarification-lexicon','fr-countries-languages-lexicon','fr-family','fr-objects','fr-room',
   'fr-routines-lexicon','fr-a1-leisure-choice-vocabulary','fr-a1-market-service-vocabulary','fr-a1-shared-home-lexicon','fr-a1-near-future-planning-lexicon','fr-a1-yesterday-journey-lexicon','fr-directions-lexicon','fr-a2-station-change-lexicon','fr-a2-appointment-symptoms-lexicon','fr-food-vocab','fr-past-events-lexicon','fr-shop-services-lexicon','fr-opinions-lexicon','fr-b1-argument-lexicon','fr-precise-academic-lexicon-c1','fr-c1-cross-source-synthesis','fr-c1-media-stance-reading']
 },
 en:{
  grammar:['en-contrast','en-conditionals','en-signposts','en-listening-paraphrase-scope','en-modals','en-reported-speech-listening','en-listening-u04-route-reference-grammar','en-listening-u05-correction-scope-grammar','en-listening-u06-word-class-completion-grammar','en-u07-dialogue-reference-grammar','en-u08-evidence-hedging-grammar','en-academic-passive',
   'en-relative-clauses','en-reading-evidence-scope-u02','en-ielts-tfng-scope-grammar-u04','en-reading-u05-reference-logic','en-reading-u06-hedging-inference','en-reading-u07-information-matching-logic','en-reading-u08-two-source-synthesis','en-task1-u01-overview-evidence-grammar','en-task1-u02-trend-scope-grammar','en-task1-u06-map-reference-grammar','en-task1-u07-cohesion-scope-grammar','en-task1-u08-revision-scope-grammar','en-task1-u03-comparison-grammar','en-task1-u04-shares-grammar','en-process-report-grammar','en-task2-u01-question-thesis-grammar','en-task2-u02-reasoning-chain-grammar','en-task2-contrast-cohesion','en-task2-u04-discussion-stance-grammar','en-task2-u05-outweigh-conditions-grammar','en-task2-u06-cause-mechanism-grammar','en-task2-u07-reference-causality-grammar','en-task2-u08-hedging-scope-grammar','en-lecture-hedging'],
  vocabulary:['en-signpost-vocab','en-study-vocab','en-listening-note-lexicon','en-stance-lexicon-listening','en-listening-u04-site-process-lexicon','en-listening-u05-booking-revision-lexicon','en-listening-u06-lab-record-lexicon','en-u07-method-negotiation-lexicon','en-u08-memory-synthesis-lexicon','en-task1-u01-unit-precision-lexicon','en-task1-trend-lexicon','en-task1-u03-comparison-lexicon','en-task1-u04-allocation-lexicon','en-task1-u05-recycling-process-lexicon','en-task1-u07-borrowing-cohesion-lexicon','en-task1-u08-precision-editing-lexicon','en-lecture-terms',
   'en-evidence-vocab','en-reading-u01-learning-evidence-lexicon','en-reading-research-evidence-lexicon-u02','en-ielts-heading-paragraph-function-lexicon','en-reading-u05-retrofit-lexicon','en-reading-u06-science-caution-lexicon','en-reading-u07-survey-method-lexicon','en-reading-u08-access-equity-lexicon','en-academic-collocations','en-map-change-lexicon','en-reading-evidence-lexicon','en-task2-u01-online-learning-lexicon','en-task2-reason-evidence-vocab','en-task2-u03-fair-rebuttal-lexicon','en-task2-u04-curriculum-judgement-lexicon','en-task2-u05-public-access-lexicon','en-task2-u06-solution-evaluation-lexicon','en-task2-u07-access-coherence-lexicon','en-task2-u08-register-precision-lexicon']
 }
};
const LEVEL_RANK:Record<string,number>={'Pre-A1':-1,A1:0,A2:1,B1:2,B2:3,C1:4,C2:5};
/** Order follows authored prerequisite progression inside each language/type; CEFR remains a level label, not a formal certification. */
export function orderedSpecialties(units:SpecialtyLesson[]):SpecialtyLesson[]{
 return [...units].sort((a,b)=>{
  if(a.language!==b.language)return a.language==='fr'?-1:1;
  if(a.type!==b.type)return a.type==='grammar'?-1:1;
  const l=(LEVEL_RANK[a.level]??99)-(LEVEL_RANK[b.level]??99);
  if(l)return l;
  const af=a.unitLink.includes('-fnd-'),bf=b.unitLink.includes('-fnd-');
  if(af!==bf)return af?-1:1;
  if(af&&bf)return a.unitLink.localeCompare(b.unitLink);
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
