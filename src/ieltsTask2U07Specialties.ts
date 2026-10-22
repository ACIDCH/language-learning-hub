import type {SpecialtyLesson,LearningExample,LearningSection,LearningTable} from './specialtyLibrary';
const E=(target:string,zh:string,analysis:string):LearningExample=>({target,zh,analysis});
const S=(title:string,concept:string,pattern:string,examples:LearningExample[],caution:string,rows?:string[][]):LearningSection=>({title,concept,pattern,examples,caution,...(rows?{table:{title:'原始音乐课程论证与指代',columns:['原文对象','准确释义','不成立的外推'],rows,note:'音乐课与器材租赁情境为原创讨论素材，没有真实校园调查。'} as LearningTable}:{})});
const Q=(question:string,answer:string,why:string)=>({question,answer,why});
const REF='https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-writing';
export const IELTS_TASK2_U07_SPECIALTIES:SpecialtyLesson[]=[
{
 id:'en-task2-u07-reference-causality-grammar',type:'grammar',language:'en',level:'B2',unitLink:'en-ielts-writing-task2-u07',
 title:'精准指代与论证推进：this charge、that restriction 与 therefore',
 subtitle:'音乐课免学费却收乐器租赁费：去掉收费只能解决一类障碍',
 prerequisite:'能区分名词性指代、因果连接词和互不相同的问题来源。',
 objective:'用 this + summary noun 将后续方案精确指回已论证障碍，区分器材费用、教师短缺与练习场地不足，避免错误 therefore。',
 sections:[
 S('01 this charge 的最近明确先行词','原文学校开设音乐课但收乐器租赁费，即使 tuition 本身免费也可能阻碍部分学生参加。this charge 回指 instrument hire fee，不回指学费或“音乐课的所有成本”。','A fee for instrument hire is charged. This charge may restrict participation.',[
 E('The school charges a fee for instrument hire.','学校收取乐器租赁费。','指代先行词明确。'),
 E('This charge may prevent some pupils from joining.','这项收费可能阻碍部分学生参加。','this charge = 器材租赁费。'),
 E('Tuition itself remains free in the example.','例子中的课程学费本身仍然免费。','不能把收费误写成 tuition fee。')
 ],'this charge 不能被译成“学费”，也不能延伸为所有音乐学习费用；原文只有一项明确收费。',[
 ['Instrument hire fee','乐器租赁费','本课 this charge 的回指对象'],
 ['Tuition','学费','原稿说明免费'],
 ['Teacher shortage','教师短缺','去掉器材费不一定解决'],
 ['Rehearsal space','练习场地','另一项独立资源约束']
 ]),
 S('02 this restriction 把措施与问题连接','Removing the hire fee would address that specific restriction。that specific restriction 概括前文因租赁费导致的参加障碍。它不能自然指向教师和场地问题，因为措施未对这些因素起作用。','This restriction / that particular barrier / the fee-related obstacle',[
 E('Removing the hire fee addresses a financial barrier.','取消乐器租赁费针对一项经济障碍。','措辞与原文一致。'),
 E('That restriction concerns instrument access, not teaching capacity.','这一限制涉及器材可达性，而非教师供给。','边界清晰。'),
 E('Other constraints would need separate responses.','其他限制需要另外的措施。','拒绝方案万能化。')
 ],'不能把“取消一项收费”说成解决全部参与障碍；仅对应器材费用的机制。'),
 S('03 therefore 必须由前提支持','学校有预算，therefore 学生喜欢音乐，这一推论缺失中间机制。预算可能使学校能够资助器材，却不能直接证明学生喜好；因此句需要之前确实能支持结果的前提。','A fee can be a barrier; therefore removing it could help fee-affected pupils',[
 E('Some pupils may be excluded by the hire fee.','部分学生可能因为租赁费被排除。','解释限制出现的路径。'),
 E('Therefore, removing that fee could help those pupils.','因此，取消这项费用可能帮助这些学生。','结果限定到受收费影响的人。'),
 E('A budget does not prove that all students enjoy music.','有预算不能证明所有学生都喜欢音乐。','不允许从资金直接跳到态度。')
 ],'therefore 不是“万能高级连接词”：没有中间逻辑的结果句仍然没有证据。'),
 S('04 话题推进不能被 additionally 掩盖','上一段专讲收费，下一段可以转到教师或练习空间。additionally 无法为缺失的推理作证；需要明确新增的是另一项资源约束，不能混写成同一项收费已解决的问题。','fee access → targeted remedy → remaining teachers / rehearsal space',[
 E('The fee barrier is one aspect of access.','费用障碍只是参与条件中的一个方面。','先界定已经解释的问题。'),
 E('A shortage of teachers is a separate capacity problem.','教师不足属于另一类容量问题。','转入另一段需明确分题。'),
 E('The proposed fee removal does not automatically create rehearsal space.','拟议取消收费不会自动增加练习场地。','突出方案适用边界。')
 ],'为了连贯而添加 moreover、therefore 不能替代解释各段怎样从问题发展到措施。')
 ],
 questions:[
 Q('What does “this charge” refer to?','The instrument hire fee, not tuition.','原文明确学费免费，this charge 的先行词是乐器租赁费。'),
 Q('What can removing this fee directly address?','The participation restriction caused by instrument hire costs.','取消租赁费针对支付器材费的障碍，而非教师或练习场地短缺。'),
 Q('Does the existence of a school budget prove pupils like music?','No. There is no reasoning linking budget availability directly to student preferences.','预算是否存在与学生偏好是不同问题，therefore 无法填补缺失前提。'),
 Q('What remains unresolved after removing the hire fee?','Potential shortages of teachers and rehearsal space.','原始教材把教师和场地列为相互独立的限制条件。')
 ],
 output:'用清晰的 this + summary noun 结构重写段落，并写不少于250词的音乐教育参与障碍 Task2 原创作文；中文需区分免学费与器材费。',
 model:[
 E('A school may provide music classes without charging tuition.','学校可能提供免费学费的音乐课。','明确课程收费性质。'),
 E('However, pupils may still pay to hire an instrument.','但学生仍可能需要支付乐器租赁费。','识别另外的经济障碍。'),
 E('This charge could prevent some pupils from taking part.','这项收费可能阻碍部分学生参与。','this charge 先行词明确。'),
 E('Removing the hire fee would address this specific restriction.','取消租赁费将针对这项具体限制。','措施对齐原因。'),
 E('It would not automatically provide more teachers.','这不会自动增加教师数量。','限制范围。'),
 E('Nor would it create additional rehearsal space.','也不会增加练习场地。','另一限制。'),
 E('A clear argument examines each constraint separately.','清晰论证应分别分析每一类限制。','段落主题推进。'),
 E('Connectives must follow the reasoning rather than replace it.','连接词应服务于推理而非代替推理。','方法总结。')
 ],referenceUrls:[REF],sourceNote:'严格对应 U07 音乐课免费学费但收器材租赁费的原始段落；不把教师或场地不足合并到收费障碍。'
},
{
 id:'en-task2-u07-access-coherence-lexicon',type:'vocabulary',language:'en',level:'B2',unitLink:'en-ielts-writing-task2-u07',
 title:'费用与参与词汇：tuition、instrument hire、participation、constraint',
 subtitle:'单词精度决定代词指向与措施适用范围',
 prerequisite:'熟悉音乐课参与情境中的学费、租金与练习资源。',
 objective:'准确区分 tuition fee 与 hire fee、financial barrier 与 resource constraint、address 与 eliminate。',
 sections:[
 S('01 tuition 和 instrument hire 是不同费用','tuition 是课程教学费用；instrument hire 是使用乐器的租赁费用。源稿说 tuition is free but hire is charged，不能把两种费用用 course fee 混为一谈。','free tuition / charge for instrument hire / pay a hire fee',[
 E('The music tuition is free.','音乐课程学费免费。','免学费是明确事实。'),
 E('Instrument hire still costs money.','租赁乐器仍要付费。','收费对象是器材。'),
 E('The hire fee may limit participation.','租赁费可能限制参与。','连接费用与参与。')
 ],'若将租赁费译成“学费”，后续 this charge 的指代就发生事实错误。',[
 ['tuition','课程学费','原稿明确免费'],
 ['instrument hire','乐器租用','需要支付租赁费'],
 ['participation','课程参与','可能受到费用阻碍'],
 ['capacity constraints','供给容量限制','教师与场地另行分析']
 ]),
 S('02 participation / access 不直接等于成绩','participation 指能够参加某项活动，access 表示进入或获得机会。即便费用下降带来参与机会，也不代表音乐技能水平或学业成绩提高，原文没有实测结果。','enable participation / improve access / not prove achievement',[
 E('Reducing charges may improve access.','降低收费可能改善参与机会。','讨论入门条件。'),
 E('Some pupils could then participate more easily.','部分学生之后可能更容易参加。','保留可能性。'),
 E('No change in examination results is documented.','原稿没有记载考试成绩变化。','禁止无证据结果。')
 ],'不能把可能有更多人参加直接变成“学生音乐成绩显著提高”；源文没有任何成绩测量。'),
 S('03 address 与 eliminate 的力度差别','address a barrier 是针对障碍采取措施；eliminate all barriers 则是消除所有障碍。源稿只允许说取消租赁费 addresses the fee restriction，不允许声称它消除教师和场地约束。','address this fee-related barrier / not eliminate all constraints',[
 E('Waiving the hire fee addresses one barrier.','免除租赁费针对其中一项障碍。','作用对象明确。'),
 E('Teacher capacity remains a different problem.','教师供给仍是另一个问题。','措施无直接作用。'),
 E('Access can involve multiple independent constraints.','参与机会可能受多项相互独立的限制。','论证按问题分组。')
 ],'不能把 address 翻译成“已彻底解决”，它不保证一个措施消除全部问题。'),
 S('04 summary noun 使词汇连接具有内容','this restriction 指收费造成的参与障碍；these resources 可以指教师与场地，但必须在前文有清楚先行词。代词越宽泛，读者越难判断方案与对象是否匹配。','this financial restriction / these teaching resources / another capacity issue',[
 E('This financial restriction concerns instrument hire.','这一经济限制涉及乐器租赁。','明确 this 的范围。'),
 E('A shortage of rehearsal rooms is another issue.','练习室短缺是另一类问题。','引入新话题。'),
 E('The two problems require different responses.','这两类问题需要不同应对方式。','避免单一万能方案。')
 ],'不要用 this 指代整篇文章的所有条件，然后推断收费取消可以解决一切问题。')
 ],
 questions:[
 Q('Which is free in the original scenario, tuition or instrument hire?','Tuition is free; instrument hire carries a fee.','原稿明确免学费而收乐器租赁费，这一对照必须保留。'),
 Q('Is increased participation the same as higher test scores?','No. Participation and measured achievement are distinct outcomes.','源稿只讨论参与障碍，没有对音乐成绩提供实测数据。'),
 Q('What does address a restriction mean here?','Take action on the instrument-hire fee barrier without guaranteeing all constraints disappear.','address 限定措施作用于费用问题，不等于全面消除资源不足。'),
 Q('What does a rehearsal-space shortage refer to?','A resource constraint separate from the financial cost of hiring an instrument.','练习场地不足和乐器费是不同的限制因素，需要分别论证。')
 ],
 output:'完成八组英中对应词汇表达和不少于250词的音乐课程公平参与作文，逐段检查每次 this/that 指代对象。',
 model:[
 E('Free tuition does not guarantee free participation.','免学费不意味着参与完全不需成本。','术语。'),
 E('A fee for instrument hire may still be charged.','仍可能需要支付乐器租赁费。','费用类型。'),
 E('This financial barrier could affect some pupils.','这一经济障碍可能影响部分学生。','指代。'),
 E('Waiving that fee would address one restriction.','免除该费用将针对其中一项限制。','方案。'),
 E('Teacher shortages may remain unresolved.','教师短缺问题可能仍未解决。','新约束。'),
 E('Rehearsal-space constraints may also continue.','练习场地限制也可能持续。','另一区别。'),
 E('Participation and achievement are different outcomes.','参与情况与学习成果是不同结果。','证据限度。'),
 E('A coherent paragraph links each response to its cause.','连贯的段落把每项措施与相应原因对接。','方法。')
 ],referenceUrls:[REF],sourceNote:'源于 U07 乐器租赁收费与教师及排练空间限制的课程原稿；所有后续方案均是条件性教学建议。'
}
];