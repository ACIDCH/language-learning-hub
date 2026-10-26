import {useEffect,useRef,useState,type FormEvent} from 'react';
import type {SupabaseClient,Session} from '@supabase/supabase-js';
import {hashAudio,unpackA1Audio} from './audioZip';
import AudioReview from './AudioReview';
import {audioNames} from './resourceInventory';

export type AudioAsset={asset_id:string;filename:string;duration_seconds:number;source_kind:string;
 decoded:boolean;exact_text:boolean;listened:boolean;audio_verified:boolean};
type Props={client:SupabaseClient;session:Session;courseId:string;assets:AudioAsset[];status:string};
const BUCKET='lesson-audio-private';
export default function AudioVault({client,session,courseId,assets,status}:Props){
 const [zip,setZip]=useState<File|null>(null);
 const [working,setWorking]=useState(false);
 const [importNote,setImportNote]=useState('');
 const [playUrl,setPlayUrl]=useState('');
 const [playId,setPlayId]=useState('');
 const [playNote,setPlayNote]=useState('');
 const [uploadedNames,setUploadedNames]=useState<Set<string>|null>(null);
 const [vaultMessage,setVaultMessage]=useState('正在检查私人音频存储…');
 const [vaultRefresh,setVaultRefresh]=useState(0);
 const playRequest=useRef(0);
 const player=useRef<HTMLAudioElement>(null);
 const [speed,setSpeed]=useState(1),[loop,setLoop]=useState(false);
 useEffect(()=>{
  let active=true;
  setUploadedNames(null);setVaultMessage('正在检查已上传的音频…');
  void client.storage.from(BUCKET).list(session.user.id,{limit:100})
    .then(({data,error})=>{
      if(!active)return;
      if(error){setVaultMessage('音频存储检查暂不可用：'+error.message);return;}
      const files=audioNames((data||[]).map(f=>f.name));
      setUploadedNames(files);
      setVaultMessage(files.size===24?'24 首 A1 练习音频已经上传，无需重复导入。':
        '当前识别到 '+files.size+'/24 首 A1 练习音频；缺失的文件仍可通过 ZIP 补齐。');
    });
  return ()=>{active=false;};
 },[client,session.user.id,vaultRefresh]);
 useEffect(()=>{
   playRequest.current++;
   setPlayUrl('');setPlayId('');setPlayNote('');
   setLoop(false);
   return ()=>{playRequest.current++;};
 },[courseId,session.user.id]);
 async function play(asset:AudioAsset){
  const ticket=++playRequest.current;
  setPlayUrl('');setPlayId('');setLoop(false);setPlayNote('正在检查私人文件…');
  const path=session.user.id+'/'+asset.asset_id+'.mp3';
  const {data,error}=await client.storage.from(BUCKET).createSignedUrl(path,15*60);
  if(ticket!==playRequest.current)return;
  if(error||!data?.signedUrl){
   setPlayNote('此音频尚未上传或不可读取；请先完成一次 ZIP 同步。');
   return;
  }
  setPlayUrl(data.signedUrl);setPlayId(asset.asset_id);
  setPlayNote('已获取私人音频的临时播放地址；请点击播放。尚未确认音频可解码或已经发声。');
 }
 async function importZip(e:FormEvent){
  e.preventDefault();
  if(!zip||working)return;
  setWorking(true);
  try{
   const files=await unpackA1Audio(zip);
   setImportNote('已读取 24 条音频，正在核对数据库 SHA-256…');
   const {data:expected,error}=await client.from('course_audio_index')
     .select('asset_id,filename,sha256')
     .eq('source_kind','synthetic_practice');
   if(error)throw error;
   const hashes=new Map((expected||[]).map(x=>[x.filename,{id:x.asset_id,hash:x.sha256}]));
   if(hashes.size!==24)throw Error('数据库参考音频不是 24 条，已中止上传');
   // Verify ALL before uploading ANY file.
   const validated=[];
   for(const f of files){
    const known=hashes.get(f.filename);
    if(!known||await hashAudio(f.data)!==known.hash)throw Error('哈希校验不一致：'+f.filename);
    validated.push({...f,assetId:known.id});
   }
   setImportNote('24/24 校验通过；正在上传私人存储，不会替换已有文件…');
   let added=0,existing=0;
   for(const [i,f] of validated.entries()){
    const path=session.user.id+'/'+f.assetId+'.mp3';
    const blob=new Blob([f.data.slice().buffer as ArrayBuffer],{type:'audio/mpeg'});
    const result=await client.storage.from(BUCKET).upload(path,blob,{
      cacheControl:'3600',contentType:'audio/mpeg',upsert:false
    });
    if(result.error){
      if(result.error.message.includes('already exists') ||
         result.error.message.includes('Duplicate') ||
         result.error.message.includes('The resource already exists')){
        existing++;
      } else throw Error(f.filename+'：'+result.error.message);
    }else added++;
    setImportNote('同步中 '+(i+1)+'/24：新增 '+added+'，已存在 '+existing);
   }
   setImportNote('24 首音频处理完毕：新增 '+added+'，已存在 '+existing+'。请选择一首试听；内容质量验收仍需人工完成。');
   setZip(null);
   setVaultRefresh(n=>n+1);
  }catch(err){setImportNote('同步中止：'+(err instanceof Error?err.message:String(err))+'。已上传的文件仍被保留，可选择同一个 ZIP 继续。');}
  finally{setWorking(false);}
 }
 return <section className="cloud-reader" aria-label="私人教学音频">
  <h3>法语 A1 教学音频</h3>
  {status&&<p role="status">{status}</p>}
  {vaultMessage&&<p role="status">{vaultMessage}</p>}
  {assets.length>0?
   <ul className="cloud-audio-list">
    {assets.map(asset=><li key={asset.asset_id}>
     <span>{asset.filename} · {Math.round(asset.duration_seconds)} 秒
       {asset.audio_verified?' · 人工已验收':' · 待人工试听验收'}
       {uploadedNames&&(uploadedNames.has(asset.asset_id+'.mp3')?' · 已上传':' · 尚未上传')}</span>
     {asset.source_kind==='synthetic_practice'&&<button type="button"
       onClick={()=>{void play(asset)}}>检查并播放</button>}
    </li>)}
   </ul>:
   <p className="cloud-disclaimer">本课暂无关联音频。</p>}
  {playUrl&&<div className="audio-player"><p>{playId}</p>
    <p>原版课文的合成练习音频（TTS），不是当前扩展听读全文的配音；须按原版文本核对。</p>
    <audio ref={player} key={playUrl} controls preload="none" src={playUrl} loop={loop}
      onLoadedMetadata={()=>{if(player.current)player.current.playbackRate=speed;}}
      onCanPlay={()=>setPlayNote('可以播放')}
      onPlaying={()=>setPlayNote('播放中')}
      onError={()=>setPlayNote('此文件的真实播放失败：可能是链接失效、网络阻断或格式不受支持。请重新点击「检查并播放」获取新链接。')}
      onStalled={()=>setPlayNote('音频加载停滞，请检查网络；尚不能认定播放成功。')}>
      浏览器不支持音频播放
    </audio>
    <div className="audio-controls"><label>私人音频播放速度 <select value={speed} onChange={e=>{
      const next=Number(e.target.value);setSpeed(next);if(player.current)player.current.playbackRate=next;
    }}>{[.75,.85,1,1.25].map(value=><option key={value} value={value}>{value}×</option>)}</select></label>
    <button type="button" aria-pressed={loop} onClick={()=>setLoop(value=>!value)}>整首循环 {loop?'开启':'关闭'}</button>
    <button type="button" onClick={()=>{if(player.current)player.current.currentTime=0;}}>回到开头</button></div>
    <AudioReview key={playId} client={client} session={session} assetId={playId}/>
  </div>}
  {playNote&&<p role="status" className="cloud-disclaimer">{playNote}</p>}
  <details className="cloud-audio-import">
   <summary>{uploadedNames?.size===24?'音频已经齐全 · 重新核验或恢复备份':'同步或补齐 A1 的 24 首私人音频'}</summary>
   
   <form onSubmit={importZip} className="cloud-fields">
    <label>音频 ZIP<input type="file" accept=".zip" disabled={working} onChange={e=>setZip(e.target.files?.[0]||null)}/></label>
    <button disabled={working||!zip} type="submit">{working?'正在校验并同步…':'核验并同步 24 首音频'}</button>
   </form>
   <p role="status" className="cloud-disclaimer">{importNote}</p>
  </details>
  
 </section>;
}
