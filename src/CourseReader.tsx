import {draftPublication} from './v44Publication';
import {useEffect,useRef,useState} from 'react';
import type {Session} from '@supabase/supabase-js';
import {loadCourse,courseRoute,type Course,type LessonContent} from './v44Courses';
import type {Preferences} from './v44Preferences';
import {cloudRequest} from './v44Connection';
import LessonReader from './LessonReader';
import IpaText,{speakIpaText} from './IpaText';
import SpeechPractice from './SpeechPractice';
import SelectionInspector,{type TextSelection} from './SelectionInspector';
import {useCourseProgress} from './useCourseProgress';
export function selectedOriginal(scope:HTMLElement,selection:Selection|null):TextSelection|null{
 if(!selection||selection.isCollapsed||!selection.rangeCount)return null;
 const range=selection.getRangeAt(0);
 if(!scope.contains(range.startContainer)||!scope.contains(range.endContainer))return null;
 const fragment=range.cloneContents();fragment.querySelectorAll('rt,button,.ipa-status').forEach(n=>n.remove());
 const text=(fragment.textContent||'').normalize('NFC').trim();
 if(!text||text.length>2000)return null;
 return {text,context:range.startContainer.parentElement?.closest('.lesson-paragraphs,.ipa-text')?.textContent?.slice(0,8500)||text};
}
export default function CourseReader({course,session,preferences,tab,navigate}:{course:Course;session:Session|null;preferences:Preferences;tab:string;navigate:(path:string)=>void}){
 const [content,setContent]=useState<LessonContent|null>(null),[error,setError]=useState(''),[sourceStatus,setSourceStatus]=useState(''),[privateBody,setPrivateBody]=useState('');
 const [selection,setSelection]=useState<TextSelection|null>(null),[showTools,setShowTools]=useState(true),[toolStatus,setToolStatus]=useState('');
 const scope=useRef<HTMLDivElement>(null);
 const progress=useCourseProgress(course,session);
 const text=privateBody||content?.text||'';
 useEffect(()=>{
  let alive=true;const abort=new AbortController();
  void loadCourse(course,abort.signal).then(data=>{if(alive)setContent(data);}).catch(e=>{if(alive)setError(e.message);});
  if(session&&course.kind==='main')void cloudRequest<{lesson:{content_body:string;source_version:string;qa_status:string}}>('/v1/private-courses/'+course.id,session.access_token,{signal:abort.signal})
   .then(({lesson})=>{if(alive){setPrivateBody(lesson.content_body);setSourceStatus('优先显示账户私有原稿 · '+lesson.source_version+' · '+(lesson.qa_status==='approved'?'服务端审校状态 approved':'待审校'));}})
   .catch(e=>{if(alive)setSourceStatus('私有原稿未加载：'+e.message+'。继续使用现有公开原稿或独立原创初稿。');});
  else setSourceStatus(course.kind==='main'?'未登录；当前显示公开原稿或独立原创初稿。登录后优先读取私有正文。':'完整呈现既有基础教材；未将其标为人工审校完成。');
  return ()=>{alive=false;abort.abort();window.speechSynthesis?.cancel();};
 },[course.id,session?.user.id]);
 useEffect(()=>{
  const capture=()=>{if(scope.current){const next=selectedOriginal(scope.current,window.getSelection());if(next){setSelection(next);setShowTools(true);}}};
  const key=(e:KeyboardEvent)=>{if(e.key==='Escape'){setSelection(null);window.getSelection()?.removeAllRanges();}};
  document.addEventListener('selectionchange',capture);document.addEventListener('keyup',key);
  return ()=>{document.removeEventListener('selectionchange',capture);document.removeEventListener('keyup',key);};
 },[]);
 function appendNote(value:string){
  const next=[progress.state.notes||'',value].filter(Boolean).join('\n\n');
  if(next.length>5000){setToolStatus('笔记超过 5000 字符，请先整理现有笔记。');return;}
  if(!progress.ready){setToolStatus('学习记录尚未就绪，未修改笔记。');return;}
  progress.change({notes:next});setToolStatus('已加入本课笔记；登录后可点击保存同步。');
 }
 function favorite(value:string){
  try{const key='llh-v44-favorites:'+(session?.user.id||'guest');const rows=JSON.parse(localStorage.getItem(key)||'[]') as {courseId:string;text:string}[];
   if(!rows.some(r=>r.courseId===course.id&&r.text===value))rows.push({courseId:course.id,text:value});
   localStorage.setItem(key,JSON.stringify(rows));setToolStatus('已收藏到本机，未声称跨设备同步。');
  }catch{setToolStatus('本机收藏存储不可用。');}
 }
 if(error&&!content&&!privateBody)return <section role="alert">{error}<button onClick={()=>location.reload()}>重新加载</button></section>;
 if(!text)return <p role="status">正在读取课程全文…</p>;
 const questions=content?.foundation?.questions;
 return <section className="reader-page"><div className="page-intro"><div><p className="eyebrow">LESSON READER</p><h1>{course.title}</h1><p className="subhead">{course.id} · {course.level} · {course.kind==='foundation'?'既有基础课程':course.status==='existing_original'?'已有教材':'原创草稿 · 待审校'}</p></div><button aria-pressed={showTools} onClick={()=>setShowTools(v=>!v)}>{showTools?'收起工具':'展开工具'}</button></div>
 <p className="source-banner">{sourceStatus}</p>{course.status==='original_draft'&&<p className="source-banner" role="note">{draftPublication.notice}。此状态适用于保留的 V4.4 原创初稿；公开 PR 源文件已可访问，不等于获准发布，也不表示已私有化。</p>}<nav className="page-tab-row" aria-label="课程学习工具">{[['read','阅读'],['speech','跟读'],['ipa','全文 IPA']].map(([id,label])=><a className={tab===id?'segment active':'segment'} key={id} href={courseRoute(course,id)} onClick={e=>{e.preventDefault();navigate(courseRoute(course,id));}}>{label}</a>)}<a className="segment" href={'/cloud?panel=audio&course='+course.id} onClick={e=>{e.preventDefault();navigate('/cloud?panel=audio&course='+course.id);}}>原有音频与资料</a></nav>
 <div className={'reader-layout'+(showTools?'':' tools-hidden')}><article className="panel reader-article"><div className="reader-top"><span className="microtag">原文、附录与答案完整保留</span><button onClick={()=>setToolStatus(speakIpaText(text,course.language,preferences.ttsRate)?'正在朗读，使用设备合成语音。':'此设备无法朗读。')}>朗读原文</button><button onClick={()=>window.speechSynthesis?.cancel()}>停止朗读</button></div>
 {tab==='speech'?<SpeechPractice language={course.language} lessonText={text} accessToken={session?.access_token}/>:tab==='ipa'?<div ref={scope} className="reader-selection-scope"><IpaText text={text} language={course.language} onSpeak={t=>speakIpaText(t,course.language,preferences.ttsRate)}/></div>:<div ref={scope} className="reader-selection-scope"><p className="selection-hint">选中原文的词或句子，即可朗读、查阅语境、记笔记或跟读。Esc 清除选词。</p><LessonReader text={text} language={course.language} courseId={course.id} stage={Number(progress.state.stage)||0} onChangeStage={stage=>progress.change({stage})} defaultIpa={preferences.ipa} ttsRate={preferences.ttsRate}/></div>}
 {privateBody&&content&&<details className="source-appendix"><summary>保留的{course.status==='existing_original'?'公开原稿':'独立原创初稿'}（不覆盖私有版本）</summary><div className="lesson-paragraphs">{content.text}</div></details>}
 {content?.appendices.map((a,i)=><details key={i} className="source-appendix"><summary>{a.title} · 完整补充材料</summary><div className="lesson-paragraphs">{a.text}</div></details>)}
 <section className="exercise-block"><h2>练习与核对</h2>{questions?questions.map((q,i)=><fieldset key={q.prompt}><legend>{i+1}. {q.prompt}</legend>{q.choices.map((choice,n)=><label key={n}><input type="radio" name={'q'+i} checked={progress.state.answers?.[String(i)]===n} disabled={!progress.ready} onChange={()=>progress.change({answers:{[String(i)]:n},completed:false})}/>{choice}</label>)}{Number.isInteger(progress.state.answers?.[String(i)])&&<p>{progress.state.answers?.[String(i)]===q.answer?'回答正确。':'再核对一次。'}参考答案：{q.choices[q.answer]}。{q.explanation}</p>}</fieldset>):content?.draft?.questions.map((q,i)=><details key={i}><summary>{i+1}. {q.prompt}</summary><p>参考答案：{q.answer}</p><p>解析：{q.explanation}</p></details>)||<p>原稿中的练习、逐题答案与解析保持在全文中，可按阶段或完整原稿阅读。</p>}</section>
 <section className="learning-notes"><h2>本课笔记与进度</h2><label>学习笔记<textarea value={progress.state.notes||''} maxLength={5000} disabled={!progress.ready} onChange={e=>progress.change({notes:e.target.value})}/></label><label><input type="checkbox" checked={!!progress.state.completed} disabled={!progress.ready} onChange={e=>progress.change({completed:e.target.checked})}/>我已学习本课（个人记录，不是教材审校或语言等级认证）</label><button disabled={!session||!progress.ready||progress.busy} onClick={()=>void progress.save()}>{progress.busy?'保存中…':'保存到 Supabase'}</button><p role="status">{progress.status}</p></section>
 <details className="source-appendix"><summary>来源与状态</summary><p>教学审校：待完成。音频：未验证与当前完整课文匹配。设备 TTS 不计作教材配音完成。</p>{content?.sources.map(s=><p key={s}>{s}</p>)}</details></article>
 {showTools&&(selection?<SelectionInspector key={selection.text} selection={selection} language={course.language} courseId={course.id} vocabulary={content?.vocabulary||[]} session={session} rate={preferences.ttsRate} onClose={()=>setSelection(null)} onNote={appendNote} onFavorite={favorite}/>:<aside className="panel reader-tools"><h2>选词工具</h2><p>在原文中选择单词或句子，工具会跟随选择更新。</p><div className="quiet-notice">朗读 · 收藏 · 笔记 · 释义 · IPA · 跟读 · AI 助学</div><p>基础模式使用现有浏览器语音识别。未进行音素评估。</p></aside>)}</div>
 {selection&&<div className="selection-float" role="toolbar" aria-label="选中文字操作"><strong>{selection.text.length>30?selection.text.slice(0,30)+'…':selection.text}</strong><button onClick={()=>speakIpaText(selection.text,course.language,preferences.ttsRate)}>朗读选词</button><button onClick={()=>{setShowTools(true);document.querySelector('[aria-label="选词工具"]')?.scrollIntoView({block:'nearest'});}}>选词 / 跟读</button><button onClick={()=>setSelection(null)} aria-label="清除选择">×</button></div>}
 <p role="status" className="tool-notice">{toolStatus}</p></section>;
}
