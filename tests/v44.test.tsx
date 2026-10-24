import AudioReview from '../src/AudioReview';
import React from 'react';
import {afterEach,beforeEach,describe,it,expect,vi} from 'vitest';
import {act,cleanup,fireEvent,render,screen,waitFor,within} from '@testing-library/react';
import {readFileSync} from 'node:fs';
import PasswordInput from '../src/PasswordInput';
import {cleanPreferences,DEFAULT_PREFERENCES,exportPreferences} from '../src/v44Preferences';
import {COURSES,loadCourse,catalogRoute,courseRoute,foundationText} from '../src/v44Courses';
import {mergeLearningState,useCourseProgress} from '../src/useCourseProgress';
import {selectedOriginal} from '../src/CourseReader';
import {AISettingsProvider} from '../src/AISettings';
import {cleanAiPreferences,publicAiPreferences} from '../src/useUserCloudSettings';
import {safeFavorites,mergeFavorites} from '../src/favoritesCloud';
import {validGoogleClientId,validDriveFolderId,driveFileKind} from '../src/googleDriveClient';
import {audioCoverage} from '../src/AudioCoverage';
import {setRuntimeSpeechEndpoint,cloudSpeechEndpoint} from '../src/speechEngines';
import AITutor from '../src/AITutor';
import AudioVault from '../src/AudioVault';
import AppShell from '../src/AppShell';
import AccountAccess from '../src/AccountAccess';
import SelectionInspector from '../src/SelectionInspector';
import {readRoute,parentRoute,routeCrumbs} from '../src/v44Routes';
import {draftPublication,assertDraftDeploymentAllowed} from '../src/v44Publication';
import {pickWorkerOrigin,PREVIEW_PAGES_ORIGIN,PREVIEW_API_BASE,isCloudWorkspaceConfigured} from '../src/previewWorker';
import viteConfig from '../vite.config';
import type {Session,SupabaseClient} from '@supabase/supabase-js';
const request=vi.hoisted(()=>vi.fn());
// Config-hook unit test needs the identity helper, not Vite/esbuild inside jsdom.
vi.mock('vite',()=>({defineConfig:(config:unknown)=>config,loadEnv:()=>({CF_PAGES_BRANCH:process.env.CF_PAGES_BRANCH,LLH_DEPLOY_TARGET:process.env.LLH_DEPLOY_TARGET})}));
vi.mock('../src/v44Connection',()=>({cloudClient:null,apiBase:'https://example.test',cloudRequest:request}));
vi.mock('../src/IpaText',()=>({default:({text}:{text:string})=><div>{text}</div>,speakIpaText:()=>true}));
const session={user:{id:'test-owner'},access_token:'test-token'} as Session;
beforeEach(()=>{localStorage.clear();history.replaceState({},'','/');vi.stubGlobal('scrollTo',vi.fn());request.mockReset();vi.stubGlobal('fetch',vi.fn(async(url:string)=>new Response(readFileSync('public'+url,'utf8'))));});
afterEach(()=>{cleanup();vi.unstubAllGlobals();vi.unstubAllEnvs();});
describe('V4.4 integration contracts',()=>{
 it('separates 377 audio references from real uploaded and verified files',()=>{
  const rows=[
   {asset_id:'fr-a1-u01-dialogue',course_id:'fr-a1-u01',source_kind:'synthetic_practice',audio_verified:false,decoded:true},
   {asset_id:'FI-Piste-01',course_id:null,source_kind:'open_reference',audio_verified:false,decoded:true}
  ];
  expect(audioCoverage(rows,['fr-a1-u01-dialogue.mp3'],'fr-a1-u01'))
   .toMatchObject({total:2,privateUploads:1,referenced:1,verified:0,unmapped:1,selectedUploads:1});
 });
 it('accepts only configured HTTPS speech inference origins and never fabricates a score',()=>{
  setRuntimeSpeechEndpoint('https://speech.example.org');
  expect(cloudSpeechEndpoint()).toBe('https://speech.example.org');
  setRuntimeSpeechEndpoint('http://local.example.org');
  expect(cloudSpeechEndpoint()).toBeNull();
  setRuntimeSpeechEndpoint('');
 });
 it('handles interchangeable Google Drive accounts/files without persisting OAuth tokens',()=>{
  expect(validGoogleClientId('123456-example.apps.googleusercontent.com')).toBe(true);
  expect(validGoogleClientId('')).toBe(false);
  expect(validDriveFolderId('root')).toBe(true);
  expect(validDriveFolderId('bad/path')).toBe(false);
  expect(driveFileKind({id:'file',name:'course.md',mimeType:'text/markdown'})).toBe('lesson');
  expect(driveFileKind({id:'file',name:'lesson.mp3',mimeType:'audio/mpeg'})).toBe('audio');
  expect(driveFileKind({id:'file',name:'file.pdf',mimeType:'application/pdf'})).toBe('lesson');
 });
 it('merges existing local favorites with cloud favorites and keeps remote identifiers',()=>{
  const local=safeFavorites([{courseId:'fr-a1-u01',text:'Bonjour'},{courseId:'fr-a1-u01',text:'Bonjour'},{courseId:'fr-a1-u02',text:'Merci'}, {courseId:'invalid',text:''}]);
  const cloud=[{id:'00000000-0000-4000-8000-000000000001',courseId:'fr-a1-u01',text:'Bonjour'}];
  expect(mergeFavorites(local,cloud)).toEqual([cloud[0],{courseId:'fr-a1-u02',text:'Merci'}]);
 });
 it('distinguishes a private audio signed URL from browser decode and actual playback',async()=>{
  const list=vi.fn().mockResolvedValue({data:[{name:'fr-a1-u01-dialogue.mp3'}],error:null});
  const createSignedUrl=vi.fn().mockResolvedValue({data:{signedUrl:'https://example.test/private-audio.mp3'},error:null});
  const maybeSingle=vi.fn().mockResolvedValue({data:null,error:null});
  const storage=vi.fn(()=>({list,createSignedUrl}));
  const from=vi.fn(()=>({select:()=>({eq:()=>({eq:()=>({maybeSingle})})})}));
  const client={storage:{from:storage},from} as unknown as SupabaseClient;
  render(<AudioVault client={client} session={session} courseId="fr-a1-u01"
   assets={[{asset_id:'fr-a1-u01-dialogue',filename:'fr-a1-u01-dialogue.mp3',duration_seconds:5,source_kind:'synthetic_practice',decoded:true,exact_text:false,listened:false,audio_verified:false}]}
   status="index metadata loaded"/>);
  fireEvent.click(screen.getByRole('button',{name:'检查并播放'}));
  await waitFor(()=>expect(screen.getByText(/尚未确认音频可解码或已经发声/)).toBeTruthy());
  const audio=document.querySelector('audio')!;
  expect(audio).toBeTruthy();
  fireEvent.change(screen.getByLabelText('私人音频播放速度'),{target:{value:'0.75'}});
  expect(audio.playbackRate).toBe(.75);
  fireEvent.click(screen.getByRole('button',{name:'整首循环 关闭'}));
  expect(audio.loop).toBe(true);
  audio.currentTime=3;
  fireEvent.click(screen.getByRole('button',{name:'回到开头'}));
  expect(audio.currentTime).toBe(0);
  expect(screen.getByText(/不是当前扩展听读全文的配音/)).toBeTruthy();
  fireEvent.canPlay(audio);
  expect(screen.getByText('可以播放')).toBeTruthy();
  fireEvent.playing(audio);
  expect(screen.getByText('播放中')).toBeTruthy();
  fireEvent.error(audio);
  expect(screen.getByText(/真实播放失败/)).toBeTruthy();
  expect(createSignedUrl).toHaveBeenCalledWith('test-owner/fr-a1-u01-dialogue.mp3',900);
 });
 it('never copies AI credentials into account settings JSON',()=>{
  const prefs=publicAiPreferences({enabled:true,provider:'openrouter',model:'openrouter/free',endpoint:'',directOpenRouter:false,apiKey:'sk-or-not-for-storage'});
  expect(prefs.directOpenRouter).toBe(false);
  expect(JSON.stringify(prefs)).not.toContain('sk-or-not-for-storage');
  expect(cleanAiPreferences({provider:'invalid',model:99,enabled:'yes',apiKey:'raw'})).toEqual({enabled:false,provider:'openrouter',model:'openrouter/free',endpoint:'',directOpenRouter:true});
 });
 it('selects the same-origin Pages API only for the exact PR preview origin',()=>{
  expect(pickWorkerOrigin(PREVIEW_PAGES_ORIGIN+'/?course=fr-a1-u01', 'https://production.example/api')).toBe(PREVIEW_API_BASE);
  expect(pickWorkerOrigin(PREVIEW_PAGES_ORIGIN+'.attacker.test', 'https://production.example/api/')).toBe('https://production.example/api');
  expect(pickWorkerOrigin('https://language-learning-hub.pages.dev/', 'https://production.example/api/')).toBe('https://production.example/api');
 });

 it('keeps the connected cloud workspace enabled on the same-origin Pages preview',()=>{
  expect(isCloudWorkspaceConfigured(true,PREVIEW_API_BASE)).toBe(true);
  expect(isCloudWorkspaceConfigured(true,'https://language-hub-api.example.com')).toBe(true);
  expect(isCloudWorkspaceConfigured(false,PREVIEW_API_BASE)).toBe(false);
  expect(isCloudWorkspaceConfigured(true,'http://insecure.example.com')).toBe(false);
  expect(isCloudWorkspaceConfigured(true,'')).toBe(false);
  expect(pickWorkerOrigin(PREVIEW_PAGES_ORIGIN+'/cloud?panel=audio', 'https://old.worker.example.com')).toBe('/api');
 });
 it('restores the legacy IPA deep link, remount and hash navigation without replacing normal speech',async()=>{
  history.replaceState({},'','/speech-lab#ipa-studio');
  const mount=()=>render(<AISettingsProvider><AppShell/></AISettingsProvider>);
  const first=mount();
  await screen.findByRole('heading',{name:'IPA 全文音标阅读'});
  fireEvent.change(screen.getByLabelText('待注音的原文'),{target:{value:'Une phrase française.'}});
  fireEvent.click(screen.getByRole('button',{name:'显示全文 IPA 音标'}));
  expect(screen.getByRole('button',{name:'隐藏 IPA 音标'})).toBeTruthy();
  first.unmount();mount(); // A fresh app at the same deep URL (refresh contract).
  await screen.findByLabelText('待注音的原文');
  act(()=>{history.pushState({},'','/speech-lab');window.dispatchEvent(new HashChangeEvent('hashchange'));});
  await screen.findByRole('region',{name:'跟读与识别文字练习'});
  act(()=>{history.back();});
  await screen.findByLabelText('待注音的原文');
  act(()=>{history.forward();});
  await screen.findByRole('region',{name:'跟读与识别文字练习'});
  act(()=>{history.pushState({},'','/?page=ipa');window.dispatchEvent(new PopStateEvent('popstate'));});
  await screen.findByLabelText('待注音的原文');
 });
 it.each([
  ['/?course=fr-a1-u04&tab=speech','/?course=fr-a1-u04&tab=read'],
  ['/?course=fr-a1-u04&tab=ipa','/?course=fr-a1-u04&tab=read'],
  ['/?course=fr-a1-u04&tab=read','/?language=fr&track=A1'],
  ['/?language=fr&track=A1','/?language=fr'],
  ['/?language=fr','/'],
  ['/?page=settings&section=account','/?page=settings'],
  ['/?page=settings','/'],
  ['/',null]
 ])('uses the same parent for breadcrumbs and direct URL %s',(url,parent)=>{
  const route=readRoute(url),crumbs=routeCrumbs(route);
  expect(parentRoute(route)).toBe(parent);
  expect(new Set(crumbs.map(c=>c.url)).size).toBe(crumbs.length);
  if(parent)expect(crumbs.at(-2)?.url).toBe(parent);
 });
 it('returns from course IPA through reading, category and language using the actual header',async()=>{
  history.replaceState({},'','/?course=fr-a1-u04&tab=ipa');render(<AISettingsProvider><AppShell/></AISettingsProvider>);
  for(const expected of ['/?course=fr-a1-u04&tab=read','/?language=fr&track=A1','/?language=fr','/']){
   const links=within(screen.getByRole('navigation',{name:'面包屑'})).getAllByRole('link');
   expect(links.at(-2)?.getAttribute('href')).toBe(expected);
   fireEvent.click(screen.getByRole('button',{name:'返回上一层'}));
   expect(location.pathname+location.search).toBe(expected);
  }
  expect((screen.getByRole('button',{name:'返回上一层'}) as HTMLButtonElement).disabled).toBe(true);
 });

 it('keeps immersive navigation and the selection panel responsive without hiding either tool',()=>{
  const css=readFileSync('src/readingLayoutV45.css','utf8');
  expect(css).toContain('@container lesson (min-width:940px)');
  expect(css).toContain('@container lesson (max-width:939px)');
  expect(css).toContain('.v44.nav-drawer-open>.rail');
  expect(css).toContain('grid-template-columns:minmax(0,1fr) clamp(315px,29cqw,420px)');
  expect(css).toContain('.v44:not(.nav-drawer-open)>.rail{transform:translateX(-110%)!important}');
  const component=readFileSync('src/CourseReader.tsx','utf8');
  expect(component).toContain('setShowTools]=useState(false)');
  expect(component).toContain('setShowTools(true)');
  expect(component).toContain('onFontChange?.');
  expect(component).not.toContain('优先显示账户私有原稿');
  expect(component).not.toContain('原创预览 · 已获所有者公开预览授权');
 });
 it('preserves the desktop navigation setting when the app opens on a phone',async()=>{
  const saved={...DEFAULT_PREFERENCES,layout:'standard' as const,sidebar:true};
  localStorage.setItem('llh-v44-appearance-v1',JSON.stringify(saved));
  vi.stubGlobal('innerWidth',390);
  render(<AISettingsProvider><AppShell/></AISettingsProvider>);
  await waitFor(()=>{
   const stored=JSON.parse(localStorage.getItem('llh-v44-appearance-v1')||'{}');
   expect(stored.sidebar).toBe(true);
  });
  const toggle=screen.getByRole('button',{name:'切换导航栏'});
  expect(toggle.getAttribute('aria-expanded')).toBe('false');
  fireEvent.click(toggle);
  expect(toggle.getAttribute('aria-expanded')).toBe('true');
  fireEvent.click(screen.getByRole('button',{name:'关闭导航菜单'}));
  expect(toggle.getAttribute('aria-expanded')).toBe('false');
  expect(JSON.parse(localStorage.getItem('llh-v44-appearance-v1')||'{}').sidebar).toBe(true);
 });
 it('expands and collapses a pinned rail with repeated desktop clicks',async()=>{
  localStorage.setItem('llh-v44-appearance-v1',JSON.stringify({...DEFAULT_PREFERENCES,layout:'standard',sidebar:true}));
  vi.stubGlobal('innerWidth',1440);
  render(<AISettingsProvider><AppShell/></AISettingsProvider>);
  const toggle=screen.getByRole('button',{name:'切换导航栏'});
  expect(toggle.getAttribute('aria-expanded')).toBe('true');
  fireEvent.click(toggle);
  expect(toggle.getAttribute('aria-expanded')).toBe('false');
  expect(document.querySelector('.rail-collapsed')).toBeTruthy();
  fireEvent.click(toggle);
  expect(toggle.getAttribute('aria-expanded')).toBe('true');
  expect(document.querySelector('.rail-collapsed')).toBeNull();
  expect(document.querySelector('.navigation-backdrop')).toBeNull();
 });
 it('keeps the catalog available while account preferences are being restored',()=>{
  const component=readFileSync('src/AppShell.tsx','utf8');
  expect(component).not.toContain("settingsSync==='loading'?<p role");
  expect(component).toContain("page==='settings'?<GlobalSettings");
  const inspector=readFileSync('src/ConnectionStatus.tsx','utf8');
  expect(inspector).toContain('if(!opened)return;');
  expect(inspector).toContain('onToggle={e=>setOpened(e.currentTarget.open)}');
 });
 it('opens global navigation from immersive mode without switching layouts',async()=>{
  localStorage.setItem('llh-v44-appearance-v1',JSON.stringify({...DEFAULT_PREFERENCES,layout:'immersive',sidebar:true}));
  render(<AISettingsProvider><AppShell/></AISettingsProvider>);
  const menu=screen.getByRole('button',{name:'切换导航栏'});
  expect(menu.getAttribute('aria-expanded')).toBe('false');
  fireEvent.click(menu);
  expect(menu.getAttribute('aria-expanded')).toBe('true');
  expect(document.querySelector('.v44.nav-drawer-open')).not.toBeNull();
  expect(screen.getByRole('button',{name:'关闭导航菜单'})).toBeTruthy();
  fireEvent.click(screen.getByRole('button',{name:'关闭导航菜单'}));
  expect(menu.getAttribute('aria-expanded')).toBe('false');
  fireEvent.click(menu);
  fireEvent.keyDown(document,{key:'Escape'});
  expect(menu.getAttribute('aria-expanded')).toBe('false');
 });
 it('keeps the article font size user-adjustable without affecting curriculum content',async()=>{
  history.replaceState({},'','/?course=fr-a1-u01&tab=read');
  render(<AISettingsProvider><AppShell/></AISettingsProvider>);
  const plus=await screen.findByRole('button',{name:'放大阅读字体'});
  const before=Number(JSON.parse(localStorage.getItem('llh-v44-appearance-v1')||'{}').fontSize);
  fireEvent.click(plus);
  await waitFor(()=>expect(JSON.parse(localStorage.getItem('llh-v44-appearance-v1')||'{}').fontSize).toBe(before+1));
  expect(screen.getByRole('heading',{name:COURSES.find(x=>x.id==='fr-a1-u01')!.title})).toBeTruthy();
 });
 it('records public preview consent independently from teaching, formal release and production deployment',()=>{
  expect(COURSES.filter(c=>c.status==='original_draft')).toHaveLength(draftPublication.count);
  expect(draftPublication.public_preview.status).toBe('approved');
  expect(draftPublication.public_preview.owner_approval_reference).toMatch(/github\.com\/ACIDCH\/language-learning-hub\/pull\/50#issuecomment-\d+/);
  expect(draftPublication.teaching_review).toBe('pending');
  expect(draftPublication.formal_release).toBe('not_approved');
  expect(draftPublication.production_deployment).toEqual({status:'pending_final_acceptance',owner_approval_reference:null});
  expect(()=>assertDraftDeploymentAllowed('preview')).not.toThrow();
  expect(()=>assertDraftDeploymentAllowed('production')).toThrow(/final owner deployment approval/);
  const gate=(viteConfig as any).plugins.find((p:any)=>p.name==='v44-owner-publication-gate');
  vi.stubEnv('CF_PAGES_BRANCH','main');
  expect(()=>gate.buildStart()).toThrow(/final owner deployment approval/);
  vi.stubEnv('CF_PAGES_BRANCH','feat/v44-full-ui-curriculum-one-shot');
  vi.stubEnv('LLH_DEPLOY_TARGET','production');
  expect(()=>gate.buildStart()).toThrow(/final owner deployment approval/);
  const ownerDeployApproved={...draftPublication,production_deployment:{status:'approved',owner_approval_reference:'test fixture only'}};
  expect(()=>assertDraftDeploymentAllowed('production',ownerDeployApproved)).not.toThrow();
  const withoutPublicPreview={...ownerDeployApproved,public_preview:{status:'pending_owner_confirmation',owner_approval_reference:null}};
  expect(()=>assertDraftDeploymentAllowed('production',withoutPublicPreview)).toThrow(/public-preview approval/);
  expect(ownerDeployApproved.teaching_review).toBe('pending');
  expect(ownerDeployApproved.formal_release).toBe('not_approved');
 });
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
  const signInWithPassword=vi.fn().mockResolvedValue({error:null});const notify=vi.fn();render(<AccountAccess client={{auth:{signInWithPassword}} as unknown as SupabaseClient} onNotify={notify}/>);
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
 it('validates an OpenRouter key while AI inference is disabled',async()=>{
  const fetcher=vi.fn().mockResolvedValue(new Response(JSON.stringify({data:{is_free_tier:true,is_management_key:false,limit_remaining:0}}),{status:200,headers:{'Content-Type':'application/json'}}));
  vi.stubGlobal('fetch',fetcher);
  render(<AISettingsProvider><AITutor session={session} apiBase="https://example.test" courseId="fr-a1-u01" language="fr" lessonText="Bonjour"/></AISettingsProvider>);
  expect((screen.getByRole('checkbox',{name:/启用 AI 助学/}) as HTMLInputElement).checked).toBe(false);
  expect((screen.getByRole('button',{name:'生成回答'}) as HTMLButtonElement).disabled).toBe(true);
  const input=screen.getByLabelText('API Key') as HTMLInputElement;
  fireEvent.change(input,{target:{value:'sk-or-fixture-only'}});
  fireEvent.click(screen.getByRole('button',{name:'验证 OpenRouter API Key（不调用模型）'}));
  await waitFor(()=>expect(screen.getByText(/浏览器直连 OpenRouter 验证成功/)).toBeTruthy());
  expect(fetcher).toHaveBeenCalledTimes(1);
  const [url,init]=fetcher.mock.calls[0] as [string,RequestInit];
  expect(url).toBe('https://openrouter.ai/api/v1/key');
  expect(init.method).toBe('GET');
  expect(init.body).toBeUndefined();
  expect((init.headers as Record<string,string>).Authorization).toBe('Bearer sk-or-fixture-only');
 });
 it('only sends a browser-direct OpenRouter completion after the learner explicitly submits',async()=>{
  const fetcher=vi.fn().mockResolvedValue(new Response(JSON.stringify({choices:[{message:{content:'Bonjour !'}}]}),{status:200,headers:{'Content-Type':'application/json'}}));
  vi.stubGlobal('fetch',fetcher);
  render(<AISettingsProvider><AITutor session={session} apiBase="https://example.test" courseId="fr-a1-u01" language="fr" lessonText="Bonjour"/></AISettingsProvider>);
  fireEvent.change(screen.getByLabelText('API Key'),{target:{value:'key-fixture-for-test'}});
  fireEvent.change(screen.getByLabelText('提问或待批改文本'),{target:{value:'Explain Bonjour'}});
  expect(fetcher).not.toHaveBeenCalled();
  fireEvent.click(screen.getByRole('checkbox',{name:/启用 AI 助学/}));
  expect(fetcher).not.toHaveBeenCalled();
  fireEvent.click(screen.getByRole('button',{name:'生成回答'}));
  await waitFor(()=>expect(screen.getByText('Bonjour !')).toBeTruthy());
  expect(fetcher).toHaveBeenCalledTimes(1);
  const [url,init]=fetcher.mock.calls[0] as [string,RequestInit];
  expect(url).toBe('https://openrouter.ai/api/v1/chat/completions');
  expect(init.method).toBe('POST');
  expect((init.headers as Record<string,string>).Authorization).toBe('Bearer key-fixture-for-test');
  const payload=JSON.parse(init.body as string);
  expect(payload.model).toBe('openrouter/free');
  expect(payload.stream).toBe(false);
  expect(JSON.stringify(payload)).not.toContain('key-fixture-for-test');
  expect(localStorage.length).toBe(0);
 });
 it('shares AI enable state while refusing unconfigured requests and never inventing an answer',()=>{
  render(<AISettingsProvider><AITutor session={null} apiBase="https://example.test" courseId="fr-a1-u01" language="fr" lessonText="Bonjour"/><AITutor compact session={null} apiBase="https://example.test" courseId="fr-a1-u01" language="fr" lessonText="Bonjour"/></AISettingsProvider>);
  fireEvent.click(screen.getAllByRole('checkbox')[0]);expect((screen.getAllByRole('checkbox')[1] as HTMLInputElement).checked).toBe(true);expect(screen.getAllByText(/AI 未配置/)).toHaveLength(2);expect(fetch).not.toHaveBeenCalled();expect(screen.queryByLabelText('AI 模型生成的教学反馈')).toBeNull();
 });
 it('passes the accented selection into the existing speech practice target',()=>{
  render(<AISettingsProvider><SelectionInspector selection={{text:'Enchanté',context:'Bonjour. Enchanté !'}} language="fr" courseId="fr-a1-u01" vocabulary={[]} session={null} rate={.85} onClose={()=>{}} onNote={()=>{}} onFavorite={()=>{}}/></AISettingsProvider>);
  expect((screen.getByRole('textbox',{name:'跟读目标文本'}) as HTMLTextAreaElement).value).toBe('Enchanté');
  expect(screen.getByRole('button',{name:'🎙 开始跟读'})).toBeTruthy();
  expect(screen.getByRole('navigation',{name:'选词面板工具'})).toBeTruthy();
  expect(screen.queryByText('跟读四步')).toBeNull();
  expect(fetch).not.toHaveBeenCalled();
 });
 it('does not block the public course catalog on first authentication handshake',()=>{
  render(<AISettingsProvider><AppShell/></AISettingsProvider>);
  expect(screen.getByRole('heading',{name:'课程目录'})).toBeTruthy();
  expect(screen.queryByText('正在恢复账户会话…')).toBeNull();
  expect(document.querySelector('.rail-group .nav-item[aria-current="page"]')?.textContent).toContain('课程目录');
 });
 it('keeps navigation and catalog filter state explicit for keyboard and mobile users',()=>{
  render(<AISettingsProvider><AppShell/></AISettingsProvider>);
  const filter=screen.getByRole('button',{name:/全部课程/});
  expect(filter.getAttribute('aria-pressed')).toBe('true');
  fireEvent.click(screen.getAllByRole('button',{name:/基础/})[0]);
  const first=screen.getByRole('button',{name:/全部课程/});
  expect(first.getAttribute('aria-pressed')).toBe('false');
 });
 it('restores a course deep link on back/forward and keeps notes across theme/layout changes',async()=>{
  const course=COURSES.find(c=>c.id==='fr-a1-u04')!;history.replaceState({},'',courseRoute(course));render(<AISettingsProvider><AppShell/></AISettingsProvider>);
  const notes=await screen.findByLabelText('学习笔记');await waitFor(()=>expect((notes as HTMLTextAreaElement).disabled).toBe(false));fireEvent.change(notes,{target:{value:'retain this note'}});
  fireEvent.change(screen.getByLabelText('网站外观'),{target:{value:'night'}});fireEvent.change(screen.getByLabelText('显示布局'),{target:{value:'focus'}});
  expect((screen.getByLabelText('学习笔记') as HTMLTextAreaElement).value).toBe('retain this note');expect(document.body.dataset.theme).toBe('night');
  act(()=>{history.pushState({},'',catalogRoute('fr','A1'));window.dispatchEvent(new PopStateEvent('popstate'));});expect(screen.getByRole('heading',{name:'课程目录'})).toBeTruthy();
  act(()=>{history.replaceState({},'',courseRoute(course));window.dispatchEvent(new PopStateEvent('popstate'));});expect((await screen.findByLabelText('学习笔记') as HTMLTextAreaElement).value).toBe('retain this note');
 });
});


it('does not overwrite an audio review after a failed read',async()=>{
 const upsert=vi.fn();
 const maybeSingle=vi.fn().mockResolvedValue({data:null,error:{message:'read unavailable'}});
 const client={from:()=>({select:()=>({eq:()=>({eq:()=>({maybeSingle})})}),upsert})} as unknown as SupabaseClient;
 render(<AudioReview client={client} session={session} assetId="fr-a1-u01-dialogue"/>);
 await waitFor(()=>expect(screen.getByRole('status').textContent).toContain('读取审核记录失败'));
 expect((screen.getByRole('button',{name:'保存音频审核记录'}) as HTMLButtonElement).disabled).toBe(true);
 fireEvent.click(screen.getByRole('button',{name:'保存音频审核记录'}));
 expect(upsert).not.toHaveBeenCalled();
});
