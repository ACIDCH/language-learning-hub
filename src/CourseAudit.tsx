import {useEffect,useMemo,useState} from 'react';
import type {SupabaseClient,Session} from '@supabase/supabase-js';

type QA={course_id:string;qa_status:string;char_count:number;has_six_stage_markers:boolean;
  has_answer_markers:boolean;has_extended_text:boolean;hash_recorded:boolean};
export default function CourseAudit({client,session,onSelect,refreshVersion}:{
 client:SupabaseClient;session:Session;onSelect:(id:string)=>void;refreshVersion:number;
}){
 const [rows,setRows]=useState<QA[]>([]);
 const [status,setStatus]=useState('正在读取课程结构验收指标…');
 const [filter,setFilter]=useState<'all'|'attention'|'structure'>('attention');
 useEffect(()=>{
   let alive=true;
   void client.from('lesson_qa_structure')
    .select('course_id,qa_status,char_count,has_six_stage_markers,has_answer_markers,has_extended_text,hash_recorded')
    .order('course_id')
    .then(({data,error})=>{
      if(!alive)return;
      if(error){setStatus('结构检查暂不可用：'+error.message);return;}
      setRows((data||[]) as QA[]);
      setStatus('');
    });
   return ()=>{alive=false;};
 },[client,session.user.id,refreshVersion]);
 const structural=useMemo(()=>rows.filter(r=>!r.has_six_stage_markers||!r.has_answer_markers||
     !r.hash_recorded),[rows]);
 const flagged=useMemo(()=>rows.filter(r=>r.qa_status!=='approved'),[rows]);
 const visible=(filter==='attention'?flagged:filter==='structure'?structural:rows).slice(0,120);
 return <section className="cloud-reader" aria-label="课程质量结构审计">
  <h3>课程结构检查</h3>
  {status&&<p role="status">{status}</p>}
  <div className="qa-stats">
   <span>已入库：<strong>{rows.length}</strong></span>
   <span>六阶段标记齐全：<strong>{rows.filter(x=>x.has_six_stage_markers).length}</strong></span>
   <span>检测到答案标记：<strong>{rows.filter(x=>x.has_answer_markers).length}</strong></span>
   <span>待人工审校：<strong>{flagged.length}</strong></span>
  </div>
  
  <label>课程列表
   <select value={filter} onChange={e=>setFilter(e.target.value as 'all'|'attention'|'structure')}>
    <option value="attention">未通过人工审校的课程（{flagged.length}）</option>
    <option value="structure">机器未识别结构标记（{structural.length}）</option>
    <option value="all">查看全部课程结构</option>
   </select>
  </label>
  <div className="qa-rows">
   {visible.map(r=><button type="button" key={r.course_id}
      onClick={()=>onSelect(r.course_id)}>
      <strong>{r.course_id}</strong>
      <span>{r.char_count} 字符 · {r.has_answer_markers?'检测到答案标记':'未检测到答案标记（人工检查）'} · {r.qa_status}</span>
    </button>)}
  </div>
 </section>;
}
