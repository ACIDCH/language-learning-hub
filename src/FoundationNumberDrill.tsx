import {useState} from 'react';
import {foundationCardinals} from './foundationNumbers';
import {compareDictation} from './foundationDictation';

export default function FoundationNumberDrill({language,onSpeak,onAddNote}:{
 language:'en'|'fr';onSpeak:(text:string)=>void;onAddNote:(text:string)=>boolean;
}){
 const words=foundationCardinals(language);
 const [index,setIndex]=useState(0);
 const [attempt,setAttempt]=useState('');
 const [checked,setChecked]=useState(false);
 const [showTable,setShowTable]=useState(false);
 const [added,setAdded]=useState(false);
 const item=words[index];
 const comparison=checked?compareDictation(attempt,item.text,language):null;
 function select(next:number){
  setIndex(Math.max(0,Math.min(words.length-1,next)));
  setAttempt('');setChecked(false);setAdded(false);
 }
 function saveReflection(){
  if(!comparison||added)return;
  const note='【'+(language==='fr'?'法语':'英语')+'数字拼写】数字 '+
   item.value+'；我的记录：'+attempt.trim()+'；参考：'+item.text+
   '；需调整词数：'+comparison.wordEdits+'。';
  setAdded(onAddNote(note));
 }
 return <section className="foundation-number-drill" aria-label="数字、发音与拼写训练">
  <h5>数字 0–30 · 逐个听、拼写与自检</h5>
  <p className="cloud-disclaimer">先听数字，再写出外语拼写。答案只比对书面单词，
    大小写及连字符差异不计；不替代口语质量评估。</p>
  <div className="foundation-number-task">
   <div className="foundation-number-counter">练习 {index+1} / {words.length}</div>
   <button type="button" onClick={()=>onSpeak(item.text)}>播放当前数字（设备 TTS）</button>
   <label htmlFor="foundation-number-answer">听写外语数字</label>
   <input id="foundation-number-answer" value={attempt} maxLength={80}
     onChange={e=>{setAttempt(e.target.value);setChecked(false);setAdded(false);}}
     placeholder="例如：twenty-one / vingt et un" />
   <div className="foundation-actions">
    <button type="button" disabled={!attempt.trim()} onClick={()=>setChecked(true)}>核对拼写</button>
    <button type="button" disabled={index===0} onClick={()=>select(index-1)}>上一数字</button>
    <button type="button" disabled={index===words.length-1} onClick={()=>select(index+1)}>下一数字</button>
   </div>
   {comparison&&<p role="status" className="foundation-number-feedback">
      <strong>{comparison.exact?'拼写与参考文本一致。':'继续练习这个数字。'}</strong>
      {' '}数字 {item.value} 的参考写法是 <em lang={language}>{item.text}</em>；
      逐词文本差异 {comparison.wordEdits} 处。
      <button type="button" disabled={added} onClick={saveReflection}>
        {added?'已加入待保存笔记':'记录到本课笔记'}
      </button>
   </p>}
  </div>
  <details open={showTable} onToggle={e=>setShowTable(e.currentTarget.open)}>
   <summary>展开 0–30 的完整数字对照表</summary>
   <div className="foundation-number-reference">
    <table className="foundation-words"><thead><tr><th>数字</th><th>拼写</th><th>试听</th></tr></thead>
     <tbody>{words.map(row=><tr key={row.value}>
      <td>{row.value}</td><td lang={language}>{row.text}</td>
      <td><button type="button" onClick={()=>onSpeak(row.text)}>播放</button></td>
     </tr>)}</tbody>
    </table>
   </div>
  </details>
  {language==='en'?<p className="cloud-disclaimer">
   重点分辨 thirteen（13）和 thirty（30）：拼写、重音与语流都不同。
   在数字日期或价格中还要注意语境。</p>:<p className="cloud-disclaimer">
   vingt et un（21）也可依 1990 年拼写修订写作 vingt-et-un。
   此练习只覆盖 0–30；70–99 的组合规则需要后续高级数字课单独处理。</p>}
 </section>;
}
