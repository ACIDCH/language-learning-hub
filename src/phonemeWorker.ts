import {decodeCtc,type CandidatePhone} from './phonemeEvidence';
const MODEL='qnighy/wav2vec2-xlsr-53-espeak-cv-ft-ONNX';
const CDN='https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.8.1';
type Processor=(audio:Float32Array)=>Promise<unknown>;
type InferenceModel=(inputs:unknown)=>Promise<{logits:{dims:number[];data:Float32Array}}>;
type Library={
 AutoModelForCTC:{from_pretrained:(model:string,options:Record<string,unknown>)=>Promise<InferenceModel>};
 Wav2Vec2FeatureExtractor:{from_pretrained:(model:string)=>Promise<Processor>};
};
type Inbound={type:'analyze';jobId:number;pcm:Float32Array};
type Scope={onmessage:((event:MessageEvent<Inbound>)=>void)|null;postMessage:(value:unknown)=>void};
const ctx=self as unknown as Scope;
let loaded:Promise<{model:InferenceModel;extractor:Processor;vocab:string[];backend:'webgpu'|'wasm'}>|null=null;
let modules:Promise<Library>|null=null;
function progress(jobId:number,message:string){ctx.postMessage({type:'progress',jobId,message});}
async function init(jobId:number){
 if(!modules)modules=import(/* @vite-ignore */ CDN) as Promise<Library>;
 progress(jobId,'正在加载浏览器 ONNX 运行时…');
 const {AutoModelForCTC,Wav2Vec2FeatureExtractor}=await modules;
 const vocabResponse=await fetch('https://huggingface.co/'+MODEL+'/resolve/main/vocab.json',{cache:'force-cache'});
 if(!vocabResponse.ok)throw Error('音素词表无法下载（HTTP '+vocabResponse.status+'）');
 const vocabObject=await vocabResponse.json() as Record<string,number>;
 const vocab:string[]=[];
 for(const [phone,index] of Object.entries(vocabObject)){
  if(!Number.isInteger(index)||index<0||index>999)throw Error('音素词表存在不支持的索引');
  vocab[index]=phone;
 }
 const extractor=await Wav2Vec2FeatureExtractor.from_pretrained(MODEL);
 const hasGPU=!!(self.navigator as Navigator & {gpu?:{requestAdapter:()=>Promise<unknown>}}).gpu;
 if(hasGPU){
  try{
   progress(jobId,'首次使用需要下载约 188MB WebGPU 音素模型；正在初始化 GPU…');
   const model=await AutoModelForCTC.from_pretrained(MODEL,{
    device:'webgpu',dtype:'q4f16',progress_callback:(value:{progress?:number;status?:string})=>{
     if(typeof value.progress==='number')progress(jobId,'WebGPU 模型下载 / 初始化 '+Math.round(value.progress)+'%');
    }
   });
   return {model,extractor,vocab,backend:'webgpu' as const};
  }catch{
   progress(jobId,'该设备的 WebGPU 模型无法使用，回退浏览器 WASM（约 230MB）。');
  }
 }
 progress(jobId,'正在加载约 230MB 的浏览器 WASM 音素模型…');
 const model=await AutoModelForCTC.from_pretrained(MODEL,{
  device:'wasm',dtype:'q4',progress_callback:(value:{progress?:number})=>{
   if(typeof value.progress==='number')progress(jobId,'WASM 音素模型下载 / 初始化 '+Math.round(value.progress)+'%');
  }
 });
 return {model,extractor,vocab,backend:'wasm' as const};
}
async function analyze(jobId:number,pcm:Float32Array){
 if(!loaded)loaded=init(jobId).catch(e=>{loaded=null;throw e;});
 const ready=await loaded;
 progress(jobId,'正在使用 '+(ready.backend==='webgpu'?'WebGPU':'WASM')+' 在浏览器本地分析音素…');
 const began=performance.now();
 try{
  const {logits}=await ready.model(await ready.extractor(pcm));
  const dims=logits.dims;
  if(dims.length!==3||dims[0]!==1)throw Error('音素输出维度不正确');
  const phones:CandidatePhone[]=decodeCtc(logits.data,dims[1],dims[2],ready.vocab,pcm.length/16000);
  return {phones,vocab:ready.vocab,backend:ready.backend,elapsedMs:Math.round(performance.now()-began)};
 }finally{pcm.fill(0);}
}
ctx.onmessage=event=>{
 if(event.data.type!=='analyze')return;
 const {pcm,jobId}=event.data;
 void analyze(jobId,pcm).then(data=>ctx.postMessage({type:'result',jobId,data}))
 .catch(e=>{pcm.fill(0);ctx.postMessage({type:'error',jobId,message:e instanceof Error?e.message:'音素识别失败'});});
};
