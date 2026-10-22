/** Browser-only 16 kHz PCM review. Relative energy ≠ phoneme correctness or proficiency. */
export type BrowserAudioReview={
 durationSeconds:number; voicedSeconds:number; pauseSeconds:number; pauseCount:number;
 meanLevelPercent:number; peakLevelPercent:number; clipping:boolean; usable:boolean;
 bars:number[]; advice:string[];
};
const HZ=16000;
const FRAME=320; // 20 ms: deliberately small deterministic DSP, no model download.
const seconds=(frames:number)=>Number((frames*FRAME/HZ).toFixed(2));
const percentage=(fraction:number)=>Math.round(Math.max(0,Math.min(1,fraction))*100);

export function analyzeBrowserAudio(pcm:Int16Array):BrowserAudioReview{
 if(pcm.length===0||pcm.length>HZ*12.2)throw Error('录音长度不支持；请使用不超过 12 秒的短句。');
 const energies:number[]=[];
 let maxAmplitude=0,clipped=0;
 for(let i=0;i<pcm.length;i+=FRAME){
  let sum=0;
  const end=Math.min(i+FRAME,pcm.length);
  for(let j=i;j<end;j++){
   const value=pcm[j]/32768,abs=Math.abs(value);
   sum+=value*value;
   if(abs>maxAmplitude)maxAmplitude=abs;
   if(abs>=.985)clipped++;
  }
  energies.push(Math.sqrt(sum/(end-i)));
 }
 const maxEnergy=Math.max(...energies);
 const ordered=[...energies].sort((a,b)=>a-b);
 const noiseFloor=ordered[Math.floor(ordered.length*.12)]||0;
 const threshold=Math.max(.012,Math.min(.10,Math.max(maxEnergy*.14,noiseFloor*2.5)));
 const usable=maxEnergy>=.018;
 const voiced=energies.map(value=>usable&&value>=threshold);
 // Fill very short dips so plosives and microphone gating aren't counted as pauses.
 for(let i=0;i<voiced.length;){
  if(voiced[i]){i++;continue;}
  let j=i;while(j<voiced.length&&!voiced[j])j++;
  if(i>0&&j<voiced.length&&j-i<=5)for(let k=i;k<j;k++)voiced[k]=true;
  i=j;
 }
 // Discard isolated transients < 60 ms.
 for(let i=0;i<voiced.length;){
  if(!voiced[i]){i++;continue;}
  let j=i;while(j<voiced.length&&voiced[j])j++;
  if(j-i<3)for(let k=i;k<j;k++)voiced[k]=false;
  i=j;
 }
 const first=voiced.indexOf(true),last=voiced.lastIndexOf(true);
 let voicedFrames=0,pauseFrames=0,pauseCount=0,sumLevel=0;
 for(let i=0;i<voiced.length;i++)if(voiced[i]){voicedFrames++;sumLevel+=energies[i];}
 if(first>=0)for(let i=first;i<=last;){
  if(voiced[i]){i++;continue;}
  let j=i;while(j<=last&&!voiced[j])j++;
  if(j-i>=14){pauseCount++;pauseFrames+=j-i;}
  i=j;
 }
 const bars=Array.from({length:Math.min(48,energies.length)},(_,i)=>{
  const start=Math.floor(i*energies.length/Math.min(48,energies.length));
  const end=Math.max(start+1,Math.floor((i+1)*energies.length/Math.min(48,energies.length)));
  const mean=energies.slice(start,end).reduce((a,b)=>a+b,0)/(end-start);
  return maxEnergy>0?percentage(mean/maxEnergy):0;
 });
 const meanLevel=voicedFrames?sumLevel/voicedFrames:0;
 const clipping=clipped/pcm.length>=.001;
 const advice:string[]=[];
 if(!usable||voicedFrames*FRAME/HZ<.3)advice.push('声音信号较弱或不足，不能可靠判断停顿；请靠近麦克风，在安静环境重新录音。');
 else{
  if(meanLevel<.04)advice.push('录音声音相对偏轻；可以稍靠近麦克风重新练习。');
  if(clipping)advice.push('检测到明显削波迹象；建议离麦克风稍远一些，避免爆音。');
  if(pauseCount>=2&&pauseFrames*FRAME/HZ>=.6)advice.push('录音中有多个较长停顿；可以先分块练习，再连起来朗读。');
  if(!advice.length)advice.push('音量和有声片段足以回听。请与示范朗读对照，再练一次；这些指标不判断音素准确性。');
 }
 return {
  durationSeconds:Number((pcm.length/HZ).toFixed(2)),voicedSeconds:seconds(voicedFrames),
  pauseSeconds:seconds(pauseFrames),pauseCount,
  meanLevelPercent:percentage(meanLevel),peakLevelPercent:percentage(maxAmplitude),
  clipping,usable:usable&&voicedFrames>=15,bars,advice:advice.slice(0,2)
 };
}
/** Transient WAV playback in browser memory only; revoke its object URL after use. */
export function browserWavBlob(pcm:Int16Array):Blob{
 if(!pcm.length||pcm.length>HZ*12.2)throw Error('无有效短录音');
 const buffer=new ArrayBuffer(44+pcm.length*2);
 const view=new DataView(buffer);
 const ascii=(position:number,value:string)=>{for(let i=0;i<value.length;i++)view.setUint8(position+i,value.charCodeAt(i));};
 ascii(0,'RIFF');view.setUint32(4,36+pcm.length*2,true);
 ascii(8,'WAVE');ascii(12,'fmt ');view.setUint32(16,16,true);
 view.setUint16(20,1,true);view.setUint16(22,1,true);
 view.setUint32(24,HZ,true);view.setUint32(28,HZ*2,true);
 view.setUint16(32,2,true);view.setUint16(34,16,true);
 ascii(36,'data');view.setUint32(40,pcm.length*2,true);
 for(let i=0;i<pcm.length;i++)view.setInt16(44+i*2,pcm[i],true);
 return new Blob([buffer],{type:'audio/wav'});
}
