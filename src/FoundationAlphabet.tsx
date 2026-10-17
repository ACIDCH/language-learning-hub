import {alphabetFor,FRENCH_DIACRITICS} from './foundationAlphabet';

export default function FoundationAlphabet({language,onSpeak}:{
 language:'en'|'fr';onSpeak:(text:string)=>void;
}){
 const letters=alphabetFor(language);
 return <section className="foundation-alphabet" aria-label={language==='fr'?'法语字母参考':'英语字母参考'}>
  <h5>26 个字母 · 字母名称、IPA 与词中示例</h5>
  <p className="cloud-disclaimer">表中 IPA 描述字母单独拼写时的常见名称，
   <strong>不是</strong> 字母在所有单词里的固定读音。英语参照常见美式读法，
   法语参照常见法国本土读法；口音可能不同。按钮仅调用设备合成语音。</p>
  <div className="foundation-alphabet-grid">
   {letters.map(item=><article key={item.letter} className="foundation-alphabet-card">
    <div><strong>{item.letter}</strong><span>{item.ipa}</span></div>
    {language==='fr'&&<small>字母名：{item.name}</small>}
    <p>示例词：<em lang={language}>{item.example}</em></p>
    <div>
     <button type="button" aria-label={'播放字母 '+item.letter+' 的名称'}
      onClick={()=>onSpeak(item.name)}>听字母名</button>
     <button type="button" aria-label={'播放示例词 '+item.example}
      onClick={()=>onSpeak(item.example)}>听单词</button>
    </div>
   </article>)}
  </div>
  {language==='fr'?<details className="foundation-alphabet-accents">
    <summary>法语重音符号与合字（不增加字母总数）</summary>
    <ul>{FRENCH_DIACRITICS.map(item=><li key={item.symbol}>
      <strong>{item.symbol} · {item.example}</strong>：{item.explanation}
      <button type="button" onClick={()=>onSpeak(item.example)}>听示例</button>
    </li>)}</ul>
   </details>:<p className="cloud-disclaimer">
    美国英语的 Z 常读 /ziː/（zee），英式及新西兰英语通常说 /zɛd/（zed）。
    拼写时要按对方熟悉的地区习惯确认。</p>}
  <p className="cloud-disclaimer">练习建议：先听字母名并拼写姓名，再听示例词比较声音。
   例如法语 C 的字母名 /se/，但 café 中读 /k/；英语 C 的字母名 /siː/，
   但 cat 中读 /k/。仅听 TTS 不等于完成真人语音验收。</p>
 </section>;
}
