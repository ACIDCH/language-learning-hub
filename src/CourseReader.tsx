import {useEffect,useRef,useState} from 'react';
import type {Session} from '@supabase/supabase-js';
import {loadCourse,courseRoute,languageName,type Course,type LessonContent} from './v44Courses';
import type {Preferences} from './v44Preferences';
import {cloudClient,cloudRequest} from './v44Connection';
import {readLocalFavorites,saveLocalFavorites} from './favoritesCloud';
import LessonReader from './LessonReader';
import {speakIpaText} from './IpaText';
import StructuredLesson from './StructuredLesson';
import IpaStudyPane from './IpaStudyPane';
import './curriculumStudy.css';
import './bilingualTeaching.css';
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
export default function CourseReader({course,session,preferences,tab,navigate,onFontChange}:{course:Course;session:Session|null;preferences:Preferences;tab:string;navigate:(path:string)=>void;onFontChange?:(next:number)=>void}){
 const [content,setContent]=useState<LessonContent|null>(null),[error,setError]=useState(''),[sourceStatus,setSourceStatus]=useState(''),[privateBody,setPrivateBody]=useState('');
 const [selection,setSelection]=useState<TextSelection|null>(null),[showTools,setShowTools]=useState(false),[toolStatus,setToolStatus]=useState('');
 const scope=useRef<HTMLDivElement>(null);
 const progress=useCourseProgress(course,session);
 const text=privateBody||content?.text||'';
 useEffect(()=>{
  let alive=true;const abort=new AbortController();
  void loadCourse(course,abort.signal).then(data=>{if(alive)setContent(data);}).catch(e=>{if(alive)setError(e.message);});
  if(session&&course.kind==='main')void cloudRequest<{lesson:{content_body:string;source_version:string;qa_status:string}}>('/v1/private-courses/'+course.id,session.access_token,{signal:abort.signal})
   .then(({lesson})=>{if(alive){setPrivateBody(lesson.content_body);setSourceStatus('');}})
   .catch(()=>{if(alive)setSourceStatus('私人课文暂不可用，当前显示公开版本。');});
  else setSourceStatus('');
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
 async function favorite(value:string){
  const uid=session?.user.id||'guest';
  const rows=readLocalFavorites(uid);
  if(!rows.some(r=>r.courseId===course.id&&r.text===value))rows.push({courseId:course.id,text:value});
  saveLocalFavorites(uid,rows);
  if(!session||!cloudClient){setToolStatus('已收藏到本机；登录后可同步至个人账户。');return;}
  const {error}=await cloudClient.from('user_favorites').insert({
    user_id:session.user.id,course_id:course.id,selection_text:value
  });
  setToolStatus(!error||error.code==='23505'
    ?'选词已收藏并同步至 Supabase 账户。'
    :'已保留本机收藏；云端同步失败，请稍后进入「我的收藏」重试：'+error.message);
 }
 if(error&&!content&&!privateBody)return <section role="alert">{error}<button onClick={()=>location.reload()}>重新加载</button></section>;
 if(!text)return <p role="status">正在读取课程全文…</p>;
 const questions=content?.foundation?.questions;
 return <section className="reader-page"><div className="page-intro reader-intro"><div><p className="eyebrow">{languageName(course.language)} · {course.track===course.level?course.level:course.track+' · '+course.level}</p><h1>{course.title}</h1></div><div className="reader-head-actions">
  <button type="button" aria-label="缩小阅读字体" disabled={preferences.fontSize<=14} onClick={()=>onFontChange?.(Math.max(14,preferences.fontSize-1))}>A−</button>
  <button type="button" aria-label="放大阅读字体" disabled={preferences.fontSize>=26} onClick={()=>onFontChange?.(Math.min(26,preferences.fontSize+1))}>A＋</button>
  <button type="button" aria-pressed={showTools} onClick={()=>setShowTools(v=>!v)}>{showTools?'收起工具':'展开工具'}</button>
 </div></div>
 {sourceStatus&&<p role="alert" className="tool-notice">{sourceStatus}</p>}<nav className="page-tab-row" aria-label="课程学习工具">{[['read','阅读'],['speech','跟读'],['ipa','全文 IPA']].map(([id,label])=><a className={tab===id?'segment active':'segment'} key={id} href={courseRoute(course,id)} onClick={e=>{e.preventDefault();navigate(courseRoute(course,id));}}>{label}</a>)}<a className="segment" href={'/cloud?panel=audio&course='+course.id} onClick={e=>{e.preventDefault();navigate('/cloud?panel=audio&course='+course.id);}}>音频与资料</a></nav>
 <div className={'reader-layout'+(showTools?'':' tools-hidden')}><article className="panel reader-article"><div className="reader-top"><button onClick={()=>setToolStatus(speakIpaText(text,course.language,preferences.ttsRate)?'正在朗读，使用设备合成语音。':'此设备无法朗读。')}>朗读原文</button><button onClick={()=>window.speechSynthesis?.cancel()}>停止朗读</button></div>
 {tab==='speech'?<SpeechPractice language={course.language} lessonText={text} session={session} accessToken={session?.access_token} variant="standalone"/>:
 tab==='ipa'?<div ref={scope} className="reader-selection-scope"><IpaStudyPane key={course.id} text={text} language={course.language}/></div>:
 <div ref={scope} className="reader-selection-scope">{!privateBody&&(content?.draft||content?.foundation)?
 <StructuredLesson key={course.id} content={content} course={course} stage={Number(progress.state.stage)||0}
 onChangeStage={stage=>progress.change({stage})} ttsRate={preferences.ttsRate}
 onOpenSpeech={()=>navigate(courseRoute(course,'speech'))} onSaveOutput={appendNote}/>:
 <LessonReader text={text} content={content} language={course.language} courseId={course.id}
 stage={Number(progress.state.stage)||0} onChangeStage={stage=>progress.change({stage})}
 defaultIpa={preferences.ipa} ttsRate={preferences.ttsRate}/>}</div>}
 {privateBody&&content&&<details className="source-appendix"><summary>备用课文</summary><div className="lesson-paragraphs">{content.text}</div></details>}
 {content?.appendices.map((a,i)=><details key={i} className="source-appendix"><summary>{a.title}</summary><div className="lesson-paragraphs">{a.text}</div></details>)}
 {(privateBody||(!content?.draft&&!content?.foundation))&&<section className="exercise-block"><h2>练习与核对</h2>{questions?questions.map((q,i)=><fieldset key={q.prompt}><legend>{i+1}. {q.prompt}</legend>{q.choices.map((choice,n)=><label key={n}><input type="radio" name={'q'+i} checked={progress.state.answers?.[String(i)]===n} disabled={!progress.ready} onChange={()=>progress.change({answers:{[String(i)]:n},completed:false})}/>{choice}</label>)}{Number.isInteger(progress.state.answers?.[String(i)])&&<p>{progress.state.answers?.[String(i)]===q.answer?'回答正确。':'再核对一次。'}参考答案：{q.choices[q.answer]}。{q.explanation}</p>}</fieldset>):content?.draft?.questions.map((q,i)=><details key={i}><summary>{i+1}. {q.prompt}</summary><p>参考答案：{q.answer}</p><p>解析：{q.explanation}</p></details>)||<p>本课练习见正文。</p>}</section>}
 <section className="learning-notes"><h2>本课笔记与进度</h2><label>学习笔记<textarea value={progress.state.notes||''} maxLength={5000} disabled={!progress.ready} onChange={e=>progress.change({notes:e.target.value})}/></label><label><input type="checkbox" checked={!!progress.state.completed} disabled={!progress.ready} onChange={e=>progress.change({completed:e.target.checked})}/>我已完成本课</label><button disabled={!session||!progress.ready||progress.busy} onClick={()=>void progress.save()}>{progress.busy?'保存中…':'保存到 Supabase'}</button><p role="status">{progress.status}</p></section>
 </article>
 {showTools&&(selection?<SelectionInspector key={selection.text} selection={selection} language={course.language} courseId={course.id} vocabulary={content?.vocabulary||[]} session={session} rate={preferences.ttsRate} onClose={()=>setSelection(null)} onNote={appendNote} onFavorite={favorite}/>:<aside className="panel reader-tools reader-tools-empty" aria-label="选词工具"><h2>选词与跟读</h2><div className="reader-empty-state" aria-hidden="true"><span>“</span><strong>选择词句</strong></div></aside>)}</div>
 {selection&&<div className="selection-float" role="toolbar" aria-label="选中文字操作"><strong>{selection.text.length>30?selection.text.slice(0,30)+'…':selection.text}</strong><button onClick={()=>speakIpaText(selection.text,course.language,preferences.ttsRate)}>朗读选词</button><button onClick={()=>{setShowTools(true);document.querySelector('[aria-label="选词工具"]')?.scrollIntoView({block:'nearest'});}}>选词 / 跟读</button><button onClick={()=>setSelection(null)} aria-label="清除选择">×</button></div>}
 {toolStatus&&<p role="status" className="tool-notice">{toolStatus}</p>}</section>;
}
