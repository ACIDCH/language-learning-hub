/** Optional on-demand phoneme inference: WebGPU q4f16 (188MB) → WASM q4 (230MB).
 * Runs in its own worker; no audio sent to Hugging Face or an LLM. Only model weights/vocab are fetched.
 */
import type {CandidatePhone} from './phonemeEvidence';
export type PhonemeRun={phones:CandidatePhone[];vocab:string[];backend:'webgpu'|'wasm';elapsedMs:number};
type WorkerPacket={
 type:'progress'|'result'|'error';jobId:number;message?:string;data?:PhonemeRun
};
type PhonemeRequest={type:'analyze';jobId:number;pcm:Float32Array};
export class BrowserPhonemeRunner{
 private worker:Worker|null=null;
 private current: {jobId:number;resolve:(data:PhonemeRun)=>void;reject:(reason:Error)=>void}|null=null;
 private count=0;
 private unavailable=false;
 async analyze(pcm:Int16Array,signal:AbortSignal,onProgress:(message:string)=>void):Promise<PhonemeRun>{
  if(this.unavailable)throw Error('浏览器没有可用的 Web Worker，音素模块无法运行。');
  if(pcm.length<5600||pcm.length>192000)throw Error('音素分析只支持 0.35–12 秒录音。');
  if(signal.aborted)throw Error('本次音素分析已取消');
  if(this.current)throw Error('上一段音素分析仍在处理中');
  if(!this.worker){
   try{this.worker=new Worker(new URL('./phonemeWorker.ts',import.meta.url),{type:'module'});}
   catch{this.unavailable=true;throw Error('无法创建浏览器音素模型工作线程');}
  }
  const float=new Float32Array(pcm.length);
  for(let i=0;i<pcm.length;i++)float[i]=pcm[i]/32768;
  const jobId=++this.count;
  const worker=this.worker;
  return new Promise<PhonemeRun>((resolve,reject)=>{
   const finish=()=>{
    signal.removeEventListener('abort',abort);
    if(this.worker===worker){worker.removeEventListener('message',received);worker.removeEventListener('error',failed);}
    this.current=null;
   };
   const abort=()=>{finish();this.dispose();reject(Error('音素分析已取消'));};
   const failed=()=>{finish();this.dispose();reject(Error('本地模型加载或工作线程运行失败，请确认浏览器可访问模型下载地址'));};
   const received=(event:MessageEvent<WorkerPacket>)=>{
    const packet=event.data;
    if(packet.jobId!==jobId)return;
    if(packet.type==='progress'){onProgress(packet.message||'本地模型正在处理…');return;}
    finish();
    if(packet.type==='error')reject(Error(packet.message||'音素识别失败，仍可使用基础录音分析'));
    else if(packet.data)resolve(packet.data);
    else reject(Error('模型未返回音素候选'));
   };
   this.current={jobId,resolve,reject};
   worker.addEventListener('message',received);
   worker.addEventListener('error',failed);
   signal.addEventListener('abort',abort,{once:true});
   const request:PhonemeRequest={type:'analyze',jobId,pcm:float};
   worker.postMessage(request,[float.buffer]);
  });
 }
 dispose(){
  this.worker?.terminate();this.worker=null;this.current=null;
 }
}
