import {useEffect,useState} from 'react';
import type {Session} from '@supabase/supabase-js';
import {apiBase,cloudClient} from './v44Connection';

type Item={label:string;state:'ready'|'pending'|'unavailable';detail:string};
type WorkerInfo={ready?:boolean;modules?:Record<string,string>};
type Check={busy:boolean;summary:string;items:Item[]};
const good=(label:string,detail:string):Item=>({label,state:'ready',detail});
const waiting=(label:string,detail:string):Item=>({label,state:'pending',detail});
const failed=(label:string,detail:string):Item=>({label,state:'unavailable',detail});
const text=(e:unknown)=>e instanceof Error?e.message:String(e);

export default function ConnectionStatus({session}:{session:Session|null}){
 const [revision,setRevision]=useState(0);
 const [check,setCheck]=useState<Check>({busy:true,summary:'正在检查云端服务…',items:[]});
 useEffect(()=>{
  let active=true;
  const controller=new AbortController();
  const checks:Item[]=[];
  async function get<T>(path:string):Promise<T>{
   const response=await fetch(apiBase+path,{signal:controller.signal,cache:'no-store',
     headers:session?{Authorization:'Bearer '+session.access_token}:{}});
   const value=await response.json().catch(()=>({})) as T&{error?:string};
   if(!response.ok)throw Error(value.error||'HTTP '+response.status);
   return value;
  }
  async function probe(label:string,fn:()=>Promise<string>):Promise<Item>{
   try{return good(label,await fn());}
   catch(e){return failed(label,text(e));}
  }
  async function inspect(){
   const basic=await probe('公开课程目录',async()=>{
    const status=await get<WorkerInfo>('/v1/status');
    if(!status.ready)throw Error('服务有响应，但数据库配置未就绪');
    const catalog=await get<{courses:unknown[]}>('/v1/courses');
    if(!Array.isArray(catalog.courses))throw Error('返回数据格式不正确');
    return 'API 与数据库连通，读取 '+catalog.courses.length+' 条主课目录';
   });
   checks.push(basic);
   if(!session){
    checks.push(waiting('登录账户与进度','登录后才能读取自己的进度、私有课文和私人音频'));
    checks.push(waiting('基础课与同步','登录后才能检查本人基础课程学习记录'));
   }else{
    const authenticated=await Promise.all([
     probe('云端课程进度',async()=>{
      await get<{progress:unknown}>('/v1/progress/fr-a1-u01');
      return '读取接口可用；实际写入与恢复需以你的测试为准';
     }),
     probe('私人课程正文',async()=>{
      try{
       const result=await get<{lesson?:{course_id?:string}}>('/v1/private-courses/fr-a1-u01');
       return result.lesson?'私人正文读取成功':'接口可访问；未返回正文';
      }catch(e){
       if(text(e)==='lesson_not_synced')return '接口正常，此账户尚未同步该课程';
       throw e;
      }
     }),
     probe('课程音频索引',async()=>{
      const result=await get<{assets?:unknown[];playback_ready?:boolean}>('/v1/audio-index/fr-a1-u01');
      return '读取 '+(result.assets?.length||0)+' 条元数据；不代表音频文件已上传或可播放';
     }),
     probe('基础课程进度',async()=>{
      if(!cloudClient)throw Error('Supabase 客户端未配置');
      const {error}=await cloudClient.from('foundation_progress')
       .select('lesson_id',{head:true,count:'exact'}).eq('user_id',session.user.id);
      if(error)throw Error(error.message);
      return '个人学习记录表可访问；未执行写入';
     }),
     probe('私人音频存储',async()=>{
      if(!cloudClient)throw Error('Supabase 客户端未配置');
      const {data,error}=await cloudClient.storage.from('lesson-audio-private')
       .list(session.user.id,{limit:1});
      if(error)throw Error(error.message);
      return (data?.length?'已发现私人文件':'存储桶可访问，当前列表为空')+'；音频实际试听仍需检查';
     })
    ]);
    checks.push(...authenticated);
   }
   checks.push(good('OpenRouter AI','用户已实测浏览器直连 HTTP 200、Key 验证与一次免费模型生成成功；本页不会再次调用 AI'));
   if(session&&cloudClient){checks.push(await probe('账户设置云端同步',async()=>{
    const {error}=await cloudClient.from('user_settings').select('user_id',{head:true,count:'exact'}).eq('user_id',session.user.id);
    if(error)throw Error(error.message);
    return '个人设置表可读；跨设备保存与密钥恢复仍需本账号实测';
   }));}
   checks.push(waiting('在线 Google Drive 教材','未接入自动读取；目前支持私人课程 ZIP 导入'));
   checks.push(waiting('专业音素评分','未部署可验证的云端声学评分；浏览器跟读仅提供识别反馈'));
   checks.push(waiting('大规模音频播放','音频索引并不等于文件上传、音频审核或实际可播放'));
   if(active)setCheck({busy:false,summary:basic.state==='ready'?'已完成接口状态检查；各服务独立显示结果。':'公开 API 检查失败；请查看下方具体错误。',items:checks});
  }
  setCheck({busy:true,summary:'正在检查云端服务…',items:[]});
  void inspect().catch(e=>{if(active)setCheck({busy:false,summary:'检查中断：'+text(e),items:checks});});
  return ()=>{active=false;controller.abort();};
 },[revision,session?.user.id,session?.access_token]);
 return <section className="cloud-panel" aria-label="云端接口逐项检查">
  <h3>云端接口逐项检查</h3>
  <p role="status">{check.summary}</p>
  <p>当前 API：{apiBase==='/api'?'本站同源 /api':'独立 Worker'}；状态来自只读请求或实际代码能力，不代表全部完成验收。</p>
  <ul>
   {check.items.map(item=><li key={item.label}>
     <strong>{item.label}：</strong>
     {item.state==='ready'?'已连接':item.state==='unavailable'?'未通过':'待接线／待验收'}
     {' · '+item.detail}
   </li>)}
  </ul>
  <button type="button" disabled={check.busy} onClick={()=>setRevision(n=>n+1)}>
   {check.busy?'正在检查…':'重新检查云端接口'}
  </button>
  <p className="cloud-disclaimer">不会执行写入、上传、模型调用或麦克风录音；密钥和个人正文不会显示在检查结果中。</p>
 </section>;
}
