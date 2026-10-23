import type {SpecialtyLesson} from './specialtyLibrary';
import {FR_A2_GRAMMAR,FR_A2_VOCABULARY} from './frA2Knowledge';
import {FR_A2_SOURCE_RECEPTION} from './frA2SourceReception';
export const FR_A2_KNOWLEDGE:SpecialtyLesson[]=(['grammar','vocabulary'] as const).flatMap(type=>Object.entries(type==='grammar'?FR_A2_GRAMMAR:FR_A2_VOCABULARY).map(([n,sections])=>{
 const unitLink='fr-a2-u'+n,r=FR_A2_SOURCE_RECEPTION[unitLink];
 return {id:'fr-a2-u'+n+'-'+type,type,language:'fr',level:'A2',unitLink,title:'A2 '+n+' · '+r.title+(type==='grammar'?'：语法与句意':'：词义与搭配'),subtitle:r.genre,
 prerequisite:'先阅读本课原稿 P1；能够辨认法语句子的主语与现在时。',objective:r.task,sections,
 questions:r.questions.slice(1).map(q=>({question:q.prompt,answer:q.answer,why:q.why})),output:r.task,
 model:r.paragraphs.slice(0,2).map(p=>({target:p.target,zh:p.zh,analysis:p.id==='P1'?'保留原稿信息与顺序的完整表达示范。':'原创后续情境，练习词句功能与信息范围；不冒充原稿新增事实。'})),
 sourceNote:'原稿 content/lesson-drafts/'+unitLink+'.json；词句分析和后续情境为项目原创教学补充，尚待独立审校。',referenceUrls:[],
 } satisfies SpecialtyLesson;
}));
