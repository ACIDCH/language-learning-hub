/** Learning-science-oriented vocabulary recall: self-assessment, not automated oral scoring. */
export type Card={term:string;meaning:string;key:string};
export function cardsForLesson(id:string,words:readonly (readonly [string,string])[]):Card[]{
 return words.map(([term,meaning],i)=>({term,meaning,key:id+':'+i}));
}
export function moveToNext(cards:Card[],ratings:Record<string,0|1|2>):Card|null{
 const pending=cards.filter(c=>ratings[c.key]===undefined);
 return pending[0]??null;
}
export function recallSummary(cards:Card[],ratings:Record<string,0|1|2>){
 const done=cards.filter(c=>ratings[c.key]!==undefined).length;
 const retry=cards.filter(c=>ratings[c.key]===0).length;
 const hesitant=cards.filter(c=>ratings[c.key]===1).length;
 const fluent=cards.filter(c=>ratings[c.key]===2).length;
 return {total:cards.length,done,retry,hesitant,fluent,complete:done===cards.length};
}
