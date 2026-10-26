import React,{useState} from 'react';
import {act,cleanup,fireEvent,render,screen} from '@testing-library/react';
import {afterEach,expect,it,vi} from 'vitest';
import type {Session} from '@supabase/supabase-js';
import {AISettingsProvider} from '../src/AISettings';
import {DEFAULT_PREFERENCES} from '../src/v44Preferences';
import {useUserCloudSettings} from '../src/useUserCloudSettings';

const mock=vi.hoisted(()=>({read:vi.fn(),write:vi.fn(),rpc:vi.fn()}));
vi.mock('../src/v44Connection',()=>({cloudClient:{
 from:()=>({
  select:()=>({eq:()=>({maybeSingle:mock.read})}),
  upsert:mock.write
 }),
 rpc:mock.rpc
}}));
const session={user:{id:'settings-order-test'},access_token:'test-token'} as Session;

function Harness({account=session}:{account?:Session}){
 const [preferences,setPreferences]=useState(DEFAULT_PREFERENCES);
 const {sync}=useUserCloudSettings(account,preferences,setPreferences);
 return <div><output data-testid="sync">{sync}</output><output data-testid="theme">{preferences.theme}</output>
  <button onClick={()=>setPreferences(p=>({...p,theme:'eye'}))}>eye</button>
  <button onClick={()=>setPreferences(p=>({...p,theme:'night'}))}>night</button></div>;
}
afterEach(()=>{cleanup();vi.useRealTimers();vi.clearAllMocks();});

it('serializes in-flight Supabase settings upserts so a later theme can never be overwritten by the earlier request',async()=>{
 vi.useFakeTimers();
 mock.read.mockResolvedValue({data:{preferences:DEFAULT_PREFERENCES,ai_preferences:{enabled:false,provider:'openrouter'}},error:null});
 mock.rpc.mockResolvedValue({data:'',error:null});
 const completed:Array<(x:{error:null})=>void>=[];
 mock.write.mockImplementation(()=>new Promise(resolve=>completed.push(resolve)));
 render(<AISettingsProvider><Harness/></AISettingsProvider>);
 await act(async()=>{for(let i=0;i<8;i++)await Promise.resolve();});
 expect(screen.getByTestId('sync').textContent).toBe('ready');
 fireEvent.click(screen.getByRole('button',{name:'eye'}));
 await act(async()=>{await vi.advanceTimersByTimeAsync(855);});
 expect(mock.write).toHaveBeenCalledTimes(1);
 expect(mock.write.mock.calls[0][0].preferences.theme).toBe('eye');
 fireEvent.click(screen.getByRole('button',{name:'night'}));
 await act(async()=>{await vi.advanceTimersByTimeAsync(855);});
 expect(screen.getByTestId('theme').textContent).toBe('night');
 expect(mock.write).toHaveBeenCalledTimes(1);
 await act(async()=>{completed[0]({error:null});await Promise.resolve();});
 expect(mock.write).toHaveBeenCalledTimes(2);
 expect(mock.write.mock.calls[1][0].preferences.theme).toBe('night');
 expect(JSON.stringify(mock.write.mock.calls[1][0])).not.toContain('apiKey');
 await act(async()=>{completed[1]({error:null});await Promise.resolve();});
 expect(screen.getByTestId('sync').textContent).toBe('ready');
});


it('does not block a new account’s settings behind another account’s stalled cloud save',async()=>{
 vi.useFakeTimers();
 mock.read.mockResolvedValue({data:{preferences:DEFAULT_PREFERENCES,ai_preferences:{enabled:false,provider:'openrouter'}},error:null});
 mock.rpc.mockResolvedValue({data:'',error:null});
 const completions:Array<(x:{error:null})=>void>=[];
 mock.write.mockImplementation(()=>new Promise(resolve=>completions.push(resolve)));
 const renderAccount=(account:Session)=><AISettingsProvider><Harness account={account}/></AISettingsProvider>;
 const page=render(renderAccount(session));
 await act(async()=>{for(let i=0;i<8;i++)await Promise.resolve();});
 fireEvent.click(screen.getByRole('button',{name:'eye'}));
 await act(async()=>{await vi.advanceTimersByTimeAsync(855);});
 expect(mock.write).toHaveBeenCalledTimes(1);
 expect(mock.write.mock.calls[0][0].user_id).toBe('settings-order-test');
 const other={user:{id:'other-settings-owner'},access_token:'other-test-token'} as Session;
 page.rerender(renderAccount(other));
 await act(async()=>{for(let i=0;i<8;i++)await Promise.resolve();});
 expect(screen.getByTestId('sync').textContent).toBe('ready');
 fireEvent.click(screen.getByRole('button',{name:'night'}));
 await act(async()=>{await vi.advanceTimersByTimeAsync(855);});
 // The first account is still waiting, but the second must write immediately.
 expect(mock.write).toHaveBeenCalledTimes(2);
 expect(mock.write.mock.calls[1][0].user_id).toBe('other-settings-owner');
 expect(mock.write.mock.calls[1][0].preferences.theme).toBe('night');
 await act(async()=>{completions[1]({error:null});completions[0]({error:null});await Promise.resolve();});
 expect(screen.getByTestId('sync').textContent).toBe('ready');
});
