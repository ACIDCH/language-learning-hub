import {useEffect,useRef,useState} from 'react';
import type {Session} from '@supabase/supabase-js';
import {cloudClient,cloudRequest} from './v44Connection';
import type {Course} from './v44Courses';
export type LearningState={stage?:number;notes?:string;completed?:boolean;answers?:Record<string,number>;[key:string]:unknown};
export function mergeLearningState(old:LearningState,patch:Partial<LearningState>){return {...old,...patch, ...(patch.answers?{answers:{...old.answers,...patch.answers}}:{})};}
export function useCourseProgress(course:Course,session:Session|null){
 const key=course.kind==='main'&&session?'llh-cloud-draft-v1:'+session.user.id+':'+course.id:'llh-v44-draft:'+ (session?.user.id||'guest')+':'+course.id;
 const [state,setState]=useState<LearningState>({}),[ready,setReady]=useState(false),[busy,setBusy]=useState(false),[status,setStatus]=useState('正在读取学习记录…');
 const stateRef=useRef(state),alive=useRef(true),revision=useRef(0);
 const readLocal=()=>{try{return JSON.parse(localStorage.getItem(key)||'null') as {state:LearningState;editedAt:string}|null;}catch{return null;}};
 useEffect(()=>{
  let current=true;alive.current=true;
  const apply=(s:LearningState)=>{stateRef.current=s;setState(s);setReady(true);};
  const local=readLocal();
  if(!session){apply(local?.state||{});setStatus('访客学习记录仅保存在本机；未同步到云端。');}
  else void (async()=>{
   try{
    let remote:LearningState={},updated='';
    if(course.kind==='foundation'){
     const {data,error}=await cloudClient!.from('foundation_progress').select('answers,notes,completed,updated_at').eq('user_id',session.user.id).eq('lesson_id',course.id).maybeSingle();
     if(error)throw error;
     if(data){remote={answers:data.answers,notes:data.notes,completed:data.completed};updated=data.updated_at;}
    }else{
     const {progress}=await cloudRequest<{progress:{state:LearningState;updated_at:string}|null}>('/v1/progress/'+course.id,session.access_token);
     if(progress){remote=progress.state;updated=progress.updated_at;}
    }
    if(!current)return;
    const newer=local&&Date.parse(local.editedAt)>Date.parse(updated||'1970-01-01');
    apply(newer?mergeLearningState(remote,local.state):remote);setStatus(newer?'已恢复本机未同步修改；点击保存同步。':'云端记录已读取，原有进度键保持不变。');
   }catch(e){if(current){setStatus('云端读取失败，已禁止覆盖保存：'+(e instanceof Error?e.message:String(e)));if(local)setState(local.state);}}
  })();
  return ()=>{current=false;alive.current=false;};
 },[course.id,session?.user.id]);
 function change(patch:Partial<LearningState>){
  if(!ready)return;
  const next=mergeLearningState(stateRef.current,patch);stateRef.current=next;setState(next);revision.current++;
  try{localStorage.setItem(key,JSON.stringify({state:next,editedAt:new Date().toISOString()}));setStatus(session?'修改已存本机，尚未同步。':'修改已存本机（访客）。');}
  catch{setStatus('本机存储不可用，请在离开前保存云端记录。');}
 }
 async function save(){
  if(!session||!ready||busy)return;
  const next=stateRef.current,version=revision.current;setBusy(true);
  try{
   if(course.kind==='foundation'){
    const {error}=await cloudClient!.from('foundation_progress').upsert({user_id:session.user.id,lesson_id:course.id,answers:next.answers||{},notes:next.notes||'',completed:!!next.completed,updated_at:new Date().toISOString()},{onConflict:'user_id,lesson_id'});
    if(error)throw error;
   }else await cloudRequest('/v1/progress/'+course.id,session.access_token,{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify({state:next})});
   if(version===revision.current){try{localStorage.removeItem(key);}catch{}}
   if(alive.current)setStatus(version===revision.current?'已保存到 Supabase。':'上一版本已同步；后续修改仍保留本机，需再次保存。');
  }catch(e){if(alive.current)setStatus('保存失败，本机草稿保留：'+(e instanceof Error?e.message:String(e)));}
  finally{if(alive.current)setBusy(false);}
 }
 return {state,ready,busy,status,change,save};
}
