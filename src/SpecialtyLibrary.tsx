import {Fragment,useEffect,useMemo,useState} from 'react';
import {COURSES,courseRoute,languageName} from './v44Courses';
import {SPECIALTY_LESSONS,specialtyRoute,type SpecialtyLesson,type SpecialtyKind,type SpecialtyLanguage,specialtyQuality} from './specialtyLibrary';
import {speakIpaText} from './IpaText';
import Task1VisualEvidence from './Task1VisualEvidence';
import {orderedSpecialties,adjacentSpecialties,pairedSpecialties} from './specialtyLearningPath';

const LEVELS=['A1','A2','B1','B2','C1'] as const;
function NotesPractice({unit}:{unit:SpecialtyLesson}){
 const [answers,setAnswers]=useState<Record<number,string>>({});
 const [reveal,setReveal]=useState<Record<number,boolean>>({});
 const [written,setWritten]=useState('');
 const essayParagraphs=unit.modelParagraphStarts?.map((start,i)=>unit.model.slice(start,unit.modelParagraphStarts?.[i+1]??unit.model.length));
 return <div className="specialty-practice">
  <h2>巩固练习与解析</h2>
  <Task1VisualEvidence lessonId={unit.id}/>

  {unit.questions.map((q,i)=><section className="specialty-question" key={i}>
   <label htmlFor={'specialty-q-'+unit.id+'-'+i}><strong>{i+1}. {q.question}</strong></label>
   <textarea id={'specialty-q-'+unit.id+'-'+i} rows={2} value={answers[i]||''}
    placeholder="先写下你的答案" onChange={e=>setAnswers(o=>({...o,[i]:e.target.value}))}/>
   <button type="button" aria-expanded={!!reveal[i]} onClick={()=>setReveal(o=>({...o,[i]:!o[i]}))}>
    {reveal[i]?'收起解析':'核对答案与解析'}</button>
   {reveal[i]&&<div className="specialty-answer">
    <p><strong>参考：</strong>{q.answer}</p><p><strong>解析：</strong>{q.why}</p>
   </div>}
  </section>)}
  <section className="specialty-production">
   <h3>独立应用任务</h3><p>{unit.output}</p>
   <label htmlFor={'specialty-output-'+unit.id}>我的回答</label>
   <textarea id={'specialty-output-'+unit.id} rows={6} value={written}
    onChange={e=>setWritten(e.target.value)} placeholder="结合知识点完成自己的连贯表达…"/>
   <details><summary>{essayParagraphs?'查看完整双语范文':'完成后查看分步示范'}</summary>
    {essayParagraphs?<div className="specialty-essay">
     {essayParagraphs.map((sentences,i)=><section className="specialty-essay-paragraph" key={i}>
      <p className="specialty-essay-original" lang={unit.language}>{sentences.map(e=>e.target).join(' ')}</p>
      <p className="specialty-essay-translation" lang="zh-Hans">{sentences.map(e=>e.zh).join('')}</p>
      <details className="specialty-essay-notes"><summary>逐句解析</summary>
       <ol>{sentences.map((e,j)=><li key={j}>{e.analysis}</li>)}</ol>
      </details>
     </section>)}
    </div>:unit.model.map((e,i)=><div className="specialty-example" key={i}>
     <strong lang={unit.language}>{e.target}</strong><p>{e.zh}</p><small>{e.analysis}</small>
    </div>)}
   </details>

   <button type="button" disabled={!written.trim()} onClick={()=>navigator.clipboard?.writeText(written)}>复制我的回答</button>
  </section>
 </div>;
}
function TopicArticle({unit,navigate,returnPath,onSelectSection,onOpenSpecialty}:{unit:SpecialtyLesson;navigate:(p:string)=>void;returnPath:string;onSelectSection:(index:number)=>void;onOpenSpecialty:(next:SpecialtyLesson)=>void}){
 const [complete,setComplete]=useState<Record<number,boolean>>({});
 const finished=unit.sections.filter((_,i)=>complete[i]).length;
 const {previous,next}=adjacentSpecialties(unit,SPECIALTY_LESSONS);
 const related=pairedSpecialties(unit,SPECIALTY_LESSONS);
 return <article className="specialty-textbook" aria-label={unit.title}>
  <div className="specialty-article-head">
   <div><span className="specialty-kicker">{unit.language==='fr'?'FRANÇAIS':'ENGLISH'} · {unit.level} · {unit.type==='grammar'?'GRAMMAR':'VOCABULARY'}</span>
    <h1>{unit.title}</h1><p>{unit.subtitle}</p></div>
   <button className="specialty-course-link" onClick={()=>navigate(returnPath)}>回到关联课程 <span aria-hidden="true">↗</span></button>
  </div>
  <div className="specialty-learning-goal"><strong>本节目标</strong><span>{unit.objective}</span>
   <details><summary>先备知识</summary><p>{unit.prerequisite}</p></details></div>
  <nav className="specialty-section-nav" aria-label="本专题章节">
   {unit.sections.map((s,i)=><a key={i} href={'#specialty-section-'+i} onClick={()=>onSelectSection(i)}>{String(i+1).padStart(2,'0')} {s.title.replace(/^\d+[.、 ]+/u,'')}</a>)}
   <span className="specialty-progress" role="status">掌握 {finished}/{unit.sections.length}</span>
  </nav>
  {unit.sections.map((s,i)=><section id={'specialty-section-'+i} className="specialty-chapter" key={i}>
   <header className="specialty-chapter-title"><span>{i+1}</span><h2>{s.title}</h2></header>
   <p className="specialty-concept">{s.concept}</p>
   <div className="specialty-pattern"><strong>结构 / 搭配</strong><p lang={unit.language}>{s.pattern}</p></div>
   {s.table&&<div className="specialty-grammar-table"><h3>{s.table.title}</h3>
    <div className="specialty-table-scroll"><table><thead><tr>{s.table.columns.map((c,k)=><th key={k} scope="col">{c}</th>)}</tr></thead>
     <tbody>{s.table.rows.map((row,k)=><tr key={k}>{row.map((v,j)=><td key={j} lang={j?unit.language:undefined}>{v}</td>)}</tr>)}</tbody>
    </table></div><p>{s.table.note}</p></div>}
   <h3>例句与解析</h3>
   <div className="specialty-example-stack">{s.examples.map((e,j)=><div className="specialty-example" key={j}>
    <div className="specialty-example-grid"><p lang={unit.language}><strong>{e.target}</strong>
      <button type="button" aria-label={'朗读 '+e.target} title="朗读句子" onClick={()=>speakIpaText(e.target,unit.language,.85)}>▶</button></p>
     <p lang="zh-Hans">{e.zh}</p></div>
    <p className="specialty-analysis">{e.analysis}</p>
   </div>)}</div>
   <aside className="specialty-error"><strong>易错对比</strong><p>{s.caution}</p></aside>
   <label className="specialty-check"><input type="checkbox" checked={!!complete[i]}
     onChange={e=>setComplete(o=>({...o,[i]:e.target.checked}))}/>本次已掌握</label>
  </section>)}
  <NotesPractice key={unit.id} unit={unit}/>
  <nav className="specialty-learning-links" aria-label="前后专题与配套学习">
   {previous&&<button type="button" onClick={()=>onOpenSpecialty(previous)}>← 上一专题：{previous.title}</button>}
   {next&&<button type="button" onClick={()=>onOpenSpecialty(next)}>下一专题：{next.title} →</button>}
   {related.map(u=><button type="button" key={u.id} onClick={()=>onOpenSpecialty(u)}>
    关联{u.type==='grammar'?'语法':'词汇'}：{u.title} ↗</button>)}
  </nav>
  <details className="specialty-references"><summary>参考资料与关联教材</summary>

   <ul>{unit.referenceUrls.map(url=><li key={url}><a target="_blank" rel="noopener noreferrer" href={url}>{new URL(url).hostname} — 参考资料</a></li>)}</ul>
  </details>
 </article>;
}
function StudyCompanion({unit,sectionIndex}:{unit:SpecialtyLesson;sectionIndex:number}){
 const current=unit.sections[sectionIndex]||unit.sections[0];
 const [showTranslation,setShowTranslation]=useState(true);
 return <aside className="specialty-companion" aria-label="本课知识点辅助栏">
  <section className="specialty-current-rule"><h2>{String(sectionIndex+1).padStart(2,'0')} · 本节结构</h2>
   <p className="specialty-companion-pattern" lang={unit.language}>{current.pattern}</p>
  </section>
  <nav className="specialty-companion-jump" aria-label="本专题章节跳转">
   {unit.sections.map((s,i)=><a key={i} href={'#specialty-section-'+i}
    aria-current={i===sectionIndex?'location':undefined}>{String(i+1).padStart(2,'0')} {s.title.replace(/^\d+[.、 ]+/u,'')}</a>)}
  </nav>
  <section><h2>例句速练</h2>
   {current.examples.slice(0,2).map((e,i)=><div key={i} className="specialty-companion-pair">
    <p lang={unit.language}><strong>{e.target}</strong></p>
    {showTranslation&&<p lang="zh-Hans">{e.zh}</p>}
    <button type="button" aria-label={'跟读 '+e.target}
     onClick={()=>speakIpaText(e.target,unit.language,.85)}>▶ 朗读</button>
   </div>)}
   <button type="button" aria-pressed={!showTranslation} onClick={()=>setShowTranslation(v=>!v)}>
    {showTranslation?'隐藏中文，自测理解':'显示中文对照'}
   </button>
  </section>
 </aside>;
}
export default function SpecialtyLibrary({params,navigate}:{params:URLSearchParams;navigate:(url:string)=>void}){
 const kind:SpecialtyKind=params.get('type')==='vocabulary'?'vocabulary':'grammar';
 const filterLang=params.get('language')==='fr'||params.get('language')==='en'?params.get('language') as SpecialtyLanguage:'all';
 const [level,setLevel]=useState<string>('all');
 const [query,setQuery]=useState('');
 const filtered=useMemo(()=>orderedSpecialties(SPECIALTY_LESSONS.filter(u=>u.type===kind&&(filterLang==='all'||u.language===filterLang)&&
 (level==='all'||u.level===level)&&(u.title+' '+u.subtitle+' '+u.objective+' '+u.sections.map(s=>s.title).join(' ')).toLowerCase().includes(query.toLowerCase()))),[kind,filterLang,level,query]);
 const requested=params.get('topic');
 const lesson=filtered.find(x=>x.id===requested)||filtered[0];
 const related=COURSES.find(c=>c.id===lesson?.unitLink);
 const [selectedChapter,setSelectedChapter]=useState<{topic:string;index:number}|null>(null);
 const sectionIndex=selectedChapter?.topic===lesson?.id?selectedChapter.index:0;
 useEffect(()=>{
  if(!lesson)return;
  const topicId=lesson.id;
  if(typeof requestAnimationFrame!=='function')return;
  let frame=0;
  const sync=()=>{
   if(frame)return;
   frame=requestAnimationFrame(()=>{
    frame=0;
    const chapters=[...document.querySelectorAll<HTMLElement>('.specialty-chapter')];
    if(!chapters.length)return;
    let active=0;
    chapters.forEach((el,i)=>{if(el.getBoundingClientRect().top<=185)active=i;});
    setSelectedChapter(old=>old?.topic===topicId&&old.index===active?old:{topic:topicId,index:active});
   });
  };
  sync();
  window.addEventListener('scroll',sync,{passive:true});
  window.addEventListener('resize',sync);
  return ()=>{window.removeEventListener('scroll',sync);window.removeEventListener('resize',sync);if(frame)cancelAnimationFrame(frame);};
 },[lesson?.id]);
 const returnTo=params.get('returnTo');
 // Never navigate to arbitrary URLs from an untrusted query parameter.
 const permittedReturns=related?['read','ipa','speech'].map(tab=>courseRoute(related,tab)):[];
 const returnPath=returnTo&&permittedReturns.includes(returnTo)?returnTo:
  related?courseRoute(related):'/';
 const openSpecialty=(target:SpecialtyLesson)=>{
  setLevel('all');setQuery('');
  navigate(specialtyRoute(target.type,target.language,target.id,target.unitLink===lesson?.unitLink?returnTo||undefined:undefined));
 };
 return <section className="specialty-page" aria-label="语法与词汇专题学习">
  <header className="specialty-heading-row">
   <h1>{filterLang==='fr'?'法语 · ':filterLang==='en'?'英语 · ':''}{kind==='grammar'?'语法专题':'词汇专题'}</h1>
   <nav className="specialty-kind-tabs" aria-label="选择重点专题类型">
    <button type="button" aria-pressed={kind==='grammar'} className={kind==='grammar'?'active':''}
     onClick={()=>navigate(specialtyRoute('grammar',filterLang==='all'?undefined:filterLang))}>语法</button>
    <button type="button" aria-pressed={kind==='vocabulary'} className={kind==='vocabulary'?'active':''}
     onClick={()=>navigate(specialtyRoute('vocabulary',filterLang==='all'?undefined:filterLang))}>词汇</button>
   </nav>
  </header>
  <div className="specialty-layout">
   <aside className="specialty-side" aria-label="专题课程目录">
    <h2>{kind==='grammar'?'语法体系':'词汇体系'}</h2>
    <label>学习语言<select aria-label="专题学习语言" value={filterLang} onChange={e=>navigate(specialtyRoute(kind,e.target.value==='all'?undefined:e.target.value))}>
     <option value="all">全部语言</option><option value="fr">法语</option><option value="en">英语</option></select></label>
    <label>课程等级<select aria-label="专题课程等级" value={level} onChange={e=>setLevel(e.target.value)}>
     <option value="all">全部等级</option>{LEVELS.map(x=><option key={x} value={x}>{x}</option>)}</select></label>
    <label>检索专题<input type="search" value={query} placeholder="规则、词组、使用场景" onChange={e=>setQuery(e.target.value)}/></label>
    <p className="specialty-total">{filtered.length} 个专题</p>
    <div className="specialty-topic-list">{filtered.map((u,i)=><Fragment key={u.id}>
     {(i===0||filtered[i-1].level!==u.level||filtered[i-1].language!==u.language)&&<h3 className="specialty-topic-group">{languageName(u.language)} · {u.level}</h3>}
     <button type="button"
     aria-current={lesson?.id===u.id?'page':undefined} className={lesson?.id===u.id?'active':''}
     onClick={()=>openSpecialty(u)}>
      <small>{languageName(u.language)} · {u.level}</small><strong>{u.title}</strong>
      <span>{u.sections.length} 个知识点 · {u.questions.length} 组自测</span></button></Fragment>)}</div>

   </aside>
   <div className="specialty-main">
    {lesson&&specialtyQuality(lesson)?<>
     <TopicArticle key={lesson.id} unit={lesson} navigate={navigate} returnPath={returnPath}
      onSelectSection={index=>setSelectedChapter({topic:lesson.id,index})} onOpenSpecialty={openSpecialty}/>
     <StudyCompanion key={lesson.id+'-helper'} unit={lesson} sectionIndex={sectionIndex}/>
    </>:<div className="panel specialty-empty">
     <h2>没有匹配的专题</h2><p>尝试切换语言、等级或关键词。</p>
     {related&&<button onClick={()=>navigate(courseRoute(related))}>进入相关课程</button>}</div>}
   </div>
  </div>
 </section>;
}
