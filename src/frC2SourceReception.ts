import type {ReceptionLesson} from './receptionLessons';
import type {LessonDraft} from './v44Courses';
import {FR_C2_ADDITIONS} from './frC2ReceptionAdditions';
const sources=import.meta.glob<LessonDraft>('../content/lesson-drafts/fr-c2-*.json',{eager:true,import:'default'});
const first:Record<string,[string,string]>={
 '01':['为何不能自动量化分歧？','语用力度取决于体裁与情境。'],
 '02':['什么须跨语域保持？','人群、结果、方法和限制。'],
 '04':['哪项补充削弱马上离场的推断？','她会开车回家。'],
 '05':['紧日程对应什么条件？','首批交付范围稳定。'],
 '06':['语料是什么性质？','为练习构造的虚构资料。'],
 '07':['laissait 有什么作用？','建立重复习惯。'],
 '08':['个人标准放哪里？','讨论中，并明确标出属于个人。'],
};
export const FR_C2_SOURCE_RECEPTION:Record<string,ReceptionLesson>=Object.fromEntries(Object.entries(FR_C2_ADDITIONS).map(([n,a])=>{
 const id='fr-c2-u'+n,d=sources['../content/lesson-drafts/'+id+'.json'];
 return [id,{title:d.title,language:'fr',genre:'C2 · 语用、语域与可追溯论证',
  paragraphs:[{id:'P1',target:d.reading,zh:a.zh},...a.blocks.map(([target,zh],i)=>({id:'P'+(i+2),target,zh}))],
  questions:[{prompt:d.questions[0].prompt+' / '+first[n][0],answer:d.questions[0].answer+' / '+first[n][1],evidence:['P1'],why:d.questions[0].explanation},...a.questions.map(([prompt,answer,evidence,why])=>({prompt,answer,evidence:[evidence],why}))],
  languageNotes:a.notes.map(([target,zh])=>({target,zh})),
  task:d.context+' 完成忠实摘要、独立评论与面向非专业读者的说明。逐项记录哪些词形改变、哪些命题范围不变；允许多种有文本依据的解释，不补造意图、材料或研究结论。',
  model:d.reading,modelZh:a.zh,references:[],
 } satisfies ReceptionLesson];
}));
