import {useState} from 'react';
import {COURSES,languageName,courseRoute,catalogRoute} from './v44Courses';
import {specialtyRoute} from './specialtyLibrary';
const TRACK_LABELS:Record<string,string>={
 listening:'听力',reading:'阅读','writing-task1':'写作 Task 1',
 'writing-task2':'写作 Task 2',speaking:'口语','language-upgrade':'语言提升'
};
function trackLabel(value:string){return TRACK_LABELS[value]||value;}
export default function CourseCatalog({params,navigate}:{params:URLSearchParams;navigate:(url:string)=>void}){
 const [query,setQuery]=useState(''),[list,setList]=useState(true);
 const language=params.get('language')||'',track=params.get('track')||'';
 const languages=[...new Set(COURSES.map(c=>c.language))];
 const available=COURSES.filter(c=>!language||c.language===language);
 const groups=[...new Set(available.map(c=>c.track))];
 const found=available.filter(c=>(!track||c.track===track)&&(c.id+' '+c.title+' '+c.goal).toLocaleLowerCase().includes(query.toLocaleLowerCase()));
 return <section aria-label="课程目录"><div className="page-intro"><div><p className="eyebrow">LANGUAGE LEARNING</p><h1>课程目录</h1></div><span className="pill">{COURSES.length} 节课程</span></div>
 <div className="catalog-toolbar"><label>学习语言<select value={language} onChange={e=>navigate(catalogRoute(e.target.value))}><option value="">全部语言</option>{languages.map(l=><option key={l} value={l}>{languageName(l)}</option>)}</select></label><label>搜索课程<input type="search" placeholder="课名、目标或课程编号" value={query} onChange={e=>setQuery(e.target.value)}/></label><button type="button" aria-pressed={list} onClick={()=>setList(v=>!v)}>{list?'切换卡片':'切换列表'}</button></div>
 <div className="catalog-layout"><nav className="panel catalog-filter" aria-label="专项与等级"><h2>专项 / 等级</h2><div className="catalog-specialties"><h3>重点学习专题</h3><p>系统讲解 · 双语应用 · 逐题解析</p>
 <a className="catalog-specialty" href={specialtyRoute('grammar',language||undefined)} onClick={e=>{e.preventDefault();navigate(specialtyRoute('grammar',language||undefined));}}><strong>▣ 语法专题</strong><small>体系化规则 · 句型拆解</small></a>
 <a className="catalog-specialty" href={specialtyRoute('vocabulary',language||undefined)} onClick={e=>{e.preventDefault();navigate(specialtyRoute('vocabulary',language||undefined));}}><strong>▤ 词汇专题</strong><small>词义搭配 · 场景应用</small></a></div><h3 className="catalog-level-heading">按原有课程分类</h3><button aria-pressed={!track} className={!track?'filter-option active':'filter-option'} onClick={()=>navigate(catalogRoute(language))}>全部课程 · {available.length}</button>{groups.map(g=><button key={g} aria-pressed={track===g} className={track===g?'filter-option active':'filter-option'} onClick={()=>navigate(catalogRoute(language,g))}>{trackLabel(g)} <small>{available.filter(c=>c.track===g).length}</small></button>)}</nav>
 <div><p className="subhead catalog-count" role="status">{found.length} 节课程</p><div className={list?'course-list':'catalog-cards'}>{found.map(c=><a key={c.id} className="panel course-big" href={courseRoute(c)} onClick={e=>{if(!e.ctrlKey&&!e.metaKey){e.preventDefault();navigate(courseRoute(c));}}}><span className="course-index">{String(c.unit).padStart(2,'0')}</span><div className="course-card-copy"><div className="course-meta">{languageName(c.language)} · {c.kind==='foundation'?'基础 / 衔接':trackLabel(c.track)} · {c.level}</div><h2>{c.title}</h2><p>{c.goal}</p></div><span className="course-open">开始学习 →</span></a>)}</div>{!found.length&&<p>没有匹配结果，请调整筛选或搜索。</p>}</div></div></section>;
}
