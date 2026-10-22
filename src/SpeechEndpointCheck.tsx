import {useState} from 'react';
import {cloudSpeechEndpoint,setRuntimeSpeechEndpoint} from './speechEngines';
type Status='idle'|'busy'|'ready'|'unavailable';
export function SpeechEndpointCheck({url,onChange}:{url:string;onChange:(url:string)=>void}){
 const [status,setStatus]=useState<Status>('idle');
 const [message,setMessage]=useState('未执行模型服务检查。');
 async function inspect(){
  const candidate=url.trim().replace(/\/$/,'');
  setRuntimeSpeechEndpoint(candidate);
  const endpoint=cloudSpeechEndpoint();
  if(!endpoint){setStatus('unavailable');setMessage('请填写已部署的 HTTPS 声学服务地址；仅填写地址不会创建模型服务器。');return;}
  setStatus('busy');setMessage('正在读取服务器 /health（不发送录音）…');
  try{
   const response=await fetch(endpoint+'/health',{cache:'no-store',signal:AbortSignal.timeout(12000)});
   if(!response.ok)throw Error('HTTP '+response.status);
   const data=await response.json() as {ready?:boolean;mode?:string;model?:string;retention?:string};
   if(!data.ready)throw Error('服务正在运行但模型尚未加载（ready:false）');
   setStatus('ready');setMessage('已连接实际声学模型服务，下一步可在跟读练习中录音验证。当前模型未进行专业人工校准，不代表专业评分。');
  }catch(e){setStatus('unavailable');setMessage('声学服务未就绪：'+(e instanceof Error?e.message:String(e)));}
 }
 return <section className="cloud-panel" aria-label="云端声学服务连接">
  <h3>英语／法语云端音素声学分析</h3>
  <p>已有 FastAPI + Wav2Vec2 模型服务代码，但 Cloudflare Worker 和 Supabase 数据库不能代替约 4GB RAM 的计算容器。你可随时更换独立 HTTPS 推理服务，不必重新构建网站。</p>
  <label>声学服务 HTTPS Origin
   <input value={url} placeholder="https://speech.example.com" onChange={e=>{onChange(e.target.value);setStatus('idle');}}/>
  </label>
  <button disabled={status==='busy'} onClick={()=>void inspect()}>{status==='busy'?'检测中…':'真实检测 /health（不上传录音）'}</button>
  <p role="status">{message}</p>
  <p className="cloud-disclaimer">云端短录音仅在你主动选择声学引擎并点击录音后上传。当前模型显示音素参考差异，不提供未经校准的“专业准确率分数”。</p>
 </section>;
}
