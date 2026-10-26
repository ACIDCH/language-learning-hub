import {useDeferredValue,useState} from 'react';
import IpaText,{speakIpaText} from './IpaText';
import IpaReference from './IpaReference';

const SAMPLES={
 'fr-FR':"Bonjour ! Je voudrais apprendre le français.\nAujourd’hui, nous allons à la bibliothèque.",
 'en-US':"Hello! I would like to learn English.\nThis is a new sentence I have never seen before.",
 'en-GB':"Hello! I would like to learn English.\nCould you read this passage aloud, please?"
} as const;
export default function IpaStudio(){
 const [locale,setLocale]=useState<'fr-FR'|'en-US'|'en-GB'>('fr-FR');
 const [text,setText]=useState<string>(SAMPLES['fr-FR']);
 const [active,setActive]=useState(false);
 const current=useDeferredValue(text);
 const [rate,setRate]=useState(.85);
 return <section className="cloud-reader ipa-studio" aria-label="完整文本 IPA 音标阅读工具">
  <h3>IPA 全文音标阅读</h3>

  <div className="ipa-studio-controls">
   <label>浏览器朗读口音
    <select value={locale} onChange={e=>{
      const next=e.target.value as keyof typeof SAMPLES;
      setLocale(next);setText(SAMPLES[next]);setActive(false);
    }}>
     <option value="fr-FR">法语 · 法国</option>
     <option value="en-US">英语 · 美式</option>
     <option value="en-GB">英语 · 英式</option>
    </select>
   </label>
   <label>示范语速 {rate.toFixed(2)}×
    <input type="range" min="0.65" max="1.1" step="0.05" value={rate}
      onChange={e=>setRate(Number(e.target.value))}/>
   </label>
  </div>
  <label>待注音的原文
   <textarea value={text} rows={7} maxLength={40000} onChange={e=>setText(e.target.value)}
     placeholder="粘贴或输入英语、法语词汇、句子或多段文章…"/>
  </label>
  <div className="speech-actions">
   <button type="button" disabled={!text.trim()} onClick={()=>setActive(v=>!v)}>
    {active?'隐藏 IPA 音标':'显示全文 IPA 音标'}
   </button>
   <button type="button" disabled={!text.trim()}
     onClick={()=>speakIpaText(text,locale,rate)}>用浏览器朗读</button>
   <button type="button" onClick={()=>{setText('');setActive(false);}}>清空</button>
  </div>
  {active&&<div className="ipa-studio-reading">
   <IpaText text={current} language={locale}/>
  </div>}
  <IpaReference language={locale}/>

 </section>;
}
