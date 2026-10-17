import test from 'node:test';
import assert from 'node:assert/strict';
import {unpackA1Audio} from '../src/audioZip.ts';

function makeZip(count=24){
 const chunks=[],central=[];
 let size=0;
 const little=(b,pos,v,bytes)=>bytes===2?b.writeUInt16LE(v,pos):b.writeUInt32LE(v,pos);
 for(let i=0;i<count;i++){
  const id=String(Math.floor(i/2)+1).padStart(2,'0');
  const name='fr-a1-u'+id+'-'+(i%2?'reading':'dialogue')+'.mp3';
  const filename=Buffer.from(name);
  const body=Buffer.alloc(2048);
  body[0]=73;body[1]=68;body[2]=51;
  const local=Buffer.alloc(30);little(local,0,0x04034b50,4);
  little(local,18,2048,4);little(local,22,2048,4);little(local,26,filename.length,2);
  const c=Buffer.alloc(46);little(c,0,0x02014b50,4);
  little(c,20,2048,4);little(c,24,2048,4);little(c,28,filename.length,2);
  little(c,42,size,4);
  chunks.push(local,filename,body);central.push(c,filename);
  size+=30+filename.length+body.length;
 }
 const directory=Buffer.concat(central);
 const end=Buffer.alloc(22);
 little(end,0,0x06054b50,4);
 little(end,8,count,2);little(end,10,count,2);
 little(end,12,directory.length,4);little(end,16,size,4);
 return Buffer.concat([...chunks,directory,end]);
}
test('recognizes exactly 24 stored MP3s with bounded files',async()=>{
 const bytes=makeZip();
 const file={name:'practice.zip',size:bytes.length,arrayBuffer:async()=>Uint8Array.from(bytes).buffer};
 const files=await unpackA1Audio(file);
 assert.equal(files.length,24);
 assert.equal(files[0].filename,'fr-a1-u01-dialogue.mp3');
 assert.equal(files[23].filename,'fr-a1-u12-reading.mp3');
 assert.equal(files[0].data.length,2048);
});
test('wrong course count is rejected before any storage request',async()=>{
 const bytes=makeZip(22);
 const file={name:'practice.zip',size:bytes.length,arrayBuffer:async()=>Uint8Array.from(bytes).buffer};
 await assert.rejects(()=>unpackA1Audio(file),/24 个文件/);
});
test('oversized archive is rejected',async()=>{
 const file={name:'practice.zip',size:7000000,arrayBuffer:async()=>{throw Error('should not read');}};
 await assert.rejects(()=>unpackA1Audio(file),/上限/);
});
