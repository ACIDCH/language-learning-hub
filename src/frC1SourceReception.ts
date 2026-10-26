import type {ReceptionLesson} from './receptionLessons';
import type {LessonDraft} from './v44Courses';
import {FR_C1_ADDITIONS} from './frC1ReceptionAdditions';
const sources=import.meta.glob<LessonDraft>('../content/lesson-drafts/fr-c1-*.json',{eager:true,import:'default'});
const first:Record<string,[string,string]>={
 '01':['为什么迹象优于决定性证明？','投诉下降可能有多种机制解释。'],
 '02':['文中认可无限咨询的什么问题？','可能阻碍行动并维护现状。'],
 '03':['两份资料为何未必互相否定？','人群与汇总层次不同。'],
 '04':['什么交付可立即确认？','不依赖外部数据的独立部分。'],
 '05':['保存烟囱为什么不够？','物体不会自动传达经验与冲突。'],
 '06':['能否单独确定标示效果？','不能，人工辅导没有完全分离。'],
 '08':['改写加入团队有什么作用？','说明行动者、动作及理解对象。'],
};
export const FR_C1_SOURCE_RECEPTION:Record<string,ReceptionLesson>=Object.fromEntries(Object.entries(FR_C1_ADDITIONS).map(([n,a])=>{
 const id='fr-c1-u'+n,d=sources['../content/lesson-drafts/'+id+'.json'];
 return [id,{title:d.title,language:'fr',genre:'C1 · 原稿、推论边界与专业表达',
  paragraphs:[{id:'P1',target:d.reading,zh:a.zh},...a.blocks.map(([target,zh],i)=>({id:'P'+(i+2),target,zh}))],
  questions:[{prompt:d.questions[0].prompt+' / '+first[n][0],answer:d.questions[0].answer+' / '+first[n][1],evidence:['P1'],why:d.questions[0].explanation},...a.questions.map(([prompt,answer,evidence,why])=>({prompt,answer,evidence:[evidence],why}))],
  languageNotes:a.notes.map(([target,zh])=>({target,zh})),
  task:d.context+' 先忠实概括，再用独立一段说明自己的判断及一项真实异议。逐句标出来源、推论、条件与未知事项；修订时解释为什么没有提高证据力度。',
  model:d.reading,modelZh:a.zh,references:[],
 } satisfies ReceptionLesson];
}));
