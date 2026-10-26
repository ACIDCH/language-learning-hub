import type {ReceptionLesson} from './receptionLessons';
import type {LessonDraft} from './v44Courses';
import {FR_B2_ADDITIONS} from './frB2ReceptionAdditions';
const sources=import.meta.glob<LessonDraft>('../content/lesson-drafts/fr-b2-*.json',{eager:true,import:'default'});
const first:Record<string,[string,string]>={
 '01':['作者完全反对收费吗？','没有，是以替代交通和评估为条件支持。'],
 '02':['最终提出什么标准？','合作质量。'],
 '04':['为什么 aurait pu 更谨慎？','表达可能，而非反事实的确定结果。'],
 '05':['为什么统一观测条件？','避免把时间或天气差异混为地点效果。'],
 '06':['汇报会是否推迟？','没有，保留原安排。'],
 '07':['哪项指标单独不够？','入场次数。'],
 '08':['为何检查不同权重？','看排名是否强烈依赖优先选择。'],
 '09':['达成的共识是什么？','沟通已验证阶段，并确定复核未决点的日期。'],
 '10':['明确共同点是什么？','两份材料均认可需要。'],
};
export const FR_B2_SOURCE_RECEPTION:Record<string,ReceptionLesson>=Object.fromEntries(Object.entries(FR_B2_ADDITIONS).map(([n,a])=>{
 const id='fr-b2-u'+n,d=sources['../content/lesson-drafts/'+id+'.json'];
 return [id,{title:d.title,language:'fr',genre:'B2 · 原稿与有条件的论证',
  paragraphs:[{id:'P1',target:d.reading,zh:a.zh},...a.blocks.map(([target,zh],i)=>({id:'P'+(i+2),target,zh}))],
  questions:[{prompt:d.questions[0].prompt+' / '+first[n][0],answer:d.questions[0].answer+' / '+first[n][1],evidence:['P1'],why:d.questions[0].explanation},...a.questions.map(([prompt,answer,evidence,why])=>({prompt,answer,evidence:[evidence],why}))],
  languageNotes:a.notes.map(([target,zh])=>({target,zh})),
  task:d.context+' 依据 P1 写一份短评或回应，再指出支持理由、来源、条件和仍未知的信息。区分忠实概述与自己的判断，修改一次过度概括并解释理由。',
  model:d.reading,modelZh:a.zh,references:[],
 } satisfies ReceptionLesson];
}));
