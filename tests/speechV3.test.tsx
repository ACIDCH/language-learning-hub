import {afterEach,beforeEach,describe,expect,it,vi} from 'vitest';
import {act,cleanup,fireEvent,render,screen} from '@testing-library/react';
import SpeechPractice from '../src/SpeechPractice';
import LocalPronunciation from '../src/LocalPronunciation';
import {browserResult,ENGINES,evaluateLocal,lessonPractice,localAllowed,phoneHint} from '../src/speechEngines';
import {captureSpeech} from '../src/speechCapture';
import {appendAttempt,learnerCoaching} from '../src/speechCoach';
import {analyzeTranscript} from '../src/speechCompare';

class Recognition {
 static latest:Recognition;
 onresult:Function|null=null;onerror:Function|null=null;onend:Function|null=null;
 start=vi.fn();stop=vi.fn();abort=vi.fn();
 constructor(){Recognition.latest=this;}
}
beforeEach(()=>{vi.stubGlobal('SpeechRecognition',Recognition);vi.stubGlobal('speechSynthesis',{getVoices:()=>[],cancel:vi.fn(),addEventListener:vi.fn(),removeEventListener:vi.fn()});});
afterEach(()=>{cleanup();vi.useRealTimers();vi.unstubAllGlobals();});
function start(){render(<SpeechPractice language="fr"/>);fireEvent.click(screen.getByRole('button',{name:'Bonjour, comment allez-vous ?'}));fireEvent.click(screen.getByRole('button',{name:'② 开始跟读'}));return Recognition.latest;}

describe('browser lifecycle',()=>{
 it('does not treat engine confidence or a matched transcript as acoustic evidence',()=>{
  const rec=start();act(()=>rec.onresult?.({results:[{isFinal:true,length:1,0:{transcript:'Bonjour, comment allez-vous ?',confidence:.99}}]}));
  expect(screen.getByText(/这不是口音/)).toBeTruthy();expect(browserResult('hello').canScore).toBe(false);expect(browserResult('hello').phones).toBeUndefined();
 });
 it('reports a microphone denial and permits retry',()=>{
  const rec=start();act(()=>rec.onerror?.({error:'not-allowed'}));expect(screen.getByRole('status').textContent).toContain('无法访问麦克风');expect((screen.getByRole('button',{name:'② 开始跟读'}) as HTMLButtonElement).disabled).toBe(false);
 });
 it('ignores a stale callback when target changes',()=>{
  const rec=start();fireEvent.change(screen.getByRole('textbox'),{target:{value:'pain'}});act(()=>rec.onresult?.({results:[{isFinal:true,length:1,0:{transcript:'stale'}}]}));expect(screen.queryByText('stale')).toBeNull();expect(rec.abort).toHaveBeenCalled();
 });
 it('bounds a recognition service that never returns',()=>{
  vi.useFakeTimers();const rec=start();act(()=>vi.advanceTimersByTime(20001));expect(rec.abort).toHaveBeenCalled();expect(screen.getByRole('status').textContent).toContain('超时');
 });
 it('resets language/target and releases the previous engine',()=>{
  const view=render(<SpeechPractice language="fr"/>);fireEvent.click(screen.getByRole('button',{name:'Bonjour, comment allez-vous ?'}));fireEvent.click(screen.getByRole('button',{name:'② 开始跟读'}));const old=Recognition.latest;view.rerender(<SpeechPractice language="en"/>);expect(old.abort).toHaveBeenCalled();expect((screen.getByRole('textbox') as HTMLTextAreaElement).value).toBe('');expect((screen.getByLabelText('语言与口音') as HTMLSelectElement).value).toBe('en-US');
 });
 it('supports a missing Web Speech API without throwing',()=>{
  vi.stubGlobal('SpeechRecognition',undefined);start();expect(screen.getByRole('status').textContent).toContain('没有提供 Web Speech');
 });
});
describe('privacy and adapters',()=>{
 it('keeps remote evaluation disabled and only allows loopback',()=>{expect(ENGINES[2].available).toBe(false);expect(localAllowed('example.com')).toBe(false);expect(localAllowed('127.0.0.1')).toBe(true);});
 it('clears the request PCM on network failure',async()=>{
  vi.stubGlobal('fetch',vi.fn().mockRejectedValue(new Error('offline')));const pcm=new Int16Array(8000).fill(123);await expect(evaluateLocal(pcm,'pain','fr',new AbortController().signal)).rejects.toThrow('offline');expect(pcm.every(x=>x===0)).toBe(true);
 });
 it('rejects an incompatible service result instead of rendering a score',async()=>{
  vi.stubGlobal('fetch',vi.fn().mockResolvedValue({ok:true,json:async()=>({score:100,canScore:true})}));await expect(evaluateLocal(new Int16Array(8000),'pain','fr',new AbortController().signal)).rejects.toThrow('不兼容');
 });
 it('releases a stream granted after cancellation',async()=>{
  let grant!:(s:MediaStream)=>void;const stopped=vi.fn();vi.stubGlobal('navigator',{mediaDevices:{getUserMedia:()=>new Promise<MediaStream>(r=>grant=r)}});vi.stubGlobal('MediaRecorder',class{});
  const abort=new AbortController();const promise=captureSpeech(abort.signal);abort.abort();grant({getTracks:()=>[{stop:stopped}]} as unknown as MediaStream);await expect(promise).rejects.toMatchObject({name:'AbortError'});expect(stopped).toHaveBeenCalledOnce();
 });
 it('a microphone error leaves local mode retryable',async()=>{
  vi.stubGlobal('navigator',{mediaDevices:{getUserMedia:()=>Promise.reject(new Error('microphone denied'))}});vi.stubGlobal('MediaRecorder',class{});render(<LocalPronunciation target="pain" language="fr"/>);await act(async()=>fireEvent.click(screen.getByRole('button',{name:'录音并观察音素'})));expect(screen.getByRole('status').textContent).toContain('microphone denied');
 });
});
describe('course-derived teaching',()=>{
 it('extracts French Unicode text and excludes Chinese/meta instructions',()=>{
  const text='① 情境\n中文说明 Bonjour\nRéponse : oui\nÉmilie est là.\nJ’aime l’école.\nhttps://example.com';
  expect(lessonPractice(text,'sentence')).toEqual(['Émilie est là.','J’aime l’école.']);expect(lessonPractice(text,'word')).toContain('l’école');
 });
 it('keeps word/sentence/paragraph progression and bounds lists',()=>{
  const t='This is a sufficiently long paragraph for a short reading practice. Another sentence.';
  expect(lessonPractice(t,'paragraph')).toEqual([t]);expect(lessonPractice(t,'sentence')).toHaveLength(2);expect(lessonPractice(t,'word').length).toBeLessThanOrEqual(20);
 });
 it('offers articulation guidance while retaining uncertainty',()=>{expect(phoneHint('ɛ̃','fr')).toContain('口鼻');expect(phoneHint('θ','en')).toContain('门齿');expect(phoneHint('k','en')).toContain('不是已确认');});
});


