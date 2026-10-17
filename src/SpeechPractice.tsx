import {useEffect,useRef,useState} from 'react';
type Engine={
 lang:string;interimResults:boolean;continuous:boolean;
 onresult:((event:{results:{[key:number]:{[key:number]:{transcript:string}}}})=>void)|null;
 onerror:((event:{error:string})=>void)|null;onend:(()=>void)|null;
 start:()=>void;stop:()=>void;
};
type SpeechWindow=Window & {SpeechRecognition?:new()=>Engine;webkitSpeechRecognition?:new()=>Engine};
export function compareTranscript(target:string,heard:string){
 const clean=(x:string)=>x.normalize('NFC').toLocaleLowerCase().replace(/[^\p{L}\p{N}'’\s-]/gu,' ').replace(/\s+/g,' ').trim();
 const a=clean(target).split(' ').filter(Boolean),b=clean(heard).split(' ').filter(Boolean);
 if(!a.length||!b.length)return {percent:0,matched:0,total:a.length};
 const dp=Array.from({length:a.length+1},()=>new Array<number>(b.length+1).fill(0));
 for(let i=1;i<=a.length;i++)for(let j=1;j<=b.length;j++)
  dp[i][j]=a[i-1]===b[j-1]?dp[i-1][j-1]+1:Math.max(dp[i-1][j],dp[i][j-1]);
 const matched=dp[a.length][b.length];
 return {percent:Math.round(200*matched/(a.length+b.length)),matched,total:a.length};
}
export default function SpeechPractice({language}:{language:string}){
 const [target,setTarget]=useState('');
 const [heard,setHeard]=useState('');
 const [note,setNote]=useState('');
 const [listening,setListening]=useState(false);
 const [rate,setRate]=useState(0.9);
 const engine=useRef<Engine|null>(null);
 const lang=language==='fr'?'fr-FR':'en-US';
 useEffect(()=>()=>{engine.current?.stop();window.speechSynthesis?.cancel();},[]);
 function speak(){
  if(!('speechSynthesis' in window)){setNote('当前浏览器不支持本机语音朗读。');return;}
  if(!target.trim()){setNote('请输入需要练习的句子。');return;}
  window.speechSynthesis.cancel();
  const line=new SpeechSynthesisUtterance(target.slice(0,400));
  line.lang=lang;line.rate=rate;
  window.speechSynthesis.speak(line);
  setNote('正在使用浏览器提供的语音朗读。声音质量取决于设备和系统语音包。');
 }
 function listen(){
  const w=window as SpeechWindow, Constructor=w.SpeechRecognition||w.webkitSpeechRecognition;
  if(!Constructor){setNote('当前浏览器不支持语音识别，可使用 Chrome/Edge 的兼容版本；朗读仍可使用。');return;}
  if(!target.trim()){setNote('先输入一个要跟读的短句。');return;}
  if(engine.current){engine.current.stop();engine.current=null;}
  const rec=new Constructor();
  rec.lang=lang;rec.continuous=false;rec.interimResults=false;
  rec.onresult=event=>{setHeard(event.results[0][0].transcript);setNote('语音识别已完成。这是文字匹配反馈，不是音素或口音评分。');};
  rec.onerror=event=>{setNote('浏览器语音识别失败：'+event.error);setListening(false);};
  rec.onend=()=>{setListening(false);engine.current=null;};
  engine.current=rec;
  try{rec.start();setListening(true);setHeard('');setNote('麦克风识别中。部分浏览器会将音频送往其语音识别服务；学习系统不保存录音。');}
  catch{setListening(false);setNote('无法启动麦克风，请检查权限和浏览器支持。');}
 }
 const score=target.trim()&&heard.trim()?compareTranscript(target,heard):null;
 return <section className="cloud-reader" aria-label="跟读和文字识别练习">
  <h3>跟读 · 发音入门练习</h3>
  <p className="cloud-disclaimer">利用设备语音朗读和浏览器语音识别练习短句；不上传或存储麦克风录音。本功能只能比较识别文字，不能替代专业语音学评测。</p>
  <div className="cloud-fields">
    <label>练习句子（{lang}）
      <textarea rows={3} maxLength={400} value={target}
        onChange={e=>{setTarget(e.target.value);setHeard('');}} placeholder="Bonjour, je m'appelle Camille."/>
    </label>
    <label>播放语速：{rate.toFixed(2)}×
      <input type="range" min="0.7" max="1.25" step="0.05"
        value={rate} onChange={e=>setRate(Number(e.target.value))}/>
    </label>
    <div className="speech-actions">
     <button type="button" onClick={speak}>播放标准朗读</button>
     <button type="button" onClick={listen} disabled={listening}>{listening?'识别中…':'开始跟读识别'}</button>
     {listening&&<button type="button" onClick={()=>engine.current?.stop()}>结束识别</button>}
    </div>
    <p className="cloud-disclaimer" role="status">{note}</p>
    {heard&&<div className="cloud-ai-result">
     <p><strong>浏览器识别文字：</strong>{heard}</p>
     {score&&<p><strong>文本词序匹配指数：</strong>{score.percent}%（不等于发音准确度）</p>}
    </div>}
  </div>
 </section>;
}
