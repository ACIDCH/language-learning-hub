/** Preserve unaffected answer/checklist keys when combining distinct device drafts.
 * Explicitly merge only known record-shaped progress fields; arrays and other
 * opaque values remain atomic rather than accidentally corrupting their shape.
 */
export function mergeProgressDraft<T extends Record<string,unknown>>(original:T,patch:Partial<T>):T{
 const result:Record<string,unknown>={...original,...patch};
 for(const name of ['answers','studyResponses','practiceChecklist']){
  const previous=original[name],incoming=patch[name];
  if(incoming&&typeof incoming==='object'&&!Array.isArray(incoming)){
   const before=previous&&typeof previous==='object'&&!Array.isArray(previous)?previous:{};
   result[name]={...before,...incoming};
  }
 }
 return result as T;
}