describe('everyday learning feedback and course practice',()=>{
 it('coaches common text errors without turning recognition into a pronunciation score',()=>{
  const report=analyzeTranscript('Je voudrais un café','Je voudrais café');
  const feedback=learnerCoaching(report,'Je voudrais un café');
  expect(feedback.readyForNext).toBe(false);
  expect(feedback.focusWords).toContain('un');
  expect(feedback.instruction).toContain('识别差异');
 });
 it('preserves French accents in targeted replay words',()=>{
  const report=analyzeTranscript("Je voudrais un café.",'Je voudrais un thé');
  const feedback=learnerCoaching(report,"Je voudrais un café.");
  expect(feedback.focusWords).toContain('café');
 });
 it('treats matching written transcript as a next-step hint, not calibrated pronunciation',()=>{
  const report=analyzeTranscript('Bonjour, Chloé !','bonjour Chloe');
  const feedback=learnerCoaching(report,'Bonjour, Chloé !');
  expect(feedback.readyForNext).toBe(true);
  expect(feedback.instruction).toContain('不代表口音');
  expect(feedback.focusWords).toEqual([]);
 });
 it('limits transient history to the last five attempts',()=>{
  let recent:ReturnType<typeof appendAttempt>=[];
  for(let i=1;i<=8;i++)recent=appendAttempt(recent,{id:i,target:'pain',heard:'pain',match:true});
  expect(recent.map(x=>x.id)).toEqual([4,5,6,7,8]);
 });
 it('starts with a curriculum-owned sample rather than generic content',()=>{
  render(<SpeechPractice language="fr" initialTarget="Je suis étudiant." lessonText="Je suis étudiant.\nBonjour, Marie."/>);
  expect((screen.getByRole('textbox') as HTMLTextAreaElement).value).toBe('Je suis étudiant.');
  expect(screen.getByRole('button',{name:/Bonjour, Marie\./})).toBeTruthy();
  fireEvent.click(screen.getByRole('button',{name:'换一句练习 →'}));
  expect((screen.getByRole('textbox') as HTMLTextAreaElement).value).toBe('Bonjour, Marie.');
 });
 it('shows the mismatch and lets a learner drill then return to the full sentence',()=>{
  render(<SpeechPractice language="fr" initialTarget="Je voudrais un café."/>);
  fireEvent.click(screen.getByRole('button',{name:'② 开始跟读'}));
  const rec=Recognition.latest;
  act(()=>rec.onresult?.({results:[{isFinal:true,length:1,0:{transcript:'Je voudrais un thé'}}]}));
  expect(screen.getByText('优先练习识别不一致的词')).toBeTruthy();
  expect(screen.getByText('café')).toBeTruthy();
  fireEvent.click(screen.getByRole('button',{name:'只练这个词'}));
  expect((screen.getByRole('textbox') as HTMLTextAreaElement).value).toBe('café');
  fireEvent.click(screen.getByRole('button',{name:'返回完整句'}));
  expect((screen.getByRole('textbox') as HTMLTextAreaElement).value).toBe('Je voudrais un café.');
 });
 it('remembers one final recognition event only and clears attempts when switching sentences',()=>{
  render(<SpeechPractice language="en" initialTarget="Good morning."/>);
  fireEvent.click(screen.getByRole('button',{name:'② 开始跟读'}));
  const rec=Recognition.latest;
  act(()=>rec.onresult?.({results:[{isFinal:true,length:1,0:{transcript:'Good morning'}}]}));
  act(()=>rec.onresult?.({results:[{isFinal:true,length:1,0:{transcript:'Good morning'}}]}));
  expect(screen.getByText(/本句跟读记录（1 次/)).toBeTruthy();
  expect(rec.stop).toHaveBeenCalledOnce();
  expect((screen.getByRole('button',{name:'换一句练习 →'}) as HTMLButtonElement).disabled).toBe(false);
  fireEvent.click(screen.getByRole('button',{name:'换一句练习 →'}));
  expect(screen.queryByText(/本句跟读记录/)).toBeNull();
 });
});
