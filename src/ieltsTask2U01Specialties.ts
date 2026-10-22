import type {SpecialtyLesson,LearningExample,LearningSection,LearningTable} from './specialtyLibrary';
const E=(target:string,zh:string,analysis:string):LearningExample=>({target,zh,analysis});
const S=(title:string,concept:string,pattern:string,examples:LearningExample[],caution:string,rows?:string[][]):LearningSection=>({title,concept,pattern,examples,caution,...(rows?{table:{title:'原始在线大学课程题意核对',columns:['练习要求','正确中文','不允许的外推'],rows,note:'U01 为项目既有原创文本；本章与原始讨论题、阅读和教学补充包关联。'} as LearningTable}:{})});
const Q=(question:string,answer:string,why:string)=>({question,answer,why});
const REF='https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-writing';
export const IELTS_TASK2_U01_SPECIALTIES:SpecialtyLesson[]=[
{
 id:'en-task2-u01-question-thesis-grammar',type:'grammar',language:'en',level:'B2',unitLink:'en-ielts-writing-task2-u01',
 title:'Task 2 题意分析与有限定立场：benefit、drawback、which matters more',
 subtitle:'原稿在线大学课程情境：扩大可达性不等于保证学习成效',
 prerequisite:'能够写 because 从句及清楚的英语主张，了解 benefit、drawback 和 personal view 的差别。',
 objective:'准确拆解原题三部分要求，并用 although、whereas、for learners who 和 provided that 形成可辩护的 thesis。',
 sections:[
 S('01 三项题意不是一道简单利弊罗列题','原始自编题问线上大学课程的一项主要益处、一项潜在缺点，以及在作者看来哪项影响更重要。引言必须让读者知道将讨论什么和如何判断，不应只写“科技有利也有弊”。','benefit + drawback + which matters more in your view',[
 E('Online courses can widen access for students who cannot attend fixed sessions.','线上课程可改善无法按固定时间参加课程的学生的学习机会。','明确受益群体而不是泛称人人。'),
 E('Delayed feedback can undermine engagement in some activities.','反馈延迟可能影响部分活动的参与度。','对应潜在缺点。'),
 E('In my view, access matters more when responsive support is available.','我认为，有及时支持时，提升可达性更重要。','回答权衡问题并给出条件。')
 ],'不能把题目改写为讨论是否全面禁止校园课程；源题只要求比较一个收益和一个风险。',[
 ['One benefit','说明一项主要收益','线上资源与灵活性'],
 ['One drawback','说明一项潜在风险','互动与反馈质量'],
 ['Which matters more','给出明确个人判断','须有评价标准'],
 ['Evidence boundary','本项目原创假设','无真实成效调查']
 ]),
 S('02 范围限定避免无证据绝对主张','“Online education is always better” 没有区分学员、学科和课程设计。原稿用 For students who live far from campus / can 表达适用人群与可能性，保留清楚立场。','For students who ..., online courses can ...',[
 E('For learners with work duties, recorded lectures may make attendance easier.','对有工作责任的学习者，录播课可能使参与更方便。','具体适用群体。'),
 E('Practical courses may require supervised in-person activities.','实践型课程可能需要有监督的线下活动。','限定不同教学需求。'),
 E('A qualified claim can still state a firm preference.','有限定的主张仍可以表达明确倾向。','谨慎措辞不是拒绝立场。')
 ],'不要把 may 机械添加到每个句子；必须先说清涉及哪些人或活动。'),
 S('03 although、while 与 because 的真实功能','although 后接完整让步从句，不应同时用 but 连接相同对照。because 应说明具体机制；therefore 只有当先行信息支持结论时才能出现。','Although X, Y / X can help because ...',[
 E('Although online delivery widens access, feedback may be delayed.','虽然在线授课扩大可达性，但反馈可能延迟。','无冗余 but。'),
 E('Recordings help because students can revisit difficult explanations.','录播有益，因为学生能够重看难点。','because 后给出具体机制。'),
 E('Convenience does not therefore prove stronger learning outcomes.','因此，便利本身不能证明学习成果更好。','不做越界因果判断。')
 ],'“Recorded lectures exist; therefore every student earns higher grades” 缺少学习成绩证据，不能由可回放直接推出。'),
 S('04 thesis + conditional evaluation 应贯穿全文','thesis 可以写：线上课程带来有条件的学习机会收益；大学需要反馈、协作和实践支持。主体分别证明收益与风险，结论用同一标准比较，不要突然转成“全部线上更便宜”。','I favour... provided that... / the benefit outweighs ... where ...',[
 E('I favour a blended approach when practical work requires direct supervision.','需要直接监督实践时，我支持混合教学。','适用条件与课程形式对应。'),
 E('Well-designed support can reduce some drawbacks of online delivery.','设计良好的支持可以减少部分线上教学缺点。','不保证消除全部问题。'),
 E('My judgement depends on accessibility and meaningful interaction.','我的判断取决于学习可达性与有意义的互动。','结论标准清晰。')
 ],'不声称线上课程改善成绩、降低预算或适合所有专业，除非材料给出相应证据。')
 ],
 questions:[
 Q('How many demands does the original U01 essay prompt contain?','Three: one benefit, one potential drawback, and a judgement about which matters more.','原题并非泛泛讨论利弊，明确要求作者作比较判断。'),
 Q('Why is “online education is always better” too broad?','It ignores differences among learners, course designs and practical requirements.','原稿明确用特定学员与适当支持作为条件，不能普遍化。'),
 Q('How should although and but be combined?','Use Although X, Y without another but joining the same concession.','although 已承担让步关系，重复 but 会造成原稿指出的结构错误。'),
 Q('Does the ability to replay lectures prove all students learn more?','No. Replay access is a feature; learning outcomes require separate evidence.','材料只说明回看机会，不能推出所有人的成绩提高。')
 ],
 output:'先拆解原稿三项设问，再写一个有条件立场和至少250词的完整原创 Task2 英文议论文及完整中文；不可改写为官方真题或评分样卷。',
 model:[
 E('Online university courses may widen access for learners with inflexible schedules.','线上大学课程可能扩大时间不灵活的学习者的机会。','收益主张。'),
 E('Recorded lessons can be revisited outside a fixed class period.','录播课程可在固定上课时间之外重看。','机制。'),
 E('Nevertheless, delayed feedback can reduce engagement.','不过反馈延迟可能降低参与度。','风险。'),
 E('Some practical activities also require supervision in person.','部分实践活动也需要线下监督。','课程范围限定。'),
 E('Access alone does not establish stronger learning outcomes.','可达性提高并不能单独证明学习成效更好。','不越过证据。'),
 E('Universities should match teaching methods to task requirements.','大学应让教学方式匹配任务要求。','方案。'),
 E('I favour online provision where support and interaction are maintained.','当支持和互动得以保持时，我倾向线上授课。','明确有条件立场。'),
 E('This conclusion addresses both convenience and educational quality.','该结论同时回应便利性与教学质量。','回答题目。')
 ],referenceUrls:[REF],sourceNote:'直接依据 public/learning-assets/en-ielts-writing-task2-u01.txt 完整既有原创稿；其附带练习和文字全部保留。'
},
{
 id:'en-task2-u01-online-learning-lexicon',type:'vocabulary',language:'en',level:'B2',unitLink:'en-ielts-writing-task2-u01',
 title:'高等教育词汇：access、engagement、feedback、blended delivery',
 subtitle:'18 组原稿学术词汇按实际论证功能组合，而非堆叠复杂形容词',
 prerequisite:'能够解释线上课堂的灵活性与互动风险，了解大学课程和实操课程区别。',
 objective:'精确区分 access to education、engagement、academic support、learning outcomes、blended approach、facilitate 和 outweigh。',
 sections:[
 S('01 access 与 outcomes 不是同一个指标','access to education 指获得教育的机会；learning outcomes 指学习成果。录播减少时间限制可能改善 access，但不能自动证明 grades 和 outcomes。原稿明确要求区分便利与成效。','improve access to education / evaluate learning outcomes',[
 E('Recorded materials may improve access for commuters.','录播材料可能改善通勤者的教育机会。','机会增加而非成绩已提高。'),
 E('Learning outcomes need evidence beyond attendance flexibility.','学习成果需要便利参加课程之外的证据。','成果与条件不同。'),
 E('The two concepts should not be used interchangeably.','这两个概念不应互相替代。','指标一致。')
 ],'不可把 access to education 直接翻译成“学习成绩提高”，那会改变指标。',[
 ['access to education','获得教育的机会','不是考试结果'],
 ['student engagement','学生积极参与','不等于登录次数'],
 ['academic support','学术支持与反馈','要考虑可达性与及时性'],
 ['blended approach','线上线下结合','按活动要求组织']
 ]),
 S('02 engagement、interaction 和 feedback 作用不同','student engagement 涉及学生参与；interaction 指师生与同伴互动；feedback 指针对学习表现的回应。一个课程有讨论区，也不意味着支持反馈必然及时。','maintain engagement / facilitate interaction / provide timely feedback',[
 E('Discussion forums may facilitate peer interaction.','讨论区可能促进同伴互动。','能提供交流渠道。'),
 E('Delayed feedback can undermine engagement.','延迟反馈可能削弱参与度。','对应原稿风险。'),
 E('Effective support must be accessible when learners need help.','有效支持应在学习者需要帮助时可以获得。','解释支持与时间。')
 ],'facilitate 要有明确宾语；不能单写“online courses facilitate”而不说明促进什么。'),
 S('03 digital divide 与 reliable internet access','digital divide 指数字资源获取上的差距，reliable internet access 是使用线上课的具体条件。把所有人描述为有可靠连接会抹去原稿的限制，但本课没有提供实际网络覆盖率。','the digital divide / reliable internet access / access to support',[
 E('A weak internet connection may interrupt online study.','不稳定的网络可能打断线上学习。','是可能发生的限制。'),
 E('Not all students have equally reliable access.','不是所有学生都拥有同样可靠的连接。','避免绝对化。'),
 E('A blended design could reduce reliance on a single channel.','混合教学可减少对单一渠道的依赖。','有条件建议，不是实施结果。')
 ],'不能凭空编造校园网络覆盖百分比或所有线上学习者的使用习惯。'),
 S('04 outweigh、undermine 和 facilitate 要有明确对象','outweigh 是比较重要性，undermine 是削弱，facilitate 是促进。原题要求作者说明哪项更重要，因此使用这些动词时必须解释判断标准，如减少实际参加障碍与保证必要互动。','the benefit may outweigh a drawback / delayed support can undermine engagement',[
 E('Flexibility may outweigh some difficulties for working students.','对工作中的学生，灵活性可能比某些困难更重要。','有明确受益群体。'),
 E('Lack of feedback can undermine continued participation.','缺乏反馈可能削弱持续参与。','指出受影响对象。'),
 E('Well-designed discussions can facilitate meaningful exchange.','设计良好的讨论能够促进有意义的交流。','动词搭配自然。')
 ],'不能因出现三个方便之处就机械宣布它们超过任何教学缺点；outweigh 需要有解释的评价标准。')
 ],
 questions:[
 Q('How does access to education differ from learning outcomes?','Access concerns opportunities to participate; outcomes concern what learners achieve.','原稿将可到课的便利与真实学习成效明确区分。'),
 Q('What could delayed feedback undermine?','Student engagement and the ability to resolve misunderstandings promptly.','源文把反馈延迟与部分学生活动参与困难联系起来。'),
 Q('What does facilitate need in a natural collocation?','A clear object, such as facilitate meaningful discussion or peer collaboration.','原稿词汇提示强调 facilitate 应说明促进哪项活动。'),
 Q('Does blended delivery always improve grades?','No. It is a conditional design option and requires actual evaluation.','混合教学是可能解决不同教学需求的方案，并非已经证实提高成绩。')
 ],
 output:'从原稿18组学术搭配中选至少12组写自然英文句和中文，并完成250词以上的原创线上大学教学利弊作文。',
 model:[
 E('Flexible scheduling can help learners with work responsibilities.','弹性安排可能帮助有工作责任的学生。','受益群体。'),
 E('Recorded materials improve access to explanations.','录播材料使获取解释更加便利。','明确 access 的内容。'),
 E('Reliable internet access may be necessary for online sessions.','稳定网络可能是线上课程的必要条件。','条件。'),
 E('Discussion forums can facilitate peer collaboration.','讨论区可以促进同伴协作。','facilitate 有宾语。'),
 E('Feedback delays may undermine student engagement.','反馈延迟可能削弱学生参与度。','风险。'),
 E('Academic support should match the needs of the activity.','学术支持应匹配活动需求。','配套方式。'),
 E('Learning outcomes cannot be inferred from flexibility alone.','仅凭灵活性不能推断学习成果。','证据边界。'),
 E('A blended approach may balance access and interaction.','混合模式可能兼顾教育可达性与互动。','有条件结论。')
 ],referenceUrls:[REF],sourceNote:'词汇和语义界限取自 U01 既有完整原稿中的18组原创新词汇；并未声称真实大学实证效果。'
}
];