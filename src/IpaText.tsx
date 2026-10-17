import {useEffect,useMemo,useState} from 'react';
import {normalizeIpaLocale,sliceIpaText,toIpaLine,type IpaLine,type IpaUnit} from './ipaEngine';

let ttsGeneration=0;
export function speakIpaText(text:string,language:string,rate=.85){
 if(!text.trim()||!('speechSynthesis' in window))return false;
 try {
  const synth=window.speechSynthesis;
  const generation=++ttsGeneration;
  synth.cancel();
  const chunks=sliceIpaText(text,220).filter(part=>part.trim());
  if(!chunks.length)return false;
  // Speak bounded chunks sequentially, so full paragraphs are not silently cut at 400 chars.
  let index=0;
  function next(){
   if(index>=chunks.length||generation!==ttsGeneration)return;
   const utterance=new SpeechSynthesisUtterance(chunks[index++]);
   utterance.lang=normalizeIpaLocale(language);
   utterance.rate=rate;
   utterance.onend=next;
   synth.speak(utterance);
  }
  next();
  return true;
 }catch{return false;}
}

/** The phonemizer never transmits the document. Only active visible IPA content is converted. */
export default function IpaText({text,language,compact=false,onSpeak}:{
 text:string;language:string;compact?:boolean;onSpeak?:(text:string)=>void
}){
 const [lines,setLines]=useState<IpaLine[]>([]);
 const [progress,setProgress]=useState(0);
 const [message,setMessage]=useState('正在初始化浏览器音标引擎…');
 const parts=useMemo(()=>{
  const collected:string[]=[];
  for(const line of text.replace(/\r\n?/g,'\n').split(/(\n)/)){
   if(line==='\n')collected.push(line);
   else collected.push(...sliceIpaText(line));
  }
  return collected;
 },[text]);
 useEffect(()=>{
  let cancelled=false;
  let timer:ReturnType<typeof setTimeout>;
  setLines([]);setProgress(0);
  setMessage('正在生成参考音标…');
  let done=0;
  // Yield between chunks so the lesson remains responsive for longer manuscripts.
  const run=async()=>{
   const next:IpaLine[]=[];
   try {
    for(const part of parts){
     if(cancelled)return;
     next.push(part==='\n'
       ? {source:'\n',units:[{source:'\n',ipa:'',kind:'plain'}],generated:false}
       : await toIpaLine(part,language));
     done++;
     if(cancelled)return;
     if(done%5===0||done===parts.length){
      setLines([...next]);setProgress(done);
      await new Promise<void>(resolve=>{timer=setTimeout(resolve,0);});
     }
    }
    if(!cancelled)setMessage('');
   }catch{
    if(!cancelled){
     setMessage('此浏览器暂时无法加载离线音标模块；原文和现有朗读功能仍可使用。');
     setLines([]);
    }
   }
  };
  timer=setTimeout(()=>{void run();},40);
  return ()=>{cancelled=true;clearTimeout(timer);};
 },[parts,language]);
 const speak=(word:string)=>{
  if(onSpeak)onSpeak(word);
  else speakIpaText(word,language);
 };
 const sourceOnly=lines.length===0;
 const processed=lines.map(line=>line.source).join('');
 const rest=text.replace(/\r\n?/g,'\n').slice(processed.length);
 return <div className={'ipa-text'+(compact?' ipa-text-compact':'')} lang={normalizeIpaLocale(language)}
   aria-label="参考国际音标与课程原文">
   {message&&<p className="ipa-status" role="status">{message}</p>}
   {lines.length>0&&<div className="ipa-transcript">
    {lines.map((line,i)=><span className="ipa-line" key={i}>
      {line.units.map((unit,j)=><IpaSpan key={j} unit={unit} speak={speak}/>)}
    </span>)}
   </div>}
   {sourceOnly&&<span className="ipa-original-pending">{text}</span>}
   {!sourceOnly&&rest&&<span className="ipa-original-pending">{rest}</span>}
   {progress<parts.length&&parts.length>8&&!sourceOnly&&<small className="ipa-status">
     已生成 {progress} / {parts.length} 个文本块的音标
   </small>}
  </div>;
}

function IpaSpan({unit,speak}:{unit:IpaUnit;speak:(text:string)=>void}){
 if(unit.source==='\n')return <span className="ipa-newline">{'\n'}</span>;
 if(!unit.ipa)return <span>{unit.source}</span>;
 if(unit.kind==='fallback')return <span className="ipa-fallback">
   <span>{unit.source}</span><small aria-label="整段参考音标">/{unit.ipa}/</small>
   <button type="button" onClick={()=>speak(unit.source)}>听这一段</button>
  </span>;
 // WebAssembly eSpeak source-map may yield subword pieces. Do not claim word-level accuracy.
 return <button type="button" className="ipa-ruby-action"
    title={'参考音标：/'+unit.ipa+'/；点击播放对应文字'}
    aria-label={'播放 '+unit.source+'，参考音标 '+unit.ipa}
    onClick={()=>speak(unit.source)}>
    <ruby>{unit.source}<rt>{unit.ipa}</rt></ruby>
  </button>;
}
