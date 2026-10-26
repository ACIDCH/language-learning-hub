/** Google Drive REST v3; all OAuth access tokens stay in this JS module's memory. */
export type DriveFile={id:string;name:string;mimeType:string;size?:string;webViewLink?:string;capabilities?:{canDownload?:boolean}};
export type DriveProfile={google_subject:string;email:string;folder_id:string;label:string};
export type DriveBinding={google_subject:string;course_id:string;kind:'lesson'|'audio';file_id:string;file_name:string;mime_type:string};
type GoogleTokenReply={access_token?:string;expires_in?:number;error?:string};
type GoogleClient={requestAccessToken:(options:{prompt:string})=>void};
type GIS={accounts:{oauth2:{initTokenClient:(options:{client_id:string;scope:string;callback:(r:GoogleTokenReply)=>void;error_callback?:(e:unknown)=>void})=>GoogleClient}}};
const CLIENT_ID_RE=/^[0-9]+-[a-z0-9_-]+\.apps\.googleusercontent\.com$/i;
export function validGoogleClientId(raw:string){return CLIENT_ID_RE.test(raw.trim());}
export function validDriveFolderId(raw:string){return raw==='root'||/^[\w-]{10,200}$/.test(raw);}
export function driveFileKind(file:DriveFile):'folder'|'lesson'|'audio'|'unsupported' {
 const n=file.name.toLowerCase();
 if(file.mimeType==='application/vnd.google-apps.folder')return 'folder';
 if(file.mimeType==='application/pdf'||/\.pdf$/i.test(n)||file.mimeType==='application/vnd.google-apps.document'||/\.(md|txt|text|srt|vtt)$/i.test(n)||file.mimeType.startsWith('text/'))return 'lesson';
 if(/\.(mp3|wav|m4a|ogg|webm)$/i.test(n)||file.mimeType.startsWith('audio/'))return 'audio';
 return 'unsupported';
}
export async function loadGIS():Promise<void>{
 if(getGIS())return;
 await new Promise<void>((resolve,reject)=>{
  const script=document.createElement('script');
  script.src='https://accounts.google.com/gsi/client';script.async=true;
  script.onload=()=>getGIS()?resolve():reject(Error('Google 登录组件未初始化'));
  script.onerror=()=>reject(Error('无法加载 Google 登录组件，请检查网络或浏览器拦截'));
  document.head.appendChild(script);
 });
}
function getGIS():GIS|null {return (window as Window & {google?:GIS}).google||null;}
const memory=new Map<string,{token:string;expiry:number}>();
export function storeDriveToken(uid:string,subject:string,token:string,expirySeconds=3500){
 memory.set(uid+':'+subject,{token,expiry:Date.now()+Math.max(30,expirySeconds-60)*1000});
}
export function getDriveToken(uid:string,subject:string):string|null {
 const v=memory.get(uid+':'+subject);
 if(!v||Date.now()>v.expiry){memory.delete(uid+':'+subject);return null;}
 return v.token;
}
export function clearDriveToken(uid:string,subject:string){memory.delete(uid+':'+subject);}
export function clearDriveTokensForUser(uid:string){
 for(const key of memory.keys())if(key.startsWith(uid+':'))memory.delete(key);
}
export async function requestDriveToken(clientId:string):Promise<{token:string;expiresIn:number}>{
 if(!validGoogleClientId(clientId))throw Error('请填写有效的 Google OAuth 网页客户端 ID');
 const gis=getGIS();if(!gis)throw Error('Google 登录组件仍未加载');
 return new Promise((resolve,reject)=>{
  const client=gis.accounts.oauth2.initTokenClient({
   client_id:clientId,
   scope:'https://www.googleapis.com/auth/drive.readonly https://www.googleapis.com/auth/userinfo.email',
   callback:r=>r.access_token?resolve({token:r.access_token,expiresIn:r.expires_in||3600}):reject(Error(r.error||'Google 授权取消')),
   error_callback:()=>reject(Error('Google 授权窗口无法完成；请检查弹窗与 OAuth 授权来源'))
  });
  client.requestAccessToken({prompt:'select_account'});
 });
}
async function googleFetch(token:string,url:string):Promise<Response>{
 const response=await fetch(url,{headers:{Authorization:'Bearer '+token},cache:'no-store'});
 if(response.status===401)throw Error('Google 授权已过期，请重新选择账号授权');
 if(!response.ok){
  const data=await response.json().catch(()=>({})) as {error?:{message?:string}};
  throw Error('Google Drive HTTP '+response.status+(data.error?.message?'：'+data.error.message:''));
 }
 return response;
}
export async function googleIdentity(token:string):Promise<{sub:string;email:string}>{
 const response=await googleFetch(token,'https://www.googleapis.com/oauth2/v3/userinfo');
 const data=await response.json() as {sub?:string;email?:string};
 if(!data.sub||!data.email)throw Error('Google 未返回账户标识与邮箱');
 return {sub:data.sub,email:data.email};
}
export async function listDriveFiles(token:string,folder:string,pageToken=''):Promise<{files:DriveFile[];nextPageToken?:string}>{
 if(!validDriveFolderId(folder))throw Error('Google Drive 文件夹 ID 格式不正确');
 const url=new URL('https://www.googleapis.com/drive/v3/files');
 url.searchParams.set('q',"'"+folder+"' in parents and trashed = false");
 url.searchParams.set('fields','nextPageToken,files(id,name,mimeType,size,webViewLink,capabilities(canDownload))');
 url.searchParams.set('pageSize','100');url.searchParams.set('orderBy','folder,name');
 url.searchParams.set('supportsAllDrives','true');url.searchParams.set('includeItemsFromAllDrives','true');
 if(pageToken)url.searchParams.set('pageToken',pageToken);
 const response=await googleFetch(token,url.toString());
 const data=await response.json() as {files?:DriveFile[];nextPageToken?:string};
 return {files:data.files||[],nextPageToken:data.nextPageToken};
}
export async function readDriveFile(token:string,file:DriveFile):Promise<{text?:string;audio?:Blob;pdf?:Blob}>{
 if(file.capabilities?.canDownload===false)throw Error('该文件的所有者禁止下载');
 const kind=driveFileKind(file);
 if(kind==='unsupported'||kind==='folder')throw Error('支持 Google Docs、TXT/Markdown、PDF 以及常见音频；其他格式可从 Drive 官方查看');
 const id=encodeURIComponent(file.id);
 const url=file.mimeType==='application/vnd.google-apps.document'
  ?'https://www.googleapis.com/drive/v3/files/'+id+'/export?mimeType=text%2Fplain'
  :'https://www.googleapis.com/drive/v3/files/'+id+'?alt=media';
 const limit=file.mimeType==='application/pdf'||/\.pdf$/i.test(file.name)?75_000_000:25_000_000;
 if(file.size && Number(file.size)>limit)throw Error('文件超过本次浏览大小上限（PDF 75MB，其他 25MB）');
 const res=await googleFetch(token,url);
 const blob=await res.blob();
 if(blob.size>limit)throw Error('文件超过当前浏览大小上限');
 if(kind==='audio')return {audio:blob};
 if(file.mimeType==='application/pdf'||/\.pdf$/i.test(file.name))return {pdf:blob};
 return {text:await blob.text()};
}

/** Search the chosen, authorized Google account by filename, including nested folders. */
export async function searchDriveFiles(token:string,query:string):Promise<DriveFile[]>{
 const name=query.trim();
 if(name.length<2||name.length>100)throw Error('请输入 2–100 字符的文件名关键词');
 const safe=name.replace(/\\/g,'\\\\').replace(/'/g,"\\'");
 const url=new URL('https://www.googleapis.com/drive/v3/files');
 url.searchParams.set('q',"name contains '"+safe+"' and trashed = false");
 url.searchParams.set('fields','nextPageToken,files(id,name,mimeType,size,webViewLink,capabilities(canDownload))');
 url.searchParams.set('pageSize','100');url.searchParams.set('supportsAllDrives','true');
 url.searchParams.set('includeItemsFromAllDrives','true');
 const response=await googleFetch(token,url.toString());
 const data=await response.json() as {files?:DriveFile[]};
 return data.files||[];
}
