/** Browser-only English/French G2P. Lazy eSpeak-NG WASM via ephone.
 * It generates reference IPA, not a validated dictionary or acoustic score.
 */
export type IpaLocale='en-US'|'en-GB'|'fr-FR';
export type IpaUnit={source:string;ipa:string;kind:'mapped'|'fallback'|'plain'};
export type IpaLine={source:string;units:IpaUnit[];generated:boolean};

type EphoneMapped={text:string;ipa:string;asSpans:()=>[string,string][]};
type Phonemizer={setVoice:(name:string)=>unknown;textToIpaWithSourceMap:(text:string)=>EphoneMapped};
type LanguagePack=(module:Phonemizer)=>Promise<void>;
const MAX_CACHE=320;
const cache=new Map<string,IpaLine>();
let enginePromise:Promise<Phonemizer>|undefined;

export function normalizeIpaLocale(language:string):IpaLocale{
 if(language.toLowerCase().startsWith('fr'))return 'fr-FR';
 if(language.toLowerCase()==='en-gb'||language.toLowerCase()==='en-nz'||language.toLowerCase()==='en-au')return 'en-GB';
 return 'en-US';
}
export async function getPhonemizer():Promise<Phonemizer>{
 if(!enginePromise)enginePromise=import('ephone').then(async pkg=>{
  // en_all covers US and GB; roa contains fr. Both are bundled only when IPA is opened.
  const packs=pkg as unknown as {default:(p:LanguagePack[])=>Promise<Phonemizer>;
    en_all:LanguagePack;roa:LanguagePack};
  if(!packs.en_all||!packs.roa)throw new Error('浏览器音标语言包缺失');
  return packs.default([packs.en_all,packs.roa]);
 }).catch(error=>{enginePromise=undefined;throw error;});
 return enginePromise;
}
export function clearIpaCache(){cache.clear();}

const LATIN=/[A-Za-zÀ-ÖØ-öø-ÿŒœÆæ]/u;
const HAN=/[\u3400-\u9fff]/u;
/** Split foreign-language spans from Chinese instruction text. Preserve every character. */
export function splitIpaRuns(text:string):{source:string;convert:boolean}[]{
 if(!text)return [];
 const out:{source:string;convert:boolean}[]=[];
 // Non-Latin scripts are left untouched. Latin words around Chinese remain annotated.
 const tokens=text.match(/[A-Za-zÀ-ÖØ-öø-ÿŒœÆæ][A-Za-zÀ-ÖØ-öø-ÿŒœÆæ\p{M}\p{N}'’\s.,;:!?()\-]*/gu)||[];
 let offset=0;
 for(const token of tokens){
  const pos=text.indexOf(token,offset);
  if(pos>offset)out.push({source:text.slice(offset,pos),convert:false});
  out.push({source:token,convert:true});
  offset=pos+token.length;
 }
 if(offset<text.length)out.push({source:text.slice(offset),convert:false});
 return out;
}
/** Prevent long synchronous WASM runs; chunks concatenate exactly to original. */
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
 if(!LATIN.test(text)||HAN.test(text)){
  if(!LATIN.test(text)){
   const plain={source:text,units:[{source:text,ipa:'',kind:'plain' as const}],generated:false};
   cacheSet(key,plain);return plain;
  }
  const runs=splitIpaRuns(text);
  const units:IpaUnit[]=[];
  for(const run of runs){
   if(!run.convert)units.push({source:run.source,ipa:'',kind:'plain'});
   else units.push(...(await toIpaLine(run.source,locale)).units);
  }
  const mixed={source:text,units,generated:units.some(u=>u.ipa.length>0)};
  cacheSet(key,mixed);return mixed;
 }
 const engine=await getPhonemizer();
 engine.setVoice(locale==='fr-FR'?'fr':locale==='en-GB'?'en-GB-x-rp':'en-US');
 const output=engine.textToIpaWithSourceMap(text);
 // Mapping may fail for punctuation, unfamiliar scripts or some eSpeak versions:
 // never show phonetics under the WRONG graphemes.
 const candidates=output.asSpans();
 const reconstructed=candidates.map(([source])=>source).join('');
 let units:IpaUnit[];
 if(reconstructed===text&&candidates.some(([,ipa])=>ipa.trim())){
  units=candidates.map(([source,ipa])=>({
   source,ipa:ipa.trim(),kind:ipa.trim()?'mapped' as const:'plain' as const
  }));
 }else if(output.ipa.trim()){
  units=[{source:text,ipa:output.ipa.trim(),kind:'fallback'}];
 }else{
  units=[{source:text,ipa:'',kind:'plain'}];
 }
 const result={source:text,units,generated:units.some(u=>u.ipa.length>0)};
 cacheSet(key,result);
 return result;
}
