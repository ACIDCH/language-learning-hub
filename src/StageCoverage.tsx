import {useEffect,useMemo,useState} from 'react';
import type {Session,SupabaseClient} from '@supabase/supabase-js';
import {stageReviewReasons,auditScore,type StageAudit} from './stageAudit';
export default function StageCoverage({client,session,onSelect}:{
 client:SupabaseClient;session:Session;onSelect:(id:string)=>void;
}){
 const [items,setItems]=useState<StageAudit[]>([]);
 const [showAll,setShowAll]=useState(false);
 const [status,setStatus]=useState('正在检查六阶段内容长度…');
 useEffect(()=>{
  let active=true;
  void client.from('lesson_stage_audit')
   .select('course_id,qa_status,total_chars,stages_in_order,context_chars,grammar_chars,vocabulary_chars,reading_chars,pronunciation_chars,production_chars,review_signal_count')
   .eq('user_id',session.user.id).limit(120)
   .then(({data,error})=>{
    if(!active)return;
    if(error){setStatus('六阶段检查暂时不可用：'+error.message);return;}
    setItems((data||[]) as StageAudit[]);
    setStatus('');
   });
  return ()=>{active=false;};
 },[client,session.user.id]);
 const ranked=useMemo(()=>[...items].sort((a,b)=>auditScore(b)-auditScore(a)||a.total_chars-b.total_chars||a.course_id.localeCompare(b.course_id)),[items]);
 const flagged=ranked.filter(x=>auditScore(x)>0);
 const visible=showAll?ranked:flagged;
 return <section className="cloud-reader" aria-label="108 课六阶段教学覆盖审校队列">
  <h3>课程阶段检查</h3>
  {status&&<p role="status">{status}</p>}
  <div className="stage-qa-summary">
   <span><strong>{items.length}</strong> 课已检查</span>
   <span><strong>{items.filter(x=>x.stages_in_order).length}</strong> 课标题顺序正常</span>
   <span><strong>{flagged.length}</strong> 课建议优先复核</span>
  </div>
  
  <label className="stage-audit-toggle">
   <input type="checkbox" checked={showAll} onChange={e=>setShowAll(e.target.checked)}/>
   显示全部课程
  </label>
  <div className="stage-audit-rows">
   {visible.map(item=><article key={item.course_id}>
    <div><strong>{item.course_id}</strong>
     <span>{item.total_chars} 字符 · {item.qa_status==='approved'?'已人工批准':'仍为草稿'}</span>
    </div>
    <p>{stageReviewReasons(item).length?stageReviewReasons(item).join('；'):'未发现需要优先处理的结构问题'}</p>
    <button type="button" onClick={()=>onSelect(item.course_id)}>打开本课开始复核</button>
   </article>)}
  </div>
 </section>;
}
