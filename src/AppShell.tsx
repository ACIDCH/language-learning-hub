import {lazy,Suspense,useEffect,useState,type CSSProperties} from 'react';
import type {Session} from '@supabase/supabase-js';
import CourseCatalog from './CourseCatalog';
import CourseReader from './CourseReader';
import GlobalSettings from './GlobalSettings';
import {COURSES,catalogRoute,courseRoute,languageName} from './v44Courses';
import {readPreferences,cleanPreferences,persistPreferences,type Preferences} from './v44Preferences';
import {cloudClient} from './v44Connection';
import {useAISettings} from './AISettings';
import './cloud.css';
import './v44.css';
import './v44Integration.css';
const CloudWorkspace=lazy(()=>import('./CloudWorkspace'));
const PersonalHub=lazy(()=>import('./PersonalHub'));
const SpeechPractice=lazy(()=>import('./SpeechPractice'));
const IpaStudio=lazy(()=>import('./IpaStudio'));
export function readRoute(href:string){const u=new URL(href,location.origin);return {path:u.pathname,params:u.searchParams};}
export default function AppShell(){
 const [route,setRoute]=useState(()=>readRoute(location.href));
 const [preferences,setPreferences]=useState(()=>{const p=readPreferences();return window.innerWidth<=850?{...p,sidebar:false}:p;});
 const [session,setSession]=useState<Session|null>(null),[authReady,setAuthReady]=useState(!cloudClient),[recovery,setRecovery]=useState(false),[authError,setAuthError]=useState('');
 const [notice,setNotice]=useState('');
 const {clear}=useAISettings();
 const params=route.params,course=COURSES.find(c=>c.id===params.get('course'));
 const cloud=route.path==='/cloud'||route.path.startsWith('/cloud/');
 const page=params.get('page')||(route.path==='/speech-lab'?'speech':cloud&&params.has('panel')?'legacy':'catalog');
 const reader=course&&page!=='legacy';
 const section=params.get('section')||'appearance';
 function navigate(url:string){if(window.innerWidth<=850)setPreferences(p=>({...p,sidebar:false}));history.pushState({},'',url);setRoute(readRoute(location.href));window.scrollTo({top:0});}
 useEffect(()=>{const pop=()=>setRoute(readRoute(location.href));window.addEventListener('popstate',pop);return ()=>window.removeEventListener('popstate',pop);},[]);
 useEffect(()=>{
  if(!cloudClient)return;let alive=true;
  void cloudClient.auth.getSession().then(({data,error})=>{if(alive){setSession(data.session);setAuthReady(true);if(error)setAuthError(error.message);}}).catch(()=>{if(alive){setAuthReady(true);setAuthError('账户连接暂不可用。');}});
  const {data}=cloudClient.auth.onAuthStateChange((event,next)=>{
   setSession(next);setAuthReady(true);if(event==='SIGNED_OUT')clear();
   if(event==='PASSWORD_RECOVERY'){setRecovery(true);navigate('/?page=settings&section=account');}
  });return ()=>{alive=false;data.subscription.unsubscribe();};
 },[]);
 useEffect(()=>{
  document.body.dataset.theme=preferences.theme;document.body.dataset.viewMode=preferences.layout;
  if(!persistPreferences(preferences))setNotice('浏览器不允许保存外观偏好；当前会话仍可使用。');
 },[preferences]);
 function update(p:Partial<Preferences>){setPreferences(old=>cleanPreferences({...old,...p}));}
 const crumbs=reader?[{label:'课程目录',url:'/'},{label:languageName(course.language),url:catalogRoute(course.language)},{label:course.track,url:catalogRoute(course.language,course.track)},{label:course.title,url:courseRoute(course)},{label:params.get('tab')==='ipa'?'全文 IPA':params.get('tab')==='speech'?'跟读':'阅读',url:courseRoute(course,params.get('tab')||'read')}]:page==='settings'?[{label:'总设置',url:'/?page=settings'},{label:{appearance:'外观',learning:'学习偏好',ai:'AI 助学',account:'账户与同步'}[section]||'设置',url:'/?page=settings&section='+section}]:[{label:page==='catalog'?'课程目录':page==='speech'?'跟读练习':page==='ipa'?'全文 IPA':page==='favorites'?'收藏':'资料与云端',url:page==='catalog'?'/':location.pathname+location.search}];
 return <div className={'v44 view-root'+(!preferences.sidebar?' rail-collapsed':'')} style={{'--readerWidth':preferences.readerWidth+'px','--reading-size':preferences.fontSize+'px','--reading-font':preferences.serif?'Georgia, "Noto Serif SC", serif':'inherit'} as CSSProperties}><a className="skip-link" href="#main-content">跳至主要内容</a>
 <aside className="rail" aria-label="主导航"><a className="rail-head" href="/" onClick={e=>{e.preventDefault();navigate('/');}}><span className="brand-symbol">L</span><span className="brand-name">Language Hub<small>LEARN WITH PURPOSE</small></span></a><div className="rail-group"><p className="rail-overline">你的学习空间</p>{[['/','▤','课程目录'],['/speech-lab','◉','跟读练习'],['/?page=ipa','ə','全文 IPA'],['/?page=favorites','◇','我的收藏'],['/cloud?panel=resources','▱','资料与导入'],['/cloud?panel=audio','♫','课程音频'],['/cloud?panel=foundation','◎','基础专项训练']].map(([url,icon,label])=><a className="nav-item" href={url} key={url} onClick={e=>{e.preventDefault();navigate(url);}}><span className="nav-icon">{icon}</span><span>{label}</span></a>)}</div><div className="rail-bottom"><a className="nav-item" href="/?page=settings&section=account" onClick={e=>{e.preventDefault();navigate('/?page=settings&section=account');}}>◯　{session?'我的账户':'登录 / 注册'}</a><a className="nav-item" href="/?page=settings" onClick={e=>{e.preventDefault();navigate('/?page=settings');}}>⚙　总设置</a><p className="rail-account">{session?'个人学习空间':'访客可阅读全部学习内容'}</p></div></aside>
 <div className="work"><header className="topbar"><div className="header-left"><button className="round-action" aria-label="切换导航栏" aria-expanded={preferences.sidebar} onClick={()=>update({sidebar:!preferences.sidebar})}>☰</button><button className="round-action" aria-label="返回上一层" onClick={()=>navigate(reader?catalogRoute(course.language,course.track):page==='settings'&&params.has('section')?'/?page=settings':'/')}>←</button><nav className="breadcrumbs" aria-label="面包屑">{crumbs.map((c,i)=><span key={i}><a href={c.url} onClick={e=>{e.preventDefault();navigate(c.url);}} aria-current={i===crumbs.length-1?'page':undefined}>{c.label}</a>{i<crumbs.length-1&&' › '}</span>)}</nav></div><div className="topbar-right"><label>外观<select aria-label="网站外观" value={preferences.theme} onChange={e=>update({theme:e.target.value as Preferences['theme']})}><option value="academic">日常</option><option value="eye">护眼</option><option value="night">黑夜</option></select></label><label>布局<select aria-label="显示布局" value={preferences.layout} onChange={e=>update({layout:e.target.value as Preferences['layout']})}><option value="standard">标准</option><option value="focus">专注</option><option value="immersive">沉浸</option></select></label><button className="round-action" title="总设置" aria-label="打开总设置" onClick={()=>navigate('/?page=settings')}>⚙</button></div></header>
 <main id="main-content" className="page"><Suspense fallback={<p role="status">正在加载学习工具…</p>}>{!authReady?<p role="status">正在恢复账户会话…</p>:page==='settings'?<GlobalSettings key={section} preferences={preferences} update={update} section={section} session={session} recovery={recovery} onRecovered={()=>setRecovery(false)} navigate={navigate}/>:page==='legacy'?<div className="legacy-modules"><CloudWorkspace key={params.get('panel')} initialPanel={['learn','path','foundation','audio','speech','review','resources','ai'].includes(params.get('panel')||'')?params.get('panel') as 'learn':'resources'} initialCourse={course?.id}/></div>:reader?<CourseReader key={course.id+':'+(session?.user.id||'guest')} course={course} session={session} preferences={preferences} navigate={navigate} tab={params.get('tab')||'read'}/>:params.has('course')?<p role="alert">课程编号不存在。<button onClick={()=>navigate('/')}>返回课程目录</button></p>:page==='speech'?<section className="panel standalone-tool"><h1>跟读练习</h1><p>使用已选的学习偏好：{languageName(preferences.language)}。可在总设置中调整。</p><SpeechPractice language={preferences.language} accessToken={session?.access_token}/></section>:page==='ipa'?<IpaStudio/>:page==='favorites'?<Favorites key={session?.user.id||'guest'} uid={session?.user.id||'guest'} navigate={navigate}/>:page==='personal'&&(import.meta.env.DEV||import.meta.env.VITE_APP_MODE==='personal')?<PersonalHub/>:<CourseCatalog params={params} navigate={navigate}/>}</Suspense>
 {authError&&<p role="status">账户：{authError}；没有验证云端读写。</p>}{notice&&<p role="status">{notice}</p>}<footer className="v44-footer">Language Hub · V4.4　原创初稿仍待教学审校 · 免费基础学习不依赖 AI <a href="/?page=personal">本机个人资料工具</a></footer></main></div></div>;
}
function Favorites({uid,navigate}:{uid:string;navigate:(p:string)=>void}){
 const key='llh-v44-favorites:'+uid;
 const [items,setItems]=useState<{courseId:string;text:string}[]>(()=>{try{const v=JSON.parse(localStorage.getItem(key)||'[]');return Array.isArray(v)?v:[];}catch{return [];}});
 return <section><p className="eyebrow">PERSONAL COLLECTION</p><h1>我的收藏</h1><p>仅保存在当前浏览器，按账户区分；未进行跨设备同步。</p>{items.map((item,i)=><div className="panel favorite-item" key={i}><p>{item.text}</p><button onClick={()=>navigate('/?course='+encodeURIComponent(item.courseId))}>返回课程</button><button onClick={()=>{const next=items.filter((_,n)=>n!==i);setItems(next);try{localStorage.setItem(key,JSON.stringify(next));}catch{}}}>移除</button></div>)}{!items.length&&<p>在课程原文中选择词句，然后点击收藏。</p>}</section>;
}
