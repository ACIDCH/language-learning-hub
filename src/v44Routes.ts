import {COURSES,catalogRoute,courseRoute,languageName} from './v44Courses';

export function readRoute(href:string){
 const u=new URL(href,'https://language-hub.invalid');
 return {path:u.pathname,params:u.searchParams,hash:u.hash};
}
export type Route=ReturnType<typeof readRoute>;
export function routePage({path,params,hash}:Route){
 if(path.replace(/\/$/,'')==='/speech-lab'&&hash==='#ipa-studio')return 'ipa';
 return params.get('page')||(path.replace(/\/$/,'')==='/speech-lab'?'speech':
  (path==='/cloud'||path.startsWith('/cloud/'))&&params.has('panel')?'legacy':'catalog');
}
export function routeCrumbs(route:Route){
 const {params}=route,page=routePage(route),course=COURSES.find(c=>c.id===params.get('course'));
 const crumbs=[{label:'课程目录',url:'/'}];
 if(course&&page!=='legacy'&&page!=='settings'){
  crumbs.push({label:languageName(course.language),url:catalogRoute(course.language)},
   {label:course.track,url:catalogRoute(course.language,course.track)},
   {label:course.title+' · 阅读',url:courseRoute(course)});
  const tab=params.get('tab');
  if(tab==='speech'||tab==='ipa')crumbs.push({label:tab==='speech'?'跟读':'全文 IPA',url:courseRoute(course,tab)});
 }else if(page==='catalog'){
  const language=params.get('language')||'',track=params.get('track')||'';
  if(language)crumbs.push({label:languageName(language),url:catalogRoute(language)});
  if(track)crumbs.push({label:track,url:catalogRoute(language,track)});
 }else if(page==='settings'){
  crumbs.push({label:'总设置',url:'/?page=settings'});
  const section=params.get('section');
  if(section)crumbs.push({label:({appearance:'外观',learning:'学习偏好',ai:'AI 助学',account:'账户与同步'} as Record<string,string>)[section]||'设置',url:'/?page=settings&section='+encodeURIComponent(section)});
 }else{
  crumbs.push({label:page==='speech'?'跟读练习':page==='ipa'?'全文 IPA':page==='favorites'?'收藏':'资料与云端',url:route.path+(params.size?'?'+params:'')+route.hash});
 }
 return crumbs;
}
// The button and breadcrumbs share exactly the same hierarchy. Root has no parent.
export function parentRoute(route:Route){const crumbs=routeCrumbs(route);return crumbs.length>1?crumbs[crumbs.length-2].url:null;}
