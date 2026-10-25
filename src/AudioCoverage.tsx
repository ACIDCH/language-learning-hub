import {useEffect,useState} from 'react';
import type {Session,SupabaseClient} from '@supabase/supabase-js';

type Asset={asset_id:string;course_id:string|null;source_kind:string;audio_verified:boolean;decoded:boolean};
type Stats={total:number;privateUploads:number;referenced:number;verified:number;unmapped:number;selectedAssets:number;selectedUploads:number;noDatabaseRows:boolean;unmappedReference:number;selectedPractice:number;selectedPracticeUploads:number};
export function audioCoverage(assets:Asset[],uploadedFiles:string[],courseId:string):Stats{
 const uploaded=new Set(uploadedFiles);
 const personal=assets.filter(a=>a.source_kind==='synthetic_practice');
 const selected=assets.filter(a=>a.course_id===courseId);
 const selectedPractice=selected.filter(a=>a.source_kind==='synthetic_practice');
 return {
  total:assets.length,privateUploads:personal.filter(a=>uploaded.has(a.asset_id+'.mp3')).length,
  referenced:assets.filter(a=>a.source_kind==='open_reference').length,
  verified:assets.filter(a=>a.audio_verified).length,
  unmapped:assets.filter(a=>!a.course_id).length,
  selectedAssets:selected.length,
  selectedUploads:selected.filter(a=>uploaded.has(a.asset_id+'.mp3')).length,
  noDatabaseRows:assets.length===0,
  unmappedReference:assets.filter(a=>a.source_kind==='open_reference'&&!a.course_id).length,
  selectedPractice:selectedPractice.length,
  selectedPracticeUploads:selectedPractice.filter(a=>uploaded.has(a.asset_id+'.mp3')).length
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
   setStatus('');
  })().catch(e=>{if(active)setStatus('音频目录读取失败：'+(e instanceof Error?e.message:String(e)));});
  return()=>{active=false;};
 },[client,session.user.id,revision]);
 const m=audioCoverage(items,uploaded,courseId);
 return <section className="cloud-reader" aria-label="音频覆盖与真实可用性">
  <h3>课程音频概况</h3>
  {status&&<p role="status">{status}</p>}
  <div className="ref-counts">
   <div><strong>{m.total}</strong><span>总索引</span></div>
   <div><strong>{m.privateUploads}</strong><span>旧版练习 MP3 已上传</span></div>
   <div><strong>{m.referenced}</strong><span>开放教材参考索引</span></div>
   <div><strong>{m.verified}</strong><span>正式音频审核标志</span></div>
  </div>
  <p className="audio-coverage-line">本课旧版练习关联 {m.selectedPractice} 条 · 已上传旧版 MP3 {m.selectedPracticeUploads} 条 · 尚未按课绑定的公开参考索引 {m.unmappedReference} 条</p>
  <p className="cloud-disclaimer">旧版练习音频并非现行四段双语课文的完整配音；公开参考音轨也不等于自动匹配本课。文件已上传、可解码与完成真实试听是不同的验收条件。未经过逐段文字匹配及真人核验，不标为正式有声音课。</p>

  <button type="button" onClick={()=>setRevision(n=>n+1)}>重新检查索引与私人存储</button>
 </section>;
}
