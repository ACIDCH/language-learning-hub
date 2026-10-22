/** Real model phoneme observations + rule-based IPA reference. Neither is a professional score. */
export type CandidatePhone={phone:string;start_s:number;end_s:number;logitMargin:number};
export type PhoneLevel='strong'|'close'|'uncertain'|'different'|'unknown';
export type PhoneTile={
 expected:string|null;observed:string|null;level:PhoneLevel;
 start_s?:number;end_s?:number;description:string;
};
const specials=new Set(['<pad>','<s>','</s>','<unk>','|','']);
const clean=(value:string)=>value.normalize('NFC');
const round=(value:number)=>Math.round(value*100)/100;

/** Framewise argmax + CTC collapse: must collapse repeats BEFORE dropping pad/blank. */
export function decodeCtc(logits:Float32Array,frames:number,classes:number,vocab:string[],duration:number):CandidatePhone[]{
 if(frames<=0||classes<2||frames*classes!==logits.length||
    frames>5000||classes>1000||vocab.length<classes)throw Error('声学输出张量格式不符合模型规范');
 const observed:CandidatePhone[]=[];
 let prev=-1;
 for(let i=0;i<frames;i++){
  const offset=i*classes;let best=0,second=-Infinity;
  for(let j=1;j<classes;j++)if(logits[offset+j]>logits[offset+best]){
   second=logits[offset+best];best=j;
  }else if(logits[offset+j]>second)second=logits[offset+j];
  if(best===prev){
   const last=observed[observed.length-1];
   if(last&&!specials.has(vocab[best])&&last.phone===vocab[best])last.end_s=round((i+1)*duration/frames);
   continue;
  }
  prev=best;
  const phone=vocab[best];
  if(!phone||specials.has(phone)||phone.startsWith('<'))continue;
  observed.push({phone:clean(phone),start_s:round(i*duration/frames),end_s:round((i+1)*duration/frames),
    logitMargin:Math.max(0,logits[offset+best]-second)});
 }
 return observed.slice(0,180);
}
/** Split generated IPA by this specific model's vocabulary, not by Unicode characters. */
export function tokenizeReferenceIpa(ipa:string,vocab:string[]):{phones:string[];unknown:string[]}{
 const candidates=[...new Set(vocab.filter(x=>!specials.has(x)&&!x.startsWith('<')))]
  .sort((a,b)=>[...b].length-[...a].length);
 const phones:string[]=[],unknown:string[]=[];
 const source=clean(ipa).replace(/[ˈˌˑ\u0361\u200d]/gu,'');
 for(let i=0;i<source.length;){
  const ch=source[i];
  if(/[\s\p{P}\p{N}]/u.test(ch)){i++;continue;}
  const match=candidates.find(p=>source.startsWith(p,i));
  if(match){phones.push(match);i+=match.length;}
  else{
   const code=String.fromCodePoint(source.codePointAt(i)!);
   unknown.push(code);i+=code.length;
  }
 }
 return {phones:phones.slice(0,180),unknown:unknown.slice(0,50)};
}
/** Sequence alignment; color grades encode model evidence only, not correctness. */
export function alignPhoneColors(reference:string[],heard:CandidatePhone[]):PhoneTile[]{
 const expected=reference.slice(0,180),observed=heard.slice(0,180);
 const n=expected.length,m=observed.length;
 if(!n)return [];
 const dp=Array.from({length:n+1},()=>new Uint16Array(m+1));
 for(let i=0;i<=n;i++)dp[i][0]=i;
 for(let j=0;j<=m;j++)dp[0][j]=j;
 for(let i=1;i<=n;i++)for(let j=1;j<=m;j++)
  dp[i][j]=Math.min(dp[i-1][j]+1,dp[i][j-1]+1,
   dp[i-1][j-1]+(expected[i-1]===observed[j-1].phone?0:1));
 const reversed:PhoneTile[]=[];
 let i=n,j=m;
 while(i||j){
  if(i&&j&&dp[i][j]===dp[i-1][j-1]+(expected[i-1]===observed[j-1].phone?0:1)){
   const ref=expected[--i],got=observed[--j],match=ref===got.phone;
   const level:PhoneLevel=match?(got.logitMargin>=2.5?'strong':'close'):(got.logitMargin<1.25?'uncertain':'different');
   reversed.push({expected:ref,observed:got.phone,level,start_s:got.start_s,end_s:got.end_s,
    description:match?(level==='strong'?'候选匹配（证据较稳定）':'候选匹配（低置信）'):
     level==='uncertain'?'模型暂不确定，请重听':'模型候选与参考不同，建议复练'});
  }else if(i&&dp[i][j]===dp[i-1][j]+1){
   reversed.push({expected:expected[--i],observed:null,level:'unknown',description:'未检测到对应音素，不能据此判错'});
  }else if(j){
   const got=observed[--j];
   reversed.push({expected:null,observed:got.phone,level:'uncertain',start_s:got.start_s,end_s:got.end_s,
    description:'模型产生额外候选，未能与参考对齐'});
  }
 }
 return reversed.reverse();
}
export const phoneLevelLabels:Record<PhoneLevel,string>={
 strong:'候选相符',close:'相符·待核',uncertain:'待确认',different:'候选差异',unknown:'无法判定'
};
