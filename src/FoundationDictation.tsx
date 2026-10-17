import {useState} from 'react';
import {compareDictation} from './foundationDictation';

export default function FoundationDictation({text,language,onPlay,onAddNote}:{
 text:string;language:'en'|'fr';onPlay:()=>void;onAddNote:(note:string)=>void;
}){
 const [written,setWritten]=useState('');
 const [checked,setChecked]=useState(false);
 const [showReference,setShowReference]=useState(false);
 const [added,setAdded]=useState(false);
 const comparison=checked?compareDictation(written,text,language):null;
 function change(value:string){setWritten(value);setChecked(false);setAdded(false);}
 function appendNote(){
  if(!comparison||added)return;
  const note='【'+(language==='fr'?'法语':'英语')+'听写练习】\n'+
    '我的听写：'+written.trim()+'\n'+
    '参考原文：'+text+'\n'+
    '逐词文本差异（仅用于复习）：'+comparison.wordEdits+' 处。';
  onAddNote(note);setAdded(true);
 }
 return <section className="foundation-dictation" aria-label="听写与文本核对">
  <h5>听写训练 · 听懂再写下</h5>
  <p className="cloud-disclaimer">先播放两遍，尽量不看原文记录听到的词汇。核对只比较书面单词，
    忽略大小写和标点、保留法语重音符号；不评价发音，也不使用 AI 接口。</p>
  <button type="button" onClick={onPlay}>重播听力（设备 TTS）</button>
  <label htmlFor="foundation-dictation-answer">听到的句子</label>
  <textarea id="foundation-dictation-answer" rows={3} maxLength={1800}
    value={written} onChange={e=>change(e.target.value)}
    placeholder="听后输入完整句子，允许多次尝试" />
  <div className="foundation-actions">
   <button type="button" disabled={!written.trim()} onClick={()=>setChecked(true)}>核对书面文本</button>
   <button type="button" aria-expanded={showReference}
     onClick={()=>setShowReference(v=>!v)}>{showReference?'收起参考原文':'查看参考原文'}</button>
  </div>
  {comparison&&<div className="foundation-dictation-result" role="status">
    <strong>{comparison.exact?'与参考原文逐词一致':'可以再听一遍并修订'}</strong>
    <p>参考文本 {comparison.referenceWords} 词，你记录了 {comparison.writtenWords} 词，
      最少需调整 {comparison.wordEdits} 处词汇（插入／删除／替换）。数字是文本编辑差异，
      不是听力能力分数。</p>
    <button type="button" onClick={appendNote} disabled={added}>
      {added?'已加入待保存的课程笔记':'将听写与对照加入本课笔记'}
    </button>
  </div>}
  {showReference&&<p className="foundation-dictation-reference"><strong>参考：</strong>{text}</p>}
 </section>;
}
