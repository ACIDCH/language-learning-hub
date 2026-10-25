/** Present authored evidence as parallel source-language and Chinese text.
 * Historical drafts contain a single field using " / " as a separator. Find
 * the final delimiter only when the tail is Chinese, so IELTS choices like
 * "TRUE / FALSE / NOT GIVEN" remain part of the original source-language task.
 * A source-only or Chinese-only question is returned intact.
 */
export type ParallelEvidence={source:string;zh:string|null};
export function parallelEvidence(value:string):ParallelEvidence{
  const delimiter=' / ';
  const idx=value.lastIndexOf(delimiter);
  if(idx<0)return {source:value,zh:null};
  const source=value.slice(0,idx).trim();
  const zh=value.slice(idx+delimiter.length).trim();
  if(!source||!/\p{Script=Han}/u.test(zh)||!/[A-Za-zÀ-ÿ]/u.test(source)){
    return {source:value,zh:null};
  }
  return {source,zh};
}
