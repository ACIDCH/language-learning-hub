import {useEffect,useState,type Dispatch,type SetStateAction} from 'react';
import type {Session} from '@supabase/supabase-js';
import {cloudClient} from './v44Connection';
import {useAISettings,DEFAULT_MODELS,type AIConfig,type Provider} from './AISettings';
import {cleanPreferences,readPreferences,type Preferences} from './v44Preferences';

const PROVIDERS:Provider[]=['openrouter','deepseek','gemini','openai','custom'];
export type SyncState='guest'|'loading'|'ready'|'error';

export function cleanAiPreferences(raw:unknown):Omit<AIConfig,'apiKey'> {
 const v=(raw&&typeof raw==='object'&&!Array.isArray(raw)?raw:{}) as Record<string,unknown>;
 const provider=PROVIDERS.includes(v.provider as Provider)?v.provider as Provider:'openrouter';
 return {
  enabled:v.enabled===true,provider,
  model:typeof v.model==='string'&&v.model.length<=150?v.model:DEFAULT_MODELS[provider],
  endpoint:typeof v.endpoint==='string'&&v.endpoint.length<=400?v.endpoint:'',
  directOpenRouter:v.directOpenRouter!==false
 };
}
// Explicit allowlist: even an accidental future AIConfig field cannot leak a Key to JSON.
export function publicAiPreferences(config:AIConfig):Omit<AIConfig,'apiKey'>{
 return cleanAiPreferences({
  enabled:config.enabled,provider:config.provider,model:config.model,
  endpoint:config.endpoint,directOpenRouter:config.directOpenRouter
 });
}

/** Load before writing; never overwrite existing cloud settings with local defaults on login. */
export function useUserCloudSettings(session:Session|null,preferences:Preferences,
 setPreferences:Dispatch<SetStateAction<Preferences>>) {
 const {config,update,clear}=useAISettings();
 const [sync,setSync]=useState<SyncState>('guest');
 const [loadedFor,setLoadedFor]=useState<string|null>(null);
 const [errorDetail,setErrorDetail]=useState('');
 const uid=session?.user.id||null;
 useEffect(()=>{
  let active=true;
  setLoadedFor(null);
  if(!uid||!cloudClient){setSync('guest');return;}
  setSync('loading');setErrorDetail('');clear();
  void (async()=>{
   const {data,error}=await cloudClient.from('user_settings')
     .select('preferences,ai_preferences').eq('user_id',uid).maybeSingle();
   if(error)throw error;
   if(!active)return;
   if(data){
    setPreferences(cleanPreferences(data.preferences));
    update({...cleanAiPreferences(data.ai_preferences),apiKey:''});
   }else{
    // First login: adopt existing device preferences just once; never reset progress.
    const local=readPreferences();
    const start=cleanAiPreferences({});
    const {error:insertError}=await cloudClient.from('user_settings').upsert({
     user_id:uid,preferences:local,ai_preferences:start,updated_at:new Date().toISOString()
    },{onConflict:'user_id',ignoreDuplicates:true});
    if(insertError)throw insertError;
    if(!active)return;
    setPreferences(local);update({...start,apiKey:''});
   }
   setLoadedFor(uid);setSync('ready');
  })().catch((error:unknown)=>{
   if(active){setSync('error');setErrorDetail(error instanceof Error?error.message:'无法读取云端设置');}
  });
  return()=>{active=false;};
 // Auth user identity is the sync boundary; token refresh must not reset live controls.
 // eslint-disable-next-line react-hooks/exhaustive-deps
 },[uid]);

 useEffect(()=>{
  if(!uid||loadedFor!==uid||!cloudClient)return;
  let active=true;
  const timer=setTimeout(()=>{
   void cloudClient.from('user_settings').upsert({
    user_id:uid,preferences:cleanPreferences(preferences),
    ai_preferences:publicAiPreferences(config),updated_at:new Date().toISOString()
   },{onConflict:'user_id'}).then(({error})=>{
    if(!active)return;
    if(error){setSync('error');setErrorDetail(error.message);}
    else{setSync('ready');setErrorDetail('');}
   });
  },850);
  return()=>{active=false;clearTimeout(timer);};
 // A key change is intentionally NOT a reason to write to the public preferences row.
 },[uid,loadedFor,preferences,config.enabled,config.provider,config.model,config.endpoint,config.directOpenRouter]);

 useEffect(()=>{
  if(!uid||loadedFor!==uid||!cloudClient)return;
  let active=true;
  const provider=config.provider;
  void cloudClient.rpc('get_my_ai_key',{p_provider:provider}).then(({data,error})=>{
   if(!active)return;
   if(error){setSync('error');setErrorDetail('密钥云端恢复不可用：'+error.message);return;}
   // Do not replace a key typed while the restoration request was in flight.
   update({apiKey:typeof data==='string'?data:''});
  });
  return()=>{active=false;};
 },[uid,loadedFor,config.provider]);
 return {sync,errorDetail};
}
