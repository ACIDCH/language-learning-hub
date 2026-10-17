/** Memory-only capture. Never writes Blob URLs, IndexedDB, storage or audio files. */
export async function decodePCM(blob:Blob):Promise<Int16Array> {
 if(blob.size>4_000_000)throw new Error('录音过大，请使用不超过 12 秒的短句。');
 const context=new AudioContext();
 try {
  const audio=await context.decodeAudioData(await blob.arrayBuffer());
  if(audio.duration<.35||audio.duration>12.2)throw new Error('请录制 0.35–12 秒的短句。');
  const size=Math.min(192000,Math.floor(audio.duration*16000));
  const offline=new OfflineAudioContext(1,size,16000);
  const source=offline.createBufferSource();source.buffer=audio;source.connect(offline.destination);source.start();
  const resampled=await offline.startRendering(),samples=resampled.getChannelData(0);
  const pcm=Int16Array.from(samples,x=>Math.round(Math.max(-1,Math.min(1,x))*32767));
  samples.fill(0);for(let i=0;i<audio.numberOfChannels;i++)audio.getChannelData(i).fill(0);
  return pcm;
 } finally {await context.close();}
}
export async function captureSpeech(signal:AbortSignal) {
 if(!navigator.mediaDevices?.getUserMedia||!window.MediaRecorder)throw new Error('此浏览器无法录音，请使用免费浏览器识别模式。');
 const stream=await navigator.mediaDevices.getUserMedia({audio:{channelCount:1,echoCancellation:true,noiseSuppression:true}});
 if(signal.aborted){stream.getTracks().forEach(t=>t.stop());throw new DOMException('Cancelled','AbortError');}
 let recorder:MediaRecorder;
 try {recorder=new MediaRecorder(stream);}catch(e){stream.getTracks().forEach(t=>t.stop());throw e;}
 const chunks:Blob[]=[];let timer:ReturnType<typeof setTimeout>;
 let settled=false;
 const done=new Promise<Int16Array>((resolve,reject)=>{
  const cleanup=()=>{clearTimeout(timer);stream.getTracks().forEach(t=>t.stop());signal.removeEventListener('abort',abort);};
  const abort=()=>{if(settled)return;settled=true;chunks.length=0;cleanup();if(recorder.state!=='inactive')recorder.stop();reject(new DOMException('Cancelled','AbortError'));};
  signal.addEventListener('abort',abort,{once:true});
  recorder.ondataavailable=e=>{if(!settled&&e.data.size)chunks.push(e.data);};
  recorder.onerror=()=>{if(settled)return;settled=true;cleanup();chunks.length=0;reject(new Error('录音设备失败，请检查麦克风后重试。'));};
  recorder.onstop=async()=>{cleanup();if(settled)return;settled=true;try {const blob=new Blob(chunks,{type:recorder.mimeType});chunks.length=0;resolve(await decodePCM(blob));}catch(e){reject(e);}};
  try {recorder.start();timer=setTimeout(()=>{if(recorder.state!=='inactive')recorder.stop();},11500);}catch(e){settled=true;cleanup();reject(e);}
 });
 return {stop:()=>{if(recorder.state!=='inactive')recorder.stop();},done};
}
