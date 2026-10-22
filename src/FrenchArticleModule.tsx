/** Source-matched Chinese teaching for existing French manuscripts about articles,
 * c'est/ce sont and il y a. The sentences below are authored supplementary examples,
 * never represented as literal translations of a private manuscript. */
const pairs=[
 {fr:"C'est une table.",zh:'这是一张桌子。',why:'首次识别阴性单数名词 table：une table。'},
 {fr:'Ce sont des livres.',zh:'这些是一些书。',why:'ce sont 后介绍多个物品，名词 livres 为复数。'},
 {fr:'Il y a des livres sur la table.',zh:'桌子上有一些书。',why:'il y a 表达某处存在物品，sur 表示在……上面。'},
 {fr:"Il n'y a pas de stylo ici.",zh:'这里没有笔。',why:'il y a 的普通否定式是 il n’y a pas de + 名词。'},
 {fr:"Ce n'est pas un livre.",zh:'这不是一本书。',why:'c’est 的否定通常仍保留 un/une；不能把所有否定句的冠词一律变成 de。'}
];
export default function FrenchArticleModule({stage}:{stage:number}){
 const Example=({index}:{index:number})=><div className="bilingual-line" key={index}>
  <p className="bilingual-target" lang="fr">{pairs[index].fr}</p>
  <p className="bilingual-chinese">{pairs[index].zh}</p>
  <p className="bilingual-usage">{pairs[index].why}</p>
 </div>;
 if(stage===0)return <section className="bilingual-teaching" aria-label="冠词情境精讲">
  <h3>从辨认物品到描述位置</h3>
  <p className="bilingual-lead">先回答“这是什么？”，再回答“这里有什么？”。这两种情境分别使用 c’est / ce sont 和 il y a，不要把它们当成同一个句型。</p>
  <Example index={0}/><Example index={2}/>
  <p className="bilingual-goal">完成本课后，应能介绍房间里的三种物品，区分单复数与定冠词，并正确表达“有／没有”。</p>
 </section>;
 if(stage===1)return <section className="bilingual-teaching" aria-label="法语冠词和存在句">
  <h3>冠词与存在句：系统语法精讲</h3>
  <div className="bilingual-topics">
   <section className="bilingual-topic"><h4>1. 不定冠词：un / une / des</h4>
    <p>首次引入一个未被具体确定的物品时使用不定冠词。阳性单数用 un，阴性单数用 une，复数一般用 des；必须连同名词性别一起记忆。</p><Example index={0}/><Example index={1}/></section>
   <section className="bilingual-topic"><h4>2. 定冠词：le / la / les / l’</h4>
    <p>对话双方已经知道、上文提过或明确指向的事物可以使用定冠词。阳性单数 le，阴性单数 la，复数 les；元音或哑音 h 开头的单数名词前使用 l’，例如 l’ordinateur（那台电脑）。</p>
    <p>对比：<strong>un livre</strong>（一本书，首次介绍）与 <strong>le livre</strong>（那本书，已明确）。</p></section>
   <section className="bilingual-topic"><h4>3. 识别句：c’est / ce sont</h4>
    <p>c’est 通常接单数名词词组；ce sont 通常接复数名词词组。注意单复数变化不仅在名词，也会影响前面的冠词。</p><Example index={0}/><Example index={1}/></section>
   <section className="bilingual-topic"><h4>4. 存在句：il y a 及其否定</h4>
    <p>il y a 表示“某处有……”，不是在说明某件物品“是什么”。常见否定结构是 il n’y a pas de + 名词；但 c’est 的否定不能机械照搬这个规则。</p><Example index={2}/><Example index={3}/><Example index={4}/></section>
  </div>
 </section>;
 if(stage===2)return <section className="bilingual-teaching" aria-label="冠词与名词词汇">
  <h3>名词与冠词一起记忆</h3>
  <div className="bilingual-vocab">
   {([['une table','一张桌子（阴性）'],['un livre','一本书（阳性）'],['des livres','一些书（复数）'],['un stylo','一支笔（阳性）'],["l’ordinateur",'那台电脑（元音前缩合）'],['sur la table','在那张桌子上']] as const).map(([fr,zh])=>
    <div key={fr}><strong lang="fr">{fr}</strong><span>{zh}</span></div>)}
  </div>
  <p className="bilingual-lead">优先记住“冠词 + 名词”的搭配，而不是只背孤立的中文释义。复数名词和否定句需要单独检查。</p>
 </section>;
 if(stage===3)return <section className="bilingual-teaching" aria-label="双语句型阅读">
  <h3>中法对照阅读</h3><div className="bilingual-list">{pairs.map((_,i)=><Example key={i} index={i}/>)}</div>
  <p className="bilingual-lead">先判断每句是在辨认物品、描述存在，还是进行否定；再解释为什么所选冠词适合该句。</p>
 </section>;
 if(stage===5)return <section className="bilingual-teaching" aria-label="法语物品描述表达">
  <h3>从词组到连贯表达</h3><p>任务：用 4—6 句法语描述一个房间。至少写一次 c’est、一次 ce sont、一次 il y a 和一个正确的否定句。</p>
  <h4>分步示范</h4>
  <div className="bilingual-list"><Example index={0}/><Example index={1}/><Example index={2}/><Example index={3}/></div>
  <h4>检查你的答案</h4>
  <ul><li>每个名词的性别、单复数与冠词是否一致？</li>
   <li>c’est 和 ce sont 是否与单复数相配？</li>
   <li>是否区分 il n’y a pas de 和 ce n’est pas un/une？</li>
   <li>句子能否组成一段清楚的房间介绍？</li></ul>
 </section>;
 return null;
}
