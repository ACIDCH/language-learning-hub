import React from 'react';
import {afterEach,beforeEach,expect,it,vi} from 'vitest';
import {act,cleanup,fireEvent,render,screen,waitFor} from '@testing-library/react';
import CloudWorkspace from '../src/CloudWorkspace';

const session={user:{id:'legacy-workspace-owner',email:'existing@example.test'},access_token:'test.jwt.token'};
const storage=vi.hoisted(()=>({getSession:vi.fn(),onAuthStateChange:vi.fn(),from:vi.fn()}));
vi.mock('../src/v44Connection',()=>({apiBase:'/api',cloudClient:{
 auth:{getSession:storage.getSession,onAuthStateChange:storage.onAuthStateChange},
 from:storage.from
},cloudRequest:vi.fn()}));
vi.mock('../src/AccountAccess',()=>({default:()=>null}));
const oldVersion='2026-10-24T09:00:00.000Z',newVersion='2026-10-25T09:00:00.000Z';
let serverVersion=oldVersion,putRequests:any[]=[];
let authChange:((event:string,next:any)=>void)|undefined;
let holdSave=false,resolveSave:((value:Response)=>void)|undefined;
const response=(value:unknown,status=200)=>new Response(JSON.stringify(value),{status,headers:{'Content-Type':'application/json'}});
beforeEach(()=>{
 localStorage.clear();putRequests=[];serverVersion=oldVersion;holdSave=false;resolveSave=undefined;authChange=undefined;
 storage.getSession.mockReset().mockResolvedValue({data:{session}});
 storage.onAuthStateChange.mockReset().mockImplementation((callback:(event:string,next:any)=>void)=>{
  authChange=callback;return {data:{subscription:{unsubscribe:vi.fn()}}};
 });
 storage.from.mockReset().mockImplementation(()=>({
  select:()=>({eq:()=>({order:()=>({limit:()=>Promise.resolve({data:[],error:null})})})})
 }));
 vi.stubGlobal('fetch',vi.fn(async(url:string,options:RequestInit={})=>{
  if(url==='/api/v1/courses')return response({courses:[{id:'fr-a1-u01',language:'fr',level:'A1',track:null,title:'Bonjour',unit:1,text_complete:true,audio_verified:false,publishable:false}]});
  if(url==='/api/v1/progress/fr-a1-u01'){
   if(options.method==='PUT'){
    const data=JSON.parse(String(options.body));putRequests.push(data);
    if(data.expectedUpdatedAt!==serverVersion)return response({error:'progress_conflict'},409);
    serverVersion=newVersion;
    if(holdSave)return new Promise<Response>(resolve=>{resolveSave=resolve;});
    return response({saved:true,progress:{state:data.state,updated_at:newVersion}});
   }
   return response({progress:{course_id:'fr-a1-u01',state:{notes:serverVersion===oldVersion?'cloud old':'other-device-saved'},updated_at:serverVersion}});
  }
  if(url.startsWith('/api/v1/private-courses/'))return response({error:'lesson_not_synced'},404);
  if(url.startsWith('/api/v1/audio-index/'))return response({assets:[],playback_ready:false});
  throw new Error('Unexpected API '+url);
 }));
});
afterEach(()=>{cleanup();vi.unstubAllGlobals();vi.clearAllMocks();localStorage.clear();});

it('the older CloudWorkspace writes with a cloud version and does not bypass server-side concurrency checks',async()=>{
 render(<CloudWorkspace initialPanel="learn"/>);
 const editor=await screen.findByRole('textbox',{name:'学习笔记'}) as HTMLTextAreaElement;
 await waitFor(()=>expect(editor.disabled).toBe(false));
 fireEvent.change(editor,{target:{value:'manual learning note'}});
 fireEvent.click(screen.getByRole('button',{name:'保存到 Supabase'}));
 await waitFor(()=>expect(putRequests).toHaveLength(1));
 expect(putRequests[0].expectedUpdatedAt).toBe(oldVersion);
 expect(putRequests[0].state.notes).toBe('manual learning note');
 await screen.findByText(/学习进度已保存/);
});

it('the older CloudWorkspace blocks a stale device and offers explicit local/cloud choices',async()=>{
 render(<CloudWorkspace initialPanel="learn"/>);
 const editor=await screen.findByRole('textbox',{name:'学习笔记'}) as HTMLTextAreaElement;
 await waitFor(()=>expect(editor.disabled).toBe(false));
 fireEvent.change(editor,{target:{value:'draft from older device'}});
 serverVersion=newVersion;
 fireEvent.click(screen.getByRole('button',{name:'保存到 Supabase'}));
 await screen.findByText(/云端进度发生并发变更/);
 expect((screen.getByRole('button',{name:'保存到 Supabase'}) as HTMLButtonElement).disabled).toBe(true);
 expect(localStorage.getItem('llh-cloud-draft-v1:'+session.user.id+':fr-a1-u01')).toContain('draft from older device');
 fireEvent.click(screen.getByRole('button',{name:'重新读取本课云端进度'}));
 const choices=await screen.findByRole('group',{name:'云端与本机未同步草稿冲突'});
 expect(choices).toBeTruthy();
 expect((screen.getByRole('textbox',{name:'学习笔记'}) as HTMLTextAreaElement).disabled).toBe(true);
 fireEvent.click(screen.getByRole('button',{name:'保留本机草稿并核对后同步'}));
 expect((screen.getByRole('textbox',{name:'学习笔记'}) as HTMLTextAreaElement).value).toBe('draft from older device');
 expect((screen.getByRole('button',{name:'保存到 Supabase'}) as HTMLButtonElement).disabled).toBe(false);
});


