import {useState, type FormEvent} from 'react';
import type {SupabaseClient, Session} from '@supabase/supabase-js';
import {readV4Backup,sha256Text} from './importBackup';

type Props={
  client:SupabaseClient;
  session:Session;
  knownIds:string[];
  onImported:()=>void;
};
export default function BackupImporter({client,session,knownIds,onImported}:Props){
  const [file,setFile]=useState<File|null>(null);
  const [busy,setBusy]=useState(false);
  const [note,setNote]=useState('请选择从私人 YUNPAN 下载的 V4 备份 ZIP；仅补齐尚未入库的课程。');
  async function upload(event:FormEvent){
    event.preventDefault();
    if(!file||busy)return;
    setBusy(true);
    try{
      setNote('正在校验 108 课备份结构…');
      const courses=await readV4Backup(file);
      const known=new Set(knownIds);
      if(known.size!==108||courses.some(c=>!known.has(c.id)))throw Error('备份课程目录与云端 108 课不一致，请检查版本');
      let imported=0;
      for(let i=0;i<courses.length;i+=8){
        const batch=courses.slice(i,i+8);
        const hashes=await Promise.all(batch.map(c=>sha256Text(c.text)));
        const rows=batch.map((c,j)=>({
          user_id:session.user.id,
          course_id:c.id,
          content_body:c.text,
          source_format:'text/markdown',
          source_version:'v4-backup',
          content_sha256:hashes[j],
          qa_status:'draft'
        }));
        // Existing 12 owner-scoped Drive snapshots are kept unchanged.
        const {data,error}=await client.from('private_lesson_content')
          .upsert(rows,{onConflict:'user_id,course_id',ignoreDuplicates:true})
          .select('course_id');
        if(error)throw error;
        imported+=(data?.length??0);
        setNote('正在导入：'+Math.min(i+8,courses.length)+'/108，新增 '+imported+' 课…');
      }
      setNote('完成：已检查全部 108 课，本次新增 '+imported+' 份草稿；已有课程未覆盖。请按课程逐项审校。');
      onImported();
      setFile(null);
    }catch(error){
      setNote('导入未完全完成：'+(error instanceof Error?error.message:String(error))+'。可以重新选择同一文件继续，已导入内容不会重复。');
    }finally{setBusy(false);}
  }
  return <section className="cloud-reader" aria-label="私人课程备份导入">
    <h3>同步我的 108 课 V4 私人备份</h3>
    <p className="cloud-disclaimer">一次选择 ZIP，系统自动核对课程 ID、保存到你本人可见的 Supabase 私人正文表。Google Drive 原件不会删除，已有同步内容不会覆盖，也不会上传视频或语音录音。</p>
    <form onSubmit={upload} className="cloud-fields">
      <label>V4 课程备份 ZIP
        <input type="file" accept=".zip,application/zip" disabled={busy}
          onChange={e=>setFile(e.currentTarget.files?.[0]??null)}/>
      </label>
      <button type="submit" disabled={!file||busy}>
        {busy?'正在同步，请勿关闭页面':'核验并补齐缺失课程'}
      </button>
    </form>
    <p className="cloud-disclaimer" role="status">{note}</p>
    <p className="cloud-disclaimer">注意：备份里仍有未完成内容质量验收的草稿，导入不代表该课程通过审校。</p>
  </section>;
}
