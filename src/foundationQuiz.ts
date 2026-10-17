/** Exact-match meaning checks derived exclusively from the current lesson's vetted word list.
 * The correct answer is always the word's stored Chinese meaning. No fabricated
 * translations or API models are used. Distractors come from other lesson words.
 */
export type VocabularyCheck={
 prompt:string;choices:[string,string,string];answer:0|1|2;explanation:string;
 term:string;
};
export function makeVocabularyChecks(words:readonly (readonly [string,string])[]):VocabularyCheck[]{
 const unique=words.filter(([term,meaning],i)=>term.trim()&&meaning.trim()&&
    words.findIndex(x=>x[0].trim()===term.trim())===i);
 const result:VocabularyCheck[]=[];
 for(let i=0;i<Math.min(4,unique.length);i++){
  const [term,meaning]=unique[i];
  const wrong=[...new Set(unique.filter(([word,text])=>word!==term&&text!==meaning)
    .map(([,text])=>text))].slice(0,2);
  if(wrong.length<2)continue;
  const answer=(i%3) as 0|1|2;
  const choices=[...wrong];choices.splice(answer,0,meaning);
  if(choices.length!==3)continue;
  result.push({
    term,prompt:'词汇 “'+term+'” 在本课中的中文释义是哪一个？',
    choices:choices as [string,string,string],answer,
    explanation:'教材词汇表：'+term+' — '+meaning+'。请结合本课例句记住其用法。'
  });
 }
 return result;
}
