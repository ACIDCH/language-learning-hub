import {createContext,useContext,useState,type ReactNode} from 'react';
export type Provider='deepseek'|'gemini'|'openrouter'|'openai'|'custom';
export const DEFAULT_MODELS:Record<Provider,string>={deepseek:'deepseek-chat',gemini:'gemini-2.0-flash',openrouter:'openrouter/free',openai:'gpt-4.1-mini',custom:''};
export type AIConfig={enabled:boolean;provider:Provider;model:string;endpoint:string;directOpenRouter:boolean;apiKey:string};
const initial:AIConfig={enabled:false,provider:'openrouter',model:DEFAULT_MODELS.openrouter,endpoint:'',directOpenRouter:true,apiKey:''};
const Context=createContext<{config:AIConfig;update:(patch:Partial<AIConfig>)=>void;restoreKey:(provider:Provider,key:string)=>void;clear:()=>void}>({config:initial,update:()=>{},restoreKey:()=>{},clear:()=>{}});
export function AISettingsProvider({children}:{children:ReactNode}){
 const [config,set]=useState(initial);
 return <Context.Provider value={{config,update:patch=>set(c=>({...c,...patch})),restoreKey:(provider,key)=>set(c=>c.provider===provider&&!c.apiKey?{...c,apiKey:key}:c),clear:()=>set({...initial})}}>{children}</Context.Provider>;
}
export const useAISettings=()=>useContext(Context);
