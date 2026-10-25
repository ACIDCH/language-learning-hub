import {useEffect,useMemo,useState} from 'react';
import type {Session,SupabaseClient} from '@supabase/supabase-js';
import {summarizeProgress,foundationProgressRows,type CourseOverview,type ProgressOverviewRow} from './learningProgress';
import {COURSES,courseRoute} from './v44Courses';
type Props={client:SupabaseClient;session:Session;courses:CourseOverview[];
  savedVersion:number;onContinue:(id:string)=>void};
export default function LearningOverview({client,session,courses,savedVersion,onContinue}:Props){
 const [rows,setRows]=useState<ProgressOverviewRow[]>([]);
 const [loading,setLoading]=useState(true);
 const [error,setError]=useState('');
 useEffect(()=>{
  let active=true;
  setLoading(true);setError('');
  void Promise.all([
    client.from('learning_progress')
     .select('course_id,state,updated_at').eq('user_id',session.user.id)
     .order('updated_at',{ascending:false}).limit(200),
    client.from('foundation_progress')
     .select('lesson_id,completed,updated_at').eq('user_id',session.user.id)
     .order('updated_at',{ascending:false}).limit(100)
   ]).then(([main,foundation])=>{
      if(!active)return;
      setLoading(false);
      if(main.error||foundation.error){
       setError('无法完整读取学习概况：'+(main.error?.message||foundation.error?.message));return;
      }
      setRows([...(main.data||[]) as ProgressOverviewRow[],...foundationProgressRows(foundation.data)]);
   }).catch(error=>{
      if(active){setLoading(false);setError('读取学习概况失败：'+(error instanceof Error?error.message:String(error)));}
   });
  return ()=>{active=false;};
 },[client,session.user.id,savedVersion]);
 const combinedCourses=useMemo(()=>[
  ...courses,...COURSES.filter(c=>c.kind==='foundation'&&!courses.some(existing=>existing.id===c.id))
 ],[courses]);
 const totals=useMemo(()=>summarizeProgress(combinedCourses,rows),[combinedCourses,rows]);
 const recent=combinedCourses.find(c=>c.id===totals.lastCourseId);
 const foundationRecent=COURSES.find(c=>c.id===totals.lastCourseId&&c.kind==='foundation');
 return <section className="learning-overview" aria-label="个人学习概况">
  <div className="learning-summary">
   <div><strong>{totals.saved}</strong><span>已开始课程 / {combinedCourses.length}</span></div>
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
      {foundationRecent?<a href={courseRoute(foundationRecent)}>继续学习</a>:<button type="button" onClick={()=>onContinue(recent.id)}>继续学习 →</button>}
     </>:
     <p>暂无学习记录。打开课程即可开始。</p>}
  </div>

 </section>;
}
