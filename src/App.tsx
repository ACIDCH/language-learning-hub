import { useEffect, useMemo, useRef, useState } from 'react';
import curriculumData from '../config/curriculum/units.v2.json';
import sourceData from '../config/resources/sources.json';
import { ReferenceAudio } from './ReferenceAudio';

type Lang = 'en' | 'fr';
type DisplayView = 'courses' | 'sources';
type Lesson = {
  id: string;
  language: Lang;
  level: string;
  track?: string;
  unit: number;
  title: string;
  can_do: string;
  grammar: string[];
  vocabulary_domains: string[];
  pronunciation_focus: string;
  performance_task: string;
  source_candidates: string[];
  source_alignment: string;
  content_status: 'outline_only';
  learning_steps: string[];
};
type Source = {
  id: string;
  language: Lang;
  title: string;
  organization: string;
  url: string;
  topics: string[];
  ingestion: string;
  license_note: string;
  levels: string[];
  audio: boolean;
};

const curriculum = curriculumData as unknown as { units: Lesson[] };
const sources = sourceData as unknown as { sources: Source[] };

const TRACKS = [
  { id: 'listening', label: 'Listening' },
  { id: 'reading', label: 'Reading' },
  { id: 'writing-task1', label: 'Writing Task 1' },
  { id: 'writing-task2', label: 'Writing Task 2' },
  { id: 'speaking', label: 'Speaking' },
  { id: 'language-upgrade', label: 'Language Upgrade' },
];
const LEVELS = ['A1','A2','B1','B2','C1','C2'];
const STEPS = [
  ['①', '情境'], ['②', '语法'], ['③', '词汇'],
  ['④', '听读'], ['⑤', '发音'], ['⑥', '表达'],
] as const;
const ASSET_MAP: Record<string, string> = {
  'en-ielts-writing-task2-u01': 'en-ielts-writing-task2-u01.txt',
  'en-ielts-reading-u01': 'en-ielts-reading-u01.txt',
  'en-ielts-reading-u02': 'en-ielts-reading-u02-v1.txt',
  'en-ielts-writing-task1-u01': 'en-ielts-writing-task1-u01.txt',
  'fr-a1-u01': 'fr-a1-u01.txt',
  'fr-a1-u02': 'fr-a1-u02.txt',
  'fr-a1-u03': 'fr-a1-u03.txt',
};
const sourceById = new Map(sources.sources.map(s => [s.id, s]));

