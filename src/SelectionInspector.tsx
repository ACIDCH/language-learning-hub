import {useState} from 'react';
import type {Session} from '@supabase/supabase-js';
import SpeechPractice from './SpeechPractice';
import IpaText,{speakIpaText} from './IpaText';
import AITutor from './AITutor';
import {apiBase} from './v44Connection';
import {useAISettings} from './AISettings';

export type TextSelection={text:string;context:string};
type Tab='practice'|'meaning'|'ipa'|'context'|'notes'|'ai';
export default function SelectionInspector({selection,language,courseId,vocabulary,session,rate,onClose,onNote,onFavorite}:{
 selection:TextSelection;language:string;courseId:string;vocabulary:string[][];
 session:Session|null;rate:number;onClose:()=>void;onNote:(s:string)=>void;onFavorite:(s:string)=>void
}){
 const [tab,setTab]=useState<Tab>('practice'),[note,setNote]=useState(''),[status,setStatus]=useState('');
 const {config}=useAISettings();
 const meaning=vocabulary.find(([word])=>word.normalize('NFC').toLocaleLowerCase()===
  selection.text.normalize('NFC').toLocaleLowerCase())?.[1];
 const tabs:readonly [Tab,string][]=[['practice','跟读'],['meaning','释义'],['ipa','读音'],
  ['context','语境'],['notes','笔记'],['ai','AI 讲解']];
 return <aside className="panel reader-tools selection-workbench" aria-label="选词工具">
  <div className="panel-heading"><h2>选词与跟读</h2><button type="button" aria-label="关闭选词工具" onClick={onClose}>×</button></div>
  <div className="selection-workbench-source"><span className="microtag">{language.toUpperCase()} · 已选择</span>
   <h3 className="selected-text">{selection.text}</h3></div>
  <div className="selection-actions">
   <button type="button" onClick={()=>setStatus(speakIpaText(selection.text,language,rate)?'正在播放示范。':'设备没有可用的朗读声音。')}>▶ 听</button>
   <button type="button" onClick={()=>setTab('practice')}>🎙 读 / 识别</button>
   <button type="button" onClick={()=>onFavorite(selection.text)}>收藏</button>
   <button type="button" onClick={()=>setTab('notes')}>记笔记</button>
  </div>
  {status&&<p role="status">{status}</p>}
  <nav className="page-tab-row selection-workbench-tabs" aria-label="选词面板工具">
   {tabs.map(([id,label])=><button type="button" key={id}
    aria-pressed={tab===id} className={tab===id?'segment active':'segment'}
    onClick={()=>setTab(id)}>{label}</button>)}
  </nav>
  {tab==='practice'&&<SpeechPractice key={selection.text} language={language}
   initialTarget={selection.text} lessonText={selection.context} session={session} variant="selection"/>}
  {tab==='meaning'&&<p>{meaning||'本课词表暂无对应释义。可查看语境或使用 AI 讲解。'}</p>}
  {tab==='ipa'&&<IpaText text={selection.text} language={language}
   onSpeak={word=>speakIpaText(word,language,rate)}/>}
  {tab==='context'&&<blockquote>{selection.context}</blockquote>}
  {tab==='notes'&&<div className="selection-workbench-notes"><label>选词笔记
   <textarea value={note} onChange={e=>setNote(e.target.value)} maxLength={1500}/></label>
   <button type="button" onClick={()=>{onNote(selection.text+'\n'+note);setNote('');}}>加入本课笔记</button></div>}
  {tab==='ai'&&<div className="selection-ai">
   <h3>AI 辅助讲解 {config.enabled?'':'· 未启用'}</h3>
   <AITutor key={selection.text} session={session} apiBase={apiBase} courseId={courseId}
    language={language} lessonText={selection.context} compact
    initialPrompt={'结合原文解释“'+selection.text+'”的自然发音和使用场景，并给出一条简短复练建议；不能凭文字断言发音准确率。'}/>
  </div>}
 </aside>;
}
