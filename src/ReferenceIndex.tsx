import {useEffect,useMemo,useState} from 'react';
import type {Session,SupabaseClient} from '@supabase/supabase-js';
import {identifyReference,referenceCounts,uniqueMediaHashes,REFERENCES,type ReferenceRecord,type ReferenceSource} from './referenceCatalog';
type Filter='all'|ReferenceSource;
export default function ReferenceIndex({client,session}:{client:SupabaseClient;session:Session}){
 const [items,setItems]=useState<ReferenceRecord[]>([]);
 const [filter,setFilter]=useState<Filter>('all'),[q,setQ]=useState(''),[page,setPage]=useState(0);
 const [status,setStatus]=useState('正在读取第三方参考音频元数据…');
 useEffect(()=>{
  let active=true;
  void client.from('course_audio_index')
   .select('asset_id,filename,source_kind,course_id,duration_seconds,decoded,audio_verified,sha256')
   .eq('source_kind','open_reference').order('asset_id').limit(500)
   .then(({data,error})=>{
    if(!active)return;
    if(error){setStatus('参考音频索引读取失败：'+error.message);return;}
    setItems((data||[]) as ReferenceRecord[]);
    setStatus('仅展示索引；不重托管商业音频，也不根据文件编号假定其与课程完全一致。');
   });
  return ()=>{active=false;};
 },[client,session.user.id]);
 const counts=useMemo(()=>referenceCounts(items),[items]);
 const filtered=useMemo(()=>items.filter(x=>
  (filter==='all'||identifyReference(x)===filter)&&
  (x.asset_id+' '+x.filename).toLowerCase().includes(q.toLowerCase().trim())),[items,filter,q]);
 const visible=filtered.slice(page*20,(page+1)*20);
 function selectFilter(v:Filter){setFilter(v);setPage(0);}
 return <section className="cloud-reader" aria-label="第三方参考音频来源索引">
  <h3>参考音频目录</h3>
  <p className="cloud-disclaimer" role="status">{status}</p>
  <div className="ref-counts">
   {([
    ['fi-phonetics','FI 语音'],['fi-vocabulary','FI 词汇'],
    ['inspire-a1','Inspire A1'],['unclassified','其他']
   ] as const).map(([key,title])=><button type="button" key={key}
    onClick={()=>selectFilter(key)} aria-pressed={filter===key}>
    <strong>{counts[key]}</strong><span>{title}</span>
   </button>)}
  </div>
  <p className="reference-count">共 {items.length} 条 · {uniqueMediaHashes(items)} 个音频文件</p>
  
  <div className="ref-filters">
   <label>资源类别<select value={filter} onChange={e=>selectFilter(e.target.value as Filter)}>
    <option value="all">全部 {items.length} 条</option>
    <option value="fi-phonetics">FI 语音 · {counts['fi-phonetics']}</option>
    <option value="fi-vocabulary">FI 词汇 · {counts['fi-vocabulary']}</option>
    <option value="inspire-a1">Inspire A1 · {counts['inspire-a1']}</option>
    {counts.unclassified>0&&<option value="unclassified">未归类 · {counts.unclassified}</option>}
   </select></label>
   <label>文件名搜索<input type="search" value={q} onChange={e=>{setQ(e.target.value);setPage(0);}} placeholder="例如：voc_01 / Piste001"/></label>
  </div>
  <p className="reference-count">{filtered.length} 条结果</p>
  <div className="ref-rows">
   {visible.map(item=>{const source=identifyReference(item),meta=REFERENCES[source];
    return <article key={item.asset_id}>
     <strong>{item.filename}</strong>
     <p>{meta.title} · {Math.round(item.duration_seconds)} 秒 ·
       {item.decoded?'技术解码成功':'技术解码待核验'} ·
       {item.course_id?'已标记课程关联':'未与课程对齐'}</p>
     <details className="reference-source-note"><summary>许可说明</summary><p>{meta.rights}</p></details>
     {meta.url&&<a href={meta.url} target="_blank" rel="noopener noreferrer">查看官方来源及使用条款 ↗</a>}
    </article>;
   })}
  </div>
  <div className="ref-pagination">
   <button type="button" disabled={page===0} onClick={()=>setPage(n=>n-1)}>上一页</button>
   <span>{filtered.length?(page+1)+' / '+Math.ceil(filtered.length/20):'暂无匹配'}</span>
   <button type="button" disabled={(page+1)*20>=filtered.length} onClick={()=>setPage(n=>n+1)}>下一页</button>
  </div>
 </section>;
}
