import {useEffect,useState} from 'react';
import type {Session,SupabaseClient} from '@supabase/supabase-js';

type Asset={asset_id:string;course_id:string|null;source_kind:string;audio_verified:boolean;decoded:boolean};
type Stats={total:number;privateUploads:number;referenced:number;verified:number;unmapped:number;selectedAssets:number;selectedUploads:number;noDatabaseRows:boolean};
export function audioCoverage(assets:Asset[],uploadedFiles:string[],courseId:string):Stats{
 const uploaded=new Set(uploadedFiles);
 const personal=assets.filter(a=>a.source_kind==='synthetic_practice');
 const selected=assets.filter(a=>a.course_id===courseId);
 return {
  total:assets.length,privateUploads:personal.filter(a=>uploaded.has(a.asset_id+'.mp3')).length,
  referenced:assets.filter(a=>a.source_kind==='open_reference').length,
  verified:assets.filter(a=>a.audio_verified).length,
  unmapped:assets.filter(a=>!a.course_id).length,
  selectedAssets:selected.length,
  selectedUploads:selected.filter(a=>uploaded.has(a.asset_id+'.mp3')).length,
  noDatabaseRows:assets.length===0
 };
}
export default function AudioCoverage({client,session,courseId}:{client:SupabaseClient;session:Session;courseId:string}){
 const [items,setItems]=useState<Asset[]>([]);
 const [uploaded,setUploaded]=useState<string[]>([]);
 const [status,setStatus]=useState('正在读取音频目录与私人存储…');
 const [revision,setRevision]=useState(0);
 useEffect(()=>{
  let active=true;
  void (async()=>{
   const [index,files]=await Promise.all([
    client.from('course_audio_index').select('asset_id,course_id,source_kind,audio_verified,decoded').limit(1000),
    client.storage.from('lesson-audio-private').list(session.user.id,{limit:1000})
   ]);
   if(index.error||files.error)throw Error(index.error?.message||files.error?.message);
   if(!active)return;
   setItems((index.data||[]) as Asset[]);
   setUploaded((files.data||[]).map(x=>x.name));
   setStatus('数据库与本人私人 Storage 清单读取完成。这只是可发现性检查，实际浏览器播放与许可仍逐项验证。');
  })().catch(e=>{if(active)setStatus('音频目录读取失败：'+(e instanceof Error?e.message:String(e)));});
  return()=>{active=false;};
 },[client,session.user.id,revision]);
 const m=audioCoverage(items,uploaded,courseId);
 return <section className="cloud-reader" aria-label="音频覆盖与真实可用性">
  <h3>音频覆盖矩阵 · 索引不等于可播文件</h3>
  <p role="status">{status}</p>
  <div className="ref-counts">
   <div><strong>{m.total}</strong><span>总索引</span></div>
   <div><strong>{m.privateUploads}</strong><span>私人 MP3 已上传</span></div>
   <div><strong>{m.referenced}</strong><span>第三方参考索引</span></div>
   <div><strong>{m.verified}</strong><span>正式音频审核标志</span></div>
  </div>
  <p>当前课程 {courseId}：索引 {m.selectedAssets} 条，已上传可匹配的本人私人 MP3 {m.selectedUploads} 条；共有 {m.unmapped} 条索引尚未明确绑定课程。</p>
  <p className="cloud-disclaimer">Drive 关联的素材属于另一个动态来源，应在下方 Drive 面板授权并绑定；首次听音须观察播放器「已开始播放」并实际确认听见声音。FI/Inspire 来源索引不会自动复制到本站或伪称获得再分发授权。</p>
  <button type="button" onClick={()=>setRevision(n=>n+1)}>重新检查索引与私人存储</button>
 </section>;
}
