import {useState} from 'react';
import {COURSES,languageName,courseRoute,catalogRoute} from './v44Courses';
import {specialtyRoute} from './specialtyLibrary';

const TRACK_LABELS:Record<string,string>={
 listening:'听力',reading:'阅读','writing-task1':'写作 Task 1',
 'writing-task2':'写作 Task 2',speaking:'口语','language-upgrade':'语言提升'
};
const LEVELS=['A1','A2','B1','B2','C1','C2'] as const;
const LEVEL_NAMES:Record<string,string>={A1:'入门',A2:'初级',B1:'中级',B2:'中高级',C1:'高级',C2:'精通'};
const trackLabel=(value:string)=>TRACK_LABELS[value]||value;
const catalogFacetRoute=(language:string,key:'level'|'skill',value:string)=>{
 const p=new URLSearchParams();
 if(language)p.set('language',language);
 if(value)p.set(key,value);
 return '/'+(p.size?'?'+p.toString():'');
};
const isListening=(track:string)=>track==='listening'||track==='reading';
const isProduction=(track:string)=>track==='speaking'||track.startsWith('writing-');

export default function CourseCatalog({params,navigate}:{params:URLSearchParams;navigate:(url:string)=>void}){
 const [query,setQuery]=useState(''),[list,setList]=useState(true);
 const language=params.get('language')||'',track=params.get('track')||'';
 const level=params.get('level')||'',skill=params.get('skill')||'';
 const languages=[...new Set(COURSES.map(c=>c.language))];
 const available=COURSES.filter(c=>!language||c.language===language);
 const groups=[...new Set(available.map(c=>c.track))].filter(g=>g!=='零基础'&&g!=='基础 A2 衔接');
 const found=available.filter(c=>(!track||c.track===track)&&(!level||c.level===level)&&
  (!skill||(skill==='listen'?isListening(c.track):isProduction(c.track)))&&
  (c.id+' '+c.title+' '+c.goal).toLocaleLowerCase().includes(query.toLocaleLowerCase()));
 const go=(e:React.MouseEvent<HTMLAnchorElement>,url:string)=>{
  if(e.button===0&&!e.ctrlKey&&!e.metaKey&&!e.shiftKey&&!e.altKey){e.preventDefault();navigate(url);}
 };
 const allActive=!track&&!level&&!skill;
 const card=(kind:'grammar'|'vocabulary',title:string,detail:string,icon:string)=>{
  const url=specialtyRoute(kind,language||undefined);
  return <a className="catalog-specialty catalog-specialty-primary" href={url} onClick={e=>go(e,url)} key={kind}>
   <span className="catalog-specialty-icon" aria-hidden="true">{icon}</span>
   <span className="catalog-specialty-copy"><strong>{title}</strong><small>{detail}</small></span>
   <span className="catalog-specialty-arrow" aria-hidden="true">›</span>
  </a>;
 };
 return <section aria-label="课程目录">
  <div className="page-intro"><div><p className="eyebrow">LANGUAGE LEARNING</p><h1>课程目录</h1></div>
   <span className="pill">{COURSES.length} 节课程</span></div>
  <div className="catalog-toolbar">
   <label>学习语言<select value={language} onChange={e=>navigate(catalogRoute(e.target.value))}>
    <option value="">全部语言</option>{languages.map(l=><option key={l} value={l}>{languageName(l)}</option>)}
   </select></label>
   <label>课程方向<select aria-label="课程方向" value={track}
    onChange={e=>navigate(catalogRoute(language,e.target.value))}>
    <option value="">全部方向</option>
    {groups.map(g=><option key={g} value={g}>{trackLabel(g)}</option>)}
    <option value="零基础">零基础</option><option value="基础 A2 衔接">基础 A2 衔接</option>
   </select></label>
   <label>搜索课程<input type="search" placeholder="课名、目标或课程编号" value={query} onChange={e=>setQuery(e.target.value)}/></label>
   <button type="button" aria-pressed={list} onClick={()=>setList(v=>!v)}>{list?'切换卡片':'切换列表'}</button>
  </div>
  <div className="catalog-layout">
   <nav className="panel catalog-filter" aria-label="专项与等级">
    <h2>专项 / 等级</h2>
    <div className="catalog-specialties">
     <h3>重点学习专题</h3><p>按知识体系深入学习，而不只停留在单课知识点</p>
     {card('grammar','语法专题','规则 · 句型 · 对比纠错 · 自测','▣')}
     {card('vocabulary','词汇专题','义项 · 搭配 · 语境应用 · 复习','▤')}
     <h3 className="catalog-skills-title">其他专项</h3>
     <a className="catalog-skill-link" aria-current={skill==='listen'?'page':undefined}
      href={catalogFacetRoute(language,'skill','listen')} onClick={e=>go(e,catalogFacetRoute(language,'skill','listen'))}>♫ 听读训练 <small>听力与阅读</small></a>
     <a className="catalog-skill-link" aria-current={skill==='output'?'page':undefined}
      href={catalogFacetRoute(language,'skill','output')} onClick={e=>go(e,catalogFacetRoute(language,'skill','output'))}>◎ 表达输出 <small>口语与写作</small></a>
     <a className="catalog-skill-link" href="/speech-lab#ipa-studio"
      onClick={e=>go(e,'/speech-lab#ipa-studio')}>ə 发音 / 音标 <small>专项训练工具</small></a>
    </div>
    <h3 className="catalog-level-heading">按语言等级筛选</h3>
    <button type="button" aria-pressed={allActive} className={allActive?'filter-option active':'filter-option'}
     onClick={()=>navigate(catalogRoute(language))}>全部课程 <small>{available.length}</small></button>
    {LEVELS.map(g=><button type="button" key={g} aria-pressed={level===g}
     className={level===g?'filter-option active':'filter-option'}
     onClick={()=>navigate(catalogFacetRoute(language,'level',g))}>
     <span>{g} <small>{LEVEL_NAMES[g]}</small></span><small>{available.filter(c=>c.level===g).length}</small>
    </button>)}
    {(['零基础','基础 A2 衔接'] as const).map(g=><button type="button" key={g} aria-pressed={track===g}
     className={track===g?'filter-option active':'filter-option'}
     onClick={()=>navigate(catalogRoute(language,g))}>{g} <small>{available.filter(c=>c.track===g).length}</small>
    </button>)}
    <details className="catalog-extra-tracks" open={!!track&&!['零基础','基础 A2 衔接'].includes(track)}>
     <summary>按课程技能进一步筛选</summary>
     {groups.map(g=><button type="button" key={g} aria-pressed={track===g}
      className={track===g?'filter-option active':'filter-option'}
      onClick={()=>navigate(catalogRoute(language,g))}>{trackLabel(g)} <small>{available.filter(c=>c.track===g).length}</small></button>)}
    </details>
   </nav>
   <div><p className="subhead catalog-count" role="status">{found.length} 节课程</p>
    <div className={list?'course-list':'catalog-cards'}>{found.map(c=>{
     const url=courseRoute(c);
     return <a key={c.id} className="panel course-big" href={url} onClick={e=>go(e,url)}>
      <span className="course-index">{String(c.unit).padStart(2,'0')}</span>
      <div className="course-card-copy"><div className="course-meta">
       {languageName(c.language)} · {c.kind==='foundation'?'基础 / 衔接':trackLabel(c.track)} · {c.level}
      </div><h2>{c.title}</h2><p>{c.goal}</p></div><span className="course-open">开始学习 →</span>
     </a>;
    })}</div>
    {!found.length&&<p>没有匹配结果，请调整筛选或搜索。</p>}
   </div>
  </div>
 </section>;
}
