import type {SpecialtyLesson,LearningExample,LearningSection,LearningTable} from './specialtyLibrary';
const e=(target:string,zh:string,analysis:string):LearningExample=>({target,zh,analysis});
const section=(title:string,concept:string,pattern:string,examples:LearningExample[],caution:string,table?:LearningTable):LearningSection=>({title,concept,pattern,examples,caution,table});
export const IELTS_READING_U01_PLATFORM_VOCAB:SpecialtyLesson[]=[{
id:'en-reading-u01-learning-evidence-lexicon',type:'vocabulary',language:'en',level:'B2',unitLink:'en-ielts-reading-u01',
title:'Academic reading 基础：学习资源可获得性与参与证据',subtitle:'从 access logs、peer interaction 到 proxy indicator 的完整词义链',
prerequisite:'读过原课程的在线讲座与教学反馈两篇原创文章，理解 may / however / although。',
objective:'在原稿两篇阅读之间区分 availability、engagement、feedback quality 和 learning outcomes；准确使用 proxy indicator、digital trace、cognitive load 与 mixed evidence，不把下载次数当成绩。',
sections:[
section('01 availability 不等于 engagement','access to resources 表能够获取教学资源，engagement 指有意义的学习参与；仅能播放录像或下载笔记，不保证提问、合作或有效理解。学生需要区分平台提供的机会与实际学习行动。',
'access to learning materials / meaningful participation / peer interaction',[
e('Recorded lectures make complex material available.','录播讲座让复杂内容可以重复查看。','描述资源可获得性，而非结果。'),
e('Access does not guarantee meaningful participation.','获得资源不保证有意义的参与。','原文明确区分 access 与 participation。'),
e('Peer interaction may support learning.','同伴互动可能支持学习。','may 保留一般性而非必然结论。')
],'不能将 students downloaded the notes 改写为 students understood the lesson；资源获取和理解程度是不同指标。',
{title:'区分核心指标',columns:['表达','中文意思','判断边界'],rows:[['access to materials','能够获取资源','不等于理解'],['learning engagement','学习投入参与','非下载日志直接测量'],['peer interaction','同伴交流','学习形式之一'],['learning outcome','学习结果','需独立评估']],note:'不把平台行为当作学习结果的替代证明。'}),
section('02 proxy indicator 的便利与风险','digital trace 指平台上的行为记录，access log 指访问日志；proxy indicator 是用来间接代表真正目标的替代指标。一个学生多次下载讲义可能很投入，也可能一直看不懂；单一数字不能消除两种解释。',
'digital trace / access log / proxy indicator / direct measure',[
e('The platform records an access log.','平台记录访问日志。','日志反映行为痕迹。'),
e('Repeated downloads may have several explanations.','反复下载可能存在不同解释。','不能据此确定单一学习态度。'),
e('A download count is not a direct measure of learning quality.','下载次数不是学习质量的直接测量。','proxy 与真正目标区分。')
],'higher download frequency 不等于 higher achievement；原文没有显示两者之间的固定因果关系。'),
section('03 feedback 的效果取决于条件','provide feedback 是提供反馈，specific comments on reasoning 指针对论证的具体意见。及时性、清晰度以及学生是否有机会回应都会影响反馈价值；不能因为提供反馈就断定所有人取得同等学习效果。',
'provide specific feedback / timing and clarity / opportunity to respond',[
e('The instructor provides comments on reasoning.','教师针对推理过程给出意见。','反馈的具体对象。'),
e('The usefulness depends on timing and clarity.','反馈的价值取决于时机与清晰程度。','明示条件。'),
e('Students need opportunities to respond to feedback.','学生需要回应反馈的机会。','互动不能只停在被动收到评语。')
],'receive feedback does not automatically mean improve grades；原文主张条件性价值，不是对考试成绩的保证。',
{title:'反馈的因果链',columns:['过程','可能作用','限制'],rows:[['specific comments','指出推理问题','不一定清晰'],['timely feedback','可及时修正','反馈时机可能不合适'],['response opportunity','尝试应用意见','学生未必回应'],['evaluation','评估改进','不能用访问量代替']],note:'这些是原文讨论的影响因素，不代表已测量其独立效果。'}),
section('04 归纳作者观点但不增强证据强度','mixed evidence 表证据结果并不完全一致，is associated with 描述相关而非直接因果，may provide 表可能提供。评价课堂教学时结合学生解释、教师观察和部分活动数据，仍需考虑隐私、公平以及观察资料的局限。',
'mixed evidence / be associated with / multiple evidence sources / draw a conclusion',[
e('Evidence may suggest an association rather than causation.','证据可能提示相关而非因果。','不随意把 suggest 改成 demonstrate。'),
e('Instructor observations can complement activity data.','教师观察可补充活动数据。','多来源信息互补。'),
e('A richer evaluation still requires attention to fairness.','更完整的评价仍需要关注公平性。','多方法不能取消所有局限。')
],'draw a conclusion 仍须接受样本和指标的约束；更多数字不能自动证实一个未被直接测量的结果。')
],
questions:[
{question:'平台访问日志能否直接证明学生理解得更好？',answer:'No. Access logs are proxy indicators, not direct measures of learning quality.',why:'同一下载行为可以有投入学习或学习困难等不同解释，不能直接证明学习成效。'},
{question:'一个人多次下载讲义说明其学习投入一定更高吗？',answer:'No. Repeated downloads can indicate engagement or difficulty.',why:'原阅读对同一行为给出两种不同解释，单一指标无法确认哪个成立。'},
{question:'反馈质量至少受哪三项条件影响？',answer:'Timing, clarity, and the learner’s opportunity to respond.',why:'原稿第二篇的反馈段明确指出这三个因素，而不是只问是否有评语。'},
{question:'be associated with 能否换成 be caused by 而保持相同证据强度？',answer:'No. Association alone does not establish causation.',why:'related 并不排除其他影响因素，因果结论强于原文提供的证据。'}
],
output:'利用原课程两篇阅读，写八句英文说明访问、参与、反馈、学习成果及多来源评价的关系，每句中文对照，不假称平台数据已验证成绩提升。',
model:[
e('The original articles examine digital learning and student engagement.','原文讨论数字教学与学生参与。','两篇文章的共同主题。'),
e('Recorded lectures can increase access to learning materials.','录播可能扩大获取教学材料的机会。','资源层面。'),
e('However, access does not guarantee meaningful discussion.','但获得资源不保证有意义的讨论。','参与层面。'),
e('Access logs show actions rather than learning quality directly.','访问日志记录行为，而非直接测量学习质量。','替代指标。'),
e('Repeated downloads may reflect engagement or difficulty.','重复下载可能是投入，也可能是困难。','一项行为两种解释。'),
e('Feedback is useful only under suitable conditions.','反馈的有效性取决于适当条件。','时机与清晰度。'),
e('Instructors can combine observations with selected activity data.','教师可以结合观察与部分活动数据。','多来源。'),
e('This synthesis must still respect uncertainty and fairness.','这样的综合仍须注意不确定性与公平。','结论边界。')
],
referenceUrls:['https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-reading','https://learnenglish.britishcouncil.org/free-resources/reading/b2'],
sourceNote:'直接匹配 public/learning-assets/en-ielts-reading-u01.txt 中两篇远程学习与平台反馈原创文章。保留其对资源、学习投入和指标的谨慎区分。'
}];