import type {TranscriptReport} from './speechCompare';

/** Practical shadowing hints, not a phoneme, accent or pronunciation assessment. */
export type LearnerCoaching={
 headline:string;
 instruction:string;
 focusWords:string[];
 readyForNext:boolean;
};

function originalForm(target:string,normalizedWord:string):string {
 const chunks=target.match(/[\p{L}\p{M}\p{N}]+(?:[’'ʼ][\p{L}\p{M}\p{N}]+)*/gu)||[];
 const normalize=(x:string)=>x.normalize('NFD').replace(/[\u0300-\u036f]/g,'')
   .replace(/[’'ʼ]/g,'').toLocaleLowerCase();
 return chunks.find(chunk=>normalize(chunk)===normalizedWord)||normalizedWord;
}

export function learnerCoaching(report:TranscriptReport,target:string):LearnerCoaching {
 const focusWords=[...new Set(report.expected.filter(x=>x.status!=='match')
   .map(x=>originalForm(target,x.word)))].slice(0,3);
 if(!report.recognizedWordCount) return {
  headline:'这次没有收到有效文字',instruction:'先试听示范，检查麦克风，再用正常音量重新说一遍。',
  focusWords:[],readyForNext:false
 };
 if(!report.missing&&!report.substituted&&!report.extra) return {
  headline:'本次识别文字与原句一致',
  instruction:'很好，可以尝试自然语速再读一次，或进入下一句。文字一致不代表口音、重音已经准确。',
  focusWords:[],readyForNext:true
 };
 if(report.missing||report.substituted) return {
  headline:'优先练习识别不一致的词',
  instruction:'先点击下方词语听一遍，再单独跟读，然后返回完整句子。识别差异也可能来自语音服务或背景噪声。',
  focusWords,readyForNext:false
 };
 return {headline:'识别中出现了额外词语',
  instruction:'试着连贯读完短句，减少重复和旁边的噪声后再次识别。',
  focusWords:[],readyForNext:false};
}

export type RecentAttempt={id:number;target:string;heard:string;match:boolean};
export function appendAttempt(recent:RecentAttempt[],next:RecentAttempt):RecentAttempt[] {
 return [...recent,next].slice(-5);
}
