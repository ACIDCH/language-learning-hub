import {useState} from 'react';
import SpeechPractice from './SpeechPractice';
import IpaStudio from './IpaStudio';
import './cloud.css';

/** Public no-account practice entry; no private curriculum or provider settings. */
export default function SpeechLab(){
 const [language,setLanguage]=useState('fr');
 return <main className="cloud-shell"><h1>发音练习实验室</h1><p><a href="/cloud">返回课程与现有 A1 示范音频</a></p>
 <label>练习语言<select value={language} onChange={e=>setLanguage(e.target.value)}><option value="fr">Français</option><option value="en">English</option></select></label>
 <SpeechPractice key={language} language={language}/>
 <section id="ipa-studio"><IpaStudio/></section></main>;
}
