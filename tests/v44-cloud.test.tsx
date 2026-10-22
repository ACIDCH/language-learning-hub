import React from 'react';
import {afterEach,beforeEach,describe,expect,it,vi} from 'vitest';
import {cleanup,render,screen,waitFor} from '@testing-library/react';
import CloudWorkspace from '../src/CloudWorkspace';

const fakeAuth=vi.hoisted(()=>({
 getSession:vi.fn(async()=>({data:{session:null}})),
 onAuthStateChange:vi.fn(()=>({data:{subscription:{unsubscribe:vi.fn()}}}))
}));
vi.mock('../src/v44Connection',()=>({
 cloudClient:{auth:fakeAuth},apiBase:'/api',
 cloudRequest:vi.fn()
}));
vi.mock('../src/AccountAccess',()=>({
 default:()=> <p>现有云端账户登录入口已加载</p>
}));

beforeEach(()=>{vi.stubGlobal('fetch',vi.fn(async(url:string)=>new Response(
 JSON.stringify(url==='/api/v1/courses'?{courses:[]}:{error:'unexpected_request'}),
 {status:url==='/api/v1/courses'?200:404,headers:{'Content-Type':'application/json'}}
)));});
afterEach(()=>{cleanup();vi.unstubAllGlobals();vi.clearAllMocks();});
describe('V4.4 Cloudflare Pages same-origin workspace',()=>{
 it('actually renders connected /cloud, not the stale "not configured" screen',async()=>{
  render(<CloudWorkspace initialPanel="foundation"/>);
  expect(screen.queryByText('尚未启用云端连接')).toBeNull();
  await screen.findByText('现有云端账户登录入口已加载');
  await waitFor(()=>expect(fetch).toHaveBeenCalledWith('/api/v1/courses',expect.any(Object)));
  expect(screen.queryByText('云端尚未配置')).toBeNull();
 });
});
