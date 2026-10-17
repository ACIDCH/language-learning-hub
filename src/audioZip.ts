/** Uncompressed ZIP reader for the owner-created, 24-track verified A1 archive. */
export type AudioBlob={filename:string;data:Uint8Array};
const MAX=6*1024*1024;
const rx=/^fr-a1-u(0[1-9]|1[0-2])-(dialogue|reading)\.mp3$/;
export async function unpackA1Audio(file:File):Promise<AudioBlob[]>{
 if(!file.name.toLowerCase().endsWith('.zip') || file.size<100 || file.size>MAX)
  throw Error('请选择经过校验的 24 首 MP3 ZIP 包（上限 6MB）。');
 const bytes=await file.arrayBuffer(),v=new DataView(bytes);
 const u16=(at:number)=>{if(at<0||at+2>v.byteLength)throw Error('ZIP 损坏');return v.getUint16(at,true);};
 const u32=(at:number)=>{if(at<0||at+4>v.byteLength)throw Error('ZIP 损坏');return v.getUint32(at,true);};
 let eocd=-1;
 for(let i=v.byteLength-22;i>=Math.max(0,v.byteLength-65557);i--){
  if(u32(i)===0x06054b50){eocd=i;break;}
 }
 if(eocd<0||u16(eocd+10)!==24)throw Error('音频备份应恰好包含 24 个文件');
 const decoder=new TextDecoder('utf-8',{fatal:true}),files:AudioBlob[]=[];
 let offset=u32(eocd+16);
 const seen=new Set<string>();
 for(let i=0;i<24;i++){
  if(u32(offset)!==0x02014b50)throw Error('ZIP 目录不正确');
  const method=u16(offset+10),size=u32(offset+20),unpacked=u32(offset+24);
  const len=u16(offset+28),extra=u16(offset+30),comment=u16(offset+32),local=u32(offset+42);
  const filename=decoder.decode(new Uint8Array(bytes,offset+46,len));
  offset+=46+len+extra+comment;
  if(!rx.test(filename)||seen.has(filename)||method!==0||size!==unpacked||
     size<1024||size>524288||local+30>v.byteLength||u32(local)!==0x04034b50)
   throw Error('无效、重复或未压缩的 A1 MP3：'+filename);
  const start=local+30+u16(local+26)+u16(local+28);
  if(start+size>v.byteLength)throw Error('音频文件不完整');
  const data=new Uint8Array(bytes,start,size).slice();
  if(!(data[0]===73&&data[1]===68&&data[2]===51) &&
     !(data[0]===255&&(data[1]&224)===224))throw Error('MP3 文件头异常：'+filename);
  files.push({filename,data});
  seen.add(filename);
 }
 if(files.length!==24)throw Error('音频数量不正确');
 return files;
}
export async function hashAudio(bytes:Uint8Array):Promise<string>{
 const hash=await crypto.subtle.digest('SHA-256',bytes.slice().buffer);
 return Array.from(new Uint8Array(hash),n=>n.toString(16).padStart(2,'0')).join('');
}
