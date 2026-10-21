import {useMemo,useState} from 'react';
import {COURSES,courseRoute,languageName} from './v44Courses';
import {SPECIALTY_LESSONS,specialtyRoute,type SpecialtyLesson,type SpecialtyKind,type SpecialtyLanguage,specialtyQuality} from './specialtyLibrary';
import {speakIpaText} from './IpaText';

const LEVELS=['A1','A2','B1','B2','C1'] as const;
function NotesPractice({unit}:{unit:SpecialtyLesson}){
 const [answers,setAnswers]=useState<Record<number,string>>({});
 const [reveal,setReveal]=useState<Record<number,boolean>>({});
 const [written,setWritten]=useState('');
 return <div className="specialty-practice">
  <h2>巩固练习与解析</h2>
  <p>先独立完成，再逐题核对。开放题允许等义答案，系统不将字符串不一致判定为语言能力错误。</p>
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
   <details><summary>完成后查看分步示范</summary>
    {unit.model.map((e,i)=><div className="specialty-example" key={i}>
     <strong lang={unit.language}>{e.target}</strong><p>{e.zh}</p><small>{e.analysis}</small>
    </div>)}
   </details>
   <p className="specialty-hint">本区用于本次练习，暂不自动声称已同步云端。可把完成的文本复制到对应课程的学习笔记中。</p>
   <button type="button" disabled={!written.trim()} onClick={()=>navigator.clipboard?.writeText(written)}>复制我的回答</button>
  </section>
 </div>;
}
function TopicArticle({unit,navigate,returnPath,onSelectSection}:{unit:SpecialtyLesson;navigate:(p:string)=>void;returnPath:string;onSelectSection:(index:number)=>void}){
 const [complete,setComplete]=useState<Record<number,boolean>>({});
 const finished=unit.sections.filter((_,i)=>complete[i]).length;
 return <article className="specialty-textbook" aria-label={unit.title}>
  <div className="specialty-article-head">
   <div><span className="specialty-kicker">{unit.language==='fr'?'FRANÇAIS':'ENGLISH'} · {unit.level} · {unit.type==='grammar'?'GRAMMAR':'VOCABULARY'}</span>
    <h1>{unit.title}</h1><p>{unit.subtitle}</p></div>
   <button className="specialty-course-link" onClick={()=>navigate(returnPath)}>回到关联课程 <span aria-hidden="true">↗</span></button>
  </div>
  <div className="specialty-objectives">
   <div><strong>先备知识</strong><p>{unit.prerequisite}</p></div>
   <div><strong>学习目标</strong><p>{unit.objective}</p></div>
  </div>
  <nav className="specialty-section-nav" aria-label="本专题章节">
   {unit.sections.map((s,i)=><a key={i} href={'#specialty-section-'+i} onClick={()=>onSelectSection(i)}>{String(i+1).padStart(2,'0')} {s.title.replace(/^\d+[.、 ]+/u,'')}</a>)}
  </nav>
  <div className="specialty-progress" role="status">已阅读并自行核对 {finished} / {unit.sections.length} 个知识点</div>
  {unit.sections.map((s,i)=><section id={'specialty-section-'+i} className="specialty-chapter" key={i}>
   <header className="specialty-chapter-title"><span>{i+1}</span><h2>{s.title}</h2></header>
   <p className="specialty-concept">{s.concept}</p>
   <div className="specialty-pattern"><strong>结构 / 搭配</strong><p lang={unit.language}>{s.pattern}</p></div>
   <h3>逐句理解与迁移</h3>
   <div className="specialty-example-stack">{s.examples.map((e,j)=><div className="specialty-example" key={j}>
    <div className="specialty-example-grid"><p lang={unit.language}><strong>{e.target}</strong>
      <button type="button" aria-label={'朗读 '+e.target} title="朗读句子" onClick={()=>speakIpaText(e.target,unit.language,.85)}>▶</button></p>
     <p lang="zh-Hans">{e.zh}</p></div>
    <p className="specialty-analysis">{e.analysis}</p>
   </div>)}</div>
   <aside className="specialty-error"><strong>易错对比</strong><p>{s.caution}</p></aside>
   <label className="specialty-check"><input type="checkbox" checked={!!complete[i]}
     onChange={e=>setComplete(o=>({...o,[i]:e.target.checked}))}/>我已能用自己的话解释本节规则，并区分例句用法</label>
  </section>)}
  <NotesPractice key={unit.id} unit={unit}/>
  <details className="specialty-references"><summary>参考资料与关联教材</summary>
   <p>本专题以项目课程和已有讲解为起点；以下资料用于规则校核或拓展阅读。这里的例句及中文解释不冒充外部教材原句。</p>
   <ul>{unit.referenceUrls.map(url=><li key={url}><a target="_blank" rel="noopener noreferrer" href={url}>{new URL(url).hostname} — 参考资料</a></li>)}</ul>
  </details>
 </article>;
}
function StudyCompanion({unit,sectionIndex,onSelectSection}:{unit:SpecialtyLesson;sectionIndex:number;onSelectSection:(index:number)=>void}){
 const current=unit.sections[sectionIndex]||unit.sections[0];
 const sample=current?.examples[0];
 return <aside className="specialty-companion" aria-label="本课知识点辅助栏">
  <section><h2>本专题章节</h2>
   <ol>{unit.sections.map((s,i)=><li key={i}>
    <a href={'#specialty-section-'+i} aria-current={sectionIndex===i?'location':undefined}
     onClick={()=>onSelectSection(i)}>{s.title.replace(/^\d+[.、 ]+/u,'')}</a>
   </li>)}</ol>
  </section>
  {current&&<><section><h2>当前重点 · {String(sectionIndex+1).padStart(2,'0')}</h2>
   <p><strong>{current.title}</strong></p><p>{current.concept}</p>
  </section>
  <section><h2>本节易错点</h2><p>{current.caution}</p></section>
  <section><h2>结构与搭配速查</h2><p className="specialty-companion-pattern" lang={unit.language}>{current.pattern}</p>
   {current.examples.slice(0,2).map((e,i)=><div key={i} className="specialty-companion-pair">
    <strong lang={unit.language}>{e.target}</strong><p lang="zh-Hans">{e.zh}</p>
   </div>)}
  </section></>}
  {sample&&<section><h2>本节快速跟读</h2><p lang={unit.language}>{sample.target}</p>
   <button type="button" onClick={()=>speakIpaText(sample.target,unit.language,.85)}>▶ 朗读当前例句</button>
  </section>}
 </aside>;
}
export default function SpecialtyLibrary({params,navigate}:{params:URLSearchParams;navigate:(url:string)=>void}){
 const kind:SpecialtyKind=params.get('type')==='vocabulary'?'vocabulary':'grammar';
 const filterLang=params.get('language')==='fr'||params.get('language')==='en'?params.get('language') as SpecialtyLanguage:'all';
 const [level,setLevel]=useState<string>('all');
 const [query,setQuery]=useState('');
 const filtered=useMemo(()=>SPECIALTY_LESSONS.filter(u=>u.type===kind&&(filterLang==='all'||u.language===filterLang)&&
 (level==='all'||u.level===level)&&(u.title+' '+u.subtitle+' '+u.objective+' '+u.sections.map(s=>s.title).join(' ')).toLowerCase().includes(query.toLowerCase())),[kind,filterLang,level,query]);
 const requested=params.get('topic');
 const lesson=filtered.find(x=>x.id===requested)||filtered[0];
 const related=COURSES.find(c=>c.id===lesson?.unitLink);
 const [selectedChapter,setSelectedChapter]=useState<{topic:string;index:number}|null>(null);
 const sectionIndex=selectedChapter?.topic===lesson?.id?selectedChapter.index:0;
 const returnTo=params.get('returnTo');
 // Never navigate to arbitrary URLs from an untrusted query parameter.
 const permittedReturns=related?['read','ipa','speech'].map(tab=>courseRoute(related,tab)):[];
 const returnPath=returnTo&&permittedReturns.includes(returnTo)?returnTo:
  related?courseRoute(related):'/';
 return <section className="specialty-page" aria-label="语法与词汇专题学习">
  <div className="specialty-top">
   <p className="eyebrow">LANGUAGE LEARNING · SYSTEMATIC STUDY</p><h1>语法与词汇专题</h1>
   <p>先理解规则和词义，再通过双语句段、对比纠错、主动回忆与实际输出形成可迁移的语言能力。</p>
  </div>
  <nav className="specialty-kind-tabs" aria-label="选择重点专题类型">
   <button type="button" aria-pressed={kind==='grammar'} className={kind==='grammar'?'active':''}
    onClick={()=>navigate(specialtyRoute('grammar',filterLang==='all'?undefined:filterLang))}>语法专题 <small>系统理解 · 结构应用</small></button>
   <button type="button" aria-pressed={kind==='vocabulary'} className={kind==='vocabulary'?'active':''}
    onClick={()=>navigate(specialtyRoute('vocabulary',filterLang==='all'?undefined:filterLang))}>词汇专题 <small>语块记忆 · 搭配辨析</small></button>
  </nav>
  <div className="specialty-layout">
   <aside className="specialty-side" aria-label="专题课程目录">
    <h2>{kind==='grammar'?'语法体系':'词汇体系'}</h2>
    <label>学习语言<select aria-label="专题学习语言" value={filterLang} onChange={e=>navigate(specialtyRoute(kind,e.target.value==='all'?undefined:e.target.value))}>
     <option value="all">全部语言</option><option value="fr">法语</option><option value="en">英语</option></select></label>
    <label>课程等级<select aria-label="专题课程等级" value={level} onChange={e=>setLevel(e.target.value)}>
     <option value="all">全部等级</option>{LEVELS.map(x=><option key={x} value={x}>{x}</option>)}</select></label>
    <label>检索专题<input type="search" value={query} placeholder="规则、词组、使用场景" onChange={e=>setQuery(e.target.value)}/></label>
    <p className="specialty-total">{filtered.length} 个有正文与练习的专题</p>
    <div className="specialty-topic-list">{filtered.map(u=><button type="button" key={u.id}
     aria-current={lesson?.id===u.id?'page':undefined} className={lesson?.id===u.id?'active':''}
     onClick={()=>navigate(specialtyRoute(kind,filterLang==='all'?undefined:filterLang,u.id))}>
      <small>{languageName(u.language)} · {u.level}</small><strong>{u.title}</strong>
      <span>{u.sections.length} 个知识点 · {u.questions.length} 组自测</span></button>)}</div>
    <p className="specialty-fineprint">目录仅展示已编写完整知识点与练习的专题；其余课程仍可从原课程目录进入，不能视作已完成专题审校。</p>
   </aside>
   <div className="specialty-main">
    {lesson&&specialtyQuality(lesson)?<>
     <TopicArticle key={lesson.id} unit={lesson} navigate={navigate} returnPath={returnPath}
      onSelectSection={index=>setSelectedChapter({topic:lesson.id,index})}/>
     <StudyCompanion key={lesson.id+'-helper'} unit={lesson} sectionIndex={sectionIndex}
      onSelectSection={index=>setSelectedChapter({topic:lesson.id,index})}/>
    </>:<div className="panel specialty-empty">
     <h2>暂无匹配的已编写专题</h2><p>可尝试切换语言、等级或关键词；不会用空白模板假装已编写教材。</p>
     {related&&<button onClick={()=>navigate(courseRoute(related))}>进入相关课程</button>}</div>}
   </div>
  </div>
 </section>;
}
