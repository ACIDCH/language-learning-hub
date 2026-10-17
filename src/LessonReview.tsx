import {useEffect,useState} from 'react';
import type {Session,SupabaseClient} from '@supabase/supabase-js';

type Review={grammar_checked:boolean;exercises_checked:boolean;level_checked:boolean;
 stages_checked:boolean;source_checked:boolean;reviewer_notes:string};
const INITIAL:Review={grammar_checked:false,exercises_checked:false,level_checked:false,
  stages_checked:false,source_checked:false,reviewer_notes:''};
const CHECKS=[
  {field:'grammar_checked',label:'语法规则与例句逐项准确'},
  {field:'exercises_checked',label:'练习、答案与解析一致'},
  {field:'level_checked',label:'词汇、句型和难度符合本课目标'},
  {field:'stages_checked',label:'六阶段衔接自然，内容没有遗漏'},
  {field:'source_checked',label:'引用和外部教材来源已核对'}
] as const;
export default function LessonReview({client,session,courseId,qaStatus,onUpdated}:{
 client:SupabaseClient;session:Session;courseId:string;qaStatus:string;
 onUpdated:()=>void;
}){
 const [review,setReview]=useState<Review>(INITIAL);
 const [loading,setLoading]=useState(true);
 const [busy,setBusy]=useState(false);
 const [confirm,setConfirm]=useState(false);
 const [message,setMessage]=useState('');
 useEffect(()=>{
  let alive=true;
  setReview({...INITIAL});setConfirm(false);setLoading(true);
  void client.from('lesson_editorial_reviews').select('*')
    .eq('user_id',session.user.id).eq('course_id',courseId).maybeSingle()
    .then(({data,error})=>{
       if(!alive)return;
       setLoading(false);
       if(error){setMessage('审校状态读取失败：'+error.message);return;}
       if(data)setReview({
        grammar_checked:!!data.grammar_checked,exercises_checked:!!data.exercises_checked,
        level_checked:!!data.level_checked,stages_checked:!!data.stages_checked,
        source_checked:!!data.source_checked,reviewer_notes:data.reviewer_notes||''
       });
       setMessage('审校勾选不会自动改变课程最终审核状态。');
    });
  return ()=>{alive=false;};
 },[client,session.user.id,courseId]);
 const complete=CHECKS.every(x=>review[x.field]);
 async function save(approve=false){
   if(busy||loading)return;
   if(approve&&(!complete||!confirm))return;
   setBusy(true);
   try{
     const {error}=await client.from('lesson_editorial_reviews').upsert({
       user_id:session.user.id,course_id:courseId,...review,reviewed_at:new Date().toISOString()
     },{onConflict:'user_id,course_id'});
     if(error)throw error;
     if(approve){
       const {data,error:e}=await client.from('private_lesson_content')
        .update({qa_status:'approved',updated_at:new Date().toISOString()})
        .eq('user_id',session.user.id).eq('course_id',courseId)
        .select('course_id');
       if(e||!data?.length)throw e||Error('课程正文尚未入库');
       setMessage('人工确认已保存：本课程正文状态更新为 approved。音频仍需独立验收。');
       setConfirm(false);
       onUpdated();
     }else setMessage('已保存审校清单；课程仍保留当前草稿/审核状态。');
   }catch(err){setMessage('保存失败：'+(err instanceof Error?err.message:String(err)));}
   finally{setBusy(false);}
 }
 return <section className="cloud-reader" aria-label="人工教学质量验收">
  <h3>本课人工审校</h3>
  <p className="cloud-disclaimer">当前正文状态：{qaStatus}。AI 的修改建议不能代替教材原文、答案及教学质量的人工核对。</p>
  {loading?<p>读取审校记录中…</p>:<>
   <div className="review-checklist">
    {CHECKS.map(c=><label key={c.field}>
      <input type="checkbox" checked={review[c.field]} onChange={e=>{
       setReview(v=>({...v,[c.field]:e.target.checked}));setConfirm(false);
      }}/> {c.label}
     </label>)}
   </div>
   <label>审核备注<textarea rows={4} maxLength={10000}
      value={review.reviewer_notes} onChange={e=>setReview(v=>({...v,reviewer_notes:e.target.value}))}
      placeholder="记录具体错误、修订位置、音频对应问题和参考来源"/>
   </label>
   <div className="review-actions">
    <button type="button" disabled={busy} onClick={()=>void save(false)}>保存本课审核清单</button>
    {complete&&qaStatus!=='approved'&&<label className="cloud-toggle">
       <input type="checkbox" checked={confirm} onChange={e=>setConfirm(e.target.checked)}/>
       我已实际检查以上五项，确认可批准本课正文
     </label>}
    {complete&&qaStatus!=='approved'&&<button type="button" disabled={busy||!confirm}
       onClick={()=>void save(true)}>人工确认正文审核通过</button>}
   </div>
   <p role="status" className="cloud-disclaimer">{message}</p>
  </>}
 </section>;
}
