import {useMemo,useState} from 'react';
import LessonBody from './LessonBody';
import IpaText from './IpaText';
import {learnerFacingLessonText,pronunciationPassages} from './lessonPresentationText';
/** All paragraphs remain available; phonetics are isolated to a chosen passage. */
export default function IpaStudyPane({text,language}:{text:string;language:string}){
 const passages=useMemo(()=>pronunciationPassages(text),[text]);
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
   {!passages.length&&<p className="ipa-study-original">本课暂无可提取的外语句段，请在正文中选择词句使用右侧发音工具。</p>}
   {passages[selected]&&<><p className="ipa-study-original">{passages[selected]}</p>
    <IpaText key={selected} text={passages[selected]} language={language}/></>}
  </section>
  <details className="ipa-study-full"><summary>查看全部原文</summary>
   <LessonBody text={learnerFacingLessonText(text)}/></details>
 </div>;
}
