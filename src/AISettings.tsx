import {createContext,useContext,useState,type ReactNode} from 'react';
export type Provider='deepseek'|'gemini'|'openrouter'|'openai'|'custom';
export const DEFAULT_MODELS:Record<Provider,string>={deepseek:'deepseek-chat',gemini:'gemini-2.0-flash',openrouter:'openrouter/free',openai:'gpt-4.1-mini',custom:''};
export type AIConfig={enabled:boolean;provider:Provider;model:string;endpoint:string;apiKey:string};
const initial:AIConfig={enabled:false,provider:'openrouter',model:DEFAULT_MODELS.openrouter,endpoint:'',apiKey:''};
const Context=createContext<{config:AIConfig;update:(patch:Partial<AIConfig>)=>void;clear:()=>void}>({config:initial,update:()=>{},clear:()=>{}});
export function AISettingsProvider({children}:{children:ReactNode}){
 const [config,set]=useState(initial);
 return <Context.Provider value={{config,update:patch=>set(c=>({...c,...patch})),clear:()=>set({...initial})}}>{children}</Context.Provider>;
}
export const useAISettings=()=>useContext(Context);
