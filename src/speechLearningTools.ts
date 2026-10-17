/** Lightweight pedagogy around native Web Speech: no new speech provider or model. */
export type ReviewWord={word:string;count:number};

const REVIEW_LIMIT=10;

/** Segment sentences first, then long clauses, preserving Unicode text and punctuation. */
export function practiceChunks(text:string,maxLength=105):string[] {
 const source=text.normalize('NFC').replace(/\s+/g,' ').trim();
 if(!source)return [];
 const limit=Math.max(35,Math.min(180,Math.floor(maxLength)));
 const sentences=source.match(/[^.!?。！？;；]+[.!?。！？;；]?/gu)||[source];
 const out:string[]=[];
 function pack(fragment:string){
  const words=fragment.trim().split(/\s+/).filter(Boolean);
  let pending='';
  for(const word of words){
   if(pending&&(pending.length+1+word.length)>limit){out.push(pending);pending='';}
   if(word.length>limit){
    if(pending){out.push(pending);pending='';}
    for(let i=0;i<word.length;i+=limit)out.push(word.slice(i,i+limit));
   }else pending=pending?pending+' '+word:word;
  }
  if(pending)out.push(pending);
 }
 for(const sentence of sentences){
  const trimmed=sentence.trim();
  if(!trimmed)continue;
  if(trimmed.length<=limit){out.push(trimmed);continue;}
  const clauses=trimmed.match(/[^,，:：]+[,，:：]?/gu)||[trimmed];
  let group='';
  for(const clause of clauses){
   const part=clause.trim();
   if(!part)continue;
   if(part.length>limit){
    if(group){out.push(group);group='';}
    pack(part);continue;
   }
   if(group&&(group.length+1+part.length)>limit){out.push(group);group='';}
   group=group?group+' '+part:part;
  }
  if(group)out.push(group);
 }
 return out.slice(0,30);
}

export function addReviewWords(previous:ReviewWord[],words:string[]):ReviewWord[]{
 const map=new Map<string,ReviewWord>();
 for(const row of previous)map.set(row.word.normalize('NFC').toLocaleLowerCase(),{...row});
 for(const raw of words){
  const word=raw.trim().normalize('NFC');
  if(!word)continue;
  const key=word.toLocaleLowerCase();
  const item=map.get(key);
  map.set(key,{word:item?.word||word,count:Math.min(99,(item?.count||0)+1)});
 }
 return [...map.values()].sort((a,b)=>b.count-a.count||a.word.localeCompare(b.word)).slice(0,REVIEW_LIMIT);
}

/** One isolated matching transcript clears a transcription-review item, not a phoneme grade. */
export function clearReviewedWord(previous:ReviewWord[],word:string):ReviewWord[]{
 const key=word.trim().normalize('NFC').toLocaleLowerCase();
 return previous.filter(row=>row.word.toLocaleLowerCase()!==key);
}
