import type {SpecialtyLesson} from './specialtyLibrary';
import {FR_C2_GRAMMAR} from './frC2Grammar';
import {FR_C2_VOCABULARY} from './frC2Vocabulary';
import {RECEPTION_LESSONS} from './receptionLessons';
export const FR_C2_KNOWLEDGE:SpecialtyLesson[]=(['grammar','vocabulary'] as const).flatMap(type=>Object.entries(type==='grammar'?FR_C2_GRAMMAR:FR_C2_VOCABULARY).map(([n,sections])=>{
 const unitLink='fr-c2-u'+n,r=RECEPTION_LESSONS[unitLink];
 return {id:'fr-c2-u'+n+'-'+type,type,language:'fr',level:'C2',unitLink,title:'C2 '+n+' · '+r.title+(type==='grammar'?'：形式、语用与范围':'：概念、语域与辨析'),subtitle:r.genre,
 prerequisite:'先完成本课精读；复习 C1 来源归属、认识情态与证据层次，区分字面命题与解释。',objective:r.task,sections,
 questions:r.questions.slice(1).map(q=>({question:q.prompt,answer:q.answer,why:q.why})),output:r.task,
 model:r.paragraphs.slice(0,2).map(p=>({target:p.target,zh:p.zh,analysis:'保留来源的完整命题与文体边界；多种解读需分别给依据，不把推论、文学感觉或模拟数据变成事实。'})),
 sourceNote:n==='03'?'依据现有 src/receptionLessons.ts 的 Ormes 车站 A1/A2/B1/B2 跨体裁资料，段落键保持；文学感受不等于档案日期。':'依据项目原稿 content/lesson-drafts/'+unitLink+'.json 和原创教学补充；不声称真实研究或独立人工审核。',referenceUrls:[],
 } satisfies SpecialtyLesson;
}));
