import type {SpecialtyLesson,LearningExample,LearningSection,LearningTable} from './specialtyLibrary';
const E=(target:string,zh:string,analysis:string):LearningExample=>({target,zh,analysis});
const S=(title:string,concept:string,pattern:string,examples:LearningExample[],caution:string,rows?:string[][]):LearningSection=>({title,concept,pattern,examples,caution,...(rows?{table:{title:'原始社交媒体论证中的证据力度',columns:['英语陈述','中文语义','可否从原稿推出'],rows,note:'U08 为原创修订写作情境，不代表真实社交媒体因果研究。'} as LearningTable}:{})});
const Q=(question:string,answer:string,why:string)=>({question,answer,why});
const REF='https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-writing';
export const IELTS_TASK2_U08_SPECIALTIES:SpecialtyLesson[]=[
{
 id:'en-task2-u08-hedging-scope-grammar',type:'grammar',language:'en',level:'B2',unitLink:'en-ielts-writing-task2-u08',
 title:'论点修订语法：inevitably、may、some patterns 与限定范围',
 subtitle:'社交媒体不必然摧毁友谊；具体使用方式可能挤占面对面交流',
 prerequisite:'了解情态动词 may/might/could、数量限定 some/all 和一般学术议论文结构。',
 objective:'辨别绝对因果、不清晰的定义和恰当的范围限定，重写原始主张而不撤销所有立场。',
 sections:[
 S('01 inevitably 的论证负担','原始句 social media inevitably destroys genuine friendship 包含必然因果和 undefined genuine friendship。inevitably 排除任何例外，原稿没有测量友谊质量与平台使用方式的证据。','X inevitably causes Y → some patterns of X may contribute to Y',[
 E('The first claim says social media inevitably destroys friendship.','第一版声称社交媒体必然破坏友谊。','原稿要被修订的绝对主张。'),
 E('Inevitably leaves no room for exceptions.','inevitably 不允许存在例外。','语义力度极高。'),
 E('The source provides no proof of such universal causation.','原稿没有提供普遍因果的证明。','不把虚构练习当实证研究。')
 ],'不能仅给绝对句加上高级副词就让缺少证据的论断成立，也不可冒用研究证明。',[
 ['inevitably destroys','必然摧毁','过强，未获证据支持'],
 ['some patterns of use','某些使用方式','限定具体对象'],
 ['may displace time','可能挤占时间','提出可理解的机制'],
 ['can sustain long-distance contact','可维持跨距离联系','允许反向情境存在']
 ]),
 S('02 some patterns 缩小主张对象','将 all users 或 social media itself 改为 some patterns of use，能够把讨论限定到某些占用时间的使用方式。限定词要说明是哪类行为可能导致何种结果，而不是机械重复 some/may。','Some patterns of use may displace time for in-person contact.',[
 E('Some patterns of use may displace time for face-to-face contact.','某些使用方式可能挤占面对面交流的时间。','限定行为及潜在后果。'),
 E('This does not describe every user or platform.','这并非描述每个用户或平台。','排除全部适用的错误。'),
 E('The revised claim is narrower but still arguable.','修订后的论点更窄，却仍可以展开讨论。','限定并非取消立场。')
 ],'“some patterns may...” 不足以自动证明事实，仍要有可信理由解释时间如何被替代。'),
 S('03 mechanisms 与 undefined standards','genuine friendship 的定义不明确，导致读者无法核实什么叫“真正友谊被毁”。更准确的论证用可理解的机制：某些使用方式可能减少面对面交流时间，但不声称已测量所有关系质量。','a possible mechanism / displace time for / not define friendship through a slogan',[
 E('The revision identifies reduced time for face-to-face contact.','修订稿把面对面交流时间减少作为可能机制。','观察对象较明确。'),
 E('It does not define genuine friendship in measurable terms.','原稿没有给真正友谊提供可测量定义。','指出概念缺口。'),
 E('A possible mechanism is not a universal outcome.','可能的机制不是必然的普遍结果。','因果强度应与理由匹配。')
 ],'不能通过重新命名“真实友谊”来假装已经有了衡量指标；也不能编造调查数据。'),
 S('04 allow countercases and keep a clear thesis','线上交流有时可维持远距离关系，作为合理反例范围，限制“必然破坏”的推论。可以仍主张特定高强度使用方式可能影响线下联系，同时承认不同情境有不同结果。','while some uses may..., other online communication can...',[
 E('Online contact can sustain relationships across distance.','线上联系可以维持跨距离关系。','原稿明确留出反向可能。'),
 E('Yet some habits may reduce time spent meeting in person.','但部分习惯可能减少线下会面时间。','保留有条件论点。'),
 E('Formal writing requires accurate scope rather than absolute slogans.','正式写作需要准确范围，而不是绝对口号。','总结修改标准。')
 ],'hedging 不意味着每个句子都堆叠 may、might、perhaps，应有选择地校准真正不确定之处。')
 ],
 questions:[
 Q('Which word makes the original social-media claim universal?','Inevitably, which excludes exceptions and asserts a guaranteed destructive effect.','inevitably 明确表示必然发生，原稿没有能够支持这一强度的证据。'),
 Q('What specific mechanism is proposed in the revision?','Some patterns of use may displace time for face-to-face contact.','修订后明确某些行为可能挤占线下交流时间，不再宣称每种友谊被摧毁。'),
 Q('Does hedging mean refusing to take a position?','No. It calibrates the scope and strength of a position to available reasons.','范围限定保持可以辩护的立场，只是不把可能效应说成确定结果。'),
 Q('Which counterexample remains compatible with the revised claim?','Online communication may sustain relationships when people live far apart.','跨距离维系关系与部分行为挤占面对面时间可以同时成立。')
 ],
 output:'将社交媒体绝对断言修订为有明确行为、机制和适用范围的主张，并写不少于250词英语 Task2 议论文及逐段中文。',
 model:[
 E('The original assertion claims inevitable damage to all genuine friendships.','原句主张真正友谊必然受到破坏。','识别过度断言。'),
 E('The source offers no evidence for a universal effect.','材料没有证明普遍影响。','证据力度。'),
 E('Some patterns of social-media use may displace in-person time.','某些社交媒体使用方式可能挤占线下交流时间。','修订主张。'),
 E('This is a possible mechanism, not a proven outcome for everyone.','这是一种可能机制，不是对所有人的已证实结果。','防止扩大。'),
 E('Face-to-face contact and online communication may serve different purposes.','面对面与线上交流可能承担不同用途。','不同情境。'),
 E('Remote contact can also sustain relationships across distance.','远程联系也可以维持跨距离关系。','允许反例。'),
 E('The writer can still argue for more deliberate habits.','作者仍可主张更有意识地安排使用习惯。','维持立场。'),
 E('Evidence-matched wording is stronger than unnecessary certainty.','措辞与证据相称比不必要的确定性更有说服力。','归纳。')
 ],referenceUrls:[REF],sourceNote:'以 U08 虚构社交媒体编辑练习为原文，保留 inevitably 与 some patterns may displace 的语义差距。'
},
{
 id:'en-task2-u08-register-precision-lexicon',type:'vocabulary',language:'en',level:'B2',unitLink:'en-ielts-writing-task2-u08',
 title:'正式语域与准确用词：genuine、displace、sustain、claim',
 subtitle:'用有内容的表达取代 always、obviously 和空洞复杂词',
 prerequisite:'能够理解绝对范围、可能机制、反例与观点句的区别。',
 objective:'在保持正式语域的同时精确使用 claim、mechanism、displace、sustain、genuine、qualify，不以高级词汇掩盖论据缺口。',
 sections:[
 S('01 genuine 与 undefined 标准','genuine friendship 可意为真诚友谊，但原始断言没有说明如何判断其真实性。formal language 不等于空泛抽象词堆砌。改写应明确讨论的是联系时间、交流方式还是友谊质量。','genuine friendship / an undefined standard / specify what is affected',[
 E('The claim invokes genuine friendship without defining it.','该主张提到真正的友谊，却没有给出定义。','指出衡量标准不明确。'),
 E('The revision instead discusses time spent in direct contact.','修订版转而讨论直接交流投入的时间。','讨论对象更明确。'),
 E('Precision is more useful than dramatic wording.','精准比夸张词语更有价值。','语域应服务于内容。')
 ],'不能把 genuine 当作无需解释的科学变量，也不能凭空声称有经过测量的友谊评分。',[
 ['genuine friendship','真诚／真正的友谊','原稿缺少可操作定义'],
 ['displace time','挤占时间','影响的是线下时间'],
 ['sustain a relationship','维持一段关系','允许线上交流有正面作用'],
 ['qualified claim','限定范围的主张','不是彻底否定观点']
 ]),
 S('02 displace 与 destroy 后果程度不同','displace 在此指一种活动可能替代原本可用于另一活动的时间；destroy 则暗示彻底摧毁关系。原稿没有证据支持后者，所以用 displace time 更贴近可辩护的机制。','displace time for face-to-face contact / not destroy all friendships',[
 E('Online activity may displace time for meeting in person.','线上活动可能挤占当面会面的时间。','较明确的可能机制。'),
 E('Displacement does not necessarily destroy a relationship.','时间被挤占不一定毁掉一段关系。','后果力度不同。'),
 E('The writer should not substitute destroy for reduce.','不应随意用毁灭替换减少。','动词强度必须有证据。')
 ],'为了追求更强表达将 reduce contact 改写为 destroy friendship 会改变主张并超出来源。'),
 S('03 sustain 在跨距离关系中的作用','sustain 是维持某个关系或状态。源稿留出 online communication may sustain long-distance relationships 的可能性，因此不能只讲负面效应而删除对立情境。','sustain relationships across distance / maintain contact with distant friends',[
 E('Messages can help people sustain contact across distance.','消息可以帮助人们维持跨距离联系。','保留正向可能。'),
 E('Not every digital exchange replaces an in-person meeting.','并非每次线上交流都取代线下会面。','指出情境差异。'),
 E('Some distant friends could otherwise struggle to stay in touch.','某些远方朋友如果没有线上方式可能难以保持联系。','是假设解释，不是研究结果。')
 ],'sustain 只指可能维系，不能扩大为“线上交往一定改善所有友情”。'),
 S('04 claim、evidence、qualify 的编辑顺序','claim 是有待支撑的陈述，evidence 是支持它的材料，qualify 用于使主张范围与理由相称。先指出原句如何超出证据，再选择修订词汇，最后检查正式语体是否自然。','identify claim → check evidence → qualify scope → polish register',[
 E('The original claim is stronger than the reasons offered.','原句力度超过其所提供理由。','先诊断。'),
 E('The revision qualifies the range of affected behaviour.','修订限定受影响行为的范围。','再明确对象。'),
 E('Formal register should not conceal missing evidence.','正式语体不应掩盖缺少证据的问题。','最后检查语言。')
 ],'堆砌 inevitably、indubitably 或 obviously 不能替代论证，也不符合自然、清晰的学术语域。')
 ],
 questions:[
 Q('What is unclear about genuine friendship in the source?','The source provides no definition or measurement of genuineness.','未定义的标准使绝对主张无法被明确检查。'),
 Q('What is displaced in the revised example?','Time that might otherwise be spent on face-to-face contact.','修订写的是时间投入变化，而不是证明友谊被摧毁。'),
 Q('Which word describes maintaining distant relationships?','Sustain, as in sustain relationships across distance.','源文指出线上联系可用于维持远距离关系。'),
 Q('What should precede polishing formal register?','Checking whether claims have evidence and are appropriately qualified.','提高措辞复杂性不能修复错误论据，应先校核主张与理由。')
 ],
 output:'把八个绝对或模糊的表达改写为含准确主张、证据范围和机制的双语句子；再写250词以上完整 Task2 论文。',
 model:[
 E('The draft makes a sweeping claim about social media.','草稿对社交媒体作出笼统主张。','识别论点。'),
 E('Genuine friendship is not defined in the source.','原稿没有定义真正的友谊。','概念空缺。'),
 E('Displacing time for face-to-face contact is a narrower concern.','挤占面对面交流时间是更狭窄的问题。','用词精准。'),
 E('Such displacement may arise in some usage patterns.','这种挤占可能出现在某些使用方式中。','限定范围。'),
 E('Other online interactions can sustain distant relationships.','其他线上互动可以维持远距离关系。','允许反例。'),
 E('An argument may retain a clear view without claiming certainty.','论证不必声称必然，也能保留明确观点。','语气。'),
 E('Evidence should determine how strongly a conclusion is worded.','结论的语气强度应由证据决定。','逻辑优先。'),
 E('Editing register comes after correcting the argument.','修正论证之后再润色语域。','编辑步骤。')
 ],referenceUrls:[REF],sourceNote:'词汇均基于 U08 的社交媒体虚构校订文本；没有真实个体关系调查与统计。'
}
];