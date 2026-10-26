import type {ReceptionLesson} from './receptionLessons';
import type {LessonDraft} from './v44Courses';
import {FR_A2_ADDITIONS} from './frA2ReceptionAdditions';
const sources=import.meta.glob<LessonDraft>('../content/lesson-drafts/fr-a2-*.json',{eager:true,import:'default'});
const first:Record<string,[string,string]>={
 '01':['她们为什么进咖啡馆？','因为开始下雨。'],
 '02':['哪项是一次性的事件？','发现一条旧船。'],
 '04':['Léa 要把钥匙交给谁？','交给她的邻居。'],
 '06':['为什么选灰包？','它能装下电脑和文件。'],
 '07':['下雨在哪里吃？','在客厅。'],
 '08':['为什么提议试一个月？','先观察来访情况，再考虑长期决定。'],
 '09':['所有人都免费办卡吗？','原文只说本市镇居民免费。'],
 '10':['申请人现在还在小企业工作吗？','原文没有说明，只描述去年夏天六周的工作。'],
 '11':['花园已经开放了吗？','没有，工程尚未结束。'],
 '12':['遇到不认识的食材，叙述者怎么做？','把食材记下来。'],
};
export const FR_A2_SOURCE_RECEPTION:Record<string,ReceptionLesson>=Object.fromEntries(Object.entries(FR_A2_ADDITIONS).map(([n,a])=>{
 const id='fr-a2-u'+n,d=sources['../content/lesson-drafts/'+id+'.json'];
 return [id,{title:d.title,language:'fr',genre:'A2 · 原稿与连贯情境扩展',
  paragraphs:[{id:'P1',target:d.reading,zh:a.zh},...a.blocks.map(([target,zh],i)=>({id:'P'+(i+2),target,zh}))],
  questions:[{prompt:d.questions[0].prompt+' / '+first[n][0],answer:d.questions[0].answer+' / '+first[n][1],evidence:['P1'],why:d.questions[0].explanation},...a.questions.map(([prompt,answer,evidence,why])=>({prompt,answer,evidence:[evidence],why}))],
  languageNotes:a.notes.map(([target,zh])=>({target,zh})),
  task:d.context+' 先依据 P1 复述，再以自己的情境写六至十句。区别原故事的事实与个人改编；检查本课结构和信息范围。',
  model:d.reading,modelZh:a.zh,references:[],
 } satisfies ReceptionLesson];
}));
