/** Course-derived practice selections, without storing lesson text elsewhere. */
export function lessonPractice(text:string,stage:'word'|'sentence'|'paragraph'):string[] {
 const lines=text.normalize('NFC').split(/\r?\n/).map(x=>x.replace(/^\s*(?:[-*•]|\d+[.)])\s*/, '').trim())
  .filter(x=>x.length>1&&!/[\u3400-\u9fff]|https?:|Réponse|参考|UNITÉ|\bAnswer\b|^[#①②③④⑤⑥]/i.test(x));
 const sentences=lines.flatMap(x=>(x.match(/[^.!?]+[.!?]?/g)||[]).map(y=>y.trim())).filter(x=>x.length>2&&x.length<=240);
 const values=stage==='word'?sentences.flatMap(x=>x.match(/[\p{L}\p{M}]+(?:[’'][\p{L}\p{M}]+)*/gu)||[]):stage==='sentence'?sentences:lines.filter(x=>x.length>50&&x.length<=400);
 return [...new Set(values)].slice(0,20);
}

