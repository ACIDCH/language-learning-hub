import {useEffect,useState} from 'react';
import type {Session,SupabaseClient} from '@supabase/supabase-js';
import {
 clearDriveToken,driveFileKind,getDriveToken,googleIdentity,listDriveFiles,loadGIS,
 readDriveFile,requestDriveToken,searchDriveFiles,storeDriveToken,validDriveFolderId,
 validGoogleClientId,type DriveBinding,type DriveFile,type DriveProfile
} from './googleDriveClient';

type Props={client:SupabaseClient;session:Session;courseId:string;mode:'resources'|'audio'};
const configuredClientId=(import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID||'').trim();
export default function DriveLibrary({client,session,courseId,mode}:Props){
 const uid=session.user.id;
 const [clientId,setClientId]=useState(configuredClientId);
 const [profiles,setProfiles]=useState<DriveProfile[]>([]);
 const [subject,setSubject]=useState('');
 const [folder,setFolder]=useState('root');
 const [browse,setBrowse]=useState('root');
 const [files,setFiles]=useState<DriveFile[]>([]);
 const [search,setSearch]=useState(courseId);
 const [nextPage,setNextPage]=useState('');
 const [bindings,setBindings]=useState<DriveBinding[]>([]);
 const [selected,setSelected]=useState<DriveFile|null>(null);
 const [text,setText]=useState('');
 const [audioUrl,setAudioUrl]=useState('');
 const [status,setStatus]=useState('正在读取账户关联的云盘设置…');
 const [playing,setPlaying]=useState('');
 const [busy,setBusy]=useState(false);
 const [gisReady,setGisReady]=useState(false);
 const profile=profiles.find(p=>p.google_subject===subject);
 const token=subject?getDriveToken(uid,subject):null;
 const current=bindings.filter(x=>x.google_subject===subject&&x.course_id===courseId);
 const boundText=current.find(x=>x.kind==='lesson');
 const boundAudio=current.find(x=>x.kind==='audio');
 useEffect(()=>{
  let alive=true;
  void loadGIS().then(()=>{if(alive)setGisReady(true);})
   .catch(e=>{if(alive)setStatus('Google 登录组件不可用：'+(e instanceof Error?e.message:String(e)));});
  return()=>{alive=false;};
 },[]);
 useEffect(()=>{
  let alive=true;
  void (async()=>{
   const [settings,accounts,maps]=await Promise.all([
    client.from('user_drive_settings').select('oauth_client_id,active_subject').eq('user_id',uid).maybeSingle(),
    client.from('user_drive_profiles').select('google_subject,email,folder_id,label').eq('user_id',uid),
    client.from('user_drive_bindings').select('google_subject,course_id,kind,file_id,file_name,mime_type').eq('user_id',uid)
   ]);
   if(settings.error||accounts.error||maps.error)throw Error(settings.error?.message||accounts.error?.message||maps.error?.message);
   if(!alive)return;
   const ps=(accounts.data||[]) as DriveProfile[];
   setProfiles(ps);setBindings((maps.data||[]) as DriveBinding[]);
   setClientId(settings.data?.oauth_client_id||configuredClientId);
   const active=ps.find(x=>x.google_subject===settings.data?.active_subject)||ps[0];
   if(active){setSubject(active.google_subject);setFolder(active.folder_id);setBrowse(active.folder_id);}
   setStatus(ps.length?'已恢复 '+ps.length+' 个 Google Drive 来源配置。使用前请确认此浏览器已授权相应账号。':'尚无 Google Drive 授权配置；可连接任意自己的账号，随后随时更换。');
  })().catch(e=>{if(alive)setStatus('云盘配置读取失败：'+(e instanceof Error?e.message:String(e)));});
  return()=>{alive=false;};
 },[client,uid]);
 useEffect(()=>()=>{if(audioUrl)URL.revokeObjectURL(audioUrl);},[audioUrl]);
 useEffect(()=>{setSelected(null);setText('');setPlaying('');setAudioUrl('');},[subject,courseId]);
 async function persistSettings(nextId=clientId,nextSubject=subject){
  const {error}=await client.from('user_drive_settings').upsert({
   user_id:uid,oauth_client_id:nextId.trim(),active_subject:nextSubject,
   updated_at:new Date().toISOString()
  },{onConflict:'user_id'});
  if(error)throw Error(error.message);
 }
 async function saveClientId(){
  if(!validGoogleClientId(clientId)){setStatus('OAuth 客户端 ID 格式不正确，需 Google Cloud 网页应用 OAuth Client ID。');return;}
  setBusy(true);
  try{await persistSettings();setStatus('OAuth 公共客户端 ID 已保存到本人的 Supabase 账户；没有保存 Google 令牌。');}
  catch(e){setStatus('保存失败：'+String(e));}
  finally{setBusy(false);}
 }
 async function connectGoogle(){
  if(!gisReady||!validGoogleClientId(clientId)){setStatus('请先保存合法的 Google OAuth 客户端 ID，并允许 Google 登录组件加载。');return;}
  setBusy(true);setStatus('等待 Google 账号选择和只读授权…');
  try{
   // GIS prompt happens from the click handler; never hand Google a Supabase token.
   const auth=await requestDriveToken(clientId);
   const identity=await googleIdentity(auth.token);
   storeDriveToken(uid,identity.sub,auth.token,auth.expiresIn);
   const current=profiles.find(p=>p.google_subject===identity.sub);
   const next:DriveProfile=current||{google_subject:identity.sub,email:identity.email,folder_id:'root',label:''};
   const {error}=await client.from('user_drive_profiles').upsert({
    user_id:uid,google_subject:identity.sub,email:identity.email,
    folder_id:next.folder_id,label:next.label,updated_at:new Date().toISOString()
   },{onConflict:'user_id,google_subject'});
   if(error)throw Error(error.message);
   setProfiles(ps=>[...ps.filter(p=>p.google_subject!==identity.sub),{...next,email:identity.email}]);
   setSubject(identity.sub);setFolder(next.folder_id);setBrowse(next.folder_id);
   await persistSettings(clientId,identity.sub);
   setStatus('已授权 '+identity.email+' 的只读 Drive。可随时切换 Google 账户或根文件夹。');
   await loadFolder(next.folder_id,auth.token);
  }catch(e){setStatus('Google Drive 授权未完成：'+(e instanceof Error?e.message:String(e)));}
  finally{setBusy(false);}
 }
 async function loadFolder(id=browse,access=token,pageToken=''){
  if(!access){setStatus('当前云盘尚未在本浏览器授权。点击「连接／更换 Google 账户」。');return;}
  if(!validDriveFolderId(id)){setStatus('请使用合法的 Google Drive 文件夹 ID，或 root。');return;}
  setBusy(true);
  try{
   const data=await listDriveFiles(access,id,pageToken);
   setFiles(old=>pageToken?[...old,...data.files]:data.files);
   setNextPage(data.nextPageToken||'');setBrowse(id);
   setStatus('Google Drive 实际返回 '+data.files.length+' 条素材'+(data.nextPageToken?'；还有下一页':'')+'。');
  }catch(e){setStatus('无法读取 Google Drive 文件夹：'+(e instanceof Error?e.message:String(e)));}
  finally{setBusy(false);}
 }
 async function searchFiles(){
  if(!token){setStatus('请先授权所选 Google 账号。');return;}
  setBusy(true);
  try{
   const rows=await searchDriveFiles(token,search);
   setFiles(rows);setNextPage('');setStatus('Google Drive 跨文件夹搜索返回 '+rows.length+' 个结果；请打开或关联所需文件。');
  }catch(e){setStatus('搜索 Google Drive 失败：'+(e instanceof Error?e.message:String(e)));}
  finally{setBusy(false);}
 }
 async function setRoot(){
  if(!profile||!validDriveFolderId(folder)){setStatus('请输入有效文件夹 ID');return;}
  setBusy(true);
  const {error}=await client.from('user_drive_profiles').update({folder_id:folder,updated_at:new Date().toISOString()})
   .eq('user_id',uid).eq('google_subject',subject);
  if(error)setStatus('切换根目录失败：'+error.message);
  else{
   setProfiles(ps=>ps.map(p=>p.google_subject===subject?{...p,folder_id:folder}:p));
   setStatus('已保存该账户的新教材根目录；历史课程与个人学习数据未更改。');
   await loadFolder(folder);
  }
  setBusy(false);
 }
 async function switchProfile(next:string){
  const p=profiles.find(x=>x.google_subject===next);
  if(!p)return;
  setSubject(next);setFolder(p.folder_id);setBrowse(p.folder_id);
  setFiles([]);setNextPage('');
  try{await persistSettings(clientId,next);}
  catch(e){setStatus('切换来源时云端记录失败：'+String(e));return;}
  const access=getDriveToken(uid,next);
  if(access)void loadFolder(p.folder_id,access);
  else setStatus('已切换到 '+p.email+'。该 Google 账号需在此浏览器重新授权（不会丢失课程关联）。');
 }
 async function bind(file:DriveFile,kind:'lesson'|'audio'){
  if(!subject)return;
  const {error}=await client.from('user_drive_bindings').upsert({
   user_id:uid,google_subject:subject,course_id:courseId,kind,
   file_id:file.id,file_name:file.name,mime_type:file.mimeType,updated_at:new Date().toISOString()
  },{onConflict:'user_id,google_subject,course_id,kind'});
  if(error){setStatus('保存课程映射失败：'+error.message);return;}
  const next:DriveBinding={google_subject:subject,course_id:courseId,kind,file_id:file.id,file_name:file.name,mime_type:file.mimeType};
  setBindings(old=>[...old.filter(x=>!(x.google_subject===subject&&x.course_id===courseId&&x.kind===kind)),next]);
  setStatus('已将 '+file.name+' 关联至 '+courseId+'；只保存文件 ID，不复制或覆盖教材正文。');
 }
 async function openFile(file:DriveFile){
  if(!token){setStatus('请先重新授权该 Google Drive 账号');return;}
  setSelected(file);setText('');setAudioUrl('');setPlaying('');setBusy(true);
  try{
   const result=await readDriveFile(token,file);
   if(result.text!==undefined){setText(result.text);setStatus('已从 Drive 实时读取文本（只读），未替换 Supabase 现有教材。');}
   else if(result.audio){setAudioUrl(URL.createObjectURL(result.audio));setStatus('已下载音频到浏览器内存，请点击播放；尚未确认可解码或已发声。');}
  }catch(e){setStatus('素材读取失败：'+(e instanceof Error?e.message:String(e)));}
  finally{setBusy(false);}
 }
 async function openBound(kind:'lesson'|'audio'){
  const b=kind==='lesson'?boundText:boundAudio;
  if(!b)return;
  await openFile({id:b.file_id,name:b.file_name,mimeType:b.mime_type});
 }
 async function removeSource(){
  if(!profile)return;
  // This unlinks the Drive account from Hub; it does not delete any Google file.
  const {error}=await client.from('user_drive_profiles').delete()
   .eq('user_id',uid).eq('google_subject',subject);
  if(error){setStatus('移除关联失败：'+error.message);return;}
  clearDriveToken(uid,subject);
  const next=profiles.filter(x=>x.google_subject!==subject);
  setProfiles(next);setBindings(b=>b.filter(x=>x.google_subject!==subject));
  const nextSubject=next[0]?.google_subject||'';
  setSubject(nextSubject);setFiles([]);setFolder(next[0]?.folder_id||'root');
  await persistSettings(clientId,nextSubject).catch(()=>setStatus('已移除账户关联；更新首选项失败'));
  setStatus('仅移除 Hub 内的 Google Drive 关联与该账号的课程绑定，原 Drive 文件及已入库教材未删除。');
 }
 return <section className="cloud-reader" aria-label="可切换 Google Drive 在线教材">
  <h3>在线 Google Drive 教材与音频 · 多账户可切换</h3>
  <p className="cloud-disclaimer">Drive 是可替换的来源而不是唯一数据库。采用 Google 官方只读 OAuth，按需取得原文件；学习记录仍在 Supabase。每个 Google 账号可配置不同根目录和单课教材/音频映射。云端仅保存文件 ID 与连接设置，OAuth 令牌不会入库。</p>
  <div className="cloud-fields">
   <label>Google OAuth 网页客户端 ID（公开配置，首次填写）
    <input value={clientId} onChange={e=>setClientId(e.target.value.trim())} placeholder="123456789-...apps.googleusercontent.com"/>
   </label>
   <button type="button" disabled={busy} onClick={()=>void saveClientId()}>保存 OAuth 应用配置到本人账户</button>
   <button type="button" disabled={busy||!gisReady||!validGoogleClientId(clientId)} onClick={()=>void connectGoogle()}>连接／更换 Google 账户（只读授权）</button>
   {!validGoogleClientId(clientId)&&<p className="cloud-disclaimer">需要在 Google Cloud 创建 Web OAuth Client，允许本站预览 Origin，并启用 Drive API。Google Drive 聊天连接器的授权不能自动成为本网站的 OAuth 凭据。</p>}
   <label>当前 Drive 来源<select value={subject} onChange={e=>void switchProfile(e.target.value)}>
    <option value="">选择 Google 账号</option>
    {profiles.map(p=><option key={p.google_subject} value={p.google_subject}>{p.label||p.email}</option>)}
   </select></label>
   {profile&&<><p>账号：{profile.email} · {token?'本次浏览器授权有效':'本次浏览器尚未授权'}</p>
    <label>该账号教材根文件夹 ID（可随时替换）
     <input value={folder} onChange={e=>setFolder(e.target.value.trim())} placeholder="root 或 Drive 文件夹 ID"/>
    </label>
    <button type="button" disabled={busy} onClick={()=>void setRoot()}>保存并切换教材根目录</button>
    <button type="button" disabled={busy} onClick={()=>void removeSource()}>取消关联当前云盘（不删除 Drive 文件）</button>
   </>}
   <p role="status">{status}</p>
  </div>
  {profile&&token&&<div className="cloud-fields">
   <label>在该 Google 账号内搜索课程文件（包括子文件夹）
    <input value={search} onChange={e=>setSearch(e.target.value)} placeholder={courseId||'课程 ID 或文件名'}/>
   </label>
   <button type="button" disabled={busy||search.trim().length<2} onClick={()=>void searchFiles()}>跨文件夹搜索</button>
   <p>当前浏览目录：{browse} <button type="button" disabled={busy} onClick={()=>void loadFolder(profile.folder_id)}>回到教材根目录</button></p>
   {files.map(file=>{
    const kind=driveFileKind(file);
    return <div key={file.id} className="cloud-flex">
     <span>{kind==='folder'?'📁 ':kind==='audio'?'♫ ':'▤ '}{file.name}</span>
     {kind==='folder'?<button type="button" onClick={()=>void loadFolder(file.id)}>打开文件夹</button>:
      kind!=='unsupported'?<>
       <button type="button" disabled={busy} onClick={()=>void openFile(file)}>在线读取／播放</button>
       <button type="button" disabled={busy||!courseId} onClick={()=>void bind(file,kind)}>关联本课</button>
      </>:<small>此格式保留官方查看，不伪称可解析</small>}
    </div>;
   })}
   {nextPage&&<button type="button" disabled={busy} onClick={()=>void loadFolder(browse,token,nextPage)}>加载下一页</button>}
  </div>}
  <div className="cloud-fields">
   <p>当前课程：{courseId||'未选择'} · 在线课文：{boundText?.file_name||'未绑定'} · 在线音频：{boundAudio?.file_name||'未绑定'}</p>
   {boundText&&<button type="button" disabled={busy||!token} onClick={()=>void openBound('lesson')}>读取本课已绑定 Drive 教材</button>}
   {boundAudio&&<button type="button" disabled={busy||!token} onClick={()=>void openBound('audio')}>播放本课已绑定 Drive 音频</button>}
  </div>
  {text&&<details open><summary>在线 Google Drive 全文（仅浏览器临时读取）</summary>
   <pre className="lesson-paragraphs" style={{whiteSpace:'pre-wrap',overflowWrap:'anywhere'}}>{text}</pre>
  </details>}
  {selected&&audioUrl&&<div className="audio-player">
   <strong>{selected.name}</strong>
   <audio controls preload="metadata" src={audioUrl}
    onCanPlay={()=>setPlaying('浏览器已成功解码音频，点击播放确认发声。')}
    onPlaying={()=>setPlaying('浏览器已开始播放此 Drive 音频，请确认实际能听到声音。')}
    onEnded={()=>setPlaying('浏览器已播放至音频结尾，试听内容仍需人工核验。')}
    onError={()=>setPlaying('真实播放失败，请重新授权或替换该文件。')}/>
   <p role="status">{playing||'尚未实际播放。'}</p>
  </div>}
 </section>;
}
