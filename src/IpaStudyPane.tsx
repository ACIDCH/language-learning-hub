import {useMemo,useState} from 'react';
import LessonBody from './LessonBody';
import IpaText from './IpaText';
/** All paragraphs remain available; phonetics are isolated to a chosen passage. */
export default function IpaStudyPane({text,language}:{text:string;language:string}){
 const passages=useMemo(()=>{
  const chunks:string[]=[];
  for(const p of text.replace(/\r\n?/g,'\n').split(/\n\s*\n/u)){
   let remaining=p.trim();
   while(remaining){
    if(remaining.length<=240){chunks.push(remaining);break;}
    const space=remaining.lastIndexOf(' ',240);
    const cut=space>90?space:240;
    chunks.push(remaining.slice(0,cut));
    remaining=remaining.slice(cut).trimStart();
   }
  }
  return chunks.filter(Boolean);
 },[text]);
 const [index,setIndex]=useState(0);
 const selected=Math.min(index,Math.max(0,passages.length-1));
 return <div className="ipa-study-pane">
  <div className="ipa-study-intro"><h2>全文阅读与分段音标</h2>
   <span>{passages.length?selected+1:0} / {passages.length} 段</span></div>
  <section className="ipa-study-excerpt" aria-label="当前段落音标">
   <div className="ipa-study-nav">
    <button disabled={selected===0} onClick={()=>setIndex(i=>i-1)}>← 上一段</button>
    <button disabled={selected>=passages.length-1} onClick={()=>setIndex(i=>i+1)}>下一段 →</button>
   </div>
   {passages[selected]&&<><p className="ipa-study-original">{passages[selected]}</p>
    <IpaText key={selected} text={passages[selected]} language={language}/></>}
  </section>
  <details className="ipa-study-full"><summary>查看全部原文</summary>
   <LessonBody text={text}/></details>
 </div>;
}
