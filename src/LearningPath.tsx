import {useEffect,useMemo,useState} from 'react';
import type {Session,SupabaseClient} from '@supabase/supabase-js';
import {orderedCourses,planNext,FRENCH_LEVELS,ENGLISH_TRACKS,LEARNING_LADDER,type RoadmapCourse,type RoadmapProgress} from './learningRoadmap';
export default function LearningPath({client,session,courses,onChoose}:{
 client:SupabaseClient;session:Session;courses:RoadmapCourse[];onChoose:(id:string)=>void;
}){
 const [language,setLanguage]=useState<'fr'|'en'>('fr');
 const [level,setLevel]=useState('A1');
 const [track,setTrack]=useState('listening');
 const [progress,setProgress]=useState<RoadmapProgress[]>([]);
 const [note,setNote]=useState('正在读取学习路径…');
 useEffect(()=>{
  let alive=true;
  void client.from('learning_progress').select('course_id,state')
   .eq('user_id',session.user.id).limit(200)
   .then(({data,error})=>{
     if(!alive)return;
     if(error){setNote('个人进度暂时无法读取：'+error.message);return;}
     setProgress((data||[]) as RoadmapProgress[]);
     setNote('');
   });
  return ()=>{alive=false;};
 },[client,session.user.id]);
 const current=useMemo(()=>{
   const ordered=orderedCourses(courses,language,track);
   return language==='fr'?ordered.filter(c=>c.level===level):ordered;
 },[courses,language,level,track]);
 const summary=planNext(current,progress);
 return <section className="cloud-reader" aria-label="语言学习路径">
  <h3>我的语言学习路线</h3>

  <ol className="learning-ladder">
    {LEARNING_LADDER.map(step=><li key={step.label}>
      <strong>{step.label}</strong><span>{step.detail}</span>
    </li>)}
  </ol>
  <div className="path-filters">
    <label>学习语言
      <select value={language} onChange={e=>setLanguage(e.target.value as 'fr'|'en')}>
       <option value="fr">法语（CEFR A1–C2）</option>
       <option value="en">英语（现有 IELTS 技能课程）</option>
      </select>
    </label>
    {language==='fr'?<label>法语等级
      <select value={level} onChange={e=>setLevel(e.target.value)}>
        {FRENCH_LEVELS.map(l=><option key={l} value={l}>{l}</option>)}
      </select>
    </label>:<label>英语技能
      <select value={track} onChange={e=>setTrack(e.target.value)}>
        {ENGLISH_TRACKS.map(t=><option key={t.id} value={t.id}>{t.label}</option>)}
      </select>
    </label>}
  </div>

  <div className="path-progress">
    <strong>当前路径完成 {summary.completed} / {summary.total}</strong>
    {note&&<span role="status">{note}</span>}
  </div>
  {summary.next&&<button type="button" onClick={()=>onChoose(summary.next!.id)}>
    继续下一课：{summary.next.title} →
  </button>}
  <div className="path-units">
    {current.map(c=><button type="button" key={c.id} onClick={()=>onChoose(c.id)}>
      <span className="path-unit-id">{c.language.toUpperCase()} · {c.level} · U{String(c.unit).padStart(2,'0')}</span>
      <strong>{c.title}</strong>
      <small>{progress.some(p=>p.course_id===c.id&&Boolean(p.state&&typeof p.state==='object'&&(p.state as {completed?:boolean}).completed))?'已标记完成':'继续学习'}</small>
    </button>)}
  </div>
 </section>;
}
