import {lazy,Suspense,useEffect,useState,type CSSProperties} from 'react';
import type {Session} from '@supabase/supabase-js';
import CourseCatalog from './CourseCatalog';
import CourseReader from './CourseReader';
import GlobalSettings from './GlobalSettings';
import {COURSES,languageName} from './v44Courses';
import {readRoute,routePage,routeCrumbs,parentRoute} from './v44Routes';
import {readPreferences,cleanPreferences,persistPreferences,type Preferences} from './v44Preferences';
import {cloudClient} from './v44Connection';
import {readLocalFavorites,saveLocalFavorites,mergeFavorites,type FavoriteSelection} from './favoritesCloud';
import {useAISettings} from './AISettings';
import {setRuntimeSpeechEndpoint} from './speechEngines';
import {clearDriveTokensForUser} from './googleDriveClient';
import {useUserCloudSettings} from './useUserCloudSettings';
import './cloud.css';
import './v44.css';
import './v44Integration.css';
import './readingLayoutV45.css';
import './frontendSystemPolish.css';
const CloudWorkspace=lazy(()=>import('./CloudWorkspace'));
const PersonalHub=lazy(()=>import('./PersonalHub'));
const SpeechLab=lazy(()=>import('./SpeechLab'));
const IpaStudio=lazy(()=>import('./IpaStudio'));
export default function AppShell(){
 const [route,setRoute]=useState(()=>readRoute(location.href));
 const [preferences,setPreferences]=useState(readPreferences);
 const [compactViewport,setCompactViewport]=useState(()=>window.innerWidth<=850);
 const [session,setSession]=useState<Session|null>(null),[authReady,setAuthReady]=useState(!cloudClient),[authError,setAuthError]=useState('');
 const [notice,setNotice]=useState('');
 const [navOpen,setNavOpen]=useState(false);
 useEffect(()=>{const onResize=()=>setCompactViewport(window.innerWidth<=850);window.addEventListener('resize',onResize);return()=>window.removeEventListener('resize',onResize);},[]);
 const {clear}=useAISettings();
  const {sync:settingsSync,errorDetail:settingsError}=useUserCloudSettings(session,preferences,setPreferences);
 const params=route.params,course=COURSES.find(c=>c.id===params.get('course'));
 const page=routePage(route);
 const reader=course&&page!=='legacy';
 const section=params.get('section')||'appearance';
 function navigate(url:string){setNavOpen(false);history.pushState({},'',url);setRoute(readRoute(location.href));window.scrollTo({top:0});}
 useEffect(()=>{const pop=()=>setRoute(readRoute(location.href));window.addEventListener('popstate',pop);window.addEventListener('hashchange',pop);return ()=>{window.removeEventListener('popstate',pop);window.removeEventListener('hashchange',pop);};},[]);
 useEffect(()=>{
  if(!cloudClient)return;let alive=true;
  void cloudClient.auth.getSession().then(({data,error})=>{if(alive){setSession(data.session);setAuthReady(true);if(error)setAuthError(error.message);}}).catch(()=>{if(alive){setAuthReady(true);setAuthError('账户连接暂不可用。');}});
  const {data}=cloudClient.auth.onAuthStateChange((event,next)=>{
   setSession(previous=>{
      if(previous?.user.id!==next?.user.id){
       clear();
       if(previous?.user.id)clearDriveTokensForUser(previous.user.id);
      }
      return next;
    });setAuthReady(true);if(event==='SIGNED_OUT')clear();
   
  });return ()=>{alive=false;data.subscription.unsubscribe();};
 },[]);
 useEffect(()=>{
  document.body.dataset.theme=preferences.theme;document.body.dataset.viewMode=preferences.layout;
   setRuntimeSpeechEndpoint(preferences.speechApiUrl);
  if(!persistPreferences(preferences))setNotice('浏览器不允许保存外观偏好；当前会话仍可使用。');
 },[preferences]);
 useEffect(()=>{
  const close=(e:KeyboardEvent)=>{if(e.key==='Escape')setNavOpen(false);};
  document.addEventListener('keydown',close);
  return()=>document.removeEventListener('keydown',close);
 },[]);
 function toggleNavigation(){
  if(preferences.layout!=='standard'||compactViewport){setNavOpen(old=>!old);}
  else{setNavOpen(false);update({sidebar:!preferences.sidebar});}
 }
 function update(p:Partial<Preferences>){
  if(p.layout&&p.layout!==preferences.layout)setNavOpen(false);
  setPreferences(old=>cleanPreferences({...old,...p}));
 }
 const crumbs=routeCrumbs(route),parent=parentRoute(route);
 return <div className={'v44 view-root'+(!preferences.sidebar?' rail-collapsed':'')+(navOpen?' nav-drawer-open':'')} style={{'--readerWidth':preferences.readerWidth+'px','--reading-size':preferences.fontSize+'px','--reading-font':preferences.serif?'Georgia, "Noto Serif SC", serif':'inherit'} as CSSProperties}><a className="skip-link" href="#main-content">跳至主要内容</a>
 {navOpen&&<button className="navigation-backdrop" type="button" tabIndex={-1}
  aria-label="关闭导航菜单" onClick={()=>setNavOpen(false)}/>}
 <aside className="rail" aria-label="主导航" id="global-navigation"><a className="rail-head" href="/" onClick={e=>{e.preventDefault();navigate('/');}}><span className="brand-symbol">L</span><span className="brand-name">Language Hub</span></a><div className="rail-group"><p className="rail-overline">你的学习空间</p>{[['/','▤','课程目录'],['/speech-lab','◉','跟读练习'],['/?page=ipa','ə','全文 IPA'],['/?page=favorites','◇','我的收藏'],['/cloud?panel=resources','▱','资料与导入'],['/cloud?panel=audio','♫','课程音频'],['/cloud?panel=foundation','◎','基础专项训练']].map(([url,icon,label])=><a className="nav-item" href={url} key={url} onClick={e=>{e.preventDefault();navigate(url);}}><span className="nav-icon">{icon}</span><span>{label}</span></a>)}</div><div className="rail-bottom"><a className="nav-item" href="/?page=settings&section=account" onClick={e=>{e.preventDefault();navigate('/?page=settings&section=account');}}>◯　{session?'我的账户':'登录'}</a><a className="nav-item" href="/?page=settings" onClick={e=>{e.preventDefault();navigate('/?page=settings');}}>⚙　总设置</a></div></aside>
 <div className="work"><header className="topbar"><div className="header-left"><button className="round-action" aria-label="切换导航栏" aria-controls="global-navigation" aria-expanded={navOpen||(preferences.sidebar&&preferences.layout==='standard'&&!compactViewport)}
 onClick={toggleNavigation}>☰</button><button className="round-action" aria-label="返回上一层" disabled={!parent} onClick={()=>{if(parent)navigate(parent);}}>←</button><nav className="breadcrumbs" aria-label="面包屑">{crumbs.map((c,i)=><span key={i}><a href={c.url} onClick={e=>{e.preventDefault();navigate(c.url);}} aria-current={i===crumbs.length-1?'page':undefined}>{c.label}</a>{i<crumbs.length-1&&' › '}</span>)}</nav></div><div className="topbar-right"><label>外观<select aria-label="网站外观" value={preferences.theme} onChange={e=>update({theme:e.target.value as Preferences['theme']})}><option value="academic">日常</option><option value="eye">护眼</option><option value="night">黑夜</option></select></label><label>布局<select aria-label="显示布局" value={preferences.layout} onChange={e=>update({layout:e.target.value as Preferences['layout']})}><option value="standard">标准</option><option value="focus">专注</option><option value="immersive">沉浸</option></select></label><button className="round-action" title="总设置" aria-label="打开总设置" onClick={()=>navigate('/?page=settings')}>⚙</button></div></header>
 <main id="main-content" className="page"><Suspense fallback={<p role="status">正在加载学习工具…</p>}>{!authReady?<p role="status">正在恢复账户会话…</p>:page==='settings'?<GlobalSettings key={section} preferences={preferences} update={update} section={section} session={session} settingsSync={settingsSync} settingsError={settingsError} navigate={navigate}/>:page==='legacy'?<div className="legacy-modules"><CloudWorkspace key={params.get('panel')} initialPanel={['learn','path','foundation','audio','speech','review','resources','ai'].includes(params.get('panel')||'')?params.get('panel') as 'learn':'resources'} initialCourse={course?.id}/></div>:reader?<CourseReader key={course.id+':'+(session?.user.id||'guest')} course={course} session={session} preferences={preferences} onFontChange={fontSize=>update({fontSize})} navigate={navigate} tab={params.get('tab')||'read'}/>:params.has('course')?<p role="alert">课程编号不存在。<button onClick={()=>navigate('/')}>返回课程目录</button></p>:page==='speech'?<SpeechLab language={preferences.language} session={session}/>:page==='ipa'?<IpaStudio/>:page==='favorites'?<Favorites key={session?.user.id||'guest'} uid={session?.user.id||'guest'} session={session} navigate={navigate}/>:page==='personal'&&(import.meta.env.DEV||import.meta.env.VITE_APP_MODE==='personal')?<PersonalHub/>:<CourseCatalog params={params} navigate={navigate}/>}</Suspense>
 {authError&&<p role="status">账户：{authError}；没有验证云端读写。</p>}{notice&&<p role="status">{notice}</p>}</main></div></div>;
}
function Favorites({uid,session,navigate}:{uid:string;session:Session|null;navigate:(p:string)=>void}){
 const [items,setItems]=useState<FavoriteSelection[]>(()=>readLocalFavorites(uid));
 const [pending,setPending]=useState(Boolean(session));
 const [message,setMessage]=useState(session?'正在恢复云端收藏…':'访客收藏仅在当前设备。');
 useEffect(()=>{
  let active=true;
  if(!session||!cloudClient){setItems(readLocalFavorites(uid));setPending(false);return;}
  const client=cloudClient,userId=session.user.id;
  setPending(true);
  void (async()=>{
   const {data,error}=await client.from('user_favorites')
    .select('id,course_id,selection_text').eq('user_id',userId)
    .order('created_at',{ascending:false}).limit(500);
   if(error)throw error;
   if(!active)return;
   const local=readLocalFavorites(uid);
   let remote:FavoriteSelection[]=(data||[]).map(x=>({id:x.id,courseId:x.course_id,text:x.selection_text}));
   const missing=local.filter(x=>!remote.some(r=>r.courseId===x.courseId&&r.text===x.text));
   let failures=0;
   for(const item of missing){
    if(!active)break;
    const {data:added,error:uploadError}=await client.from('user_favorites')
     .insert({user_id:userId,course_id:item.courseId,selection_text:item.text})
     .select('id,course_id,selection_text').maybeSingle();
    if(uploadError&&uploadError.code!=='23505')failures++;
    if(added)remote=[{id:added.id,courseId:added.course_id,text:added.selection_text},...remote];
   }
   if(!active)return;
   setItems(mergeFavorites(local,remote));
   setMessage(failures?'部分本机收藏同步失败；原内容仍保留在本机。':'已读取账户收藏'+(missing.length?'并尝试同步本机历史收藏。':'。'));
   setPending(false);
  })().catch((error:unknown)=>{
   if(active){setItems(readLocalFavorites(uid));setPending(false);setMessage('云端收藏读取失败，本机收藏仍在：'+(error instanceof Error?error.message:'请稍后重试'));}
  });
  return()=>{active=false;};
 },[uid,session?.user.id]);
 async function remove(item:FavoriteSelection){
  if(pending)return;
  setPending(true);
  if(session&&cloudClient&&item.id){
   const {error}=await cloudClient.from('user_favorites').delete().eq('id',item.id).eq('user_id',uid);
   if(error){setMessage('云端删除失败，收藏仍保留：'+error.message);setPending(false);return;}
  }
  const next=items.filter(x=>!(x.courseId===item.courseId&&x.text===item.text));
  setItems(next);saveLocalFavorites(uid,next);setPending(false);
  setMessage(session?'已移除该收藏。':'已从本机移除。');
 }
 return <section><p className="eyebrow">PERSONAL COLLECTION</p><h1>我的收藏</h1>
  <p>{session?'已登录：收藏跟随 Supabase 账户跨设备同步；现有本机条目不会被覆盖。':'访客收藏仅保存在当前设备，登录后会尝试补齐到云端。'}</p>
  <p role="status">{message}</p>
  {items.map((item,i)=><div className="panel favorite-item" key={item.id||item.courseId+':'+i}>
   <p>{item.text}</p>
   <button onClick={()=>navigate('/?course='+encodeURIComponent(item.courseId))}>返回课程</button>
   <button disabled={pending} onClick={()=>void remove(item)}>移除</button>
  </div>)}
  {!items.length&&!pending&&<p>在课程原文中选择词句，然后点击收藏。</p>}
 </section>;
}
