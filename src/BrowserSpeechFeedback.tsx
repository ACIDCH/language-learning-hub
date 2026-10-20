import {useEffect,useRef,useState} from 'react';
import {captureSpeech} from './speechCapture';
import {analyzeBrowserAudio,browserWavBlob,type BrowserAudioReview} from './browserAudioAnalysis';
import {toIpaLine} from './ipaEngine';
import {alignPhoneColors,tokenizeReferenceIpa,phoneLevelLabels,type PhoneTile} from './phonemeEvidence';
import {BrowserPhonemeRunner} from './BrowserPhonemeRunner';
import {phoneHint} from './speechEngines';

/** This runs entirely in the browser; it never calls fetch or uploads the audio. */
export default function BrowserSpeechFeedback({target,language='fr'}:{target:string;language?:string}){
 const [state,setState]=useState<'idle'|'permission'|'recording'|'processing'>('idle');
 const [note,setNote]=useState('准备好后录制一段短句，即可在浏览器内查看音量和停顿。');
 const [review,setReview]=useState<BrowserAudioReview|null>(null);
 const [playUrl,setPlayUrl]=useState('');
 const controller=useRef<AbortController|null>(null);
 const stop=useRef<(()=>void)|null>(null);
 const audioUrl=useRef<string|null>(null);
 const clip=useRef<Int16Array|null>(null);
 const model=useRef<BrowserPhonemeRunner|null>(null);
 const inferAbort=useRef<AbortController|null>(null);
 const [phonemeBusy,setPhonemeBusy]=useState(false);
 const [phonemeStatus,setPhonemeStatus]=useState('');
 const [phonemeTiles,setPhonemeTiles]=useState<PhoneTile[]|null>(null);
 const [actualBackend,setActualBackend]=useState<'webgpu'|'wasm'|null>(null);
 const [unknownIpa,setUnknownIpa]=useState<string[]>([]);
 function resetPhones(){
  inferAbort.current?.abort();inferAbort.current=null;
  setPhonemeBusy(false);setPhonemeTiles(null);setActualBackend(null);setUnknownIpa([]);
  setPhonemeStatus('');
 }
 function wipeClip(){
  if(clip.current){clip.current.fill(0);clip.current=null;}
 }
 const clearAudio=()=>{
  if(audioUrl.current){URL.revokeObjectURL(audioUrl.current);audioUrl.current=null;}
  setPlayUrl('');
 };
 function cancel(){
  controller.current?.abort();controller.current=null;stop.current=null;
  resetPhones();wipeClip();
  setState('idle');setNote('已取消并停止录音；未上传或保存任何录音。');
 }
 async function analyzePhonemes(){
  if(!clip.current||!review?.usable||phonemeBusy)return;
  const current=new AbortController();inferAbort.current=current;
  setPhonemeBusy(true);setPhonemeTiles(null);setActualBackend(null);setUnknownIpa([]);
  setPhonemeStatus('正在准备浏览器音素分析，请首次下载前确认网络和磁盘空间…');
  try{
   // Reuse existing browser-only Piper EN/FR G2P; no synthetic phoneme answer.
   const line=await toIpaLine(target,language);
   if(current.signal.aborted)return;
   const ipa=line.units.filter(u=>u.ipa).map(u=>u.ipa).join(' ');
   if(!ipa.trim())throw Error('这句话尚无法生成参考 IPA，不能显示可靠色阶。');
   if(!model.current)model.current=new BrowserPhonemeRunner();
   const result=await model.current.analyze(clip.current,current.signal,m=>setPhonemeStatus(m));
   if(current.signal.aborted)return;
   const ref=tokenizeReferenceIpa(ipa,result.vocab);
   setUnknownIpa(ref.unknown);
   if(ref.unknown.length||ref.phones.length<2){
    setPhonemeStatus('参考音素包含模型不支持的符号或数量不足，本次不生成虚假的颜色结论。');
    setPhonemeTiles(ref.phones.map(p=>({expected:p,observed:null,level:'unknown',description:'词表不兼容或参考证据不足'})));
    setActualBackend(result.backend);return;
   }
   if(result.phones.length<2){
    setPhonemeStatus('模型没有识别到足够的音素候选，请检查音量并重新录音。');
    setPhonemeTiles(ref.phones.map(p=>({expected:p,observed:null,level:'unknown',description:'模型候选不足'})));
    setActualBackend(result.backend);return;
   }
   const tiles=alignPhoneColors(ref.phones,result.phones);
   setPhonemeTiles(tiles);setActualBackend(result.backend);
   setPhonemeStatus('音素模型已在本机完成候选对照（'+(result.backend==='webgpu'?'WebGPU':'WASM')+'）。色阶表达模型证据，而不是专业评分。');
  }catch(e){
   if(!current.signal.aborted){
    setPhonemeStatus('本地音素增强暂不可用：'+(e instanceof Error?e.message:String(e))+
     '。录音回听、音量停顿和基础语音识别仍可正常使用。');
   }
  }finally{
   if(inferAbort.current===current){inferAbort.current=null;setPhonemeBusy(false);}
  }
 }
 function cancelPhoneme(){
  inferAbort.current?.abort();inferAbort.current=null;
  model.current?.dispose();model.current=null;
  setPhonemeBusy(false);setPhonemeStatus('已取消下载或分析；录音仍可回听。');
 }
 useEffect(()=>()=>{
  controller.current?.abort();inferAbort.current?.abort();
  model.current?.dispose();wipeClip();
  if(audioUrl.current)URL.revokeObjectURL(audioUrl.current);
 },[]);
 useEffect(()=>{
  // Changing the source sentence invalidates the old observations.
  controller.current?.abort();controller.current=null;stop.current=null;
  resetPhones();wipeClip();
  if(audioUrl.current){URL.revokeObjectURL(audioUrl.current);audioUrl.current=null;}
  setPlayUrl('');setReview(null);setState('idle');
 },[target]);
 async function start(){
  if(state!=='idle')return;
  if(!target.trim()){setNote('先选择一句要练习的英语或法语短句。');return;}
  clearAudio();setReview(null);resetPhones();wipeClip();
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
   clip.current=pcm.slice();
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
   {(review||playUrl)&&state==='idle'&&<button type="button" onClick={()=>{cancelPhoneme();wipeClip();clearAudio();resetPhones();setReview(null);setNote('本次临时录音和分析结果已清除。');}}>清除本次结果</button>}
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
  {review?.usable&&<section className="phoneme-gradient-panel" aria-label="WebGPU 音素色阶对照">
   <h4>④ 音素色阶对照 · 可选 WebGPU 增强</h4>
   <p className="cloud-disclaimer">使用真正的英法语音素识别模型，首次启用需要下载约 188 MB（WebGPU）或 230 MB（WASM）权重，下载后由浏览器缓存。只在你点击时下载；录音不上传到模型网站、AI 服务或云端。</p>
   <div className="speech-actions">
    <button type="button" disabled={phonemeBusy||state!=='idle'} onClick={()=>void analyzePhonemes()}>
     {phonemeBusy?'音素分析中…':phonemeTiles?'重新分析音素':'启用音素色阶分析（首次需下载模型）'}
    </button>
    {phonemeBusy&&<button type="button" onClick={cancelPhoneme}>取消模型下载／分析</button>}
   </div>
   {phonemeStatus&&<p aria-live="polite">{phonemeStatus}</p>}
   {phonemeTiles&&<div aria-label="真实模型音素候选色阶">
    <p className="phoneme-gradient-legend">状态色阶：
     {(['strong','close','uncertain','different','unknown'] as const).map(level=>
      <span key={level} className={'phoneme-level phoneme-level--'+level}>{phoneLevelLabels[level]}</span>)}
    </p>
    {actualBackend&&<p className="cloud-disclaimer">实际本地推理后端：{actualBackend==='webgpu'?'WebGPU GPU 加速':'WebAssembly CPU 回退'}；下列时间仅为 CTC 模型粗略发射位置，不是严格音素强制对齐。</p>}
    <ol className="phoneme-gradient-grid">
     {phonemeTiles.map((p,i)=><li key={i} className={'phoneme-gradient-tile phoneme-level--'+p.level}
      title={p.description}
      aria-label={(p.expected||'额外候选')+'：'+phoneLevelLabels[p.level]+'；'+p.description}>
      <strong>/{p.expected||'∅'}/</strong>
      {p.observed&&<small>{p.observed===p.expected?'模型一致':'候选 /'+p.observed+'/'}</small>}
      <span className="phoneme-tile-grade">{phoneLevelLabels[p.level]}</span>
      {p.start_s!==undefined&&<small>{p.start_s.toFixed(1)}–{p.end_s?.toFixed(1)}s</small>}
     </li>)}
    </ol>
    {unknownIpa.length>0&&<p className="cloud-disclaimer">参考 IPA 有 {unknownIpa.length} 个暂不支持的符号，本次全部采用灰色“无法判定”。</p>}
    {phonemeTiles.some(x=>x.level==='different')&&<p>建议重点复练的候选音：
     {[...new Set(phonemeTiles.filter(x=>x.level==='different'&&x.expected).map(x=>x.expected!))].slice(0,4)
      .map(p=><span key={p}><strong> /{p}/ </strong>{phoneHint(p,language)}　</span>)}
    </p>}
   </div>}
  </section>}
  <p className="cloud-disclaimer">不保存到数据库或云盘，不自动发送 OpenRouter；页面关闭或换练习句即释放本次音频。</p>
 </section>;
}
