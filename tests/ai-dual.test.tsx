import React from 'react';
import {afterEach,expect,it,vi} from 'vitest';
import {cleanup,fireEvent,render,screen,waitFor} from '@testing-library/react';
import type {Session} from '@supabase/supabase-js';
import {AISettingsProvider,useAISettings,DEFAULT_MODELS} from '../src/AISettings';
import AITutor from '../src/AITutor';

afterEach(()=>{cleanup();vi.unstubAllGlobals();});

function ConfigurationProbe(){
 const {config,update,getForProvider,clear}=useAISettings();
 return <section>
  <button onClick={()=>update({provider:'deepseek',apiKey:'ds-private',model:'deepseek-flash'})}>Configure DeepSeek</button>
  <button onClick={()=>update({provider:'gemini',apiKey:'gm-private',model:'gemini-3.5-flash-lite'})}>Configure Gemini</button>
  <button onClick={()=>update({provider:'deepseek'})}>Choose DeepSeek</button>
  <button onClick={()=>update({provider:'gemini'})}>Choose Gemini</button>
  <button onClick={()=>update({enabled:true})}>Enable AI</button>
  <button onClick={()=>clear()}>Clear keys</button>
  <output data-testid="active">{config.provider}:{config.apiKey}</output>
  <output data-testid="deepseek">{getForProvider('deepseek').apiKey}</output>
  <output data-testid="gemini">{getForProvider('gemini').apiKey}</output>
 </section>;
}
it('stores distinct provider keys in memory, restores them after switching and clears both',()=>{
 expect(DEFAULT_MODELS.deepseek).toBe('deepseek-flash');
 expect(DEFAULT_MODELS.gemini).toBe('gemini-3.5-flash-lite');
 render(<AISettingsProvider><ConfigurationProbe/></AISettingsProvider>);
 fireEvent.click(screen.getByText('Configure DeepSeek'));
 fireEvent.click(screen.getByText('Configure Gemini'));
 expect(screen.getByTestId('active').textContent).toBe('gemini:gm-private');
 fireEvent.click(screen.getByText('Choose DeepSeek'));
 expect(screen.getByTestId('active').textContent).toBe('deepseek:ds-private');
 expect(screen.getByTestId('gemini').textContent).toBe('gm-private');
 fireEvent.click(screen.getByText('Clear keys'));
 expect(screen.getByTestId('deepseek').textContent).toBe('');
 expect(screen.getByTestId('gemini').textContent).toBe('');
});
it('only a manual dual-compare click sends exactly one request to each service',async()=>{
 const requests:{provider:string;model:string;auth:string;key:string}[]=[];
 const mock=vi.fn(async(_url:string,opts:RequestInit)=>{
  const body=JSON.parse(String(opts.body));
  const headers=opts.headers as Record<string,string>;
  requests.push({provider:body.provider,model:body.model,auth:headers.Authorization,key:headers['X-AI-Key']});
  expect(String(opts.body)).not.toContain('private');
  return new Response(JSON.stringify({answer:body.provider+' lesson feedback'}),{
   status:200,headers:{'content-type':'application/json'}
  });
 });
 vi.stubGlobal('fetch',mock);
 const session={user:{id:'learner'},access_token:'session-token'} as Session;
 render(<AISettingsProvider>
  <ConfigurationProbe/>
  <AITutor session={session} apiBase="https://worker.example" courseId="fr-a1-u01"
    language="fr" lessonText="Bonjour"/>
 </AISettingsProvider>);
 fireEvent.click(screen.getByText('Configure DeepSeek'));
 fireEvent.click(screen.getByText('Configure Gemini'));
 fireEvent.click(screen.getByText('Enable AI'));
 fireEvent.change(screen.getByLabelText('提问或待批改文本'),{target:{value:'Explain the use of être'}});
 expect(mock).not.toHaveBeenCalled();
 fireEvent.click(screen.getByRole('button',{name:/双模型对照/}));
 await waitFor(()=>expect(requests).toHaveLength(2));
 expect(requests.map(r=>[r.provider,r.model,r.key]).sort()).toEqual([
  ['deepseek','deepseek-flash','ds-private'],
  ['gemini','gemini-3.5-flash-lite','gm-private']
 ]);
 expect(requests.every(r=>r.auth==='Bearer session-token')).toBe(true);
 expect(await screen.findByText('gemini lesson feedback')).toBeTruthy();
 expect(screen.getByText('deepseek lesson feedback')).toBeTruthy();
});


it('three-provider comparison explicitly adds OpenRouter and does not auto-call without a click',async()=>{
 const requests:{provider:string;model:string;key:string}[]=[];
 vi.stubGlobal('fetch',vi.fn(async(_url:string,options:RequestInit)=>{
   const payload=JSON.parse(String(options.body));
   const headers=options.headers as Record<string,string>;
   requests.push({provider:payload.provider,model:payload.model,key:headers['X-AI-Key']});
   return new Response(JSON.stringify({answer:payload.provider+' advice'}),{status:200});
 }));
 const session={user:{id:'learner'},access_token:'test-token'} as Session;
 function ConfigureAll(){
   const {update}=useAISettings();
   return <button onClick={()=>{
     update({provider:'deepseek',apiKey:'ds-key',model:'deepseek-flash'});
     // Multiple updates are functional, preserving distinct provider profiles.
     update({provider:'gemini',apiKey:'gm-key',model:'gemini-3.5-flash-lite'});
     update({provider:'openrouter',apiKey:'or-key',model:'openrouter/free'});
     update({enabled:true});
   }}>Configure three</button>;
 }
 render(<AISettingsProvider><ConfigureAll/><AITutor session={session} apiBase="https://worker.example"
   courseId="fr-a1-u01" language="fr" lessonText="Salut"/></AISettingsProvider>);
 fireEvent.click(screen.getByText('Configure three'));
 fireEvent.change(screen.getByLabelText('提问或待批改文本'),{target:{value:'Explain French articles'}});
 expect(requests).toHaveLength(0);
 fireEvent.click(screen.getByRole('button',{name:/三模型对照/}));
 await waitFor(()=>expect(requests).toHaveLength(3));
 expect(requests.map(x=>[x.provider,x.model,x.key]).sort()).toEqual([
  ['deepseek','deepseek-flash','ds-key'],
  ['gemini','gemini-3.5-flash-lite','gm-key'],
  ['openrouter','openrouter/free','or-key']
 ]);
 expect(await screen.findByText('openrouter advice')).toBeTruthy();
});
