import {useState} from 'react';
import IpaText from './IpaText';
import {lessonIpaSample} from './manuscriptPresentation';
/** Learner explicitly requests one short IPA excerpt; never overlays IPA on a full manuscript. */
export default function LessonIpaPreview({text,language,initialOpen=false}:{
 text:string;language:string;initialOpen?:boolean
}){
 const [visible,setVisible]=useState(initialOpen);
 const sample=lessonIpaSample(text);
 if(!sample)return null;
 return <section className="lesson-ipa-preview" aria-label="选段参考音标">
  <button type="button" aria-expanded={visible} onClick={()=>setVisible(x=>!x)}>
   {visible?'收起短句音标':'查看短句音标'}
  </button>
  {visible&&<div className="lesson-ipa-sample">
   <p>{sample}</p>
   <IpaText text={sample} language={language} compact/>
  </div>}
 </section>;
}
