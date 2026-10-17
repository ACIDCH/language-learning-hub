import {useEffect,useRef,useState} from 'react';
import {analyzeTranscript,practiceHint} from './speechCompare';

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
export default function SpeechPractice({language}:{language:string}){
 const [target,setTarget]=useState('');
 const [heard,setHeard]=useState('');
 const [interim,setInterim]=useState('');
 const [alternatives,setAlternatives]=useState<string[]>([]);
 const [note,setNote]=useState('先听示范，再说完整短句，可重复练习。');
 const [listening,setListening]=useState(false);
 const [rate,setRate]=useState(0.85);
 const [attempts,setAttempts]=useState(0);
 const [voiceId,setVoiceId]=useState('');
 const [voices,setVoices]=useState<SpeechSynthesisVoice[]>([]);
 const [locale,setLocale]=useState(language==='fr'?'fr-FR':'en-US');
 const engine=useRef<Engine|null>(null);
 const lang=language==='fr'?'fr':'en';
 useEffect(()=>{
  const synth=window.speechSynthesis;
  const refresh=()=>setVoices(synth?.getVoices().filter(v=>v.lang.toLowerCase().startsWith(lang))||[]);
  refresh();
  synth?.addEventListener?.('voiceschanged',refresh);
  return ()=>{
    synth?.removeEventListener?.('voiceschanged',refresh);
    engine.current?.abort();engine.current=null;
    synth?.cancel();
  };
 },[lang]);
 const report=target.trim()&&heard.trim()?analyzeTranscript(target,heard):null;
 function updateTarget(next:string){
  if(listening){engine.current?.abort();engine.current=null;setListening(false);}
  setTarget(next);setHeard('');setInterim('');setAlternatives([]);
  setAttempts(0);setNote('已更新练习句子。');
 }
 function speak(){
  if(!('speechSynthesis' in window)){setNote('此浏览器不支持系统语音朗读。');return;}
  if(!target.trim()){setNote('先输入一个词或练习短句。');return;}
  window.speechSynthesis.cancel();
  const utterance=new SpeechSynthesisUtterance(target.trim().slice(0,400));
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
  if(engine.current)engine.current.abort();
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
        finished=true;
        setHeard(first);setInterim('');
        const options:string[]=[];
        for(let j=0;j<Math.min(result.length,3);j++){
          const candidate=result[j]?.transcript?.trim();
          if(candidate&&!options.includes(candidate))options.push(candidate);
        }
        setAlternatives(options.slice(1));setAttempts(n=>n+1);
        setNote('识别完成。下方比较的是文字，不等于音素或口音准确率。');
      }else setInterim(first);
    }
  };
  rec.onerror=event=>{
    if(engine.current!==rec)return;
    failed=true;
    setNote(ERRORS[event.error]||'语音识别出现问题：'+event.error);
    setInterim('');
    setListening(false);
  };
  rec.onend=()=>{
    if(engine.current!==rec)return;
    engine.current=null;setListening(false);setInterim('');
    if(!finished&&!failed)setNote('没有取得最终识别文字；可以放慢语速再试。');
  };
  engine.current=rec;setHeard('');setAlternatives([]);setInterim('');
  try{
    rec.start();setListening(true);
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
 return <section className="cloud-reader" aria-label="跟读与识别文字练习">
  <h3>跟读练习 · 文字对照</h3>
  <p className="cloud-disclaimer">使用浏览器语音识别和系统发声进行练习。识别文字受口音、语速、噪声与识别服务影响，不能直接用于给发音打分。当前练习记录仅留在本页面，不保存录音或同步转写文本。</p>
  <div className="cloud-fields">
    <label>练习短句（{locale}）
      <textarea rows={3} maxLength={400} value={target}
        onChange={e=>updateTarget(e.target.value)}
        placeholder={SAMPLE[lang][0]}/>
    </label>
    <div className="speech-presets" role="group" aria-label="练习句子示例">
      {SAMPLE[lang].map(t=><button type="button" key={t} disabled={listening}
        onClick={()=>updateTarget(t)}>{t}</button>)}
    </div>
    <div className="speech-settings">
      <label>语言与口音
        <select value={locale} disabled={listening}
          onChange={e=>{setLocale(e.target.value);setVoiceId('');setHeard('');}}>
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
      <button type="button" onClick={speak}>听标准示范</button>
      <button type="button" onClick={listen} disabled={listening}>
        {listening?'正在识别…':attempts?'再次练习':'开始跟读'}
      </button>
      {listening&&<button type="button" onClick={end}>结束收音</button>}
      {(heard||interim)&&!listening&&<button type="button" onClick={()=>{
        setHeard('');setInterim('');setAlternatives([]);setNote('识别结果已清空。');
      }}>清空结果</button>}
    </div>
    <p className="cloud-disclaimer" role="status" aria-live="polite">{note}</p>
    {interim&&<p className="speech-interim">识别中：{interim}</p>}
    {heard&&<div className="cloud-ai-result" aria-label="文字识别练习反馈">
      <p><strong>浏览器转写：</strong>{heard}</p>
      {report&&<>
        <p><strong>转写文字相似度：</strong>{report.similarity}% （{report.matched} 词匹配，{report.substituted} 词不同，{report.missing} 词未出现，{report.extra} 词多出）</p>
        <div className="speech-compare" aria-label="目标词语识别情况">
          {report.expected.map((t,i)=><span key={i}
            className={'speech-token speech-'+t.status}
            title={t.status==='substitution'?'识别为：'+t.heard:t.status==='missing'?'未识别到该词':'文字匹配'}>
            {t.word}{t.status==='substitution'&&<small>→ {t.heard}</small>}
          </span>)}
        </div>
        {report.extras.length>0&&<p className="cloud-disclaimer">额外识别文字：{report.extras.join('、')}</p>}
        <p className="cloud-disclaimer">{practiceHint(report)}</p>
      </>}
      {alternatives.length>0&&<details>
        <summary>识别引擎提供的其他转写结果（{alternatives.length}）</summary>
        <ul>{alternatives.map((t,i)=><li key={i}>{t}</li>)}</ul>
      </details>}
      <p className="cloud-disclaimer">这不是口音、韵律、重音或音素评测；转写相似度较高也不意味着发音一定正确。</p>
    </div>}
  </div>
 </section>;
}
