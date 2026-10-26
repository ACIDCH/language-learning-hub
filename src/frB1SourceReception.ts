import type {ReceptionLesson} from './receptionLessons';
import type {LessonDraft} from './v44Courses';
import {FR_B1_ADDITIONS} from './frB1ReceptionAdditions';
const sources=import.meta.glob<LessonDraft>('../content/lesson-drafts/fr-b1-*.json',{eager:true,import:'default'});
const first:Record<string,[string,string]>={
 '01':['哪件事先于故障？','修车师傅检查车辆。'],
 '02':['作者在哪点承认商家需求？','承认其忧虑值得考虑。'],
 '03':['没有额外资金时，提出什么方案？','现有房间每月办一次。'],
 '04':['记笔记是否强制？','不是，只是建议。'],
 '05':['哪项信息被纠正？','所谓永久关闭；实际说的是周一施工。'],
 '06':['请求由什么问题引起？','会议与接待新客户的时间冲突。'],
 '07':['作者声称知道所有原因吗？','没有，明确承认不知道全部原因。'],
 '08':['兄弟的体验完全相同吗？','不同，他以另一方式经历。'],
 '09':['邻近例子为什么不够？','距离与道路安全条件可能不同。'],
 '10':['哪部分投诉尚未确认？','午夜后的噪声来源。'],
};
export const FR_B1_SOURCE_RECEPTION:Record<string,ReceptionLesson>=Object.fromEntries(Object.entries(FR_B1_ADDITIONS).map(([n,a])=>{
 const id='fr-b1-u'+n,d=sources['../content/lesson-drafts/'+id+'.json'];
 return [id,{title:d.title,language:'fr',genre:'B1 · 原稿、情境深化与证据分析',
  paragraphs:[{id:'P1',target:d.reading,zh:a.zh},...a.blocks.map(([target,zh],i)=>({id:'P'+(i+2),target,zh}))],
  questions:[{prompt:d.questions[0].prompt+' / '+first[n][0],answer:d.questions[0].answer+' / '+first[n][1],evidence:['P1'],why:d.questions[0].explanation},...a.questions.map(([prompt,answer,evidence,why])=>({prompt,answer,evidence:[evidence],why}))],
  languageNotes:a.notes.map(([target,zh])=>({target,zh})),
  task:d.context+' 先复述原稿，再写一段个人回应：明确事实、个人判断和待核实条件。用本课结构说明至少一个具体理由，并复查人物、时序及信息范围。',
  model:d.reading,modelZh:a.zh,references:[],
 } satisfies ReceptionLesson];
}));
