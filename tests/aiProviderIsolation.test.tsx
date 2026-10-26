import React from 'react';
import {expect,it} from 'vitest';
import {fireEvent,render,screen,cleanup} from '@testing-library/react';
import {AISettingsProvider,useAISettings,DEFAULT_MODELS} from '../src/AISettings';

function Probe(){
 const {config,update,restoreKey,clear}=useAISettings();
 return <div>
  <output aria-label="provider">{config.provider}</output>
  <output aria-label="key">{config.apiKey||'EMPTY'}</output>
  <button onClick={()=>update({apiKey:'openrouter-account-key'})}>set original</button>
  <button onClick={()=>update({provider:'deepseek',model:DEFAULT_MODELS.deepseek})}>switch DeepSeek</button>
  <button onClick={()=>restoreKey('deepseek','deepseek-account-key')}>restore DeepSeek</button>
  <button onClick={()=>restoreKey('openrouter','wrong-provider-key')}>wrong provider</button>
  <button onClick={()=>update({provider:'gemini',model:DEFAULT_MODELS.gemini,apiKey:'accidental-old-key'})}>switch Gemini with stale key</button>
  <button onClick={()=>update({provider:'openrouter',model:DEFAULT_MODELS.openrouter})}>switch back</button>
  <button onClick={()=>clear()}>logout</button>
 </div>;
}
it('isolates AI keys across provider changes and prevents stale cross-provider restore',()=>{
 render(<AISettingsProvider><Probe/></AISettingsProvider>);
 fireEvent.click(screen.getByRole('button',{name:'set original'}));
 expect(screen.getByLabelText('key').textContent).toBe('openrouter-account-key');
 fireEvent.click(screen.getByRole('button',{name:'switch DeepSeek'}));
 expect(screen.getByLabelText('provider').textContent).toBe('deepseek');
 expect(screen.getByLabelText('key').textContent).toBe('EMPTY');
 fireEvent.click(screen.getByRole('button',{name:'wrong provider'}));
 expect(screen.getByLabelText('key').textContent).toBe('EMPTY');
 fireEvent.click(screen.getByRole('button',{name:'restore DeepSeek'}));
 expect(screen.getByLabelText('key').textContent).toBe('deepseek-account-key');
 fireEvent.click(screen.getByRole('button',{name:'switch Gemini with stale key'}));
 expect(screen.getByLabelText('provider').textContent).toBe('gemini');
 expect(screen.getByLabelText('key').textContent).toBe('EMPTY');
 fireEvent.click(screen.getByRole('button',{name:'switch back'}));
 expect(screen.getByLabelText('key').textContent).toBe('EMPTY');
 fireEvent.click(screen.getByRole('button',{name:'set original'}));
 fireEvent.click(screen.getByRole('button',{name:'logout'}));
 expect(screen.getByLabelText('provider').textContent).toBe('openrouter');
 expect(screen.getByLabelText('key').textContent).toBe('EMPTY');
 cleanup();
});
