import type {SpecialtyLesson} from './specialtyLibrary';
import {FR_B1_GRAMMAR} from './frB1Grammar';
import {FR_B1_VOCABULARY} from './frB1Vocabulary';
import {FR_B1_SOURCE_RECEPTION} from './frB1SourceReception';
export const FR_B1_KNOWLEDGE:SpecialtyLesson[]=(['grammar','vocabulary'] as const).flatMap(type=>Object.entries(type==='grammar'?FR_B1_GRAMMAR:FR_B1_VOCABULARY).map(([n,sections])=>{
 const unitLink='fr-b1-u'+n,r=FR_B1_SOURCE_RECEPTION[unitLink];
 return {id:'fr-b1-u'+n+'-'+type,type,language:'fr',level:'B1',unitLink,title:'B1 '+n+' · '+r.title+(type==='grammar'?'：句法与语义':'：词义与搭配'),subtitle:r.genre,
 prerequisite:'先完成本课原稿 P1；能够区分现在、过去、未来和人物指代。',objective:r.task,sections,
 questions:r.questions.slice(1).map(q=>({question:q.prompt,answer:q.answer,why:q.why})),output:r.task,
 model:r.paragraphs.slice(0,2).map(p=>({target:p.target,zh:p.zh,analysis:p.id==='P1'?'保留原稿完整情境、人物与逻辑关系。':'原创情境深化，说明形式和意义怎样共同作用；不冒充外部教材或实测结果。'})),
 sourceNote:'对应项目原稿 content/lesson-drafts/'+unitLink+'.json；教学扩展与例句为原创，独立审校待完成。',referenceUrls:[],
 } satisfies SpecialtyLesson;
}));
