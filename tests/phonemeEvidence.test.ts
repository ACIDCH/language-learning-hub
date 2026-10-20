import {describe,expect,it,vi,afterEach} from 'vitest';
import {alignPhoneColors,decodeCtc,phoneLevelLabels,tokenizeReferenceIpa,type CandidatePhone} from '../src/phonemeEvidence';
import {BrowserPhonemeRunner} from '../src/BrowserPhonemeRunner';

describe('real phoneme inference evidence alignment (not synthetic pronunciation grades)',()=>{
 it('collapses consecutive CTC repeats, but keeps repeats separated by a blank',()=>{
  const vocab=['<pad>','a','b'];
  const id=[1,1,0,1,2,2,0];
  const logits=Float32Array.from(id.flatMap(x=>Array.from({length:3},(_,i)=>i===x?7:0)));
  const phones=decodeCtc(logits,id.length,3,vocab,1.4);
  expect(phones.map(x=>x.phone)).toEqual(['a','a','b']);
  expect(phones[0].end_s).toBe(.4);
  expect(phones[1].start_s).toBe(.6);
  expect(phones[2].end_s).toBe(1.2);
 });
 it('tokens French nasal vowel and English diphthong by the actual available vocabulary',()=>{
  const vocab=['<pad>','b','ɔ̃','ʒ','u','ɹ','oʊ','ˈ'];
  expect(tokenizeReferenceIpa('bɔ̃ ʒuɹ oʊ',vocab)).toEqual({phones:['b','ɔ̃','ʒ','u','ɹ','oʊ'],unknown:[]});
  expect(tokenizeReferenceIpa('☠b',vocab)).toEqual({phones:['b'],unknown:['☠']});
 });
 it('paints model-agreement evidence in five color tiers, not a numeric language grade',()=>{
  const heard:CandidatePhone[]=[
   {phone:'b',start_s:0,end_s:.2,logitMargin:4},
   {phone:'ɔ̃',start_s:.2,end_s:.4,logitMargin:1.4},
   {phone:'a',start_s:.4,end_s:.65,logitMargin:.4},
   {phone:'s',start_s:.65,end_s:.9,logitMargin:5}
  ];
  const aligned=alignPhoneColors(['b','ɔ̃','i','ʁ','s'],heard);
  expect(aligned.map(x=>x.level)).toEqual(['strong','close','uncertain','unknown','strong']);
  expect(aligned.find(x=>x.level==='unknown')?.observed).toBeNull();
  expect(aligned).not.toHaveProperty('score');
  expect(phoneLevelLabels.different).toContain('差异');
 });
 it('marks distinct high-margin phoneme candidates as differences but not verified mistakes',()=>{
  const tiles=alignPhoneColors(['θ'],[{phone:'s',start_s:0,end_s:.15,logitMargin:5}]);
  expect(tiles[0]).toMatchObject({level:'different',expected:'θ',observed:'s'});
  expect(tiles[0].description).toContain('模型候选');
 });
 it('rejects corrupt tensors instead of painting convincing fake matches',()=>{
  expect(()=>decodeCtc(new Float32Array([1]),100,392,['<pad>'],4)).toThrow();
  expect(alignPhoneColors([],[])).toEqual([]);
 });
});
class FakeWorker{
 static instances:FakeWorker[]=[];
 handlers=new Map<string,Set<(e:Event|MessageEvent<unknown>)=>void>>();
 terminated=false;
 sent:{data:unknown;transfers?:Transferable[]}[]=[];
 constructor(){FakeWorker.instances.push(this);}
 addEventListener(type:string,cb:EventListener){const set=this.handlers.get(type)||new Set();set.add(cb as (e:Event)=>void);this.handlers.set(type,set);}
 removeEventListener(type:string,cb:EventListener){this.handlers.get(type)?.delete(cb as (e:Event)=>void);}
 postMessage(data:unknown,transfers?:Transferable[]){this.sent.push({data,transfers});}
 terminate(){this.terminated=true;}
 reply(data:unknown){for(const handler of this.handlers.get('message')||[])handler({data} as MessageEvent);}
}
afterEach(()=>{vi.unstubAllGlobals();FakeWorker.instances=[];});
describe('WebGPU/WASM worker bridge cancellation and explicit user consent',()=>{
 it('does not create workers or transfer voice samples until analyze() is called',async()=>{
  vi.stubGlobal('Worker',FakeWorker);
  const runner=new BrowserPhonemeRunner();
  expect(FakeWorker.instances).toHaveLength(0);
  const pcm=new Int16Array(16000).fill(12000);
  const ctl=new AbortController(),progress=vi.fn();
  const result=runner.analyze(pcm,ctl.signal,progress);
  const worker=FakeWorker.instances[0];
  expect(worker.sent).toHaveLength(1);
  const packet=worker.sent[0].data as {pcm:Float32Array;jobId:number};
  expect(packet.pcm).toBeInstanceOf(Float32Array);
  expect(worker.sent[0].transfers).toHaveLength(1);
  worker.reply({type:'progress',jobId:packet.jobId,message:'WebGPU 模型下载 20%'});
  expect(progress).toHaveBeenCalledWith('WebGPU 模型下载 20%');
  worker.reply({type:'result',jobId:packet.jobId,data:{backend:'webgpu',vocab:['<pad>','a'],phones:[],elapsedMs:32}});
  expect((await result).backend).toBe('webgpu');
  expect(worker.terminated).toBe(false);
  runner.dispose();expect(worker.terminated).toBe(true);
 });
 it('terminates in-flight inference cleanly if the learner cancels',async()=>{
  vi.stubGlobal('Worker',FakeWorker);
  const runner=new BrowserPhonemeRunner();
  const ctl=new AbortController();
  const promise=runner.analyze(new Int16Array(16000),ctl.signal,()=>{});
  ctl.abort();
  await expect(promise).rejects.toThrow('取消');
  expect(FakeWorker.instances[0].terminated).toBe(true);
 });
});
