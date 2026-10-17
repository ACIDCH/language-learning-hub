/**
 * Small, safe browser reader for our YUNPAN V4 course backup.
 * Extracts ONLY courses.json. No imported files are exposed in public assets.
 * Browser-native deflate avoids another package/CDN dependency.
 */
type ArchivedCourse = {id: string; language: string; text: string; content_status?: string};
type ParsedCourse = {id: string; text: string; status: string};
const MAX_ARCHIVE_BYTES = 12 * 1024 * 1024;
const MAX_COURSES_JSON = 8 * 1024 * 1024;
const MAX_LESSON_BYTES = 200000;
const VALID_ID = /^(en-ielts-(listening|reading|writing-task1|writing-task2|speaking|language-upgrade)-u0[1-8]|fr-(a1|a2|b1|b2|c1|c2)-u(0[1-9]|1[0-2]))$/;
function u16(v:DataView,offset:number){if(offset<0||offset+2>v.byteLength)throw Error('ZIP 损坏');return v.getUint16(offset,true);}
function u32(v:DataView,offset:number){if(offset<0||offset+4>v.byteLength)throw Error('ZIP 损坏');return v.getUint32(offset,true);}
export async function readV4Backup(file:File):Promise<ParsedCourse[]> {
  if(!file.name.endsWith('.zip') || file.size<100 || file.size>MAX_ARCHIVE_BYTES) {
    throw Error('请选择原始 V4 ZIP 备份（大小不超过 12MB）。');
  }
  const array = await file.arrayBuffer();
  const v = new DataView(array);
  let end=-1;
  for(let i=v.byteLength-22;i>=Math.max(0,v.byteLength-65557);i--) {
    if(u32(v,i)===0x06054b50){end=i;break;}
  }
  if(end<0)throw Error('不是有效 ZIP 备份');
  const count=u16(v,end+10),start=u32(v,end+16);
  if(count<1||count>1000||start>v.byteLength)throw Error('ZIP 目录异常');
  let offset=start;
  let data:Uint8Array|null=null;
  const decoder = new TextDecoder('utf-8',{fatal:true});
  for(let i=0;i<count;i++){
    if(u32(v,offset)!==0x02014b50)throw Error('ZIP 目录损坏');
    const method=u16(v,offset+10),compressedSize=u32(v,offset+20),
      originalSize=u32(v,offset+24),nameLength=u16(v,offset+28),
      extra=u16(v,offset+30),comment=u16(v,offset+32),
      localOffset=u32(v,offset+42);
    const namePos=offset+46;
    if(namePos+nameLength>v.byteLength)throw Error('ZIP 名称越界');
    const name=decoder.decode(new Uint8Array(array,namePos,nameLength));
    offset=namePos+nameLength+extra+comment;
    if(offset>v.byteLength)throw Error('ZIP 目录越界');
    if(name!=='courses.json')continue;
    if(originalSize>MAX_COURSES_JSON||compressedSize>MAX_ARCHIVE_BYTES||localOffset+30>v.byteLength)throw Error('正文索引超出限制');
    if(u32(v,localOffset)!==0x04034b50)throw Error('ZIP 文件头损坏');
    const bodyStart=localOffset+30+u16(v,localOffset+26)+u16(v,localOffset+28);
    if(bodyStart+compressedSize>v.byteLength)throw Error('ZIP 数据损坏');
    const compressed=new Uint8Array(array,bodyStart,compressedSize);
    if(method===0)data=compressed.slice();
    else if(method===8){
      if(typeof DecompressionStream==='undefined')throw Error('当前浏览器不支持 ZIP 解压，请用新版 Chrome/Edge');
      const stream=new Blob([compressed.slice()]).stream().pipeThrough(new DecompressionStream('deflate-raw'));
      data=new Uint8Array(await new Response(stream).arrayBuffer());
    } else throw Error('此备份使用了不支持的压缩格式');
    if(data.byteLength!==originalSize||data.byteLength>MAX_COURSES_JSON)throw Error('ZIP 大小校验失败');
    break;
  }
  if(!data)throw Error('备份包缺少 courses.json');
  const lessons=JSON.parse(decoder.decode(data)) as unknown;
  if(!Array.isArray(lessons)||lessons.length!==108)throw Error('备份中必须恰好有 108 课');
  const seen=new Set<string>();
  const extracted:ParsedCourse[]=[];
  for(const c of lessons as ArchivedCourse[]){
    if(!c||typeof c.id!=='string'||!VALID_ID.test(c.id)||
      !['en','fr'].includes(c.language)||!c.id.startsWith(c.language+'-')||
      typeof c.text!=='string'||new TextEncoder().encode(c.text).byteLength>MAX_LESSON_BYTES||
      c.text.trim().length<500||seen.has(c.id)) throw Error('备份课程 ID 或正文异常，请勿导入');
    seen.add(c.id);
    extracted.push({id:c.id,text:c.text,status:c.content_status||'draft'});
  }
  return extracted;
}
export async function sha256Text(value:string):Promise<string>{
  const result=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(value));
  return Array.from(new Uint8Array(result),byte=>byte.toString(16).padStart(2,'0')).join('');
}
