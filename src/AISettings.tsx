import {createContext,useContext,useState,type ReactNode} from 'react';

export type Provider='deepseek'|'gemini'|'openrouter'|'openai'|'custom';
export const DEFAULT_MODELS:Record<Provider,string>={
  deepseek:'deepseek-flash',
  gemini:'gemini-3.5-flash-lite',
  openrouter:'openrouter/free',
  openai:'gpt-4.1-mini',
  custom:''
};
export type AIConfig={enabled:boolean;provider:Provider;model:string;endpoint:string;apiKey:string};
type Profile={model:string;apiKey:string};
type SettingsState={
  enabled:boolean;
  provider:Provider;
  endpoint:string;
  profiles:Record<Provider,Profile>;
};
const initialState=():SettingsState=>({
  enabled:false,
  provider:'deepseek',
  endpoint:'',
  profiles:Object.fromEntries(
    (Object.keys(DEFAULT_MODELS) as Provider[]).map(provider=>[
      provider,{model:DEFAULT_MODELS[provider],apiKey:''}
    ])
  ) as Record<Provider,Profile>
});
function forProvider(state:SettingsState,provider:Provider):AIConfig{
  return {
    enabled:state.enabled,provider,endpoint:state.endpoint,
    model:state.profiles[provider].model,
    apiKey:state.profiles[provider].apiKey
  };
}
type AISettingsContext={
  config:AIConfig;
  update:(patch:Partial<AIConfig>)=>void;
  getForProvider:(provider:Provider)=>AIConfig;
  clear:()=>void;
};
const initial=initialState();
const Context=createContext<AISettingsContext>({
  config:forProvider(initial,initial.provider),
  update:()=>{},
  getForProvider:provider=>forProvider(initial,provider),
  clear:()=>{}
});
/**
 * Separate DeepSeek and Gemini keys/models stay only in React memory.
 * Switching providers must not overwrite the other provider's credentials.
 */
export function AISettingsProvider({children}:{children:ReactNode}){
  const [state,setState]=useState<SettingsState>(initialState);
  const update=(patch:Partial<AIConfig>)=>setState(current=>{
    const provider=patch.provider??current.provider;
    const existing=current.profiles[provider];
    const profiles={...current.profiles};
    if(patch.apiKey!==undefined||patch.model!==undefined){
      profiles[provider]={
        apiKey:patch.apiKey??existing.apiKey,
        model:patch.model??existing.model
      };
    }
    return {
      enabled:patch.enabled??current.enabled,
      provider,
      endpoint:patch.endpoint??current.endpoint,
      profiles
    };
  });
  return <Context.Provider value={{
    config:forProvider(state,state.provider),
    update,
    getForProvider:provider=>forProvider(state,provider),
    clear:()=>setState(initialState())
  }}>{children}</Context.Provider>;
}
export const useAISettings=()=>useContext(Context);
