import {createClient} from '@supabase/supabase-js';
import {cloudPublicDefaults} from './cloudPublicDefaults';
const url=import.meta.env.VITE_SUPABASE_URL?.trim()||cloudPublicDefaults.supabaseUrl;
const key=import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY?.trim()||cloudPublicDefaults.supabasePublishableKey;
export const apiBase=(import.meta.env.VITE_WORKER_API_URL?.trim()||cloudPublicDefaults.workerApiUrl).replace(/\/$/,'');
export const cloudClient=url&&key?createClient(url,key):null;
export async function cloudRequest<T>(path:string,token?:string,init:RequestInit={}):Promise<T>{
 const response=await fetch(apiBase+path,{...init,headers:{...init.headers,...(token?{Authorization:'Bearer '+token}:{})}});
 const data=await response.json().catch(()=>({}));
 if(!response.ok)throw new Error(data.error||'HTTP '+response.status);
 return data as T;
}
