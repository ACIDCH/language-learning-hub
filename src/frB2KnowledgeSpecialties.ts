import type {SpecialtyLesson} from './specialtyLibrary';
import {FR_B2_GRAMMAR} from './frB2Grammar';
import {FR_B2_VOCABULARY} from './frB2Vocabulary';
import {RECEPTION_LESSONS} from './receptionLessons';
export const FR_B2_KNOWLEDGE:SpecialtyLesson[]=(['grammar','vocabulary'] as const).flatMap(type=>Object.entries(type==='grammar'?FR_B2_GRAMMAR:FR_B2_VOCABULARY).map(([n,sections])=>{
 const unitLink='fr-b2-u'+n,r=RECEPTION_LESSONS[unitLink];
 return {id:'fr-b2-u'+n+'-'+type,type,language:'fr',level:'B2',unitLink,title:'B2 '+n+' · '+r.title+(type==='grammar'?'：句法与论证':'：语义与搭配'),subtitle:r.genre,
 prerequisite:'完成本课精读并能辨认陈述、建议、条件与来源归属；复习 B1 的指代和时态。',objective:r.task,sections,
 questions:r.questions.slice(1).map(q=>({question:q.prompt,answer:q.answer,why:q.why})),output:r.task,
 model:r.paragraphs.slice(0,2).map(p=>({target:p.target,zh:p.zh,analysis:'保留本课精读的完整信息和条件；教学分析不增加实测结果、批准决定或来源未给的数据。'})),
 sourceNote:n==='03'?'主例依据现有 src/receptionLessons.ts 的 Valmont 市政阅读；花园调查仅作为 content/lesson-drafts/fr-b2-u03.json 的独立迁移例，二者数据不混用。':'项目原稿 content/lesson-drafts/'+unitLink+'.json 与原创教学补充；独立审校尚待完成。',referenceUrls:[],
 } satisfies SpecialtyLesson;
}));
