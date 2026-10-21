import {useState} from 'react';
import type {CuratedUnit,SentencePair,Practice} from './curatedCurriculum';

function PairedSentence({entry,language}:{entry:SentencePair;language:'en'|'fr'}){
 return <div className="bilingual-line curated-sentence">
  <p className="bilingual-target" lang={language}>{entry.target}</p>
  <p className="bilingual-chinese" lang="zh-Hans">{entry.zh}</p>
  <p className="bilingual-usage">{entry.why}</p>
 </div>;
}
function PracticeSet({items,stage}:{items:Practice[];stage:number}){
 const [responses,setResponses]=useState<Record<number,string>>({});
 const [revealed,setRevealed]=useState<Record<number,boolean>>({});
 return <section className="curated-practice" aria-label="理解检查与解析">
  <h4>练习与逐题解析</h4>
  {items.map((item,i)=><div className="curated-question" key={stage+'-'+i}>
   <label htmlFor={'curated-'+stage+'-'+i}><strong>{i+1}. {item.question}</strong></label>
   <textarea id={'curated-'+stage+'-'+i} rows={2} value={responses[i]||''} onChange={e=>setResponses(p=>({...p,[i]:e.target.value}))} placeholder="先自己写出答案，再核对"/>
   <button type="button" aria-expanded={!!revealed[i]} onClick={()=>setRevealed(p=>({...p,[i]:!p[i]}))}>
    {revealed[i]?'收起解析':'核对答案与解析'}
   </button>
   {revealed[i]&&<div className="curated-answer"><p><strong>参考答案：</strong>{item.answer}</p>
    <p><strong>为什么：</strong>{item.explanation}</p></div>}
  </div>)}
 </section>;
}
/** Learner-first five-stage teaching for matching existing private sources.
 * Supplementary model examples are visible as examples, without rewriting source bytes. */
export default function CuratedLesson({unit,stage}:{unit:CuratedUnit;stage:number}){
 const pairs=(lines:SentencePair[])=><div className="bilingual-list">{lines.map((entry,i)=>
  <PairedSentence key={i} entry={entry} language={unit.language}/>)}</div>;
 return <section className="bilingual-teaching curated-lesson" aria-label="系统双语教材">
  {stage===0&&<>
   <h3>这一课的实际学习情境</h3>
   <p className="bilingual-lead">{unit.scenario}</p>
   <p className="curated-precondition"><strong>学习前：</strong>{unit.prerequisite}</p>
   <p className="bilingual-goal"><strong>学习完成后：</strong>{unit.goal}</p>
   <h4>从情境中的完整句子开始</h4>{pairs(unit.scene)}
   <p className="curated-guidance">先按顺序理解这些句子的功能，再进入下一阶段分析规则；需要听读或练习发音时，直接选择上方词句使用现有右侧工具。</p>
  </>}
  {stage===1&&<>
   <h3>{unit.language==='fr'?'GRAMMAIRE｜系统语法详解':'GRAMMAR｜学术信号与论证分析'}</h3>
   <p className="bilingual-lead">每个知识点按照规则、结构、例句与中文解释依次学习。先判断一个句子表达的功能，再分析它为什么采用这一结构。</p>
   <div className="bilingual-topics">{unit.grammar.map((topic,i)=><section className="bilingual-topic" key={i}>
    <h4>{topic.title}</h4>
    <p>{topic.principle}</p>
    <p className="curated-pattern"><strong>结构提要：</strong>{topic.pattern}</p>
    {pairs(topic.examples)}
   </section>)}</div>
  </>}
  {stage===2&&<>
   <h3>词汇与可迁移的语块</h3>
   <p className="bilingual-lead">每次记忆一个带有实际搭配的词，而不是只记一个中文对应。结合上一阶段的例句观察名词、动词或论证标记的实际使用。</p>
   <div className="curated-vocab">{unit.vocabulary.map(word=><article key={word.word} className="curated-vocab-item">
    <h4 lang={unit.language}>{word.word}</h4>
    <p>{word.zh}</p>
    <p className="curated-collocation" lang={unit.language}>{word.collocation}</p>
    <p className="bilingual-usage">{word.note}</p>
   </article>)}</div>
  </>}
  {stage===3&&<>
   <h3>听读｜完整材料与逐句中文对照</h3>
   <h4>{unit.reading.title}</h4>
   <p className="bilingual-lead">{unit.reading.instruction}</p>
   {pairs(unit.reading.pairs)}
   <p className="curated-guidance">{unit.reading.note}</p>
  </>}
  {stage===5&&<>
   <h3>表达｜从提纲到独立产出</h3>
   <p className="bilingual-goal">{unit.output.task}</p>
   <h4>先完成这些步骤</h4>
   <ol>{unit.output.steps.map((step,i)=><li key={i}>{step}</li>)}</ol>
   <h4>中外文对照示范</h4>{pairs(unit.output.model)}
   <h4>现在写出自己的版本</h4>
   <OutputEditor unit={unit}/>
   <h4>交稿前检查</h4><ul>{unit.output.checklist.map(x=><li key={x}>{x}</li>)}</ul>
  </>}
  {unit.practice[stage as 0|1|2|3|5]&&<PracticeSet key={unit.id+'-'+stage} stage={stage} items={unit.practice[stage as 0|1|2|3|5]!}/>}
 </section>;
}
function OutputEditor({unit}:{unit:CuratedUnit}){
 const [value,setValue]=useState('');
 const words=value.trim().split(/\s+/u).filter(Boolean).length;
 const sentences=(value.match(/[.!?。！？]+/gu)||[]).length;
 return <div className="curated-output">
  <label htmlFor={'curated-output-'+unit.id}>我的完整表达</label>
  <textarea id={'curated-output-'+unit.id} rows={7} value={value}
   onChange={e=>setValue(e.target.value)} placeholder="参考步骤完成自己的连贯段落，然后再与示范对照。"/>
  <p role="status">{unit.language==='en'?'当前英文词数：'+words+'（目标 80—120 词）':'当前已写句数（按句末标点估计）：'+sentences+'（目标 5—6 句）'}</p>
  <p className="bilingual-help">此处是即时练习区。需要长期保存时，可选择内容并加入右侧笔记，或使用本课下方的个人笔记。</p>
 </div>;
}
