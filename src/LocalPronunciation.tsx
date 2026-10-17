import {useEffect,useRef,useState} from 'react';
import {captureSpeech,decodePCM} from './speechCapture';
import {evaluateLocal,localAllowed,phoneHint,type SpeechResult} from './speechEngines';

export default function LocalPronunciation({target,language}:{target:string;language:string}) {
 const [state,setState]=useState('idle'),[note,setNote]=useState('本机模型须单独启动；约 1.26 GB 权重，不在浏览器或 Worker 下载。'),[result,setResult]=useState<SpeechResult|null>(null);
 const current=useRef<AbortController|null>(null),stop=useRef<(()=>void)|null>(null);
 const [metrics,setMetrics]=useState<{total_ms:number;max_frame_gap_ms:number;js_heap_bytes:number|null}|null>(null);
 const allowed=localAllowed(location.hostname);
 useEffect(()=>()=>{current.current?.abort();stop.current=null;},[target,language]);
 useEffect(()=>{setResult(null);setState('idle');},[target,language]);
 async function run(file?:File) {
  if(!target.trim()||/[\u3400-\u9fff]/.test(target)){setNote('请先选择不含中文说明的英语或法语短句。');return;}
  current.current?.abort();const controller=new AbortController();current.current=controller;
  setResult(null);setMetrics(null);setState(file?'processing':'permission');setNote(file?'正在本机内存中解码…':'请允许麦克风；12 秒内自动结束。');
  const started=performance.now();let lastFrame=started,maxGap=0,frame=0;
  const measure=(now:number)=>{maxGap=Math.max(maxGap,now-lastFrame);lastFrame=now;frame=requestAnimationFrame(measure);};
  frame=requestAnimationFrame(measure);controller.signal.addEventListener('abort',()=>cancelAnimationFrame(frame),{once:true});
  // Covers pending permissions and stalled local inference; late streams are closed.
  const deadline=setTimeout(()=>{controller.abort();if(current.current===controller){setState('idle');setNote('等待超时，已取消。可重试或切换免费浏览器模式。');}},60000);
  try {
   let pcm:Int16Array;
   if(file)pcm=await decodePCM(file);
   else {const recording=await captureSpeech(controller.signal);stop.current=recording.stop;setState('recording');setNote('正在录音，仅暂存在内存；请说完后停止。');pcm=await recording.done;}
   if(controller.signal.aborted){pcm.fill(0);return;}
   setState('processing');setNote('本机声学分析中，可取消；录音不上传云端。');
   const response=await evaluateLocal(pcm,target,language,controller.signal);
   if(current.current!==controller||controller.signal.aborted)return;
   setMetrics({total_ms:Math.round(performance.now()-started),max_frame_gap_ms:Math.round(maxGap),js_heap_bytes:(performance as Performance & {memory?:{usedJSHeapSize:number}}).memory?.usedJSHeapSize??null});
   setResult(response);
   setNote(response.status==='unscorable'
     ? response.reason==='empty_model_output'
       ? '模型没有识别出可用音素；本次不可判定，不应将缺失结果视为发音错误。请尝试更完整的短句。'
       : response.reason==='empty_reference'
         ? '参考读音未能生成可用音素；本次不可判定，请换一个适合当前语言的词句。'
         : '本次信号不足，未输出音素判断；请检查音量后重试。'
     : '实验性、未校准观察完成。模型差异可能来自识别或参考读音，不是确诊错误。');
  }catch(e){if(current.current===controller&&!controller.signal.aborted)setNote((e instanceof Error?e.message:'录音失败')+' 可重试，或切回免费浏览器识别。');}
  finally{clearTimeout(deadline);cancelAnimationFrame(frame);if(current.current===controller){setState('idle');stop.current=null;}}
 }
 return <section aria-label="实验性声学反馈">
  <h4>音素观察 · 实验性 / 未校准</h4>
  <p>只将短录音发送到本机 127.0.0.1:8776，在内存中处理后释放；不写入云盘、Supabase 或学习记录。没有专业发音分数，重音与连诵正确性尚不可评。</p>
  {!allowed&&<p>当前云端页面不启用本机连接，请切回免费浏览器模式。在本机预览端口 5174 可试用声学原型。</p>}
  <button disabled={!allowed||state!=='idle'} onClick={()=>void run()}>录音并观察音素</button>
  {state==='recording'&&<button onClick={()=>stop.current?.()}>停止并分析</button>}
  {state!=='idle'&&<button onClick={()=>{current.current?.abort();setState('idle');setNote('已取消并释放录音。');}}>取消声学分析</button>}
  <label>或选择本机短音频（仅内存读取）<input type="file" accept="audio/*" disabled={!allowed||state!=='idle'} onChange={e=>{const file=e.target.files?.[0];e.target.value='';if(file)void run(file);}}/></label>
  <p role="status">{note}</p>
  {result&&<div aria-label="声学观察结果"><p>模型处理：{result.elapsed_ms} ms；录音：{result.signal?.duration_s} s；低能量片段：{result.signal?.low_energy_s} s（不等于停顿错误）。</p>
   {metrics&&<details><summary>本次运行信息</summary><p>总耗时（含录音/解码）：{metrics.total_ms} ms；最大绘制帧间隔：{metrics.max_frame_gap_ms} ms；JS 堆占用：{metrics.js_heap_bytes??'浏览器未提供'} bytes（不包含本机模型进程）。</p></details>}
   {result.signal?.rejection&&<p>信号限制：{result.signal.rejection}</p>}
   {!!result.reference_unknown?.length&&<p>参考读音含模型词表外字符，相关差异不能解读：{result.reference_unknown.join(' ')}</p>}
   {result.status!=='unscorable'&&<p>以下为参考 IPA 与声学模型候选的序列对照；时间为 CTC 发射位置近似值。相同也不能证明发音正确。</p>}
   {result.status!=='unscorable'&&<div className="speech-compare">{result.phones?.map((p,i)=><span className={'speech-token '+(p.kind==='match'?'':'speech-substitution')} key={i}>{p.expected||'∅'} → {p.phone||'未检测'}{p.start_s!==undefined&&<small>{p.start_s.toFixed(2)}–{p.end_s?.toFixed(2)} s</small>}</span>)}</div>}
   {result.status!=='unscorable'&&[...new Set(result.phones?.filter(p=>p.kind!=='match'&&p.expected).map(p=>p.expected as string))].slice(0,6).map(p=><p key={p}><strong>可复练 /{p}/：</strong>{phoneHint(p,language)}</p>)}
   <p>重音与节奏练习：先标出词重音/意群，听示范并拍节奏，再回到原句；本模型没有验证这些项目。</p>
  </div>}
 </section>;
}
