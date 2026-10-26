import type {SpecialtyLesson,LearningQuestion} from './specialtyLibrary';
import {SPEAKING_GRAMMAR} from './speakingGrammar';
import {SPEAKING_VOCABULARY} from './speakingVocabulary';
import {SPEAKING_RECEPTION} from './speakingReception';
type Q=[string,string,string];
const grammar:Record<string,Q[]>={
 '01':[['修正 I tend studying at home.','I tend to study at home.','tend to 后接动词原形；不是 tend 加动名词。'],['把所有任务都适合图书馆改成有范围的个人偏好。','I generally prefer the library for reading, but I rehearse aloud at home.','generally 和 for reading 限定范围，后半句给具体例外。']],
 '02':[['修正 I enjoy to cook.','I enjoy cooking.','enjoy 后接动名词，不接 to 不定式。'],['解释 which 在 I tasted and adjusted the soup, which helped me learn 中的指代。','It refers to tasting and adjusting the soup. / 指尝味和调整这个过程。','非限定 which 可回指前面行为；不能随意指向未出现的活动。']],
 '03':[['以故障为过去参照点，改写更早发生的 I leave early。','I had left early.','had + 过去分词标明早于车辆故障的动作。'],['连接背景 travel 与突发事件 break down。','I was travelling when the bus broke down.','进行时提供背景，一般过去时突出突发事件。']],
 '04':[['区分 I used to work 与 I was used to working。','前者：过去常做。后者：当时已习惯做。','后一结构的 to 是介词，后接动名词；两句不能当作相同经历。'],['修正 The gesture made me to feel welcome。','The gesture made me feel welcome.','主动 make + 宾语 + 动词原形，不加 to。']],
 '05':[['修正 Cycling is more faster。','Cycling is faster.','faster 已是比较级，不与 more 重复；仅用于比较形式练习，原稿没有测得速度优势。'],['用 because 说明个人偏好变化，保留原稿原因。','My preference changed because I moved closer to work.','原因是搬近，不是所有公交变慢；范围限定在个人。']],
 '06':[['修正 I evaluate it by whether can people set boundaries。','I evaluate it by whether people can set boundaries.','介词后 whether 从句使用陈述语序，不进行问句倒装。'],['把必然要求所有人立即回复，改成可能性与范围合适的表达。','Instant communication may create pressure to reply immediately.','may 保留可能性；描述压力不同于所有人都必须回复。']],
 '07':[['修正 The tea has not arrive。','The tea has not arrived.','现在完成时 has 后需要过去分词 arrived。'],['相同文字的两次转写能否证明重音一致？解释。','No. A transcript does not establish audible focus. / 不能，转写不能确定声音焦点。','语法正确或识别成功不包含足够韵律证据，不提供虚假专业评分。']],
 '08':[['修正 Let me to rephrase the point。','Let me rephrase the point.','let + 宾语 + 动词原形，中间不加 to。'],['把 all facilities should open late 改为原稿修正后的主张。','Essential services should consider hours that match local needs.','范围改为基本服务，强度改为考虑当地需要，不再要求所有设施同样延时。']],
};
const vocab:Record<string,Q[]>={
 '01':[['填空：a preference ___ quiet places；a trade-off ___ quiet and discussion。','for; between','preference for 表示对某物的偏好；trade-off between 明确权衡双方。'],['I am convenient 表示“我有空”是否自然？','这里宜说 I am available；时间可说 The time is convenient for me。','convenient 通常形容安排、时间、地点，不直接表达人的有空状态。']],
 '02':[['填空：confidence ___ try another dish；a specific ___。','to; detail','confidence to do 表示去做的信心；specific detail 要提供具体信息。'],['rewarding 是否表示已经获得奖品？','No. It describes satisfaction or value from the activity. / 不是，表示活动有收获。','rewarding 与 rewarded 不同，不能凭前者推出获奖事件。']],
 '03':[['填空：managed ___ reach the station；realised ___ another route was needed。','to; that','manage to do 指设法完成；realise that 从句说明意识到的内容。'],['eventually 与 possibly 是否能互换？','No. Eventually means in the end; possibly indicates uncertainty. / 不能，前者指最终，后者指可能。','时间进程与可能性属于不同意义，替换会改变事件是否发生。']],
 '04':[['填空：participate ___ a workshop；leave a strong ___。','in; impression','participate in 是参与活动的搭配；leave an impression 表示留下印象。'],['用一个具体行为支持 welcoming。','A volunteer noticed my hesitation and showed me how to prepare the clay.','说明志愿者注意犹豫并示范，比只说友好更有证据。']],
 '05':[['填空：bus ___；a consequence ___ moving closer。','fare; of','fare 是交通票价；consequence of 后接带来后果的原因。'],['predictable 能否直接改写成 fastest？','No. Predictable concerns reliability of expectations, not necessarily speed. / 不能。','原稿比较可预测性，未经测量不能增加最快的断言。']],
 '06':[['填空：adapt ___ a new routine；pressure ___ reply。','to; to','adapt to 后接适应对象；pressure to do 后说明受到压力去做的事。'],['evaluate 比单说 like 多了什么要求？','A relevant criterion, such as whether boundaries are clear. / 需要相关评价标准。','评价应基于明确标准，不能只用个人喜欢代替分析。']],
 '07':[['填空：put emphasis ___ the action；a contrast ___ tea and coffee。','on; between','emphasis on 指强调对象，contrast between 明确对照双方。'],['转写正确能否证明 intelligibility 的全部方面？','No. Timing, stress and intonation require listening or acoustic evidence. / 不能。','词语识别不涵盖节奏、重音和语调的全部交际效果。']],
 '08':[['填空：consistent ___ local variation；draw a distinction ___ two operations。','with; between','consistent with 表示一致，distinction between 表示区分两者。'],['qualify a claim 在本课是什么意思？','Add limits to its scope or strength. / 限定论断范围或力度。','不是取得资格；这里要把过强的 all 或 should open 调整成有条件主张。']],
};
const questions=(rows:Q[]):LearningQuestion[]=>rows.map(([question,answer,why])=>({question,answer,why}));
export const SPEAKING_SPECIALTIES:SpecialtyLesson[]=Object.keys(SPEAKING_GRAMMAR).flatMap(n=>{
 const courseId='en-ielts-speaking-u'+n,reading=SPEAKING_RECEPTION[courseId];
 return (['grammar','vocabulary'] as const).map(type=>({
  id:'en-speaking-u'+n+'-'+type,type,language:'en',level:'B2',unitLink:courseId,
  title:'Speaking '+n+' · '+(type==='grammar'?'句法与语篇：':'词义与搭配：')+reading.title,
  subtitle:reading.genre,prerequisite:n==='01'?'能够组织完整英语句子，并区分个人经验与普遍判断。':'先完成 Speaking U'+String(Number(n)-1).padStart(2,'0')+' 的示范与追问，保留自己的一次修改。',
  objective:reading.task,sections:(type==='grammar'?SPEAKING_GRAMMAR:SPEAKING_VOCABULARY)[n],
  questions:questions((type==='grammar'?grammar:vocab)[n]),output:reading.task,
  model:reading.paragraphs.slice(0,2).map((p,i)=>({target:p.target,zh:p.zh,analysis:i===0?'原稿的完整口语示范，先明确立场、经历或纠正对象。':'围绕原稿的追问示范；新增细节是教学对话，不是原稿已报告的事实。'})),
  referenceUrls:[],sourceNote:'对应 content/lesson-drafts/'+courseId+'.json；原文保留。规则、对比例句和追问为项目原创补充，尚无独立人工审校或官方评分。',
 } satisfies SpecialtyLesson));
});
