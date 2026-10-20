import {lazy,Suspense,useCallback,useEffect,useRef,useState} from 'react';
import BrowserSpeechFeedback,{type BrowserSpeechHandle} from './BrowserSpeechFeedback';
import type {Session} from '@supabase/supabase-js';
import AITutor from './AITutor';
import {apiBase} from './v44Connection';
import './speakingWorkbench.css';
import {ENGINES,browserResult,lessonPractice,cloudSpeechEndpoint,type SpeechEngineId} from './speechEngines';
const LocalPronunciation=lazy(()=>import('./LocalPronunciation'));

import {analyzeTranscript,practiceHint} from './speechCompare';
import {appendAttempt,learnerCoaching,type RecentAttempt} from './speechCoach';
import {practiceChunks,addReviewWords,clearReviewedWord,type ReviewWord} from './speechLearningTools';
import IpaText from './IpaText';

type Alternative={transcript:string;confidence?:number};
type Result={isFinal:boolean;length:number;[index:number]:Alternative};
type RecognitionResults={length:number;[index:number]:Result};
type Engine={
 lang:string;interimResults:boolean;continuous:boolean;maxAlternatives:number;
 onresult:((event:{results:RecognitionResults})=>void)|null;
 onerror:((event:{error:string})=>void)|null;
 onend:(()=>void)|null;
 start:()=>void;stop:()=>void;abort:()=>void;
};
type SpeechWindow=Window & {SpeechRecognition?:new()=>Engine;webkitSpeechRecognition?:new()=>Engine};
const SAMPLE:Record<string,string[]>={
 fr:['Bonjour, comment allez-vous ?', 'Je voudrais un café, s’il vous plaît.', 'Nous allons à la bibliothèque.'],
 en:['How are you doing today?', 'I would like to practice my English.', 'Could you repeat that more slowly?']
};
const ERRORS:Record<string,string>={
 'not-allowed':'无法访问麦克风：请在浏览器地址栏启用麦克风权限。',
 'service-not-allowed':'浏览器阻止了语音识别服务，请检查浏览器设置。',
 'audio-capture':'没有检测到可用麦克风，请检查设备输入。',
 'no-speech':'没有听到可识别的说话声，请靠近麦克风、缩短句子后重试。',
 'network':'语音识别服务网络连接失败。部分浏览器需要联网处理语音。',
 'language-not-supported':'当前语音识别服务不支持所选语言，请更换语言或浏览器。',
 'aborted':'本次识别已停止。'
};
export {analyzeTranscript as compareTranscript} from './speechCompare';
export default function SpeechPractice({language,lessonText="",initialTarget="",accessToken,session=null,variant='classic',showChoices=true}:{
 language:string;lessonText?:string;initialTarget?:string;accessToken?:string;
 variant?:'classic'|'standalone'|'selection';showChoices?:boolean;session?:Session|null
}){
 const [target,setTarget]=useState(initialTarget);
 const [mode,setMode]=useState<SpeechEngineId>('browser-asr');
 const [step,setStep]=useState<'word'|'sentence'|'paragraph'>('sentence');
 const watchdog=useRef<ReturnType<typeof setTimeout>|undefined>(undefined);
 const [heard,setHeard]=useState('');
 const [interim,setInterim]=useState('');
 const [alternatives,setAlternatives]=useState<string[]>([]);
 const [note,setNote]=useState('先听示范，再说完整短句，可重复练习。');
 const [listening,setListening]=useState(false);
 const [rate,setRate]=useState(0.85);
 const [attempts,setAttempts]=useState(0);
 const [recent,setRecent]=useState<RecentAttempt[]>([]);
 const [reviewWords,setReviewWords]=useState<ReviewWord[]>([]);
 const [blindMode,setBlindMode]=useState(false);
 const [showIpa,setShowIpa]=useState(false);
 const [revealed,setRevealed]=useState(false);
 const [returnSentence,setReturnSentence]=useState('');
 const attemptId=useRef(0);
 const [voiceId,setVoiceId]=useState('');
 const [voices,setVoices]=useState<SpeechSynthesisVoice[]>([]);
 const [locale,setLocale]=useState(language==='fr'?'fr-FR':'en-US');
 const engine=useRef<Engine|null>(null);
 const browserRecorder=useRef<BrowserSpeechHandle|null>(null);
 const [microphonePhase,setMicrophonePhase]=useState<'idle'|'permission'|'recording'|'processing'>('idle');
 const handleMicrophonePhase=useCallback((phase:typeof microphonePhase)=>setMicrophonePhase(phase),[]);
 const lang=language==='fr'?'fr':'en';
 useEffect(()=>{
  setLocale(lang==='fr'?'fr-FR':'en-US');setTarget(initialTarget);setHeard('');setAlternatives([]);setListening(false);
  setRecent([]);setAttempts(0);setReturnSentence('');
  setReviewWords([]);setBlindMode(false);setRevealed(false);
  const synth=window.speechSynthesis;
  const refresh=()=>setVoices(synth?.getVoices().filter(v=>v.lang.toLowerCase().startsWith(lang))||[]);
  refresh();
  synth?.addEventListener?.('voiceschanged',refresh);
  return ()=>{
    synth?.removeEventListener?.('voiceschanged',refresh);
    const previous=engine.current;engine.current=null;previous?.abort();clearTimeout(watchdog.current);
    synth?.cancel();
  };
 },[lang]);
 const report=target.trim()&&heard.trim()?analyzeTranscript(target,heard):null;
 const coaching=report?learnerCoaching(report,target):null;
 const examples=lessonText?lessonPractice(lessonText,step):[];
 const masked=blindMode&&!!target.trim()&&!revealed;
 const chunks=practiceChunks(target);
 function nextSentence(){
  const choices=examples.length?examples:SAMPLE[lang];
  if(!choices.length)return;
  const current=choices.indexOf(target);
  updateTarget(choices[(current+1)%choices.length]);
 }
 function updateTarget(next:string){
  const previous=engine.current;engine.current=null;previous?.abort();clearTimeout(watchdog.current);setListening(false);
  setTarget(next);setHeard('');setInterim('');setAlternatives([]);
  setAttempts(0);setRecent([]);setReturnSentence('');setRevealed(false);setNote('已更新练习句子。');
 }
 function focusWord(word:string){
  const original=returnSentence||target;
  updateTarget(word);
  setReturnSentence(original);
 }
 function speak(sentence=target){
  if(!('speechSynthesis' in window)){setNote('此浏览器不支持系统语音朗读。');return;}
  if(!sentence.trim()){setNote('先输入一个词或练习短句。');return;}
  window.speechSynthesis.cancel();
  const utterance=new SpeechSynthesisUtterance(sentence.trim().slice(0,400));
  utterance.lang=locale;utterance.rate=rate;
  const preferred=voices.find(v=>v.voiceURI===voiceId)||
    voices.find(v=>v.lang.toLowerCase()===locale.toLowerCase())||voices[0];
  if(preferred)utterance.voice=preferred;
  utterance.onerror=()=>setNote('语音朗读没有成功，请尝试切换系统声音或浏览器。');
  try{
    window.speechSynthesis.speak(utterance);
    setNote('正在播放设备语音示范；不同系统的朗读质量可能不同。');
  }catch{setNote('无法播放系统语音示范。');}
 }
 function listen(){
  const w=window as SpeechWindow,Constructor=w.SpeechRecognition||w.webkitSpeechRecognition;
  if(!Constructor){setNote('浏览器没有提供 Web Speech 识别，请改用支持该功能的浏览器。');return;}
  if(!target.trim()){setNote('先输入练习短句。');return;}
  window.speechSynthesis?.cancel();
  const previous=engine.current;engine.current=null;previous?.abort();clearTimeout(watchdog.current);
  const rec=new Constructor();
  rec.lang=locale;rec.continuous=false;rec.interimResults=true;rec.maxAlternatives=3;
  let finished=false,failed=false;
  rec.onresult=event=>{
    if(engine.current!==rec)return;
    for(let i=0;i<event.results.length;i++){
      const result=event.results[i];
      if(!result?.length)continue;
      const first=result[0]?.transcript?.trim()||'';
      if(!first)continue;
      if(result.isFinal){
        if(finished)return;
        finished=true;
        setHeard(browserResult(first).transcript||'');setInterim('');
        const options:string[]=[];
        for(let j=0;j<Math.min(result.length,3);j++){
          const candidate=result[j]?.transcript?.trim();
          if(candidate&&!options.includes(candidate))options.push(candidate);
        }
        setAlternatives(options.slice(1));setAttempts(n=>n+1);
        setRevealed(true);
        const checked=analyzeTranscript(target,first);
        if(checked.originalWordCount===1&&checked.matched===1&&checked.extra===0){
          setReviewWords(previous=>clearReviewedWord(previous,target));
        }else{
          const focus=learnerCoaching(checked,target).focusWords;
          if(focus.length)setReviewWords(previous=>addReviewWords(previous,focus));
        }
        setRecent(previous=>appendAttempt(previous,{
          id:++attemptId.current,target,heard:first,
          match:checked.missing===0&&checked.substituted===0&&checked.extra===0
        }));
        setNote('识别完成。请查看文字核对与下一步复练建议；这不是发音打分。');
        // A final ASR result is usable immediately. Close the microphone now,
        // rather than waiting for vendor onend (which may be delayed).
        clearTimeout(watchdog.current);
        engine.current=null;
        setListening(false);
        try{rec.stop();}catch{rec.abort();}
        return;
      }else setInterim(first);
    }
  };
  rec.onerror=event=>{
    if(engine.current!==rec)return;
    failed=true;clearTimeout(watchdog.current);
    setNote(ERRORS[event.error]||'语音识别出现问题：'+event.error);
    setInterim('');
    setListening(false);
  };
  rec.onend=()=>{
    if(engine.current!==rec)return;
    clearTimeout(watchdog.current);engine.current=null;setListening(false);setInterim('');
    if(!finished&&!failed)setNote('没有取得最终识别文字；可以放慢语速再试。');
  };
  engine.current=rec;setHeard('');setAlternatives([]);setInterim('');
  if(blindMode)setRevealed(false);
  if(blindMode)setRevealed(false);
  try{
    rec.start();setListening(true);
    watchdog.current=setTimeout(()=>{if(engine.current===rec){engine.current=null;rec.abort();setListening(false);setInterim('');setNote('识别服务等待超时，请重试；也可直接使用下方浏览器录音分析。');}},20000);
    setNote('正在监听。部分浏览器将语音发送至其服务商识别；本学习系统不保留音频。');
  }catch{
    engine.current=null;setListening(false);
    setNote('无法启动识别，请检查设备输入和麦克风权限。');
  }
 }
 function end(){
   try{engine.current?.stop();setNote('已停止收音，正在等待最终识别结果…');}
   catch{setListening(false);}
 }
 function startCombined(){
   if(!target.trim()){setNote('请先选择单词或句子。');return;}
   browserRecorder.current?.start();
   listen();
  }
  function stopCombined(){
   browserRecorder.current?.stop();
   if(listening)end();
  }
  function retryCombined(){
   browserRecorder.current?.cancel();
   updateTarget(target);
  }
  if(variant!=='classic')return <section className={'speaking-workbench'+(variant==='selection'?' speaking-workbench--selection':'')} aria-label="跟读与识别文字练习">
   <div className="speaking-workbench-heading">
    <h2>跟读训练 <small>Speaking Practice</small></h2>
    <label>发音语言 <select aria-label="语言与口音" value={locale} disabled={listening} onChange={e=>{updateTarget(target);setLocale(e.target.value);setVoiceId('');}}>
     {(lang==='fr'?['fr-FR','fr-CA']:['en-US','en-GB','en-AU']).map(l=><option key={l} value={l}>{l}</option>)}
    </select></label>
   </div>
   <div className="speaking-workbench-target">
    <label>选中文本<textarea aria-label="跟读目标文本" value={target} maxLength={400}
     rows={variant==='selection'?2:3} placeholder={SAMPLE[lang][0]} onChange={e=>updateTarget(e.target.value)}/></label>
    {variant==='standalone'&&showChoices&&<div className="speaking-workbench-choices" aria-label="常用句子">
     {(examples.length?examples:SAMPLE[lang]).slice(0,8).map(s=><button type="button" key={s}
       className={s===target?'chosen':''} onClick={()=>updateTarget(s)}>{s}</button>)}
    </div>}
   </div>
   <div className="speaking-workbench-controls">
    <button type="button" onClick={()=>speak()} disabled={!target.trim()}>▶ 播放示范</button>
    <button type="button" className="speaking-primary" disabled={!target.trim()||listening||microphonePhase!=='idle'}
     onClick={startCombined}>🎙 开始跟读</button>
    <button type="button" disabled={!listening&&microphonePhase==='idle'} onClick={stopCombined}>■ 停止</button>
    <button type="button" disabled={listening||microphonePhase==='recording'} onClick={retryCombined}>↻ 重试</button>
   </div>
   <p className="speaking-workbench-status" role="status" aria-live="polite">{note}</p>
   <section className="speaking-workbench-result" aria-label="识别与发音分析结果">
    <div className="speaking-workbench-result-head"><h3>识别与发音分析结果</h3>
      {report&&<span>文本相似度 <strong>{report.similarity}%</strong></span>}</div>
    {interim&&<p>识别中：{interim}</p>}
    {heard&&<div className="speaking-recognition"><b>识别文字</b><p>{heard}</p>
      {report&&<div className="speech-compare" aria-label="目标词语识别情况">{report.expected.map((word,i)=>
       <span key={i} className={'speech-token speech-'+word.status}>{word.word}{word.status==='substitution'&&<small>→ {word.heard}</small>}</span>)}</div>}
    </div>}
    <BrowserSpeechFeedback ref={browserRecorder} key={target+'-'+lang} target={target} language={lang} embedded onPhaseChange={handleMicrophonePhase}/>
    {coaching&&<section className="speaking-workbench-coaching" aria-label="纠正与复练建议">
      <h4>纠正与复练建议</h4><p>{coaching.instruction}</p>
      {coaching.focusWords.slice(0,5).map(word=><button key={word} onClick={()=>focusWord(word)}>复练 {word}</button>)}
    </section>}
   </section>
   {variant==='standalone'&&<details className="speaking-workbench-ai">
    <summary>AI 辅助讲解</summary>
    <AITutor key={target} compact session={session} apiBase={apiBase}
     courseId="speaking-lab" language={lang} lessonText={target}
     initialPrompt={'请参考本次英语/法语跟读的文字结果给出简短规则解析与复练建议。目标：'+target+'。识别：'+(heard||'暂无')+'。不要把文字相似度当专业发音评分。'}/>
   </details>}
   {variant==='standalone'&&<details className="speaking-workbench-more"><summary>更多练习选项</summary>
     <label>示范语速 {rate.toFixed(2)}× <input type="range" min=".65" max="1.15" step=".05" value={rate} onChange={e=>setRate(Number(e.target.value))}/></label>
     <label><input type="checkbox" checked={showIpa} onChange={e=>setShowIpa(e.target.checked)}/>显示参考 IPA</label>
     {showIpa&&target&&<IpaText text={target} language={locale}/>}
   </details>}
  </section>;
  return <section className="cloud-reader" aria-label="跟读与识别文字练习">
  <h3>听一句、跟读一句、再复练</h3>
  <p className="cloud-disclaimer">面向日常语言学习：浏览器短录音分析 + 免费文字识别 + 设备语音示范，无需购买专业发音评分服务。文字差异可供复练，但不代表口音或音素诊断；浏览器识别可能调用厂商服务。本页面不保存录音，也不把转写同步到学习记录。</p>
  <ol className="speech-learning-steps" aria-label="跟读四步">
   <li>选一个短句</li><li>听设备示范</li><li>开始跟读并查看识别文字</li><li>听错词、再练一次</li>
  </ol>
  <div className="cloud-fields">
    <details className="speech-advanced">
     <summary>识别方式与高级实验功能（默认使用免费浏览器识别）</summary>
     <label>练习引擎<select aria-label="练习引擎" value={mode} onChange={e=>{updateTarget(target);setMode(e.target.value as SpeechEngineId);}}>{ENGINES.map(x=><option key={x.id} value={x.id} disabled={!x.available||(x.id==='optional-remote-evaluator'&&(!accessToken||!cloudSpeechEndpoint()))}>{x.name}</option>)}</select></label>
     <p className="cloud-disclaimer">下方浏览器录音分析不需要部署服务；这里保留兼容旧版高级声学模型的可选入口。普通用户无需使用这些模型。</p>
    </details>
    <label>练习长度<select aria-label="练习长度" value={step} onChange={e=>setStep(e.target.value as typeof step)}><option value="word">短词</option><option value="sentence">短句</option><option value="paragraph">段落（声学模式每次不超过 12 秒）</option></select></label>
    {!!examples.length&&!masked&&<div className="speech-presets" aria-label="当前课程练习片段">{examples.map((s,i)=><button key={i} onClick={()=>updateTarget(s)}>{s}</button>)}</div>}
    <label className="speech-blind-toggle">
      <input type="checkbox" checked={blindMode} disabled={!target.trim()||listening}
        onChange={e=>{setBlindMode(e.target.checked);setRevealed(false);}}/>
      听辨挑战：听过示范后隐藏文字，先凭听力复述，再揭晓对照
    </label>
    {masked?<div className="speech-blind-panel" aria-label="听辨模式已隐藏目标句子">
      <p>目标词句已隐藏。点击「① 听示范」，然后尝试跟读；识别完成后会自动显示原文。</p>
      <button type="button" disabled={listening} onClick={()=>setRevealed(true)}>提前显示原文</button>
    </div>:<label>练习短句（{locale}）
      <textarea rows={3} maxLength={400} value={target}
        onChange={e=>updateTarget(e.target.value)}
        placeholder={SAMPLE[lang][0]}/>
    </label>}
    {!masked&&<label className="speech-ipa-toggle">
      <input type="checkbox" checked={showIpa} onChange={e=>setShowIpa(e.target.checked)}/>
      在练习句下方实时显示 IPA 参考音标
    </label>}
    {showIpa&&!masked&&target.trim()&&<section aria-label="当前跟读目标音标"
      className="speech-ipa-preview">
      <IpaText text={target} language={locale}/>
      <p className="cloud-disclaimer">依据上下文自动生成，可能无法正确区分所有同形异音词或法语连诵，不代表发音评分。</p>
    </section>}
    {!masked&&chunks.length>1&&<section className="speech-chunk-practice" aria-label="长句分块跟读">
      <h4>先分块，再读整句</h4>
      <p className="cloud-disclaimer">使用现有浏览器朗读。可以单独练习片段，也可以返回原文一次读完整句。</p>
      {chunks.map((part,i)=><div className="speech-chunk" key={i}>
        <span>{i+1}. {part}</span>
        <button type="button" disabled={listening} onClick={()=>speak(part)}>听这一段</button>
        <button type="button" disabled={listening} onClick={()=>focusWord(part)}>只练这一段</button>
      </div>)}
    </section>}
    {!masked&&<div className="speech-presets" role="group" aria-label="练习句子示例">
      {SAMPLE[lang].map(t=><button type="button" key={t} disabled={listening}
        onClick={()=>updateTarget(t)}>{t}</button>)}
    </div>}
    <div className="speech-settings">
      <label>语言与口音
        <select value={locale} disabled={listening}
          onChange={e=>{updateTarget(target);setLocale(e.target.value);setVoiceId('');}}>
          {(lang==='fr'?['fr-FR','fr-CA']:['en-US','en-GB','en-AU']).map(l=>
            <option key={l} value={l}>{l}</option>)}
        </select>
      </label>
      <label>系统朗读声音
        <select value={voiceId} onChange={e=>setVoiceId(e.target.value)}>
          <option value="">自动选择设备声音</option>
          {voices.map(v=><option key={v.voiceURI} value={v.voiceURI}>{v.name} ({v.lang})</option>)}
        </select>
      </label>
    </div>
    <label>语速：{rate.toFixed(2)}×
      <input type="range" min="0.65" max="1.15" step="0.05"
        value={rate} onChange={e=>setRate(Number(e.target.value))}/>
    </label>
    <div className="speech-actions">
      <button type="button" onClick={()=>speak()} disabled={listening}>① 听示范</button>
      <button type="button" onClick={listen} disabled={listening||mode!=='browser-asr'}>
        {listening?'正在识别…':attempts?'再跟读一次':'② 开始跟读'}
      </button>
      {listening&&<button type="button" onClick={end}>结束收音</button>}
      {returnSentence&&<button type="button" disabled={listening} onClick={()=>updateTarget(returnSentence)}>返回完整句</button>}
      <button type="button" disabled={listening} onClick={nextSentence}>换一句练习 →</button>
      {(heard||interim)&&!listening&&<button type="button" onClick={()=>{
        setHeard('');setInterim('');setAlternatives([]);setNote('识别结果已清空。');
      }}>清空结果</button>}
    </div>
    <p className="cloud-disclaimer" role="status" aria-live="polite">{note}</p>
    <Suspense fallback={<p>正在加载本机录音分析工具…</p>}>
      <BrowserSpeechFeedback target={target} language={lang}/>
    </Suspense>
    {interim&&<p className="speech-interim">识别中：{interim}</p>}
    {mode!=='browser-asr'&&<Suspense fallback={<p>正在加载录音组件…</p>}>
      <LocalPronunciation target={target} language={lang}
        remote={mode==='optional-remote-evaluator'} accessToken={accessToken}/>
    </Suspense>}
    {heard&&<div className="cloud-ai-result" aria-label="文字识别练习反馈">
      <p><strong>浏览器转写：</strong>{heard}</p>
      {report&&<>
        <p><strong>文字核对（不是发音得分）：</strong>{report.similarity}% 文本匹配度（{report.matched} 词匹配，{report.substituted} 词不同，{report.missing} 词未出现，{report.extra} 词多出）</p>
        <div className="speech-compare" aria-label="目标词语识别情况">
          {report.expected.map((t,i)=><span key={i}
            className={'speech-token speech-'+t.status}
            title={t.status==='substitution'?'识别为：'+t.heard:t.status==='missing'?'未识别到该词':'文字匹配'}>
            {t.word}{t.status==='substitution'&&<small>→ {t.heard}</small>}
          </span>)}
        </div>
        {report.extras.length>0&&<p className="cloud-disclaimer">额外识别文字：{report.extras.join('、')}</p>}
        {coaching&&<section className="speech-coaching" aria-label="针对性复练建议">
          <h4>{coaching.headline}</h4><p>{coaching.instruction}</p>
          {!!coaching.focusWords.length&&<div className="speech-focus-words">{coaching.focusWords.map(word=><div key={word} className="speech-focus-word">
            <strong>{word}</strong><button type="button" onClick={()=>speak(word)}>听这个词</button>
            <button type="button" onClick={()=>focusWord(word)}>只练这个词</button>
           </div>)}</div>}
          {coaching.readyForNext&&<button type="button" onClick={nextSentence}>进入下一句 →</button>}
        </section>}
        <p className="cloud-disclaimer">{practiceHint(report)}</p>
      </>}
      {alternatives.length>0&&<details>
        <summary>识别引擎提供的其他转写结果（{alternatives.length}）</summary>
        <ul>{alternatives.map((t,i)=><li key={i}>{t}</li>)}</ul>
      </details>}
      <p className="cloud-disclaimer">这不是口音、韵律、重音或音素评测；转写相似度较高也不意味着发音一定正确。</p>
      {recent.length>0&&<details className="speech-recent">
       <summary>本句跟读记录（{attempts} 次，最多显示最近 5 次）</summary>
       <ol>{recent.map(item=><li key={item.id}><strong>{item.match?'文字一致':'有文字差异'}</strong> · {item.heard}</li>)}</ol>
       <p>仅存当前页面内存；更换句子、切换语言或刷新后清空。</p>
      </details>}
    </div>}
    {!!reviewWords.length&&<section className="speech-coaching" aria-label="跨句重点词复练">
      <h4>本次学习的重点词（{reviewWords.length}）</h4>
      <p className="cloud-disclaimer">根据浏览器转写的文字差异整理，并非确定的发音错误；更换句子仍保留，刷新页面后清空。单独跟读并识别一致后移出清单。</p>
      <div className="speech-focus-words">{reviewWords.map(item=><div className="speech-focus-word" key={item.word}>
        <strong>{item.word}</strong><small>待复练 {item.count} 次</small>
        <button type="button" disabled={listening} onClick={()=>speak(item.word)}>听这个词</button>
        <button type="button" disabled={listening} onClick={()=>focusWord(item.word)}>复练这个词</button>
      </div>)}</div>
      <button type="button" disabled={listening} onClick={()=>setReviewWords([])}>清空重点词清单</button>
    </section>}
  </div>
 </section>;
}
