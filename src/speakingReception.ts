import type {ReceptionLesson} from './receptionLessons';
import type {LessonDraft} from './v44Courses';
import {SPEAKING_ADDITIONS} from './speakingReceptionAdditions';
const sources=import.meta.glob<LessonDraft>('../content/lesson-drafts/en-ielts-speaking-*.json',{eager:true,import:'default'});
const firstQuestions:Record<string,[string,string]>={
 '01':['什么条件会改变说话者的地点偏好？','需要大声排练演讲。'],
 '02':['哪个细节让例子具体？','做蔬菜汤，并调整调味。'],
 '03':['哪个动作发生在公交车故障之前？','说话者此前出门早。'],
 '04':['什么行为支持“友好”的评价？','志愿者注意到犹豫，并解释准备步骤。'],
 '05':['偏好为什么改变？','说话者搬到了离工作地点更近的地方。'],
 '06':['说话者提出什么评价标准？','人们能否建立合理界限。'],
 '07':['第一句中与咖啡对比的词是什么？','茶。'],
 '08':['自我修正改变了什么？','从所有设施延时开放，改为基本服务考虑当地需求。'],
};
export const SPEAKING_RECEPTION:Record<string,ReceptionLesson>=Object.fromEntries(Object.entries(SPEAKING_ADDITIONS).map(([id,a])=>{
 const source=sources['../content/lesson-drafts/'+id+'.json'];
 const q=source.questions[0],translation=firstQuestions[id.slice(-2)];
 return [id,{
  title:source.title,language:'en',genre:'原稿口语示范与原创追问练习',
  paragraphs:[{id:'P1',target:source.reading,zh:a.zh},...a.followups.map(([target,zh],i)=>({id:'P'+(i+2),target,zh}))],
  questions:[{prompt:q.prompt+' / '+translation[0],answer:q.answer+' / '+translation[1],evidence:['P1'],why:q.explanation+' 对照 P1 的完整回答，保留说话者给出的具体理由与限定。'},
   ...a.questions.map(([prompt,answer,evidence,why])=>({prompt,answer,evidence:[evidence],why}))],
  languageNotes:a.notes.map(([target,zh])=>({target,zh})),
  task:source.context+' 先用 45–60 秒回答，再根据 P2–P4 的追问作出说明。最后写下自己修改的一处表达及理由。',
  model:source.reading,modelZh:a.zh,references:[],
 } satisfies ReceptionLesson];
}));
