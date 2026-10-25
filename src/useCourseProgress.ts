import {useEffect,useRef,useState} from 'react';
import type {Session} from '@supabase/supabase-js';
import {cloudClient,cloudRequest} from './v44Connection';
import type {Course} from './v44Courses';
export type LearningState={stage?:number;notes?:string;completed?:boolean;answers?:Record<string,number>;studyResponses?:Record<string,string>;[key:string]:unknown};
export function mergeLearningState(old:LearningState,patch:Partial<LearningState>){return {...old,...patch, ...(patch.answers?{answers:{...old.answers,...patch.answers}}:{}),...(patch.studyResponses?{studyResponses:{...old.studyResponses,...patch.studyResponses}}:{})};}
// The existing JSONB answers column carries a namespaced envelope; numeric answers stay intact.
export function packFoundationState(state:LearningState){return {...state.answers,__learning:{stage:state.stage,studyResponses:state.studyResponses}};}
// Leave headroom for JSONB text spacing; the database enforces the final 256 KiB cap.
export const FOUNDATION_ANSWERS_BUDGET=192*1024;
export function validateFoundationState(state:LearningState){
 if(new TextEncoder().encode(JSON.stringify(packFoundationState(state))).byteLength>FOUNDATION_ANSWERS_BUDGET)
  throw new Error('本课作答超过 192 KiB 云端保存预算；完整内容仍保存在本机，请导出备份后整理。');
 if(Array.from(state.notes||'').length>5000)throw new Error('本课笔记超过 5000 字符；完整内容仍保存在本机。');
}
function progressError(error:unknown){
 const message=error&&typeof error==='object'&&'message' in error?String(error.message):String(error);
 return message.includes('foundation_progress_answers_check')?
  '基础课程云端容量约束拒绝了本次保存；请检查 PR #50 的容量迁移是否已应用。完整草稿仍在本机。':message;
}
export function unpackFoundationState(answers:Record<string,unknown>|null):Pick<LearningState,'answers'|'stage'|'studyResponses'>{
 const {__learning,...rest}=answers||{};
 const extra=__learning&&typeof __learning==='object'?__learning as LearningState:{};
 return {answers:Object.fromEntries(Object.entries(rest).filter(([,v])=>typeof v==='number')) as Record<string,number>,
  stage:typeof extra.stage==='number'?extra.stage:0,
  studyResponses:extra.studyResponses&&typeof extra.studyResponses==='object'?Object.fromEntries(Object.entries(extra.studyResponses).filter(([,v])=>typeof v==='string')):{}};
}
export function useCourseProgress(course:Course,session:Session|null){
 const key=course.kind==='main'&&session?'llh-cloud-draft-v1:'+session.user.id+':'+course.id:'llh-v44-draft:'+ (session?.user.id||'guest')+':'+course.id;
 const [state,setState]=useState<LearningState>({}),[ready,setReady]=useState(false),[busy,setBusy]=useState(false),[status,setStatus]=useState('正在读取学习记录…');
 const [retryVersion,setRetryVersion]=useState(0);
 const [conflict,setConflict]=useState<{local:LearningState;remote:LearningState}|null>(null);
 const stateRef=useRef(state),alive=useRef(true),revision=useRef(0);
 const generation=useRef(0),saving=useRef(false);
 const remoteVersion=useRef<string|null>(null),saveConflict=useRef(false);
 const readLocal=()=>{try{return JSON.parse(localStorage.getItem(key)||'null') as {state:LearningState;editedAt:string}|null;}catch{return null;}};
 useEffect(()=>{
  let current=true;alive.current=true;generation.current++;saving.current=false;
  setReady(false);setBusy(false);setConflict(null);setStatus('正在读取学习记录…');revision.current=0;
  stateRef.current={};setState({});remoteVersion.current=null;
  const apply=(s:LearningState)=>{stateRef.current=s;setState(s);setReady(true);};
  const local=readLocal();
  if(!session){apply(local?.state||{});setStatus('访客学习记录仅保存在本机；未同步到云端。');}
  else void (async()=>{
   try{
    let remote:LearningState={},updated='';
    if(course.kind==='foundation'){
     const {data,error}=await cloudClient!.from('foundation_progress').select('answers,notes,completed,updated_at').eq('user_id',session.user.id).eq('lesson_id',course.id).maybeSingle();
     if(error)throw error;
     if(data){remote={...unpackFoundationState(data.answers),notes:data.notes,completed:data.completed};updated=data.updated_at;}
    }else{
     const {progress}=await cloudRequest<{progress:{state:LearningState;updated_at:string}|null}>('/v1/progress/'+course.id,session.access_token);
     if(progress){remote=progress.state;updated=progress.updated_at;}
    }
    if(!current)return;
    remoteVersion.current=updated||null;
    const newer=local&&Date.parse(local.editedAt)>Date.parse(updated||'1970-01-01');
    if(local?.state&&updated&&(!newer||saveConflict.current)){
     // A newer cloud version must never silently discard a still-unsynced device draft.
     stateRef.current=local.state;setState(local.state);setReady(false);
     setConflict({local:local.state,remote});
     setStatus('云端记录比本机未同步草稿更新；请选择使用云端记录或保留本机草稿，未选择前不会覆盖保存。');
     return;
    }
    apply(newer?mergeLearningState(remote,local.state):remote);setStatus(newer?'已恢复本机未同步修改；点击保存同步。':'云端记录已读取，原有进度键保持不变。');
   }catch(e){if(current){setStatus('云端读取失败，已禁止覆盖保存：'+progressError(e));if(local)setState(local.state);}}
  })();
  return ()=>{current=false;alive.current=false;};
 },[course.id,session?.user.id,retryVersion]);
 function resolveConflict(choice:'cloud'|'local'){
  if(!conflict||ready)return;
  saveConflict.current=false;
  const next=choice==='local'?mergeLearningState(conflict.remote,conflict.local):conflict.remote;
  stateRef.current=next;setState(next);setConflict(null);setReady(true);
  if(choice==='cloud'){
   try{localStorage.removeItem(key);}catch{}
   setStatus('已选择云端进度；旧本机草稿不再参与保存。');
  }else{
   revision.current++;
   try{localStorage.setItem(key,JSON.stringify({state:next,editedAt:new Date().toISOString()}));}catch{}
   setStatus('已保留本机草稿并合并云端其他字段；请核对后点击保存同步。');
  }
 }
 function change(patch:Partial<LearningState>){
  if(!ready)return;
  const next=mergeLearningState(stateRef.current,patch);stateRef.current=next;setState(next);revision.current++;
  try{localStorage.setItem(key,JSON.stringify({state:next,editedAt:new Date().toISOString()}));setStatus(session?'修改已存本机，尚未同步。':'修改已存本机（访客）。');}
  catch{setStatus('本机存储不可用，请在离开前保存云端记录。');}
 }
 async function save(){
  if(!session||!ready||saving.current)return;
  const next=stateRef.current,version=revision.current,epoch=generation.current;saving.current=true;setBusy(true);
  try{
   let newVersion:string|null=null;
   if(course.kind==='foundation'){
    validateFoundationState(next);
    const payload={user_id:session.user.id,lesson_id:course.id,answers:packFoundationState(next),notes:next.notes||'',completed:!!next.completed,updated_at:new Date().toISOString()};
    if(remoteVersion.current){
     const {data,error}=await cloudClient!.from('foundation_progress')
      .update(payload).eq('user_id',session.user.id).eq('lesson_id',course.id)
      .eq('updated_at',remoteVersion.current).select('updated_at').maybeSingle();
     if(error)throw error;
     if(!data)throw new Error('progress_conflict');
     newVersion=data.updated_at;
    }else{
     const {data,error}=await cloudClient!.from('foundation_progress').insert(payload).select('updated_at').single();
     if(error){if(error.code==='23505')throw new Error('progress_conflict');throw error;}
     newVersion=data?.updated_at||null;
    }
   }else{
    const result=await cloudRequest<{saved:boolean;progress?:{updated_at?:string}}>('/v1/progress/'+course.id,session.access_token,{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify({state:next,expectedUpdatedAt:remoteVersion.current})});
    newVersion=result.progress?.updated_at||null;
   }
   if(epoch!==generation.current)return;
   if(!newVersion)throw new Error('progress_version_missing');
   remoteVersion.current=newVersion;
   if(version===revision.current){try{localStorage.removeItem(key);}catch{}}
   if(alive.current&&epoch===generation.current)setStatus(version===revision.current?'已保存到 Supabase。':'上一版本已同步；后续修改仍保留本机，需再次保存。');
  }catch(e){
   if(alive.current&&epoch===generation.current){
    const detail=progressError(e);
    if(detail.includes('progress_conflict')){
     saveConflict.current=true;setReady(false);
     setStatus('云端进度冲突：另一设备已保存更新，本机草稿仍在。请重新读取云端进度并选择版本。');
    }else if(detail.includes('progress_version_missing')){
     setReady(false);setStatus('云端已接收保存但没有返回版本号；请重新读取后再编辑，避免覆盖其他设备。');
    }else setStatus('保存失败，本机草稿保留：'+detail);
   }
  }
  finally{if(epoch===generation.current){saving.current=false;if(alive.current)setBusy(false);}}
 }
 return {state,ready,busy,status,change,save,conflict:!!conflict,resolveConflict,retry:()=>setRetryVersion(n=>n+1)};
}
