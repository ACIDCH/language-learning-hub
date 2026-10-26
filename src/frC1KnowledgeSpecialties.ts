import type {SpecialtyLesson} from './specialtyLibrary';
import {FR_C1_GRAMMAR} from './frC1Grammar';
import {FR_C1_VOCABULARY} from './frC1Vocabulary';
import {RECEPTION_LESSONS} from './receptionLessons';
export const FR_C1_KNOWLEDGE:SpecialtyLesson[]=(['grammar','vocabulary'] as const).flatMap(type=>Object.entries(type==='grammar'?FR_C1_GRAMMAR:FR_C1_VOCABULARY).map(([n,sections])=>{
 const unitLink='fr-c1-u'+n,r=RECEPTION_LESSONS[unitLink];
 return {id:'fr-c1-u'+n+'-'+type,type,language:'fr',level:'C1',unitLink,title:'C1 '+n+' · '+r.title+(type==='grammar'?'：论证与句法':'：概念与词义'),subtitle:r.genre,
 prerequisite:'完成本课精读，复习 B2 条件、让步和来源归属；能区分个体经验、总体指标和因果判断。',objective:r.task,sections,
 questions:r.questions.slice(1).map(q=>({question:q.prompt,answer:q.answer,why:q.why})),output:r.task,
 model:r.paragraphs.slice(0,2).map(p=>({target:p.target,zh:p.zh,analysis:'原稿或既有精读完整段落；分析保留来源、程度和方法限制，不增加独立研究或审校结论。'})),
 sourceNote:n==='07'?'依据现有 src/receptionLessons.ts 的 Riveclaire 虚构图书馆案例；保留次数、个体体验、非使用者和同时变化因素的区别。':'项目原稿 content/lesson-drafts/'+unitLink+'.json 及原创情境分析；独立审校尚待完成。',referenceUrls:[],
 } satisfies SpecialtyLesson;
}));
