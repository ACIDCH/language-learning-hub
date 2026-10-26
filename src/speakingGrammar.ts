import type {LearningSection} from './specialtyLibrary';
type Pair=[string,string,string];
const S=(title:string,concept:string,pattern:string,examples:Pair[],caution:string):LearningSection=>({title,concept,pattern,examples:examples.map(([target,zh,analysis])=>({target,zh,analysis})),caution});
export const SPEAKING_GRAMMAR:Record<string,LearningSection[]>={
 '01':[
 S('倾向不是绝对规则','prefer 后可接名词或动名词，表达选择。generally 限定通常情形，tend to 后接动词原形，表达倾向。直接说偏好，再说明适用的任务，既能回答问题，也能为例外留下空间。','prefer doing / tend to do / generally prefer',[
 ['I generally prefer studying in a library.','我通常更喜欢在图书馆学习。','generally 不等于 always；studying 是 prefer 后的活动。'],
 ['I tend to study at home when I need to speak aloud.','需要大声说话时，我往往在家学习。','tend to 后 study 用原形，when 从句给出条件。']],
 '不要写 tend studying；也不要把“通常”翻成“任何情况下都”。'),
 S('解释原因与限制','because 从句解释偏好的理由，that said 用于承接已有观点并补充限制。限制句必须指向具体情境，例如口头排练，而不是只说 everything depends 后不再作答。','I prefer X because… / That said, …',[
 ['I prefer the library because it separates study from home.','我偏好图书馆，因为它把学习和居家生活分开。','because 解释个人选择，不证明所有人在家都无法专心。'],
 ['That said, a quiet desk is unsuitable for a spoken rehearsal.','话虽如此，安静座位不适合口头排练。','具体例外限定上一偏好，而不是撤回全部理由。']],
 'because 不应与 so 重复连接同一因果主从句；that said 后仍需完整意思。'),
 S('假设变化与指代','现在真实条件可用 if + 现在时；设想任务变化时可用 if + 过去时、would + 原形。过去式在后一结构中标记假设距离，不是报告过去发生过的变化。','If I need…, I… / If my work involved…, I would…',[
 ['If I need to rehearse aloud, I choose a different room.','如果需要大声排练，我就选择另一个房间。','常规条件与当前选择相连。'],
 ['If my work involved more speaking, I would study at home more often.','如果任务涉及更多口语，我会更经常在家学习。','involved 与 would study 构成假设，不是已经改变工作的报告。']],
 '不要把假设从句中的过去式机械译成“过去曾经”；先看主句的 would。')],
 '02':[
 S('回答与具体理由','enjoy 后接动名词，because 后给出能解释偏好的完整理由。先说喜欢做什么，再解释为何有价值；把 interesting 重复几次并不会增加理由。','enjoy doing / because + clause',[
 ['I enjoy cooking at weekends.','我喜欢周末做饭。','enjoy 后接 cooking，不是 to cook。'],
 ['Cooking gives me a practical task after screen-based work.','面对屏幕工作后，做饭让我做点动手的事。','这句话说明偏好与工作方式的联系。']],
 '避免 enjoy to cook；理由应解释偏好，而不是只重复“我喜欢”。'),
 S('例子与补充从句','for instance 引出支持前面理由的具体事件。逗号后的 which 可以回指前一行为或情况；听者应能说清它指什么，否则回答虽然更长却更难跟随。','For instance, …, which…',[
 ['For instance, I made vegetable soup without following every step.','例如，我做蔬菜汤时没有逐步照着食谱。','菜名和做法具体解释动手探索。'],
 ['I tasted and adjusted the seasoning, which made the process engaging.','我尝味道并调整调味，这让过程有趣。','which 回指尝味和调整的过程，而不是孤立名词 seasoning。']],
 '非限定 which 前通常有逗号；不要把它接到与原例无关的新话题。'),
 S('结果与反思','过去事件用一般过去时组织，反思说明经历带来的变化。make + 宾语 + 形容词描述状态变化；make + 宾语 + 动词原形描述促成的动作，结构不同。','made me more confident / helped me understand',[
 ['The experience made me more confident.','这次经历让我更有信心。','confident 是形容词，描述我的状态。'],
 ['I understood why the soup needed more salt.','我明白了汤为什么需要再加盐。','why 从句用陈述语序，不倒装成 why did the soup。']],
 '反思需要实际变化；不能把一道菜的经验夸大成已经掌握所有烹饪技巧。')],
 '03':[
 S('背景与突发事件','过去进行时呈现当时正在发生的背景；一般过去时突出改变局面的事件。when 可以连接两者，但不是任何带 when 的句子都必须使用进行时。','was/were doing when + past simple',[
 ['I was travelling when the bus broke down.','我正在途中，公交车突然坏了。','travel 是持续背景，break down 是推进叙述的事件。'],
 ['I waited for twenty minutes and then looked for another route.','我等了二十分钟，然后寻找另一条路线。','两个完成动作按顺序展开，时间来自本课原稿。']],
 '不要仅因动作持续过一段时间就一律用进行时；叙述视角也重要。'),
 S('更早的动作','过去完成时用 had + 过去分词，把一个动作放在另一个过去参照点之前。说明出门早，是为了让听者理解车辆坏时为何不急；不是为了让每个句子都显得复杂。','had + past participle',[
 ['I had left early, so I was not worried at first.','我此前出门早，所以起初不担心。','left 早于故障；原因与反应连接。'],
 ['I received help from someone I had never met.','我得到了一位此前从未见过的人的帮助。','had never met 指得到帮助之前的经历。']],
 'had 后用过去分词，不写 had went；没有必要的先后参照时不堆砌过去完成时。'),
 S('结果与意义','just before 强调接近但仍早于参照事件。what 引导的名词性从句可充当主语，说明难忘之处。故事结束既应说明结果，也应回应为什么值得讲述。','just before… / What made… was…',[
 ['I arrived just before my friend began speaking.','我在朋友开始讲话前刚刚赶到。','before 不能改成 after，否则结果相反。'],
 ['What made the day memorable was the unexpected help.','使那一天难忘的是意外的帮助。','what 从句整体作主语，was 后说明意义。']],
 '没有原稿依据时，不添加迟到、错过发言或别人开车接送等不同事件。')],
 '04':[
 S('由行动支撑评价','make + 宾语 + 动词原形可描述某行动造成的感受；feel 后接形容词说明状态。评价 welcoming 应由志愿者帮助等具体行为支撑，而不是不断更换友好近义词。','made + object + feel + adjective',[
 ['The gesture made the studio feel welcoming.','这个举动让工作室显得友好。','feel 后 welcoming 描述感受，不是声称场地具有某个客观评分。'],
 ['A volunteer showed me how to prepare the clay.','一位志愿者教我怎样准备陶土。','how to 表示做事的方法，提供前句评价的依据。']],
 'make 的主动结构不加 to：made me feel，不是 made me to feel。'),
 S('过去习惯与习惯于','used to + 原形描述过去常做而今可能不同的活动；be used to + 名词或动名词表示已经熟悉。这里 to 在后一结构里是介词，所以接 working。','used to work / was used to working',[
 ['I used to work with clay.','我过去常用陶土。','这是对比练习，不是原稿中的个人经历。'],
 ['I was used to working with clay.','我当时已习惯用陶土。','强调熟悉的状态，并不说明现在是否还做。']],
 '两句仅用于语法比较；原稿没有长期陶艺经历，不能把比较例句当作事实补入摘要。'),
 S('让步与程度否定','far from + 形容词表示远未达到某种状态。but 可同时保留作品不专业和亲手制作的价值；without + 动名词说明没有出现的感受或行为。','far from professional / without feeling judged',[
 ['The bowl was far from professional but entirely my own.','碗远不专业，却完全是我自己的作品。','否定的是质量达到专业水平，不是否定所有价值。'],
 ['I could make mistakes without feeling judged.','我可以犯错，而不觉得被评判。','without 后用 feeling，重点是参与者的感受。']],
 'far from professional 不能译成“很专业”；without 后不直接接完整主谓句。')],
 '05':[
 S('同维度比较','比较级必须对应同一旅程和同一标准。more predictable 讨论可预测性，faster 讨论速度，more convenient 讨论方便程度；这些评价不能在转述中随意互换。','more + adjective + than',[
 ['Cycling is more predictable than the bus for my commute.','对我的通勤而言，骑车比公交更可预测。','保留个人行程范围，不能推广所有路线。'],
 ['The bus is more convenient when I carry equipment.','携带设备时，公交车更方便。','条件与评价维度改变，并不与前句矛盾。']],
 '不要写 more faster；也不要把时间可预测自动改成一定更快。'),
 S('对照与因果','whereas 并列对照两种情况，because 解释一个选择的原因。两种交通方式有差别，并不自动证明其中一项导致另一项；使用连接词前应先确定逻辑关系。','X, whereas Y / X because Y',[
 ['The road has a cycle lane, whereas the bus waits in traffic.','道路有自行车道，而公交车会堵在车流中。','对照同一路程上的条件。'],
 ['My preference changed because I moved closer to work.','因为搬得离单位更近，我的偏好改变了。','because 明确解释个人变化的原因。']],
 '不要把对照写成公交造成自行车道存在；原因和结果须能对应。'),
 S('不同条件下的可能选择','might + 原形表示可能性。someone living farther away 用现在分词短语修饰 someone，表示住得更远的人，不是正在进行的搬家动作。','someone living… might…',[
 ['Someone living farther away might choose the bus.','住得更远的人可能选择公交车。','might 不保证每个远距离通勤者都如此。'],
 ['The comparison concerns options for a journey, not groups of people.','比较的是一次行程的选项，而不是人群。','not 对照并限定比较对象。']],
 '不要把 might 译成“必须”；位置条件不能决定一个人的全部偏好。')],
 '06':[
 S('限定社会变化的论断','现在完成时可以讨论过去变化对现在的影响。probably 与 may 限定判断力度，不能在缺乏数据时把个人解释写成所有人都受到同样影响的定论。','has probably changed / may create',[
 ['Instant communication has probably changed expectations.','即时通信很可能改变了人们的期待。','完成时连接变化与当前状态；probably 保留判断性质。'],
 ['It may create pressure to reply immediately.','它可能造成立即回复的压力。','描述可能机制，不是经实测的普遍结果。']],
 '添加 probably 不会使任何无根据陈述都可靠；仍要说明机制与范围。'),
 S('否定不成立的推论','that does not mean 后接从句，否定由前一事实推得的结论，而不是否定前一事实本身。信息迅速送达，与接收者是否能立即回答是不同命题。','X, but that does not mean Y',[
 ['A message can arrive immediately, but its recipient may be busy.','消息可以立即送达，但接收者可能很忙。','but 引出与可回复性有关的限制。'],
 ['Fast delivery does not mean that everyone is available.','快速送达不意味着所有人都有空。','does not mean 否定推论，不是否认技术能快速送达。']],
 '不要把句子改成“没有任何人有空”；否定范围不同。'),
 S('评价标准与建议','whether 引导名词性从句，可放在介词 by 后说明评价依据。could 提出可行建议，would 表示设想中的评价。评价应从标准导出，而不只看速度一个指标。','evaluate by whether… / could agree on…',[
 ['I would evaluate it by whether people can set boundaries.','我会看人们能否设定界限来评价它。','whether 从句用陈述语序，不写 can people。'],
 ['A team could agree on response times.','团队可以约定回复时限。','这是建议，不是本课已证明有效的干预。']],
 '建议与已测效果必须分开；could 不应直接翻成“已经”。')],
 '07':[
 S('纠正焦点与省略','not coffee 中可省去与前句重复的主谓部分。文字内容保持相同并不保证重音相同；焦点应与听者具体误解对应，先明确纠正饮品还是纠正动作。','I ordered TEA, not coffee.',[
 ['I ordered tea, not coffee.','我点的是茶，不是咖啡。','纠正饮品种类；not 后不必重复 I ordered。'],
 ['I ordered the tea, but it has not arrived.','茶我已经点了，但还没送到。','纠正动作是否已发生，强调 ordered。']],
 '大小写只提示意图，不能当成实际音频里的重音证据。'),
 S('已完成动作与当前结果','ordered 用一般过去时报告点单；has not arrived 用现在完成时连接至今未到的结果。have/has 后接过去分词，否定可缩为 hasn’t，但不能省略助动词。','past simple + but + present perfect',[
 ['I ordered earlier, but the tea has not arrived.','我早先点了单，但茶至今没送到。','过去行动与当前等待状态形成对照。'],
 ['The transcript has captured the words.','转写已经捕捉到词语。','captured 只说明文字结果，不说明重音是否正确。']],
 '文字正确不等于声学正确；语法上完整的句子也可能韵律不清。'),
 S('意义分组与证据条件','even if 表示即使条件成立，后面的结论仍不变。把相同转写与相同语调区分，是本课反馈边界。停顿应尽量服务语义单位，不能随意切断名词短语。','Even if X, Y / cannot establish whether…',[
 ['Even if the words match, the focus may differ.','即使词语相同，焦点也可能不同。','让步条件保留声学差异的可能。'],
 ['A transcript cannot establish whether the focus was audible.','转写不能确定焦点是否听得出来。','whether 表示待判断问题，需要实际声音证据。']],
 '无法获得可靠声学证据时，应记录无法判定，而不是自动给满分或零分。')],
 '08':[
 S('缩小过度概括','all 限定整个类别；essential services 选取较窄的范围。more precisely 引出实质修正时，应指出哪个词或条件改变，而不只是重复一个同义句。','all facilities → essential services',[
 ['I said all facilities should open late.','我刚才说所有设施都应该晚些关门。','复述有待修正的原论断，不表示继续支持。'],
 ['More precisely, essential services should consider local needs.','更准确地说，基本服务应考虑当地需求。','范围和政策强度都缩小，consider 不等于必须延时。']],
 '不要把“考虑当地需要”转述成所有地方都已决定同一营业时间。'),
 S('澄清关系而非更换立场','what I mean is 后说明本意；alongside 表示同时考虑，并不排除另一个因素。澄清时应针对误解，让使用者需求与人员、预算条件保持在同一论述中。','What I mean is… / alongside…',[
 ['What I mean is that access should reflect local needs.','我的意思是，服务可及性应考虑当地需求。','that 从句说明意图，避免只说“你误解了”。'],
 ['Discuss budgets alongside barriers faced by users.','把预算与使用者面临的障碍一起讨论。','alongside 增加角度，不取消预算约束。']],
 '不能把 alongside 译成“用……取代……”；两者逻辑不同。'),
 S('换言与纠错的区别','rephrase 可以保留意思而改变表达，correct 则修正不准确之处。让听者识别这一区别，有助于在修复后继续讨论。let me 后用动词原形，避免不必要的整段重启。','Let me rephrase… / I need to correct…',[
 ['Let me rephrase the main point.','让我换种方式说明重点。','let 后 me 作宾语，rephrase 用原形。'],
 ['I need to correct the scope of my claim.','我需要修正自己论断的范围。','明确改变的是 scope，而不仅是措辞。']],
 '修正不需要长篇道歉；但也不能悄悄改动事实后假装两句话意思完全相同。')],
};
