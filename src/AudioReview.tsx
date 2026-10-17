import {useEffect,useState} from 'react';
import type {SupabaseClient,Session} from '@supabase/supabase-js';

type Review={listened:boolean;text_matched:boolean;clarity_ok:boolean;reviewer_notes:string};
const EMPTY:Review={listened:false,text_matched:false,clarity_ok:false,reviewer_notes:''};
export default function AudioReview({client,session,assetId}:{
 client:SupabaseClient;session:Session;assetId:string;
}){
 const [state,setState]=useState<Review>(EMPTY);
 const [busy,setBusy]=useState(false);
 const [loaded,setLoaded]=useState(false);
 const [status,setStatus]=useState('');
 useEffect(()=>{
  let alive=true;setState(EMPTY);setLoaded(false);
  void client.from('audio_editorial_reviews').select('*')
   .eq('user_id',session.user.id).eq('asset_id',assetId).maybeSingle()
   .then(({data,error})=>{
     if(!alive)return;
     setLoaded(true);
     if(error){setStatus('读取审核记录失败：'+error.message);return;}
     if(data)setState({listened:!!data.listened,text_matched:!!data.text_matched,
       clarity_ok:!!data.clarity_ok,reviewer_notes:data.reviewer_notes||''});
   });
  return ()=>{alive=false;};
 },[client,session.user.id,assetId]);
 async function save(){
  if(busy||!loaded)return;
  setBusy(true);
  try{
   const {error}=await client.from('audio_editorial_reviews').upsert({
     user_id:session.user.id,asset_id:assetId,...state,reviewed_at:new Date().toISOString()
   },{onConflict:'user_id,asset_id'});
   if(error)throw error;
   setStatus('个人试听与文本对应审核记录已保存。未修改公共音频索引的正式验收状态。');
  }catch(err){setStatus('保存失败：'+(err instanceof Error?err.message:String(err)));}
  finally{setBusy(false);}
 }
 return <div className="audio-review" aria-label="音频人工审核">
   <h4>当前音频个人审核</h4>
   <p className="cloud-disclaimer">先播放并与本课正文对照，再标记。3 项都完成仅表示你的个人审核清单完整，不会自动改变共享索引的 audio_verified。</p>
   <div className="review-checklist">
    {[
      {key:'listened',label:'已完整试听，无播放损坏'},
      {key:'text_matched',label:'录音内容与课程目标文本一致'},
      {key:'clarity_ok',label:'语速、清晰度与语言发音可用于学习'}
    ].map(x=><label key={x.key}>
      <input disabled={!loaded} type="checkbox"
        checked={Boolean(state[x.key as keyof Review])}
        onChange={e=>setState(v=>({...v,[x.key]:e.target.checked}))}/>
       {x.label}
    </label>)}
   </div>
   <label>备注<textarea rows={2} maxLength={3000}
    value={state.reviewer_notes} onChange={e=>setState(v=>({...v,reviewer_notes:e.target.value}))}
    placeholder="记录错误读音、漏句或与教材不一致的地方"/></label>
   <button type="button" disabled={!loaded||busy} onClick={()=>void save()}>保存音频审核记录</button>
   <p role="status" className="cloud-disclaimer">{status}</p>
 </div>;
}
