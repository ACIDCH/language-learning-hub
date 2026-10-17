export type RoadmapCourse={id:string;language:string;level:string;track:string|null;title:string;unit:number};
export type RoadmapProgress={course_id:string;state:unknown};
export const FRENCH_LEVELS=['A1','A2','B1','B2','C1','C2'];
export const ENGLISH_TRACKS=[
 {id:'language-upgrade',label:'语言能力提升'},
 {id:'listening',label:'IELTS 听力'},
 {id:'reading',label:'IELTS 阅读'},
 {id:'speaking',label:'IELTS 口语'},
 {id:'writing-task1',label:'IELTS 写作 Task 1'},
 {id:'writing-task2',label:'IELTS 写作 Task 2'}];
export function orderedCourses(courses:RoadmapCourse[],language:'fr'|'en',track?:string){
 return courses.filter(c=>c.language===language&&(language==='fr'||c.track===track))
 .sort((a,b)=>{
   if(language==='fr')return FRENCH_LEVELS.indexOf(a.level)-FRENCH_LEVELS.indexOf(b.level)||a.unit-b.unit;
   return a.unit-b.unit;
 });
}
export function planNext(courses:RoadmapCourse[],progress:RoadmapProgress[]){
 const done=new Set(progress.filter(p=>Boolean(p.state&&typeof p.state==='object'&&
   !Array.isArray(p.state)&&(p.state as {completed?:unknown}).completed===true)).map(p=>p.course_id));
 const next=courses.find(c=>!done.has(c.id))||null;
 return {next,completed:courses.filter(c=>done.has(c.id)).length,total:courses.length};
}
export const LEARNING_LADDER=[
 {label:'声音与文字',detail:'先听范读、认识字母与音节，再练语音与拼写'},
 {label:'核心词汇',detail:'按主题学习词义、词性、搭配与真实用法'},
 {label:'常用短句',detail:'从简单句和问答开始建立句型'},
 {label:'短段落',detail:'连接多个句子，训练结构和衔接'},
 {label:'长难句',detail:'分析从句、时态、语气和复杂表达'},
 {label:'短文与真实任务',detail:'练习完整表达、阅读、听力和写作'}
];