function stepFromLine(line: string): string | undefined {
  const match = line.trimStart().replace(/^#+\s*/, '').match(/^([①②③④⑤⑥])(?=[\s\p{L}\p{N}：.:])/u);
  return match?.[1];
}

function FullText({ text }: { text: string }) {
  // Deliberately render EVERY line of the original Drive-derived public snapshot.
  // No slicing, excerpt generation, summarisation or "show more" truncation.
  return <div className="full-text" aria-label="完整课件正文">
    {text.split(/\r?\n/).map((line, i) => {
      const symbol = stepFromLine(line);
      const heading = symbol || /^=====|^[A-I]\.\s|^【|^学习目标|^课程权利|^版权与来源/.test(line);
      return <div
        key={i}
        id={symbol ? `segment-${symbol}` : undefined}
        className={`document-line${heading ? ' document-heading' : ''}${line.length === 0 ? ' document-space' : ''}`}
      >{line || '\u00a0'}</div>;
    })}
  </div>;
}

function AudioSupplement({ lessonId }: { lessonId: string }) {
  const [body,setBody]=useState('');
  const [error,setError]=useState(false);
  useEffect(()=>{
    setBody('');setError(false);
    if (!/^fr-a1-u(0[1-9]|1[0-2])$/.test(lessonId)) return;
    const controller=new AbortController();
    fetch(import.meta.env.BASE_URL+'learning-assets/'+lessonId+'-audio-supplement-v1.txt',{signal:controller.signal})
      .then(r=>{if(!r.ok)throw new Error('Supplement unavailable');return r.text();})
      .then(text=>{if(!controller.signal.aborted)setBody(text);})
      .catch(()=>{if(!controller.signal.aborted)setError(true);});
    return ()=>controller.abort();
  },[lessonId]);
  if(error)return <p role="alert">听读补充稿暂时无法读取，请稍后重试。</p>;
  return body ? <section><h3>新增听读练习与语法补充 · 待审校</h3><FullText text={body}/></section> : null;
}

function UnitOutline({ lesson }: { lesson: Lesson }) {
  const matchingSources = lesson.source_candidates.map(id => sourceById.get(id)).filter((s): s is Source => Boolean(s));
  return <div className="outline">
    <div className="notice notice-amber">该单元已有完整教学结构，但正文与音频尚未完成；当前显示全部规划信息，不将目录当作教材。</div>
    <section>
      <h3>学习目标</h3><p>{lesson.can_do}</p>
    </section>
    <div className="outline-grid">
      <section><h3>语法重点</h3>{lesson.grammar.map((v,i)=><p key={i}>{v}</p>)}</section>
      <section><h3>词汇领域</h3>{lesson.vocabulary_domains.map((v,i)=><p key={i}>{v}</p>)}</section>
      <section><h3>发音重点</h3><p>{lesson.pronunciation_focus}</p></section>
      <section><h3>实际表达</h3><p>{lesson.performance_task}</p></section>
    </div>
    <section>
      <h3>六段学习链</h3>
      <div className="step-grid">{STEPS.map(([mark,title])=><div className="step-pill" key={mark}>{mark} {title}</div>)}</div>
    </section>
    <section>
      <h3>待匹配的正规教学来源</h3>
      {matchingSources.length ? matchingSources.map(s=><div className="source-inline" key={s.id}>
        <a href={s.url} target="_blank" rel="noopener noreferrer">{s.title} ↗</a>
        <small>{s.organization} · {s.ingestion === 'link_only' ? '官网学习' : '逐文件审核许可'}</small>
      </div>) : <p>具体资源尚待专业审查。</p>}
    </section>
  </div>;
}

export default function App() {
  const [lang, setLang] = useState<Lang>('en');
  const [view, setView] = useState<DisplayView>('courses');
  const [track, setTrack] = useState('writing-task2');
  const [level, setLevel] = useState('A1');
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState('en-ielts-writing-task2-u01');
  const [text, setText] = useState<string | null>(null);
  const [loadError, setLoadError] = useState('');
  const [filter, setFilter] = useState('all');
  const fullTextRef = useRef<HTMLDivElement>(null);

  const catalog = useMemo(() => curriculum.units.filter(unit =>
    unit.language === lang &&
    (lang === 'en' ? unit.track === track : unit.level === level) &&
    (unit.title + ' ' + unit.can_do + ' ' + unit.grammar.join(' '))
      .toLowerCase().includes(query.trim().toLowerCase())
  ), [lang, track, level, query]);

  const selected = curriculum.units.find(unit => unit.id === selectedId) ?? curriculum.units[0];
  const assetName = ASSET_MAP[selected.id];
  const hasLesson = Boolean(assetName);
  const authoredCount = Object.keys(ASSET_MAP).filter(key => curriculum.units.some(unit => unit.id === key && unit.language === lang)).length;

  useEffect(() => {
    if (view !== 'courses') return;
    if (catalog.length && !catalog.some(unit => unit.id === selectedId)) setSelectedId(catalog[0].id);
  }, [catalog, selectedId, view]);

  useEffect(() => {
    setText(null); setLoadError('');
    if (!hasLesson || !assetName) return;
    const controller = new AbortController();
    const url = import.meta.env.BASE_URL + 'learning-assets/' + encodeURIComponent(assetName);
    fetch(url, { signal: controller.signal })
      .then(r => { if (!r.ok) throw new Error('HTTP ' + r.status); return r.text(); })
      .then(body => { if (!controller.signal.aborted) setText(body); })
      .catch(err => { if (!controller.signal.aborted) setLoadError(String(err)); });
    return () => controller.abort();
  }, [assetName, hasLesson]);

  const openLang = (next: Lang) => {
    setLang(next); setQuery(''); setView('courses');
    setSelectedId(next === 'en' ? 'en-ielts-writing-task2-u01' : 'fr-a1-u01');
  };
  const changeTrack = (id: string) => {
    setTrack(id); setQuery('');
    setSelectedId('en-ielts-' + id + '-u01');
  };
  const changeLevel = (id: string) => {
    setLevel(id); setQuery('');
    setSelectedId('fr-' + id.toLowerCase() + '-u01');
  };
  const jumpToStep = (symbol: string) => {
    const root = fullTextRef.current;
    const el = root?.querySelector<HTMLElement>(`[id="segment-${symbol}"]`);
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (!el) root?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const filteredSources = sources.sources.filter(source =>
    source.language === lang &&
    (filter === 'all' || source.topics.includes(filter)) &&
    (source.title + ' ' + source.organization + ' ' + source.topics.join(' ')).toLowerCase().includes(query.toLowerCase())
  );

  return <div className="app-shell">
    <a className="skip-link" href="#main">跳转到课程内容</a>
    <header className="app-header">
      <div className="header-inner">
        <div className="brand"><span className="brand-icon" aria-hidden="true">LH</span><span>Language Hub</span></div>
        <nav className="main-nav" aria-label="主导航">
          <button className={view === 'courses' ? 'nav-active' : ''} onClick={() => { setView('courses'); setQuery(''); }}>课程</button>
          <button className={view === 'sources' ? 'nav-active' : ''} onClick={() => { setView('sources'); setQuery(''); }}>资料来源</button>
          <a href="/cloud/" className="nav-link" title="跨设备进度管理">云端进度</a>
        </nav>
        <div className="status" aria-label="环境状态">教学原型 · 未连接账户</div>
      </div>
    </header>
    <main id="main" className="main-layout">
      <aside className="course-sidebar" aria-label="课程导航">
        <div className="sidebar-header">
          <div className="eyebrow">课程分类</div>
          <div className="lang-select" role="group" aria-label="选择学习语言">
            <button aria-pressed={lang==='en'} className={lang==='en'?'selected':''} onClick={()=>openLang('en')}>English</button>
            <button aria-pressed={lang==='fr'} className={lang==='fr'?'selected':''} onClick={()=>openLang('fr')}>Français</button>
          </div>
        </div>
        <div className="course-sets">
          {lang === 'en' ? TRACKS.map(t =>
            <button key={t.id} className={'sidebar-item'+(track===t.id?' active':'')} aria-pressed={track===t.id} onClick={()=>changeTrack(t.id)}>
              <span>{t.label}</span><span className="sidebar-count">8</span>
            </button>
          ) : LEVELS.map(l =>
            <button key={l} className={'sidebar-item'+(level===l?' active':'')} aria-pressed={level===l} onClick={()=>changeLevel(l)}>
              <span>{l}</span><span className="sidebar-count">{curriculum.units.filter(u=>u.language==='fr'&&u.level===l).length}</span>
            </button>
          )}
        </div>
        <div className="sidebar-foot">
          <strong>{lang==='en'?'48 个技能单元':'60 个分级单元'}</strong>
          <span>{lang==='en'?'IELTS Academic 风格':'CEFR A1–C2'}</span>
          <span>已编写样课：{authoredCount} 节</span>
        </div>
      </aside>
      <div className="workbench">
        <div className="page-head">
          <div>
            <div className="eyebrow">{lang==='en'?'ENGLISH · ACADEMIC':'FRANÇAIS · CEFR'}</div>
            <h1>{view==='sources'?'资料来源':lang==='en'?'英语课程':'法语课程'}</h1>
            <div className="context-row">
              <span>{view==='sources'?'仅列合法来源入口':lang==='en'?'六项技能轨道 · 不含英语入门课程':'从 A1 开始 · 语法、音频与表达'}</span>
            </div>
          </div>
          <div className="page-stat"><b>{view==='courses'?(lang==='en'?48:60):filteredSources.length}</b><span>{view==='courses'?'计划单元':'来源入口'}</span></div>
        </div>
        <div className="toolbar">
          <label className="search">
            <span className="sr-only">{view==='courses'?'搜索课程':'搜索资源'}</span>
            <input type="search" placeholder={view==='courses'?'搜索课程、语法或知识点':'搜索机构、主题'} value={query} onChange={e=>setQuery(e.target.value)} />
          </label>
          {view==='sources' && <label className="source-filter">
            <span className="sr-only">资源类型</span>
            <select value={filter} onChange={e=>setFilter(e.target.value)}>
              <option value="all">全部资源</option>
              <option value="listening">听力</option><option value="reading">阅读</option>
              <option value="grammar">语法</option><option value="pronunciation">发音</option>
            </select>
          </label>}
        </div>
        {view === 'sources' ? <section className="source-cards" aria-label="资源来源列表">
          {filteredSources.map(source=><article key={source.id} className="source-card">
            <div className="source-head"><strong>{source.title}</strong><span className="tag">{source.ingestion === 'link_only'?'官方链接':'逐文件许可审核'}</span></div>
            <div className="source-organization">{source.organization}</div>
            <div className="source-topics">{source.topics.map(t=><span className="chip" key={t}>{t}</span>)}</div>
            <p>{source.license_note}</p>
            <a href={source.url} target="_blank" rel="noopener noreferrer">访问原始资源 ↗</a>
          </article>)}
          {!filteredSources.length && <div className="empty">没有符合条件的资源。</div>}
        </section> : <div className="course-workspace">
          <div className="unit-list" aria-label="单元列表">
            <div className="unit-list-title">{lang === 'en' ? TRACKS.find(t=>t.id===track)?.label : 'Français ' + level}</div>
            <div className="unit-items">
              {catalog.map(u=><button
                key={u.id}
                className={'unit-entry'+(selectedId===u.id?' active':'')}
                aria-current={selectedId===u.id?'page':undefined}
                onClick={()=>setSelectedId(u.id)}
              >
                <span className="unit-number">{String(u.unit).padStart(2,'0')}</span>
                <span className="unit-entry-copy"><strong>{u.title}</strong><small>{ASSET_MAP[u.id]?'教学正文 · 待审校':'教学框架'}</small></span>
              </button>)}
              {!catalog.length && <div className="empty">没有匹配的单元。</div>}
            </div>
          </div>
          <article className="lesson-card" aria-label="课件内容">
            <div className="lesson-toolbar">
              <div className="eyebrow">{lang === 'en' ? 'ACADEMIC ENGLISH':'FRANÇAIS'} / {lang==='en'?track.toUpperCase():level} / {String(selected.unit).padStart(2,'0')}</div>
              <span className={'tag '+(hasLesson?'tag-ready':'tag-draft')}>{hasLesson?'原创课件正文':'单元规划'}</span>
            </div>
            <h2>{selected.title}</h2>
            {hasLesson ? <>
              <div className="notice">以下显示从专用 Google Drive 课件同步的<strong>全部公开示范正文</strong>，包括原有内容与后续扩展。未对正文作任何摘要或省略。</div>
              <div className="lesson-tools"><span>六段定位</span>
                {STEPS.map(([symbol,label])=><button key={symbol} onClick={()=>jumpToStep(symbol)} aria-label={'定位到'+label}>{label}</button>)}
              </div>
              <div ref={fullTextRef} className="lesson-content">
                {loadError && <div role="alert" className="error">课件获取失败：{loadError}</div>}
                {text === null && !loadError && <div className="loading">读取完整课件中…</div>}
                {text !== null && <FullText text={text}/>}
              </div>
              <div className="lesson-bottom">
                <strong>整课音频状态</strong><p>整课情境配音与逐句对齐尚未完成。已核验的词汇参考录音如有提供，会单独列在下方。发音评估待验证。</p>
              </div>
            </> : <UnitOutline lesson={selected}/>}
            <ReferenceAudio key={selected.id} lessonId={selected.id}/>
            <AudioSupplement lessonId={selected.id}/>
          </article>
        </div>}
        <footer className="app-footer">
          <span>Language Hub · 独立教学原型</span>
          <span>私人学习记录及 AI 接口尚未上线</span>
        </footer>
      </div>
    </main>
  </div>;
}
