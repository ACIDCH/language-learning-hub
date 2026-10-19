import {useEffect,useState} from 'react';
import {apiBase,cloudClient} from './v44Connection';
type WorkerStatus={ready?:boolean;modules?:Record<string,string>};
type Check={phase:'checking'|'ok'|'error';message:string;data?:WorkerStatus};
export default function ConnectionStatus(){
 const [revision,setRevision]=useState(0);
 const [check,setCheck]=useState<Check>({phase:'checking',message:'正在检查学习服务…'});
 useEffect(()=>{
  const controller=new AbortController();
  setCheck({phase:'checking',message:'正在检查学习服务…'});
  void fetch(apiBase+'/v1/status',{signal:controller.signal,cache:'no-store'})
   .then(async response=>{
     if(!response.ok)throw Error('HTTP '+response.status);
     const data=await response.json() as WorkerStatus;
     if(!data||typeof data.ready!=='boolean')throw Error('响应格式不正确');
     setCheck({phase:'ok',message:data.ready?'Worker 可访问，后端公开配置就绪。':'Worker 已响应，但后端尚未配置。',data});
   }).catch(error=>{
     if(!controller.signal.aborted)setCheck({phase:'error',message:'Worker 连接失败：'+(error instanceof Error?error.message:String(error))+'。请检查网络或跨域设置。'});
   });
  return ()=>controller.abort();
 },[revision]);
 return <section className="cloud-panel" aria-label="实时服务连接检查">
  <h3>实时服务连接检查</h3>
  <p role="status">{check.message}</p>
  <p>Supabase 公开客户端：{cloudClient?'已配置':'未配置'}；当前 API：{apiBase.includes('one-shot')?'预览 Worker':'站点配置 Worker'}。</p>
  {check.data?.modules&&<p>目录：{check.data.modules.catalog||'未知'}；进度：{check.data.modules.progress||'未知'}；AI：{check.data.modules.ai||'未知'}。</p>}
  <button type="button" onClick={()=>setRevision(n=>n+1)} disabled={check.phase==='checking'}>重新检查连接</button>
  <p className="cloud-disclaimer">仅执行无凭证连通性检查，不代表登录、进度保存、真人发音或 AI 调用已经通过验收。</p>
 </section>;
