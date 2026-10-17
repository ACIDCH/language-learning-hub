/** Transparent written dictation comparison, not an ASR or pronunciation evaluator.
 * Punctuation/case/spacing are ignored; real lexical and accent differences remain.
 */
export function dictationTokens(value:string,language:'en'|'fr'):string[]{
 const locale=language==='fr'?'fr-FR':'en-US';
 return value.normalize('NFC').toLocaleLowerCase(locale)
  .replace(/[’‘ʼ＇]/g,"'")
  .replace(/[‐‑‒–—-]/g,' ')
  .replace(/[^\p{L}\p{N}'\s]/gu,' ')
  .trim().split(/\s+/u).filter(Boolean);
}
export type DictationComparison={
 referenceWords:number;writtenWords:number;wordEdits:number;exact:boolean;
};
export function compareDictation(written:string,reference:string,language:'en'|'fr'):DictationComparison{
 const expected=dictationTokens(reference,language),actual=dictationTokens(written,language);
 // Space-efficient Levenshtein distance over words; insert/delete/substitute all cost 1.
 let prev=Array.from({length:actual.length+1},(_,i)=>i);
 for(let i=1;i<=expected.length;i++){
  const next=[i];
  for(let j=1;j<=actual.length;j++){
   next[j]=Math.min(next[j-1]+1,prev[j]+1,prev[j-1]+(expected[i-1]===actual[j-1]?0:1));
  }
  prev=next;
 }
 const wordEdits=prev[actual.length];
 return {referenceWords:expected.length,writtenWords:actual.length,wordEdits,
  exact:expected.length>0&&wordEdits===0};
}
