import React from 'react';
import {afterEach,beforeEach,describe,expect,it,vi} from 'vitest';
import {act,cleanup,fireEvent,render,screen,waitFor} from '@testing-library/react';
import {analyzeBrowserAudio,browserWavBlob} from '../src/browserAudioAnalysis';
import BrowserSpeechFeedback from '../src/BrowserSpeechFeedback';
import {captureSpeech} from '../src/speechCapture';

vi.mock('../src/speechCapture',()=>({captureSpeech:vi.fn()}));
function sine(seconds:number,level=.2){
 const out=new Int16Array(Math.round(seconds*16000));
 for(let i=0;i<out.length;i++)out[i]=Math.round(32767*level*Math.sin(2*Math.PI*180*i/16000));
 return out;
}
function joined(...segments:Int16Array[]){
 const out=new Int16Array(segments.reduce((sum,p)=>sum+p.length,0));
 let start=0;for(const s of segments){out.set(s,start);start+=s.length;}return out;
}
beforeEach(()=>{
 Object.defineProperty(URL,'createObjectURL',{configurable:true,value:vi.fn(()=> 'blob:mic-clip')});
 Object.defineProperty(URL,'revokeObjectURL',{configurable:true,value:vi.fn()});
});
afterEach(()=>{cleanup();vi.clearAllMocks();vi.unstubAllGlobals();});
describe('offline microphone energy analysis',()=>{
 it('does not hallucinate a pronunciation result from silence',()=>{
  const r=analyzeBrowserAudio(new Int16Array(16000));
  expect(r.usable).toBe(false);
  expect(r.pauseCount).toBe(0);
  expect(r.voicedSeconds).toBe(0);
  expect(r.advice[0]).toContain('声音信号较弱');
  expect(r.bars.every(x=>x===0)).toBe(true);
 });
 it('detects speech-like sound and an internal pause without a cloud model',()=>{
  const pcm=joined(sine(.65),new Int16Array(9600),sine(.7));
  const r=analyzeBrowserAudio(pcm);
  expect(r.usable).toBe(true);
  expect(r.durationSeconds).toBeCloseTo(1.95,2);
  expect(r.pauseCount).toBe(1);
  expect(r.pauseSeconds).toBeGreaterThanOrEqual(.55);
  expect(r.voicedSeconds).toBeGreaterThan(1.2);
  expect(r.meanLevelPercent).toBeGreaterThan(0);
  expect(r.bars.length).toBeLessThanOrEqual(48);
 });
 it('reports clipping as a recording issue, never as incorrect phonemes',()=>{
  const r=analyzeBrowserAudio(new Int16Array(16000).fill(32767));
  expect(r.clipping).toBe(true);
  expect(r.advice.join(' ')).toContain('削波');
  expect(r).not.toHaveProperty('phonemeScore');
 });
 it('generates valid in-memory mono PCM16 WAV for self-review',async()=>{
  const pcm=sine(1);
  const wav=browserWavBlob(pcm),bytes=new DataView(await wav.arrayBuffer());
  const str=(at:number,n:number)=>Array.from({length:n},(_,i)=>String.fromCharCode(bytes.getUint8(at+i))).join('');
  expect(str(0,4)).toBe('RIFF');
  expect(str(8,4)).toBe('WAVE');
  expect(str(36,4)).toBe('data');
  expect(bytes.getUint32(24,true)).toBe(16000);
  expect(bytes.getUint16(22,true)).toBe(1);
  expect(bytes.getUint32(40,true)).toBe(pcm.length*2);
  expect(wav.size).toBe(44+pcm.length*2);
 });
 it('rejects zero or unusually long inputs rather than allocating a huge WAV',()=>{
  expect(()=>analyzeBrowserAudio(new Int16Array(0))).toThrow('长度');
  expect(()=>browserWavBlob(new Int16Array(200000))).toThrow('无有效短录音');
 });
});
describe('browser-only recording UI',()=>{
 it('records, processes, plays back and revokes audio without any network call',async()=>{
  const fetchMock=vi.fn();vi.stubGlobal('fetch',fetchMock);
  let finish!:(pcm:Int16Array)=>void;
  const done=new Promise<Int16Array>(resolve=>{finish=resolve;});
  const stop=vi.fn(()=>finish(sine(1.25)));
  vi.mocked(captureSpeech).mockResolvedValue({stop,done});
  render(<BrowserSpeechFeedback target="Bonjour, Marie."/>);
  fireEvent.click(screen.getByRole('button',{name:'开始录音并分析'}));
  await screen.findByRole('button',{name:'停止并分析'});
  fireEvent.click(screen.getByRole('button',{name:'停止并分析'}));
  await screen.findByLabelText('浏览器录音分析结果');
  expect(screen.getByLabelText('回听刚才的录音')).toBeTruthy();
  expect(fetchMock).not.toHaveBeenCalled();
  fireEvent.click(screen.getByRole('button',{name:'清除本次结果'}));
  expect(URL.revokeObjectURL).toHaveBeenCalledWith('blob:mic-clip');
  expect(screen.queryByLabelText('回听刚才的录音')).toBeNull();
 });
 it('cancels microphone permission and does not interpret late recordings',async()=>{
  const stop=vi.fn();
  let grant!:(value:{stop:()=>void;done:Promise<Int16Array>})=>void;
  vi.mocked(captureSpeech).mockImplementation(()=>new Promise(resolve=>{grant=resolve;}));
  render(<BrowserSpeechFeedback target="Hello"/>);
  fireEvent.click(screen.getByRole('button',{name:'开始录音并分析'}));
  fireEvent.click(screen.getByRole('button',{name:'取消录音'}));
  await act(async()=>grant({stop,done:Promise.resolve(sine(1))}));
  expect(screen.queryByLabelText('浏览器录音分析结果')).toBeNull();
  expect(URL.createObjectURL).not.toHaveBeenCalled();
 });
});
