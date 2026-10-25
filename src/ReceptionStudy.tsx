import {useEffect,useRef,useState} from 'react';
import {RECEPTION_LESSONS} from './receptionLessons';
import {FOUNDATION_RECEPTION} from './foundationReception';
import {useStudyResponses} from './studyResponses';
import {parallelEvidence} from './bilingualEvidence';
import {selectDeviceVoice} from './ttsVoice';

export default function ReceptionStudy({courseId,rate}:{courseId:string;rate:number}){
 const unit=RECEPTION_LESSONS[courseId]||FOUNDATION_RECEPTION[courseId];
 const saved=useStudyResponses(courseId+':reception');
 const [current,setCurrent]=useState(0),[speed,setSpeed]=useState(rate),[status,setStatus]=useState('未播放');
 const [playing,setPlaying]=useState(false),[paused,setPaused]=useState(false),[loop,setLoop]=useState(false);
 // A restored account preference can change after the reader has already mounted.
 useEffect(()=>{setSpeed(rate);},[rate]);
 const token=useRef(0),utterance=useRef<SpeechSynthesisUtterance|null>(null),startup=useRef<ReturnType<typeof setTimeout>|undefined>(undefined),loopRef=useRef(false);
 function stop(){token.current++;clearTimeout(startup.current);window.speechSynthesis?.cancel();utterance.current=null;setPlaying(false);setPaused(false);}
 useEffect(()=>()=>{token.current++;clearTimeout(startup.current);window.speechSynthesis?.cancel();},[courseId]);
 // Keep the audio position tied to the course, not to the component instance.
 useEffect(()=>{setCurrent(0);setStatus('未播放');setPlaying(false);setPaused(false);setLoop(false);loopRef.current=false;},[courseId]);
 if(!unit)return null;
 const safeIndex=Math.min(Math.max(current,0),Math.max(0,unit.paragraphs.length-1));
 function play(index:number){
  stop();
  if(!unit.paragraphs[index]){setStatus('本课没有可朗读的段落。');return;}
  setCurrent(index);
  if(!window.speechSynthesis||!window.SpeechSynthesisUtterance){setStatus('此浏览器不支持设备朗读，请使用原文与中文对照阅读。');return;}
  const run=token.current;
  const u=new SpeechSynthesisUtterance(unit.paragraphs[index].target);
  u.lang=unit.language==='fr'?'fr-FR':'en-GB';u.rate=speed;
  const voices=window.speechSynthesis.getVoices?.()||[];
  const matchedVoice=selectDeviceVoice(voices,unit.language);
  // If the platform enumerates voices but none speaks the study language,
  // don't feed a French exercise into a known English-only default voice.
  // When voices are not enumerated yet, request the target locale explicitly.
  if(voices.length>0&&!matchedVoice){
   setPlaying(false);setPaused(false);
   setStatus('未发现'+(unit.language==='fr'?'法语':'英语')+'系统语音，已停止朗读以避免错误发音。可继续阅读双语原文，或先安装对应语言语音。');
   return;
  }
  if(matchedVoice)u.voice=matchedVoice;
  const voiceWarning=voices.length===0?'（设备尚未提供语音列表，朗读语言需实际试听核对）':'';
  utterance.current=u;
  u.onstart=()=>{if(run===token.current){clearTimeout(startup.current);setPlaying(true);setStatus('正在朗读 '+unit.paragraphs[index].id+voiceWarning);}};
  u.onend=()=>{if(run===token.current){clearTimeout(startup.current);if(loopRef.current)play(index);else{setPlaying(false);setPaused(false);setStatus('本段朗读结束，可回听或选择下一段。');}}};
  u.onerror=()=>{if(run===token.current){clearTimeout(startup.current);setPlaying(false);setPaused(false);setStatus('设备朗读失败，请检查系统语音或稍后重试；仍可阅读双语原文。');}};
  try{setPlaying(true);setStatus('正在准备设备语音…'+voiceWarning);startup.current=setTimeout(()=>{if(run===token.current){stop();setStatus('设备语音未能启动，请检查系统是否安装相应语言语音；可继续阅读双语原文。');}},8000);window.speechSynthesis.speak(u);}catch{clearTimeout(startup.current);setPlaying(false);setStatus('设备朗读无法启动，请使用双语原文。');}
 }
 return <section className="reception-study" aria-label="逐段双语听读">
  <h3>{unit.title}</h3><p>{unit.genre}。设备合成语音（TTS），非自然人录音。</p>
  <div className="reception-controls">
   <label>朗读速度 <select value={speed} onChange={e=>{stop();setSpeed(Number(e.target.value));setStatus('速度已更新，请播放所选段落。');}}>{[...new Set([.65,.85,1,1.15,speed])].sort((a,b)=>a-b).map(x=><option key={x} value={x}>{x}×</option>)}</select></label>
   <button type="button" onClick={()=>play(safeIndex)} disabled={!unit.paragraphs.length}>播放 / 回听本段</button>
   <button type="button" disabled={!playing} onClick={()=>{if(paused)window.speechSynthesis.resume();else window.speechSynthesis.pause();setPaused(!paused);setStatus(paused?'继续朗读':'已请求暂停；设备支持程度可能不同。');}}>{paused?'继续':'暂停'}</button>
   <button type="button" disabled={!playing} onClick={()=>{stop();setStatus('已停止');}}>停止</button>
   <button type="button" aria-pressed={loop} onClick={()=>{const next=!loop;loopRef.current=next;setLoop(next);setStatus(next?'本段循环已开启。':'本段循环已关闭。');}}>本段循环 {loop?'开启':'关闭'}</button>
   <button type="button" disabled={safeIndex>=unit.paragraphs.length-1} onClick={()=>play(safeIndex+1)}>下一段</button>
  </div><p role="status">{status}</p>
  {unit.paragraphs.map((p,i)=><article className="reception-paragraph" key={p.id} aria-current={safeIndex===i?'true':undefined}>
   <header><h4>{p.id}</h4><button type="button" onClick={()=>play(i)} aria-label={'朗读 '+p.id}>听这一段</button></header>
   <div className="reception-parallel"><p lang={unit.language}>{p.target}</p><p lang="zh-Hans">{p.zh}</p></div>
  </article>)}
  <section><h4>表达与证据边界</h4>{unit.languageNotes.map(n=><div className="reception-paragraph" key={n.target}><p lang={unit.language}>{n.target}</p><p>{n.zh}</p></div>)}</section>
  <section><h4>依据原文作答</h4>{unit.questions.map((q,i)=>{
   const prompt=parallelEvidence(q.prompt),answer=parallelEvidence(q.answer);
   return <div className="curriculum-question" key={i}>
    <label htmlFor={courseId+'-reception-'+i}>
     <span className="evidence-source" lang={prompt.zh?unit.language:/\p{Script=Han}/u.test(prompt.source)?'zh-Hans':unit.language}>{prompt.source}</span>
     {prompt.zh&&<span className="evidence-translation" lang="zh-Hans">{prompt.zh}</span>}
    </label>
    <textarea id={courseId+'-reception-'+i} disabled={!saved.ready} value={saved.get('q'+i)} onChange={e=>saved.set('q'+i,e.target.value)}/>
    <details><summary>核对答案与段落依据</summary>
     <div className="evidence-answers"><p lang={answer.zh?unit.language:/\p{Script=Han}/u.test(answer.source)?'zh-Hans':unit.language}>{answer.source}</p>
      {answer.zh&&<p lang="zh-Hans" className="evidence-translation">{answer.zh}</p>}</div>
     <p>依据：{q.evidence.join('、')}。{q.why}</p>
    </details>
   </div>;
  })}</section>
  <section><h4>综合表达</h4><p>{unit.task}</p><label>我的听读摘要<textarea disabled={!saved.ready} rows={5} value={saved.get('summary')} onChange={e=>saved.set('summary',e.target.value)}/></label>
   <details><summary>对照摘要示范</summary><div className="reception-parallel"><p lang={unit.language}>{unit.model}</p><p lang="zh-Hans">{unit.modelZh}</p></div></details>
  </section>
 </section>;
}
