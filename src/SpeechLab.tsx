import {useState} from 'react';
import SpeechPractice from './SpeechPractice';
import IpaStudio from './IpaStudio';
import './cloud.css';

/** Approved independent speaking page, using the same recorder and phoneme analysis as selection. */
export default function SpeechLab({language:initialLanguage='fr'}:{language?:string}){
 const [language,setLanguage]=useState(initialLanguage);
 return <main className="speaking-lab-page">
  <header className="speaking-lab-heading"><div><p className="eyebrow">SPEAKING PRACTICE</p><h1>跟读训练</h1></div>
   <label>学习语言 <select value={language} onChange={e=>setLanguage(e.target.value)}>
    <option value="fr">Français</option><option value="en">English</option></select></label></header>
  <SpeechPractice key={language} language={language} variant="standalone"/>
  <section id="ipa-studio"><details><summary>全文 IPA 工具</summary><IpaStudio/></details></section>
 </main>;
}
