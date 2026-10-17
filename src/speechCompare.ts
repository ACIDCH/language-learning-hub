/**
 * Deterministic transcription diff; NOT an acoustic or phoneme-level score.
 * ASR transcripts are estimates. Normalize apostrophes, punctuation and
 * optional diacritics to avoid treating typography as spoken mistakes.
 */
export type TokenStatus='match'|'substitution'|'missing'|'extra';
export type TranscriptToken={word:string;status:TokenStatus;heard?:string};
export type TranscriptReport={
  similarity:number;matched:number;substituted:number;missing:number;extra:number;
  expected:TranscriptToken[];extras:string[];originalWordCount:number;recognizedWordCount:number;
};
function normalize(value:string){
 return value.normalize('NFD').replace(/[\u0300-\u036f]/g,'')
  .replace(/[’ʼ]/g,"'").toLocaleLowerCase()
  .replace(/[\u2010-\u2015-]/g,' ')
  .replace(/['\u2019]/g,'')
  .replace(/[^\p{L}\p{N}\s]/gu,' ')
  .replace(/\s+/g,' ').trim();
}
function words(s:string){return normalize(s).split(' ').filter(Boolean);}
export function analyzeTranscript(expectedText:string,recognizedText:string):TranscriptReport{
 const expectedWords=words(expectedText),heardWords=words(recognizedText);
 const n=expectedWords.length,m=heardWords.length;
 // User-entered strings are bounded by 400 characters; cap token count too.
 const dp=Array.from({length:n+1},()=>new Array<number>(m+1).fill(0));
 for(let i=0;i<=n;i++)dp[i][0]=i;
 for(let j=0;j<=m;j++)dp[0][j]=j;
 for(let i=1;i<=n;i++)for(let j=1;j<=m;j++){
  dp[i][j]=Math.min(dp[i-1][j]+1,dp[i][j-1]+1,
    dp[i-1][j-1]+(expectedWords[i-1]===heardWords[j-1]?0:1));
 }
 let i=n,j=m;
 const edits:{status:TokenStatus;expected?:string;heard?:string}[]=[];
 while(i>0||j>0){
  if(i>0&&j>0&&expectedWords[i-1]===heardWords[j-1]&&
     dp[i][j]===dp[i-1][j-1]){
   edits.push({status:'match',expected:expectedWords[--i],heard:heardWords[--j]});
  }else if(i>0&&j>0&&dp[i][j]===dp[i-1][j-1]+1){
   edits.push({status:'substitution',expected:expectedWords[--i],heard:heardWords[--j]});
  }else if(i>0&&dp[i][j]===dp[i-1][j]+1){
   edits.push({status:'missing',expected:expectedWords[--i]});
  }else{
   edits.push({status:'extra',heard:heardWords[--j]});
  }
 }
 edits.reverse();
 const expected=edits.filter(e=>e.status!=='extra').map(e=>({
  word:e.expected||'',status:e.status,heard:e.status==='substitution'?e.heard:undefined
 }));
 const extras=edits.filter(e=>e.status==='extra').map(e=>e.heard||'');
 const matched=expected.filter(e=>e.status==='match').length;
 const missing=expected.filter(e=>e.status==='missing').length;
 const substituted=expected.filter(e=>e.status==='substitution').length;
 // Displayed as textual similarity only, never language proficiency or pronunciation.
 const similarity=n&&m?Math.max(0,Math.round(100*(1-dp[n][m]/Math.max(n,m)))):0;
 return {similarity,matched,substituted,missing,extra:extras.length,expected,extras,
   originalWordCount:n,recognizedWordCount:m};
}
export function practiceHint(report:TranscriptReport):string{
 if(report.originalWordCount===0)return '请输入练习短句。';
 if(report.recognizedWordCount===0)return '没有收到有效识别文字，请检查麦克风和环境后重试。';
 if(!report.missing&&!report.substituted&&!report.extra)
  return '识别结果与目标文字一致。仍需要通过听感判断重音、连读与发音质量。';
 if(report.missing)return '识别文字中缺少了部分词语，可以放慢速度并分短句重复练习。';
 if(report.substituted)return '某些词语被识别为其他词；请尝试再次跟读，不要把这一点直接当作发音错误。';
 return '识别中出现了额外词语，可能是重复、背景噪声或断句差异。';
}
