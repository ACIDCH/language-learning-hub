import {useState} from 'react';
import SpeechPractice from './SpeechPractice';
import IpaStudio from './IpaStudio';
import './cloud.css';

const EXAMPLES:Record<string,string[]>={
 fr:['Bonjour, comment allez-vous ?','Très bien, merci. Et vous ?',
  'Je m’appelle Marie. Et toi ?','Je m’appelle Luc. Enchanté !','Au revoir et à bientôt !'],
 en:['Hello, how are you today?','I am doing well, thank you.',
  'My name is Alex. Nice to meet you.','Could you repeat that more slowly?',
  'See you again tomorrow!']
};
/** The existing navigation entry displays a full sentence library next to the shared trainer. */
export default function SpeechLab({language:initialLanguage='fr'}:{language?:string}){
 const [language,setLanguage]=useState(initialLanguage);
 const [chosen,setChosen]=useState(EXAMPLES[initialLanguage]?.[0]||EXAMPLES.fr[0]);
 const items=EXAMPLES[language]||EXAMPLES.fr;
 function chooseLanguage(next:string){setLanguage(next);setChosen((EXAMPLES[next]||EXAMPLES.fr)[0]);}
 return <main className="speaking-lab-page">
  <header className="speaking-lab-heading"><div><p className="eyebrow">SPEAKING PRACTICE</p><h1>跟读训练</h1></div>
   <label>学习语言 <select value={language} onChange={e=>chooseLanguage(e.target.value)}>
    <option value="fr">Français</option><option value="en">English</option></select></label>
  </header>
  <div className="speaking-lab-columns">
   <section className="panel speaking-lab-library" aria-label="练习句子列表">
    <div className="speaking-lab-library-head"><span className="microtag">{language==='fr'?'FRANÇAIS · A1':'ENGLISH · A1'}</span>
     <h2>{language==='fr'?'日常交流':'Everyday conversation'}</h2></div>
    <h3>常用句子</h3>
    <div className="speaking-lab-sentences">{items.map((sentence,i)=><button type="button" key={sentence}
     aria-pressed={chosen===sentence} className={chosen===sentence?'is-selected':''}
     onClick={()=>setChosen(sentence)}><span aria-hidden="true">▶</span>
     <span><strong>{sentence}</strong><small>{String(i+1).padStart(2,'0')} · {language==='fr'?'法语':'英语'}口语</small></span>
    </button>)}</div>
   </section>
   <SpeechPractice key={language+':'+chosen} language={language} initialTarget={chosen}
    variant="standalone" showChoices={false}/>
  </div>
  <section id="ipa-studio"><details open={location.hash==='#ipa-studio'}><summary>全文 IPA 工具</summary><IpaStudio/></details></section>
 </main>;
}
