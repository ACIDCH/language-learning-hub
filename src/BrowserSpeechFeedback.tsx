import {useEffect,useRef,useState} from 'react';
import {captureSpeech} from './speechCapture';
import {analyzeBrowserAudio,browserWavBlob,type BrowserAudioReview} from './browserAudioAnalysis';

/** This runs entirely in the browser; it never calls fetch or uploads the audio. */
export default function BrowserSpeechFeedback({target}:{target:string}){
 const [state,setState]=useState<'idle'|'permission'|'recording'|'processing'>('idle');
 const [note,setNote]=useState('准备好后录制一段短句，即可在浏览器内查看音量和停顿。');
 const [review,setReview]=useState<BrowserAudioReview|null>(null);
 const [playUrl,setPlayUrl]=useState('');
 const controller=useRef<AbortController|null>(null);
 const stop=useRef<(()=>void)|null>(null);
 const audioUrl=useRef<string|null>(null);
 const clearAudio=()=>{
  if(audioUrl.current){URL.revokeObjectURL(audioUrl.current);audioUrl.current=null;}
  setPlayUrl('');
 };
 function cancel(){
  controller.current?.abort();controller.current=null;stop.current=null;
  setState('idle');setNote('已取消并停止录音；未上传或保存任何录音。');
 }
 useEffect(()=>()=>{
  controller.current?.abort();
  if(audioUrl.current)URL.revokeObjectURL(audioUrl.current);
 },[]);
 useEffect(()=>{
  // Changing the source sentence invalidates the old observations.
  controller.current?.abort();controller.current=null;stop.current=null;
  if(audioUrl.current){URL.revokeObjectURL(audioUrl.current);audioUrl.current=null;}
  setPlayUrl('');setReview(null);setState('idle');
 },[target]);
 async function start(){
  if(state!=='idle')return;
  if(!target.trim()){setNote('先选择一句要练习的英语或法语短句。');return;}
  clearAudio();setReview(null);
  window.speechSynthesis?.cancel();
  const current=new AbortController();controller.current=current;
  setState('permission');setNote('等待浏览器麦克风许可；如已授予，将开始最长约 12 秒的录音。');
  let pcm:Int16Array|null=null;
  const deadline=setTimeout(()=>current.abort(),25000);
  try{
   const recording=await captureSpeech(current.signal);
   if(current.signal.aborted)return;
   stop.current=recording.stop;
   setState('recording');setNote('正在录音。请说完后点击「停止并分析」，最多约 12 秒。');
   pcm=await recording.done;
   if(current.signal.aborted)return;
   setState('processing');setNote('浏览器正在分析刚才的录音（不会上传文件）…');
   const result=analyzeBrowserAudio(pcm);
   const url=URL.createObjectURL(browserWavBlob(pcm));
   if(current.signal.aborted){URL.revokeObjectURL(url);return;}
   audioUrl.current=url;setPlayUrl(url);setReview(result);
   setNote(result.usable?'本机分析完成。可以回听音频，与示范对比后再练。':'已录制短音频，但声音能量不足，以下停顿数据不可靠。');
  }catch(error){
   if(!current.signal.aborted)setNote(error instanceof Error?error.message:'麦克风录音失败，请检查设备权限后重试。');
  }finally{
   pcm?.fill(0);clearTimeout(deadline);
   if(controller.current===current){controller.current=null;stop.current=null;setState('idle');}
  }
 }
 return <section className="cloud-panel" aria-label="浏览器本地录音分析">
  <h4>③ 浏览器录音分析（完全本地）</h4>
  <p className="cloud-disclaimer">无需 Oracle、独立服务器或大模型。只在本机检查短录音的音量、有声时长与停顿；无法判断具体音素对错。上方「开始跟读」可另行获取语音转写文字对照。</p>
  <div className="speech-actions">
   <button type="button" disabled={state!=='idle'} onClick={()=>void start()}>开始录音并分析</button>
   {state==='recording'&&<button type="button" onClick={()=>{setState('processing');setNote('正在结束录音并分析…');stop.current?.();}}>停止并分析</button>}
   {state!=='idle'&&<button type="button" onClick={cancel}>取消录音</button>}
   {(review||playUrl)&&state==='idle'&&<button type="button" onClick={()=>{clearAudio();setReview(null);setNote('本次临时录音和分析结果已清除。');}}>清除本次结果</button>}
  </div>
  <p aria-live="polite">{note}</p>
  {review&&<div aria-label="浏览器录音分析结果">
   <div className="ref-counts">
    <div><strong>{review.durationSeconds.toFixed(1)} s</strong><span>录音总时长</span></div>
    <div><strong>{review.usable?review.voicedSeconds.toFixed(1)+' s':'—'}</strong><span>有声片段估计</span></div>
    <div><strong>{review.usable?review.pauseCount:'—'}</strong><span>较长内部停顿</span></div>
    <div><strong>{review.meanLevelPercent}%</strong><span>相对声音能量</span></div>
   </div>
   <div role="img" aria-label="录音音量随时间变化示意" style={{display:'flex',gap:2,alignItems:'end',height:64,margin:'12px 0'}}>
    {review.bars.map((height,i)=><span key={i} style={{background:'currentColor',opacity:.5,minWidth:2,flex:1,height:Math.max(2,height*.55)+'px',borderRadius:2}}/>)}
   </div>
   {review.usable&&<p>累计较长内部停顿约 {review.pauseSeconds.toFixed(1)} 秒。不同麦克风的音量百分比不具备跨设备可比性。</p>}
   <ul>{review.advice.map((tip,i)=><li key={i}>{tip}</li>)}</ul>
  </div>}
  {playUrl&&<div><label>回听当前录音（仅本页面内存）<audio controls preload="metadata" src={playUrl} aria-label="回听刚才的录音"/></label></div>}
  <p className="cloud-disclaimer">不保存到数据库或云盘，不自动发送 OpenRouter；页面关闭或换练习句即释放本次音频。</p>
 </section>;
}
