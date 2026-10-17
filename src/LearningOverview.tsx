import {useEffect,useMemo,useState} from 'react';
import type {Session,SupabaseClient} from '@supabase/supabase-js';
import {summarizeProgress,type CourseOverview,type ProgressOverviewRow} from './learningProgress';
type Props={client:SupabaseClient;session:Session;courses:CourseOverview[];
  savedVersion:number;onContinue:(id:string)=>void};
export default function LearningOverview({client,session,courses,savedVersion,onContinue}:Props){
 const [rows,setRows]=useState<ProgressOverviewRow[]>([]);
 const [loading,setLoading]=useState(true);
 const [error,setError]=useState('');
 useEffect(()=>{
  let active=true;
  setLoading(true);setError('');
  void client.from('learning_progress')
    .select('course_id,state,updated_at').eq('user_id',session.user.id)
    .order('updated_at',{ascending:false}).limit(200)
    .then(({data,error})=>{
       if(!active)return;
       setLoading(false);
       if(error){setError('无法读取学习概况：'+error.message);return;}
       setRows((data||[]) as ProgressOverviewRow[]);
    });
  return ()=>{active=false;};
 },[client,session.user.id,savedVersion]);
 const totals=useMemo(()=>summarizeProgress(courses,rows),[courses,rows]);
 const recent=courses.find(c=>c.id===totals.lastCourseId);
 return <section className="learning-overview" aria-label="个人学习概况">
  <div className="learning-summary">
   <div><strong>{totals.saved}</strong><span>已开始课程 / {courses.length}</span></div>
   <div><strong>{totals.completed}</strong><span>标记已完成</span></div>
   <div><strong>{totals.englishSaved}</strong><span>英语已有学习进度</span></div>
   <div><strong>{totals.frenchSaved}</strong><span>法语已有学习进度</span></div>
  </div>
  <div className="learning-continue">
   {loading?<p>正在读取上次学习位置…</p>:
     error?<p role="status">{error}</p>:
     recent?<><div>
       <strong>继续上次学习：{recent.title}</strong>
       <p>{recent.language.toUpperCase()} · {recent.level} · 上次保存于 {new Date(totals.lastSavedAt!).toLocaleString()}</p>
      </div>
      <button type="button" onClick={()=>onContinue(recent.id)}>继续学习 →</button>
     </>:
     <p>尚未保存学习进度。完成一节练习后点击「保存到 Supabase」，这里会显示最近学习的课程。</p>}
  </div>
  <p className="cloud-disclaimer">以上数字只表示你保存的学习进度，不表示课程已完成教学审校。</p>
 </section>;
}