it('a previous account\'s slow cloud save never replaces the new account\'s current course notes',async()=>{
 holdSave=true;
 render(<CloudWorkspace initialPanel="learn"/>);
 const editor=await screen.findByRole('textbox',{name:'学习笔记'}) as HTMLTextAreaElement;
 await waitFor(()=>expect(editor.disabled).toBe(false));
 fireEvent.change(editor,{target:{value:'account A private pending note'}});
 fireEvent.click(screen.getByRole('button',{name:'保存到 Supabase'}));
 await waitFor(()=>expect(resolveSave).toBeTypeOf('function'));
 const other={...session,user:{id:'separate-account-B',email:'second@example.test'}};
 await act(async()=>{authChange?.('SIGNED_IN',other);});
 await waitFor(()=>expect(screen.getByText('已登录：second@example.test')).toBeTruthy());
 // Its progress GET sees a fresh account-scoped record, not the prior PUT response.
 await waitFor(()=>expect((screen.getByRole('textbox',{name:'学习笔记'}) as HTMLTextAreaElement).value).toBe('other-device-saved'));
 await act(async()=>{
  resolveSave!(response({saved:true,progress:{state:{notes:'account A private pending note'},updated_at:newVersion}}));
 });
 expect((screen.getByRole('textbox',{name:'学习笔记'}) as HTMLTextAreaElement).value).toBe('other-device-saved');
 expect(localStorage.getItem('llh-cloud-draft-v1:separate-account-B:fr-a1-u01')).toBeNull();
});


it('does not silently merge a newer local workspace draft over an existing cloud record',async()=>{
 const key='llh-cloud-draft-v1:'+session.user.id+':fr-a1-u01';
 localStorage.setItem(key,JSON.stringify({editedAt:'2026-10-26T10:00:00.000Z',state:{notes:'newer offline change'}}));
 render(<CloudWorkspace initialPanel="learn"/>);
 const choices=await screen.findByRole('group',{name:'云端与本机未同步草稿冲突'});
 expect(choices).toBeTruthy();
 expect((screen.getByRole('textbox',{name:'学习笔记'}) as HTMLTextAreaElement).value).toBe('newer offline change');
 expect(screen.getByRole('button',{name:'保存到 Supabase'}).hasAttribute('disabled')).toBe(true);
 fireEvent.click(screen.getByRole('button',{name:'使用云端进度'}));
 expect((screen.getByRole('textbox',{name:'学习笔记'}) as HTMLTextAreaElement).value).toBe('cloud old');
 expect(localStorage.getItem(key)).toBeNull();
 expect(putRequests).toHaveLength(0);
});


it('an Auth token refresh for the same user does not discard unsaved workspace notes',async()=>{
 render(<CloudWorkspace initialPanel="learn"/>);
 const editor=await screen.findByRole('textbox',{name:'学习笔记'}) as HTMLTextAreaElement;
 await waitFor(()=>expect(editor.disabled).toBe(false));
 fireEvent.change(editor,{target:{value:'preserve while login token refreshes'}});
 const id='llh-cloud-draft-v1:'+session.user.id+':fr-a1-u01';
 expect(localStorage.getItem(id)).toContain('preserve while login token refreshes');
 const before=(fetch as any).mock.calls.filter(([url]:[string])=>url==='/api/v1/progress/fr-a1-u01').length;
 await act(async()=>{authChange?.('TOKEN_REFRESHED',{...session,access_token:'refreshed.jwt.token'});});
 expect((screen.getByRole('textbox',{name:'学习笔记'}) as HTMLTextAreaElement).value).toBe('preserve while login token refreshes');
 expect((screen.getByRole('textbox',{name:'学习笔记'}) as HTMLTextAreaElement).disabled).toBe(false);
 expect(localStorage.getItem(id)).toContain('preserve while login token refreshes');
 const after=(fetch as any).mock.calls.filter(([url]:[string])=>url==='/api/v1/progress/fr-a1-u01').length;
 expect(after).toBe(before);
 fireEvent.click(screen.getByRole('button',{name:'保存到 Supabase'}));
 await waitFor(()=>expect(putRequests).toHaveLength(1));
 expect(putRequests[0].state.notes).toBe('preserve while login token refreshes');
 expect((fetch as any).mock.calls.findLast(([url,init]:[string,RequestInit])=>url==='/api/v1/progress/fr-a1-u01'&&init.method==='PUT')[1].headers.Authorization).toBe('Bearer refreshed.jwt.token');
});
