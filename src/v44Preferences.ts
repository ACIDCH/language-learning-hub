export type Preferences={theme:'academic'|'eye'|'night';layout:'standard'|'focus'|'immersive';fontSize:number;readerWidth:number;serif:boolean;sidebar:boolean;ttsRate:number;ipa:boolean;language:string;speechApiUrl:string};
export const DEFAULT_PREFERENCES:Preferences={theme:'academic',layout:'standard',fontSize:17,readerWidth:780,serif:false,sidebar:true,ttsRate:.85,ipa:false,language:'fr',speechApiUrl:''};
const KEY='llh-v44-appearance-v1';
export function cleanPreferences(value:unknown):Preferences{
 const v=(value&&typeof value==='object'?value:{}) as Record<string,unknown>,d=DEFAULT_PREFERENCES;
 const num=(key:string,min:number,max:number,fallback:number)=>typeof v[key]==='number'&&Number.isFinite(v[key])?Math.max(min,Math.min(max,v[key] as number)):fallback;
 return {theme:['academic','eye','night'].includes(String(v.theme))?v.theme as Preferences['theme']:d.theme,
 layout:['standard','focus','immersive'].includes(String(v.layout))?v.layout as Preferences['layout']:d.layout,
 fontSize:num('fontSize',14,26,d.fontSize),readerWidth:num('readerWidth',560,1100,d.readerWidth),ttsRate:num('ttsRate',.5,1.5,d.ttsRate),
 serif:typeof v.serif==='boolean'?v.serif:d.serif,sidebar:typeof v.sidebar==='boolean'?v.sidebar:d.sidebar,ipa:typeof v.ipa==='boolean'?v.ipa:d.ipa,
 language:typeof v.language==='string'&&/^[a-z]{2}$/.test(v.language)?v.language:d.language,
 speechApiUrl:typeof v.speechApiUrl==='string'&&v.speechApiUrl.length<300&&/^https:\/\/[a-z0-9.-]+(?::[0-9]+)?\/?$/i.test(v.speechApiUrl)?
 v.speechApiUrl.replace(/\/$/,''):d.speechApiUrl};
}
export function readPreferences(){try{return cleanPreferences(JSON.parse(localStorage.getItem(KEY)||'{}'));}catch{return {...DEFAULT_PREFERENCES};}}
export function persistPreferences(p:Preferences){try{localStorage.setItem(KEY,JSON.stringify(cleanPreferences(p)));return true;}catch{return false;}}
export function exportPreferences(p:Preferences){return JSON.stringify(cleanPreferences(p),null,2);}
