/** Browser-only, MIT-licensed IPA estimates from @piper-plus/g2p.
 * Never claims dictionary-verified pronunciations or acoustic scores.
 * Word segmentation guarantees IPA is never placed under the wrong letters.
 */
export type IpaLocale='en-US'|'en-GB'|'fr-FR';
export type IpaUnit={source:string;ipa:string;kind:'mapped'|'fallback'|'plain'};
export type IpaLine={source:string;units:IpaUnit[];generated:boolean};
type G2PEngine={phonemize:(text:string,options:{language:'en'|'fr'})=>{tokens:string[]}};
const MAX_CACHE=700;
const cache=new Map<string,IpaLine>();
let enginePromise:Promise<G2PEngine>|undefined;

export function normalizeIpaLocale(language:string):IpaLocale{
 const name=language.toLowerCase();
 if(name.startsWith('fr'))return 'fr-FR';
 if(name==='en-gb'||name==='en-nz'||name==='en-au')return 'en-GB';
 return 'en-US';
}
export async function getPhonemizer():Promise<G2PEngine>{
 if(!enginePromise)enginePromise=import('@piper-plus/g2p').then(async pkg=>{
  // Only EN/FR rule-based modules; no TTS engine, Python service or extra model weights.
  const created=await pkg.G2P.create({languages:['en','fr']});
  return created as G2PEngine;
 }).catch(error=>{enginePromise=undefined;throw error;});
 return enginePromise;
}
export function clearIpaCache(){cache.clear();}
// Numbers and non-Latin scripts remain unchanged. Accent marks and contractions survive.
const WORD=/[\p{Script=Latin}][\p{Script=Latin}\p{M}\p{N}'’\-]*/gu;
export function splitIpaRuns(text:string):{source:string;convert:boolean}[]{
 if(!text)return [];
 const out:{source:string;convert:boolean}[]=[];
 let end=0;
 for(const match of text.matchAll(WORD)){
  const pos=match.index;
  if(pos>end)out.push({source:text.slice(end,pos),convert:false});
  out.push({source:match[0],convert:true});
  end=pos+match[0].length;
 }
 if(end<text.length)out.push({source:text.slice(end),convert:false});
 return out;
}
/** Prevent long synchronous G2P runs; chunks always reconstitute the original. */
export function sliceIpaText(text:string,max=240):string[]{
 if(!text)return [];
 const pieces:string[]=[];
 let remain=text;
 while(remain){
  if(remain.length<=max){pieces.push(remain);break;}
  const sub=remain.slice(0,max+1);
  let end=Math.max(sub.lastIndexOf('. '),sub.lastIndexOf('! '),sub.lastIndexOf('? '),
    sub.lastIndexOf('; '),sub.lastIndexOf(', '),sub.lastIndexOf(' '),sub.lastIndexOf('\n'));
  if(end<max*.4)end=max;
  else if(sub[end]===' ')end+=1;
  else if(sub[end]==='\n')end+=1;
  else if(/[.!?,;]/.test(sub[end]))end+=1;
  pieces.push(remain.slice(0,end));
  remain=remain.slice(end);
 }
 return pieces;
}
function cacheSet(key:string,value:IpaLine){
 if(cache.size>=MAX_CACHE)cache.delete(cache.keys().next().value||'');
 cache.set(key,value);
}
export async function toIpaLine(text:string,language:string):Promise<IpaLine>{
 const locale=normalizeIpaLocale(language),key=locale+'|'+text;
 const found=cache.get(key);if(found)return found;
 const spans=splitIpaRuns(text);
 if(!spans.some(x=>x.convert)){
  const plain:{source:string;units:IpaUnit[];generated:boolean}={
   source:text,units:[{source:text,ipa:'',kind:'plain'}],generated:false
  };
  cacheSet(key,plain);return plain;
 }
 const model=await getPhonemizer();
 const voice=locale==='fr-FR'?'fr':'en';
 const units:IpaUnit[]=[];
 for(const span of spans){
  if(!span.convert){units.push({source:span.source,ipa:'',kind:'plain'});continue;}
  const wordKey=locale+'|'+span.source.toLocaleLowerCase();
  const cached=cache.get(wordKey);
  if(cached){units.push({...cached.units[0],source:span.source});continue;}
  let ipa='';
  try {
   const output=model.phonemize(span.source,{language:voice});
   ipa=(output.tokens||[]).join('').normalize('NFC').trim();
  }catch{/* unfamiliar words are left unannotated, never fabricated */}
  if(/[\uE000-\uF8FF]/u.test(ipa))ipa='';
  const unit:IpaUnit={source:span.source,ipa,kind:ipa?'mapped':'plain'};
  units.push(unit);
  cacheSet(wordKey,{source:span.source,units:[unit],generated:!!ipa});
 }
 const out={source:text,units,generated:units.some(u=>u.ipa.length>0)};
 cacheSet(key,out);return out;
}
