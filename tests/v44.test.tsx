import React from 'react';
import {afterEach,beforeEach,describe,it,expect,vi} from 'vitest';
import {act,cleanup,fireEvent,render,screen,waitFor} from '@testing-library/react';
import {readFileSync} from 'node:fs';
import PasswordInput from '../src/PasswordInput';
import {cleanPreferences,DEFAULT_PREFERENCES,exportPreferences} from '../src/v44Preferences';
import {COURSES,loadCourse,catalogRoute,courseRoute,foundationText} from '../src/v44Courses';
import {mergeLearningState,useCourseProgress} from '../src/useCourseProgress';
import {selectedOriginal} from '../src/CourseReader';
import {AISettingsProvider} from '../src/AISettings';
import AITutor from '../src/AITutor';
import AppShell from '../src/AppShell';
import AccountAccess from '../src/AccountAccess';
import SelectionInspector from '../src/SelectionInspector';
import type {Session,SupabaseClient} from '@supabase/supabase-js';
const request=vi.hoisted(()=>vi.fn());
vi.mock('../src/v44Connection',()=>({cloudClient:null,apiBase:'https://example.test',cloudRequest:request}));
vi.mock('../src/IpaText',()=>({default:({text}:{text:string})=><div>{text}</div>,speakIpaText:()=>true}));
const session={user:{id:'test-owner'},access_token:'test-token'} as Session;
beforeEach(()=>{localStorage.clear();history.replaceState({},'','/');vi.stubGlobal('scrollTo',vi.fn());request.mockReset();vi.stubGlobal('fetch',vi.fn(async(url:string)=>new Response(readFileSync('public'+url,'utf8'))));});
afterEach(()=>{cleanup();vi.unstubAllGlobals();});
describe('V4.4 integration contracts',()=>{
 it('opens all 156 genuine detail payloads with existing foundation fields and original appendices',async()=>{
  expect(COURSES).toHaveLength(156);
  for(const course of COURSES){const data=await loadCourse(course);expect(data.text.length).toBeGreaterThan(350);expect(data.text).not.toContain('此处添加示例');if(data.foundation){for(const text of [...data.foundation.concepts,...data.foundation.examples,data.foundation.reading,data.foundation.listening,data.foundation.production,data.foundation.commonMistake])expect(foundationText(data.foundation)).toContain(text);}}
  const a1=await loadCourse(COURSES.find(c=>c.id==='fr-a1-u01')!);expect(a1.appendices).toHaveLength(1);
 });
 it('makes safe preferences independent and exports no credential fields',()=>{
  const p=cleanPreferences({...DEFAULT_PREFERENCES,theme:'night',layout:'focus',apiKey:'secret',fontSize:999,ttsRate:-2});
  expect(p.theme).toBe('night');expect(p.layout).toBe('focus');expect(p.fontSize).toBe(26);expect(p.ttsRate).toBe(.5);expect(exportPreferences(p)).not.toMatch(/secret|apiKey/);
 });
 it('reveals and hides a password without clearing it or submitting',()=>{
  const submit=vi.fn();render(<form onSubmit={submit}><label>Password<PasswordInput defaultValue="private-test-value"/></label></form>);
  const input=screen.getByLabelText('Password') as HTMLInputElement;
  fireEvent.click(screen.getByRole('button',{name:'显示密码'}));expect(input.type).toBe('text');expect(input.value).toBe('private-test-value');
  fireEvent.click(screen.getByRole('button',{name:'隐藏密码'}));expect(input.type).toBe('password');expect(submit).not.toHaveBeenCalled();
 });
 it('keeps real Supabase login invocation with the accessible password control',async()=>{
  const signInWithPassword=vi.fn().mockResolvedValue({error:null});const notify=vi.fn();render(<AccountAccess client={{auth:{signInWithPassword}} as unknown as SupabaseClient} recoveryMode={false} onRecoveryComplete={()=>{}} onNotify={notify}/>);
  fireEvent.change(screen.getByLabelText('邮箱'),{target:{value:'reader@example.test'}});fireEvent.change(screen.getByLabelText('密码'),{target:{value:'example-pass'}});
  fireEvent.click(screen.getByRole('button',{name:'显示密码'}));fireEvent.submit(screen.getByLabelText('邮箱').closest('form')!);
  await waitFor(()=>expect(signInWithPassword).toHaveBeenCalledWith({email:'reader@example.test',password:'example-pass'}));expect(notify).toHaveBeenCalled();
 });
 it('preserves opaque existing progress and answer keys',()=>{
  const merged=mergeLearningState({stage:2,notes:'kept',answers:{'9':1},practiceChecklist:{read:true}},{answers:{'0':2}});
  expect(merged).toEqual({stage:2,notes:'kept',answers:{'9':1,'0':2},practiceChecklist:{read:true}});
 });
 it('round-trips the existing main-course endpoint without deleting older progress fields',async()=>{
  request.mockResolvedValueOnce({progress:{state:{notes:'old',practiceChecklist:{read:true}},updated_at:'2026-10-17'}}).mockResolvedValueOnce({saved:true});
  function Probe(){const p=useCourseProgress(COURSES[0],session);return <><button disabled={!p.ready} onClick={()=>p.change({notes:'edited'})}>edit</button><button onClick={()=>void p.save()}>save</button><p>{p.status}</p></>;}
  render(<Probe/>);await waitFor(()=>expect((screen.getByText('edit') as HTMLButtonElement).disabled).toBe(false));fireEvent.click(screen.getByText('edit'));fireEvent.click(screen.getByText('save'));
  await waitFor(()=>expect(request).toHaveBeenCalledTimes(2));const body=JSON.parse(request.mock.calls[1][2].body);expect(body.state).toEqual({notes:'edited',practiceChecklist:{read:true}});expect(request.mock.calls[1][2].method).toBe('PUT');
 });
 it('does not enable overwrite when remote progress failed to load',async()=>{
  request.mockRejectedValue(new Error('offline'));
  function Probe(){const p=useCourseProgress(COURSES[0],session);return <><button disabled={!p.ready} onClick={()=>void p.save()}>save</button><p>{p.status}</p></>;}
  render(<Probe/>);await screen.findByText(/已禁止覆盖保存/);expect((screen.getByText('save') as HTMLButtonElement).disabled).toBe(true);
 });
 it('extracts accented selections without ruby annotations and rejects other-page selections',()=>{
  const scope=document.createElement('div');scope.innerHTML='<p>J’aime <ruby>l’école<rt>lekɔl</rt></ruby>.</p>';document.body.append(scope);
  const r=document.createRange();r.selectNodeContents(scope);const selection=window.getSelection()!;selection.removeAllRanges();selection.addRange(r);
  expect(selectedOriginal(scope,selection)?.text).toBe('J’aime l’école.');expect(selectedOriginal(document.createElement('div'),selection)).toBeNull();scope.remove();selection.removeAllRanges();
 });
 it('shares AI enable state while refusing unconfigured requests and never inventing an answer',()=>{
  render(<AISettingsProvider><AITutor session={null} apiBase="https://example.test" courseId="fr-a1-u01" language="fr" lessonText="Bonjour"/><AITutor compact session={null} apiBase="https://example.test" courseId="fr-a1-u01" language="fr" lessonText="Bonjour"/></AISettingsProvider>);
  fireEvent.click(screen.getAllByRole('checkbox')[0]);expect((screen.getAllByRole('checkbox')[1] as HTMLInputElement).checked).toBe(true);expect(screen.getAllByText(/AI 未配置/)).toHaveLength(2);expect(fetch).not.toHaveBeenCalled();expect(screen.queryByLabelText('AI 模型生成的教学反馈')).toBeNull();
 });
 it('passes the accented selection into the existing speech practice target',()=>{
  render(<AISettingsProvider><SelectionInspector selection={{text:'Enchanté',context:'Bonjour. Enchanté !'}} language="fr" courseId="fr-a1-u01" vocabulary={[]} session={null} rate={.85} onClose={()=>{}} onNote={()=>{}} onFavorite={()=>{}}/></AISettingsProvider>);
  expect((screen.getByRole('textbox',{name:'练习短句（fr-FR）'}) as HTMLTextAreaElement).value).toBe('Enchanté');
  expect(screen.getByText(/基础模式未进行音素评估/)).toBeTruthy();
  expect(fetch).not.toHaveBeenCalled();
 });
 it('restores a course deep link on back/forward and keeps notes across theme/layout changes',async()=>{
  const course=COURSES.find(c=>c.id==='fr-a1-u04')!;history.replaceState({},'',courseRoute(course));render(<AISettingsProvider><AppShell/></AISettingsProvider>);
  const notes=await screen.findByLabelText('学习笔记');await waitFor(()=>expect((notes as HTMLTextAreaElement).disabled).toBe(false));fireEvent.change(notes,{target:{value:'retain this note'}});
  fireEvent.change(screen.getByLabelText('网站外观'),{target:{value:'night'}});fireEvent.change(screen.getByLabelText('显示布局'),{target:{value:'focus'}});
  expect((screen.getByLabelText('学习笔记') as HTMLTextAreaElement).value).toBe('retain this note');expect(document.body.dataset.theme).toBe('night');
  act(()=>{history.pushState({},'',catalogRoute('fr','A1'));window.dispatchEvent(new PopStateEvent('popstate'));});expect(screen.getByRole('heading',{name:'你的语言学习目录'})).toBeTruthy();
  act(()=>{history.replaceState({},'',courseRoute(course));window.dispatchEvent(new PopStateEvent('popstate'));});expect((await screen.findByLabelText('学习笔记') as HTMLTextAreaElement).value).toBe('retain this note');
 });
});
