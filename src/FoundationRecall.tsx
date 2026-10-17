import {useEffect,useMemo,useState} from 'react';
import {cardsForLesson,moveToNext,recallSummary} from './foundationRecall';
export default function FoundationRecall({id,words,language}:{id:string;words:[string,string][];language:'en'|'fr'}){
 const cards=useMemo(()=>cardsForLesson(id,words),[id,words]);
 const [ratings,setRatings]=useState<Record<string,0|1|2>>({});
 const [revealed,setRevealed]=useState(false);
 const [reverse,setReverse]=useState(false);
 const [round,setRound]=useState(1);
 useEffect(()=>{setRatings({});setRevealed(false);setRound(1);setReverse(false);},[id]);
 const summary=recallSummary(cards,ratings);
 const next=moveToNext(cards,ratings);
 function rate(value:0|1|2){
  if(!next||!revealed)return;
  setRatings(v=>({...v,[next.key]:value}));setRevealed(false);
 }
 function repeatUncertain(){
  const second:Record<string,0|1|2>={};
  for(const card of cards)if(ratings[card.key]===2)second[card.key]=2;
  setRatings(second);setRevealed(false);setRound(x=>x+1);
 }
 function say(term:string){
  if(!('speechSynthesis' in window))return;
  const synth=window.speechSynthesis;
  synth.cancel();
  const u=new SpeechSynthesisUtterance(term);u.lang=language==='fr'?'fr-FR':'en-US';u.rate=.85;
  synth.speak(u);
 }
 return <section className="foundation-recall" aria-label="本课词汇主动回忆">
  <h5>词汇主动回忆 · 第 {round} 轮</h5>
  <p className="cloud-disclaimer">先试着回忆再显示答案。选择“需要重练 / 有点犹豫 / 已能回忆”是自我记录，不是机器自动判定正确率。本轮结果只存在当前页面，不上传学习音频。</p>
  <label className="foundation-recall-direction"><input type="checkbox" checked={reverse}
    disabled={summary.done>0} onChange={e=>setReverse(e.target.checked)}/>
    中文回忆外语词汇（反向练习，开始后不可切换）
  </label>
  <p>本轮进度：{summary.done}/{summary.total} · 需要重练 {summary.retry} · 犹豫 {summary.hesitant} · 熟悉 {summary.fluent}</p>
  {next?<div className="foundation-recall-card">
    <p className="foundation-recall-prompt">{reverse?next.meaning:next.term}</p>
    <button type="button" onClick={()=>setRevealed(x=>!x)}>
      {revealed?'隐藏答案':'显示答案'}
    </button>
    {revealed&&<>
      <p className="foundation-recall-answer">{reverse?next.term:next.meaning}</p>
      <button type="button" onClick={()=>say(next.term)}>播放该词（设备 TTS）</button>
      <div className="foundation-recall-ratings">
        <button type="button" onClick={()=>rate(0)}>需要重练</button>
        <button type="button" onClick={()=>rate(1)}>有点犹豫</button>
        <button type="button" onClick={()=>rate(2)}>已能回忆</button>
      </div>
    </>}
  </div>:<div className="foundation-recall-complete">
    <strong>本轮 {summary.total} 张词卡已完成。</strong>
    <p>熟悉 {summary.fluent} · 有点犹豫 {summary.hesitant} · 需要重练 {summary.retry}</p>
    {(summary.retry+summary.hesitant)>0&&<button type="button" onClick={repeatUncertain}>
      仅复练不熟悉的词汇
    </button>}
    <button type="button" onClick={()=>{setRatings({});setRevealed(false);setRound(x=>x+1);}}>
      重新练习全部词卡
    </button>
  </div>}
 </section>;
}
