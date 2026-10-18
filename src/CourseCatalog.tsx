import {useState} from 'react';
import {COURSES,languageName,courseRoute,catalogRoute} from './v44Courses';
export default function CourseCatalog({params,navigate}:{params:URLSearchParams;navigate:(url:string)=>void}){
 const [query,setQuery]=useState(''),[list,setList]=useState(true);
 const language=params.get('language')||'',track=params.get('track')||'';
 const languages=[...new Set(COURSES.map(c=>c.language))];
 const available=COURSES.filter(c=>!language||c.language===language);
 const groups=[...new Set(available.map(c=>c.track))];
 const found=available.filter(c=>(!track||c.track===track)&&(c.id+' '+c.title+' '+c.goal).toLocaleLowerCase().includes(query.toLocaleLowerCase()));
 return <section aria-label="课程目录"><div className="page-intro"><div><p className="eyebrow">COURSE DIRECTORY</p><h1>你的语言学习目录</h1><p className="subhead">108 个主课程 · 48 个基础与 A2 衔接单元。按自己的节奏，打开完整内容。</p></div><span className="pill">156 个学习单元</span></div>
 <div className="catalog-toolbar"><label>学习语言<select value={language} onChange={e=>navigate(catalogRoute(e.target.value))}><option value="">全部语言</option>{languages.map(l=><option key={l} value={l}>{languageName(l)}</option>)}</select></label><label>搜索课程<input type="search" placeholder="课名、目标或课程编号" value={query} onChange={e=>setQuery(e.target.value)}/></label><button type="button" aria-pressed={list} onClick={()=>setList(v=>!v)}>{list?'切换卡片':'切换列表'}</button></div>
 <div className="catalog-layout"><nav className="panel catalog-filter" aria-label="专项与等级"><h2>专项 / 等级</h2><button className={!track?'filter-option active':'filter-option'} onClick={()=>navigate(catalogRoute(language))}>全部课程 · {available.length}</button>{groups.map(g=><button key={g} className={track===g?'filter-option active':'filter-option'} onClick={()=>navigate(catalogRoute(language,g))}>{g} <small>{available.filter(c=>c.track===g).length}</small></button>)}</nav>
 <div><p className="subhead" role="status">找到 {found.length} 个单元 · 内容可学习 ≠ 人工审校通过</p><div className={list?'course-list':'catalog-cards'}>{found.map(c=><a key={c.id} className="panel course-big" href={courseRoute(c)} onClick={e=>{if(!e.ctrlKey&&!e.metaKey){e.preventDefault();navigate(courseRoute(c));}}}><span className="course-index">{String(c.unit).padStart(2,'0')}</span><div className="course-card-copy"><div className="course-meta">{languageName(c.language)} · {c.kind==='foundation'?'基础 / 衔接':c.track} · {c.level}</div><h2>{c.title}</h2><p>{c.goal}</p><span className="microtag">{c.status==='existing_original'?'已有教材 · 待审校':'新增原创初稿待审'}</span> <span className="microtag">音频未匹配</span></div><span className="course-open">开始学习 →</span></a>)}</div>{!found.length&&<p>没有匹配结果，请调整筛选或搜索。</p>}</div></div></section>;
}
