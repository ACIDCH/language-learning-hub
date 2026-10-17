/** Speech results deliberately keep transcript evidence separate from acoustics. */
export type SpeechEngineId = 'browser-asr' | 'optional-local-evaluator' | 'optional-remote-evaluator';
export type PhoneObservation = {expected:string|null;phone:string|null;kind:'match'|'different'|'not_detected'|'additional';start_s?:number;end_s?:number};
export type PracticeReference = {available:boolean;percent:number|null;calibrated:false;reference_phones:number;observed_phones:number;method:'generated_g2p_vs_greedy_ctc_edit_agreement';reason?:'short_reference'|'insufficient_observation'|'unstable_coverage'|'unsupported_reference'|null;alignment_edits?:number};
export type SpeechResult = {engine:SpeechEngineId;status:'transcript-only'|'experimental'|'unscorable';canScore:false;transcript?:string;phones?:PhoneObservation[];elapsed_ms?:number;signal?:{duration_s:number;rms:number;low_energy_s:number;rejection:string|null};reference_unknown?:string[];reason?:'empty_model_output'|'empty_reference';practice_reference?:PracticeReference};
export const ENGINES = [
 {id:'browser-asr',name:'免费基础：浏览器文字识别',available:true},
 {id:'optional-local-evaluator',name:'实验性：本机音素练习参考值',available:true},
 {id:'optional-remote-evaluator',name:'远程声学服务（未配置，不发送录音）',available:false},
] as const;
export function browserResult(transcript:string):SpeechResult {return {engine:'browser-asr',status:'transcript-only',canScore:false,transcript};}
export function localAllowed(host:string) {return host==='localhost'||host==='127.0.0.1';}
export async function evaluateLocal(pcm:Int16Array,target:string,language:string,signal:AbortSignal):Promise<SpeechResult> {
 if(!localAllowed(location.hostname))throw new Error('声学原型仅在本机预览运行；云端页面请使用免费浏览器模式。');
 if(pcm.length<5600||pcm.length>192000)throw new Error('请使用 0.35–12 秒短句。');
 const bytes=new Uint8Array(pcm.length*2),view=new DataView(bytes.buffer);
 pcm.forEach((x,i)=>view.setInt16(i*2,x,true));
 let encoded=''; for(let i=0;i<bytes.length;i+=8192)encoded+=String.fromCharCode(...bytes.subarray(i,i+8192));
 try {
  const response=await fetch('http://127.0.0.1:8776/evaluate',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({pcm:btoa(encoded),target,language}),signal,cache:'no-store',credentials:'omit'});
  const value=await response.json(); if(!response.ok)throw new Error(typeof value.detail==='string'?value.detail:'本机声学请求被拒绝');
  if(value.engine!=='optional-local-evaluator'||value.canScore!==false||!Array.isArray(value.phones))throw new Error('声学服务返回了不兼容的结果');
  const ref=value.practice_reference;
  if(ref!==undefined&&(
    typeof ref!=='object'||ref===null||typeof ref.available!=='boolean'||ref.calibrated!==false||
    (ref.available&&(!Number.isInteger(ref.percent)||ref.percent<0||ref.percent>100))||
    (!ref.available&&ref.percent!==null)
  ))throw new Error('声学服务返回了不兼容的音素参考值');
  return value;
 } finally {bytes.fill(0);pcm.fill(0);encoded='';}
}

/** Derived from the currently loaded manuscript, never a duplicate course catalogue. */
export function lessonPractice(text:string,stage:'word'|'sentence'|'paragraph'):string[] {
 const lines=text.normalize('NFC').split(/\r?\n/).map(x=>x.replace(/^\s*(?:[-*•]|\d+[.)])\s*/, '').trim())
  .filter(x=>x.length>1&&!/[\u3400-\u9fff]|https?:|Réponse|参考|UNITÉ|\bAnswer\b|^[#①②③④⑤⑥]/i.test(x));
 const sentences=lines.flatMap(x=>(x.match(/[^.!?]+[.!?]?/g)||[]).map(y=>y.trim())).filter(x=>x.length>2&&x.length<=240);
 const values=stage==='word'?sentences.flatMap(x=>x.match(/[\p{L}\p{M}]+(?:[’'][\p{L}\p{M}]+)*/gu)||[]):stage==='sentence'?sentences:lines.filter(x=>x.length>50&&x.length<=400);
 return [...new Set(values)].slice(0,20);
}

export function phoneHint(phone:string,language:string):string {
 if(language==='fr') {
  if(/[ɑɛɔœ]̃/.test(phone))return '鼻化元音：保持一个元音，让气流同时经过口鼻；不要在末尾额外加 n/m。对照 pain / pas、bon / beau。地区变体可能合并 un 与 in。';
  if(phone==='y'||phone==='u')return 'tu / tout：/y/ 舌位接近 i，同时圆唇；/u/ 舌位更靠后。先分别发 i—y—u，再放回短句。';
  if(phone==='z'||phone==='t'||phone==='n')return '先核对连诵语境：les amis、vous êtes 中的 /z/ 可连接下一个元音。不要把所有词尾辅音都读出来；当前模型不能判定连诵规则是否正确。';
 }
 if(phone==='ɪ'||phone==='iː')return 'ship / sheep：先对比舌位和音质，再比较时长；不要只靠拉长 /ɪ/ 模仿 /iː/。';
 if(phone==='θ'||phone==='ð')return 'thin / then：舌尖轻触上下门齿附近，气流持续；/ð/ 声带振动，/θ/ 不振动。避免完全闭塞成 t/d。';
 if(phone==='æ'||phone==='ɛ'||phone==='ʌ')return 'cat / cut / bet：先单独对比开口度和舌位，再回到原句。口音存在合理差异，本观察不判定口音优劣。';
 return '听示范后，把这个音放在短词和原句中各练一次。这里显示模型候选差异，不是已确认的发音错误。';
}
