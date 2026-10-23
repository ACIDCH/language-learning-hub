import type {LearningSection} from './specialtyLibrary';
type E=[string,string,string];
const V=(title:string,concept:string,examples:E[],caution:string):LearningSection=>({title,concept,pattern:examples.map(e=>e[0]).join(' / '),examples:examples.map(([target,zh,analysis])=>({target,zh,analysis})),caution});
export const SPEAKING_VOCABULARY:Record<string,LearningSection[]>={
 '01':[
 V('偏好与优先项','preference 是偏好，常与 for 搭配；priority 是优先考虑的事项。偏好描述通常选择，优先项说明选择时最看重什么；两者可以随任务变化，不能视为同义词。',[
 ['I have a preference for quiet study spaces.','我偏好安静的学习空间。','preference for + 名词；不是 preference of quiet。'],['For group work, discussion is my priority.','做小组任务时，讨论是我的首要考虑。','priority 指比较标准，不等于最喜欢的活动。']], '不要把个人 preference 写成对所有学习者都成立的最佳选择。'),
 V('情境与方便','circumstance 是影响选择的情况，常用复数 circumstances；convenient 是方便的，适用于地点、时间或安排。形容人时说方便不方便，通常改用 available 表示有空。',[
 ['My choice depends on the circumstances.','我的选择取决于具体情况。','复数指多项相关条件。'],['Home is convenient for recording a rehearsal.','在家录排练很方便。','convenient for + 活动；不是说本人 convenient。']], '不要直接说 I am convenient 来表示自己有空；应问时间是否 suitable 或本人是否 available。'),
 V('权衡与频率','trade-off 指得到某个好处时需接受另一项不足，常接 between；generally 是通常、总体而言，允许例外。它不提供统计比例，也不能与 always 不加区别地互换。',[
 ['There is a trade-off between quiet and permission to talk.','安静与可以交谈之间存在权衡。','明确两个比较维度，避免空说有利有弊。'],['I generally read at the library.','我通常在图书馆阅读。','generally 保留偶尔在其他地方读的可能。']], 'trade-off 不一定是坏事；generally 也不等于每一次都如此。')],
 '02':[
 V('展开与具体化','extend an answer 表示展开回答，新增信息必须服务问题；specific 指具体、明确，不只是词汇罕见。菜名、动作和结果可以使例子具体，重复形容词则通常不能。',[
 ['Extend the answer with a relevant example.','用相关例子展开回答。','with 指新增的内容，relevant 限制其与主题的关系。'],['Give a specific detail about the soup.','给出关于汤的具体细节。','specific detail 可指调整调味，而非空泛的 delicious。']], '展开不等于不断延长；无关细节会使回答偏离问题。'),
 V('惯例与收获','routine 可作名词表示固定做法，或形容词表示例行的；rewarding 描述活动给人满足或收获。rewarding 不等于 rewarded，后者常表示被奖励。',[
 ['Cooking is part of my weekend routine.','做饭是我周末惯常安排的一部分。','routine 在这里是名词。'],['Adjusting the seasoning was rewarding.','调整调味让我有收获。','评价活动带来的满足，不是声称得到了奖品。']], '不要把 rewarding meal 机械理解成一顿获奖餐，也不要让 routine 替代具体活动。'),
 V('信心与反思','confidence 常与 in 搭配表示对某能力有信心，也可说 confidence to do；reflection 指回顾并解释经验的意义。反思应从事件导出，不只是再讲一遍事件。',[
 ['The experience gave me confidence to try another dish.','这次经历让我有信心尝试另一道菜。','to try 表示更有把握去做的事。'],['My reflection explains what changed after cooking.','我的反思说明做饭后发生了什么变化。','reflection 关注收获及后续影响。']], '信心增长不代表已经精通；reflection 也不是没有证据的宏大人生结论。')],
 '03':[
 V('意外与安排','unexpected 是未预期的，不必然是坏事，既可修饰问题也可修饰帮助；arrange 是事先安排，常接活动或 to do。时间安排应与叙述中的实际先后相符。',[
 ['The unexpected help made the journey memorable.','意外的帮助使这趟行程难忘。','unexpected 在此具有正面结果。'],['I had arranged to attend my friend’s exhibition.','我此前已安排去参加朋友的展览。','arrange to attend 表示计划参加，不是保证成功到达。']], '不要把 unexpected 一律译成灾难；安排和实际发生也不是同一层次。'),
 V('意识到与设法完成','realise 后可接 that 从句表示意识到事实；manage to do 表示在困难下设法完成。manage doing 不是这里的标准搭配；realise 也不等于早就知道。',[
 ['I realised that I needed another route.','我意识到需要另一条路线。','意识到发生在等待后，是叙述转折。'],['We managed to reach the station.','我们设法到了车站。','managed to 指克服困难后的结果。']], '不要把 manage to 改成仅仅尝试；如果没有完成，应选 try to 而非声称成功。'),
 V('最终与难忘','eventually 强调经过过程后最终发生，不能用来表示可能；memorable 指值得记住，既可源于正面也可源于负面经历。结尾应解释具体为何难忘。',[
 ['We eventually caught the next train.','我们最终赶上了下一班火车。','最终结果，不是“可能赶上”。'],['The stranger’s help was the memorable part.','陌生人的帮助是难忘之处。','memorable 与叙述重点相连。']], 'eventually 不是 possibly；memorable 也不必等于 enjoyable。')],
 '04':[
 V('氛围与友好','atmosphere 可指一个地方给人的整体感觉，常与 create、relaxed 搭配；welcoming 表示让新来的人感到被接纳。说明谁做了什么，才能支撑氛围判断。',[
 ['The volunteer helped create a relaxed atmosphere.','志愿者帮助营造了轻松氛围。','create an atmosphere，冠词不可漏。'],['The demonstration made the studio welcoming.','示范让工作室显得友好。','welcoming 指接纳感，不是 welcome 的过去时。']], '不应仅列 nice、good、friendly；至少提供一个行为证据。'),
 V('示范与参与','demonstrate 可表示演示操作，也可表示论证，须按语境区分；participate in 表示参与活动，不直接接活动名词。原稿是示范陶土准备，不是证明某个科学命题。',[
 ['The volunteer demonstrated how to prepare the clay.','志愿者演示了如何准备陶土。','how 从句描述操作步骤。'],['I participated in the workshop.','我参加了工作坊。','participate in；也可用 take part in。']], '不要漏掉 participate 后的 in；演示动作不等于证明学习效果。'),
 V('犹豫与印象','hesitate 可表示行动前犹豫，hesitate to do 表示迟疑是否做；impression 常与 leave、make 搭配。first impression 是初印象，不一定与活动后的总体印象相同。',[
 ['I hesitated at the door.','我在门口犹豫了一下。','at the door 定位动作发生处。'],['The freedom to make mistakes left a strong impression.','可以自由犯错留下了深刻印象。','left an impression 将具体体验与感受相连。']], 'hesitate 不等于拒绝参加；强烈印象也不自动说明作品质量专业。')],
 '05':[
 V('可靠与灵活','reliable 指可以依赖，predictable 指结果或时间较易预知；flexible 指能适应不同安排。交通比较需说明是哪一维度：准时、路线调整还是携物方便。',[
 ['I need a reliable way to reach work.','我需要可靠的通勤方式。','reliable way 强调能依赖的安排。'],['My schedule is more flexible on Fridays.','我周五的日程更灵活。','flexible 修饰时间安排，不自动表示更快。']], '可靠、灵活、便宜并不等价，不能为了同义替换改变比较标准。'),
 V('票价与路线','fare 是交通票价，可说 bus fare；fee 多指某项服务的收费。route 是路线，不是整个旅程经历。原稿没有实际票价，比较时不应擅加金额。',[
 ['I would check the bus fare before comparing costs.','比较费用前，我会查看公交票价。','would check 是待做步骤，不是已知价格。'],['The route includes a protected cycle lane.','这条路线有隔离自行车道。','route 与具体路段条件相连。']], '不能把原文无票价改成公交每次固定收费某金额；假设应另行标明。'),
 V('可预测与后果','predictable 强调可以预见，不必然意味着好；consequence 是结果，可正可负，常用 consequence of。解释因果时，应把具体条件与个人选择连接起来。',[
 ['Cycling is more predictable on this journey.','这次行程中，骑车时间更可预测。','on this journey 限定适用范围。'],['One consequence of moving closer was a change in my commute.','搬近的一个结果是通勤方式改变了。','one consequence 避免声称这是唯一后果。']], '后果不一定是惩罚；可预测也不等于永远最快或没有风险。')],
 '06':[
 V('期待与即时性','expectation 是对会发生什么或别人应如何行动的预期；immediacy 指即时特征。信息送达的即时性可能影响回复期待，但两者不能自动画等号。',[
 ['The team should discuss expectations about replies.','团队应讨论对回复的预期。','expectations about 指具体讨论对象。'],['The immediacy of messages can create pressure.','消息的即时性可能产生压力。','can 表示可能，不是实测普遍结论。']], '不能把立即送达改写成接收者必须或能够立即回复。'),
 V('适应与压力','adapt to 表示适应，to 是介词；adapt a rule 表示调整规则。pressure to do 指做某事的压力，under pressure 指处于压力之下；两者描述不同语法关系。',[
 ['People adapt to new communication habits.','人们适应新的通信习惯。','adapt to + 名词，不是 adapt with。'],['Workers may feel pressure to answer immediately.','工作者可能感到必须立即回复的压力。','pressure to answer 指压力的内容。']], '适应不等于无条件接受；原稿也没有说明所有工作者都受同样压力。'),
 V('评价与背景','evaluate 表示根据标准评估，不只是表达喜欢与否；context 是理解行为所需的情境。专业场景、家庭协调等背景变化，可能改变适当回复时限。',[
 ['Evaluate the system by whether boundaries are clear.','依据界限是否清楚来评价这个系统。','by whether 引入标准。'],['The appropriate response time depends on the context.','适当的回复时间取决于情境。','context 提示工作性质等条件。']], 'context 不只是文字上下文；评价标准必须与实际问题相关。')],
 '07':[
 V('重音与语调','stress 在此指语音重音，不能译成心理压力；intonation 指语调变化。词重音与句子信息焦点相关但不同，语调也不能仅从识别出来的文字确定。',[
 ['Place contrastive stress on tea.','把对比重音放在 tea 上。','说明预期焦点，不代表已经发对。'],['The transcript does not display the full intonation.','转写不呈现完整语调。','intonation 需要声学证据。']], '不要用文字相似率替代重音或语调准确率，无法判断就说明限制。'),
 V('对照与意群','contrast 表示对照，常说 a contrast between；chunk 是语流中的一个有意义单位。停顿可帮助组织信息，但并不是每两个词之间都应停一下。',[
 ['The contrast is between tea and coffee.','对照的是茶和咖啡。','between 指明两个对比项。'],['Read the explanation in meaningful chunks.','按有意义的意群读解释。','chunk 强调语义组织，不只是固定字数。']], '不要在 ordered the tea 内机械断开以追求整齐；停顿须服务意思。'),
 V('强调与可懂度','emphasis 是强调，常用 put emphasis on；intelligibility 是听者能否理解的程度。清楚表达不要求所有人采用同一口音，也不等于系统成功识别每个词。',[
 ['Put emphasis on the action in the second exchange.','第二段对话中强调动作。','强调对象随误解改变。'],['The aim is intelligibility, not a single prescribed accent.','目标是可懂度，不是某一种指定口音。','把交际目标与口音模仿区分。']], '可懂度的判断仍需听者或可靠声学证据，不能凭文本宣告达标。')],
 '08':[
 V('澄清与换言','clarify 是澄清含义，使误解减少；rephrase 是换一种说法，可能保留原意。若论断范围真的改变，就应指出修正内容，而不把它藏在同义表达中。',[
 ['Let me clarify what I mean by access.','让我澄清这里“可及性”的意思。','clarify + 宾语，明确澄清对象。'],['I can rephrase the point without changing its scope.','我可以换种说法而不改变范围。','rephrase 不一定是认错。']], '纠正事实和改善措辞不同；不能一律称为“只是换个说法”。'),
 V('限定与一致','qualify a claim 表示给论断加限定，不是获得资格；consistent with 表示与……一致。一个带条件的偏好在条件改变时作不同选择，仍可能保持一致。',[
 ['I need to qualify my claim about opening hours.','我需要限定关于开放时间的论断。','qualify 在此调节范围与力度。'],['The revised answer is consistent with local variation.','修正后的回答容许地方差异，与此一致。','consistent with 不代表所有地方安排相同。']], '不要把 qualify 自动译成“合格”；consistent 也不等于永远给相同答案。'),
 V('打断与区分','interruption 指打断或中断；distinction 指两个概念之间的区别，常说 draw a distinction between。有效修正应让区别清楚，再继续讨论，不必每次从头开始。',[
 ['A brief correction need not become a long interruption.','简短修正不必变成长时间中断。','need not 表示没有必要，不是禁止。'],['Draw a distinction between correction and rephrasing.','区分纠正与换言表达。','between 连两个需要区分的操作。']], '减少中断不是掩盖错误；应说清修改后再继续观点。')],
};
