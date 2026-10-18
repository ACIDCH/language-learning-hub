import {useState} from 'react';
import type {Session} from '@supabase/supabase-js';
import SpeechPractice from './SpeechPractice';
import IpaText,{speakIpaText} from './IpaText';
import AITutor from './AITutor';
import {apiBase} from './v44Connection';
import {useAISettings} from './AISettings';
export type TextSelection={text:string;context:string};
export default function SelectionInspector({selection,language,courseId,vocabulary,session,rate,onClose,onNote,onFavorite}:{selection:TextSelection;language:string;courseId:string;vocabulary:string[][];session:Session|null;rate:number;onClose:()=>void;onNote:(s:string)=>void;onFavorite:(s:string)=>void}){
 const [tab,setTab]=useState('meaning'),[note,setNote]=useState(''),[status,setStatus]=useState('');
 const {config}=useAISettings();
 const meaning=vocabulary.find(([w])=>w.normalize('NFC').toLocaleLowerCase()===selection.text.normalize('NFC').toLocaleLowerCase())?.[1];
 return <aside className="panel reader-tools" aria-label="选词工具"><div className="panel-heading"><h2>选词工具</h2><button aria-label="关闭选词工具" onClick={onClose}>×</button></div><span className="microtag">{language.toUpperCase()} · 当前原文</span><h2 className="selected-text">{selection.text}</h2>
 <div className="selection-actions"><button onClick={()=>setStatus(speakIpaText(selection.text,language,rate)?'设备合成语音正在朗读。':'此浏览器未提供 TTS。')}>朗读</button><button onClick={()=>onFavorite(selection.text)}>收藏</button><button onClick={()=>setTab('notes')}>记笔记</button><button onClick={()=>void navigator.clipboard?.writeText(selection.text).then(()=>setStatus('已复制。')).catch(()=>setStatus('复制失败，可使用系统复制。'))}>复制</button></div>
 <div className="page-tab-row" role="group" aria-label="选词面板工具">{[['meaning','释义'],['ipa','读音'],['context','语境'],['notes','笔记']].map(([id,label])=><button key={id} aria-pressed={tab===id} onClick={()=>setTab(id)}>{label}</button>)}</div>
 {tab==='meaning'&&<p>{meaning||'本课词表没有该词条的释义。可查看上下文，或主动启用 AI 助学请求解释；尚未调用 AI。'}</p>}
 {tab==='ipa'&&<><p>机器生成 IPA 辅助参考，非人工校对词典。</p><IpaText text={selection.text} language={language} onSpeak={t=>speakIpaText(t,language,rate)}/></>}
 {tab==='context'&&<blockquote>{selection.context}</blockquote>}
 {tab==='notes'&&<><label>选词笔记<textarea value={note} onChange={e=>setNote(e.target.value)} maxLength={1500}/></label><button onClick={()=>{onNote(selection.text+'\n'+note);setNote('');}}>加入本课笔记</button></>}
 <p role="status">{status}</p><div className="selection-practice"><h3>跟读练习</h3><p className="subhead">文字识别不等于声学音素评分。基础模式未进行音素评估。</p><SpeechPractice key={selection.text} language={language} initialTarget={selection.text} lessonText={selection.context} accessToken={session?.access_token}/></div>
 <section className="selection-ai"><h3>AI 助学 · {config.enabled?'已启用，需主动发送':'未开启'}</h3><AITutor key={selection.text} session={session} apiBase={apiBase} courseId={courseId} language={language} lessonText={selection.context} compact initialPrompt={'请解释“'+selection.text+'”在当前语境中的含义，给出自然例句和一项针对性练习；明确不确定之处。'}/></section></aside>;
}
