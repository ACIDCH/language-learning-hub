import type {LearningSection} from './specialtyLibrary';
import type {UpgradeExample as E} from './upgradeExamples';
const V=(title:string,concept:string,examples:E[],caution:string):LearningSection=>({title,concept,pattern:examples.map(e=>e[0]).join(' / '),examples:examples.map(([target,zh,analysis])=>({target,zh,analysis})),caution});
export const UPGRADE_VOCABULARY:Record<string,LearningSection[]>={
 '01':[
 V('从句与限定','clause 是含谓语的从句或分句，不能把任何长词组都叫从句；restrictive 描述限定对象的功能。限制性关系从句参与确定名词所指，不只是增添句长。',[
 ['The clause identifies the students.','这个从句确定所说的学生。','clause 在此是名词，不是单个连接词。'],['A restrictive clause narrows the group.','限制性从句缩小群体范围。','restrictive 是形容词，说明功能。']], '不是所有 who 从句都限制对象；逗号、语境与所指共同决定解释。'),
 V('关系与让步','relative 在 relative clause 中意为关系的，不是亲属；concession 指承认一个不利条件但仍提出主张的让步关系。关系从句与让步从句承担不同任务，不能互相替代。',[
 ['The relative clause modifies students.','关系从句修饰 students。','relative 修饰 clause，指出从句类别。'],['Although introduces a concession here.','这里 although 引出让步。','concession 是逻辑关系，不是价格折让。']], '术语要放回句法语境，不能套用 relative 的“亲戚”义。'),
 V('所指与准确性','referent 指一个表达在语境中指向的对象；accuracy 是准确性，通常不可数。写作准确不仅包括变位和拼写，也包括不改变群体范围和逻辑关系。',[
 ['The referent must be clear from context.','所指应能由语境确定。','referent 是具体表达指向的对象。'],['Adding clauses does not guarantee accuracy.','增加从句不保证准确。','accuracy 不等于复杂度。']], '句子长不是准确证据；修改后要核对主张是否仍与原句一致。')],
 '02':[
 V('研究动作与资料收集','investigate 表示调查研究，可直接接问题；collect 表示收集，后接资料或日记。收集动作不等于分析完成，描述方法时应区分活动阶段与时间范围。',[
 ['The team investigated commuting patterns.','团队研究了通勤模式。','investigate 直接接对象，不需 about。'],['They collected travel diaries.','他们收集了出行日记。','collect 后为具体资料，不等于证明结果。']], '调查与证实不同，不能把 investigated 换成 proved 而不改变证据力度。'),
 V('持续与确立','ongoing 形容仍在进行的过程，不等于已完成；establish 可表示确立有根据的结论，通常比 suggest 强。研究主题持续存在，不意味着最初样本能代表未来所有情形。',[
 ['The discussion is ongoing.','讨论仍在进行。','ongoing 不表示已经达成最终一致。'],['The sample did not establish a universal pattern.','这个样本没有确立普遍模式。','establish 的证据要求不同于提出问题。']], '不要把正在讨论的结论写成已确立；也不能仅凭时态作证据判断。'),
 V('发现与时间框架','finding 是研究发现，可以数；findings 指多项结果。time frame 是时间范围，决定该动作在句中如何定位，也限制数据覆盖的时段。年份与观察持续时间不可混淆。',[
 ['A finding depends on the method and evidence.','研究发现取决于方法和证据。','a finding 是一项发现。'],['The time frame was one working week.','时间范围是一个工作周。','one working week 不是整个 2020 年。']], '不能把一次记录所在年份改写成全年连续观测，数量与时段都需保留。')],
 '03':[
 V('动词与名词位置','analyse 是动词，analysis 是名词；analysis 的复数为 analyses，不能机械加普通词尾。conduct an analysis 与 analyse the data 可描述相似动作，但各自需要不同句法结构。',[
 ['Researchers analyse observations.','研究者分析观察记录。','analyse 作谓语，主语为复数。'],['The analysis examines completed tasks.','分析考察完成的任务。','analysis 为单数主语，谓语为 examines。']], 'an analyse 不正确；先确定句子需要名词还是动词，再选择词族形式。'),
 V('修饰语与研究搭配','analytical 是形容词，常修饰 approach、skill 等名词；conduct research 为开展研究。一般意义的 research 通常不可数，不随意加 a，也不以 make research 作默认搭配。',[
 ['An analytical approach uses clear categories.','分析性方法使用清楚类别。','analytical 修饰 approach。'],['The team conducted research into workspace use.','团队就空间使用开展了研究。','research into 后接主题。']], '常用词组须整体学习；不可把 research 当成所有情况下都可数的 study。'),
 V('结论与问题','draw a conclusion 表示得出结论，pose a question 表示提出问题。前者需要证据支持判断，后者可以是研究的新起点；两种动作不能为了避免重复而互换。',[
 ['The findings do not justify drawing a universal conclusion.','这些发现不足以支持普遍结论。','justify 后可接动名词 drawing。'],['The findings pose a question about collaboration.','这些发现提出了协作方面的问题。','问题尚待回答，不等于结论已经确立。']], '提出问题不是解决问题；学术表达流畅也不允许扩大原稿结果。')],
 '04':[
 V('保留与边界','preserve 指保留原来的重要特征，boundary 指范围或边界。改写应保留受访群体、数量和确定性；不是保留每一个字，也不是任意改出一个更强立场。',[
 ['Preserve the population limit in the paraphrase.','改写时保留人群限制。','preserve 后明确要保留什么。'],['The boundary separates evidence from inference.','这条边界区分证据与推论。','boundary 是论断适用的界限。']], '保持意思比替换词语数量更重要，不能用新词掩盖范围变化。'),
 V('关联与因果','association 表示关联，常说 association between；causation 表示因果关系。受访者把两者联系起来，并不能单独证明某因素导致另一个变化，两种名词的力度不同。',[
 ['An association between flexibility and stress was reported.','报告了灵活性与压力之间的关联。','被动句仍只说关联。'],['The account does not establish causation.','叙述没有确立因果。','不能把未确立改写成确定不存在因果。']], '缺因果证据不等于证明没有因果；应保留“不能确立”的准确否定。'),
 V('子集与等值','subset 指较大集合中的一部分；equivalent 指在所讨论意义上等值，常接 to。两句只有共享关键词，不足以构成等值改写，还要核对范围、程度与关系。',[
 ['Respondents form a subset of the population.','受访者构成人群中的一个子集。','subset 不保证有代表性。'],['Lower stress is not equivalent to no stress.','压力较低不等于没有压力。','equivalent to 后接比较对象。']], '不能把子集扩成全部，也不能把降低改成彻底消除。')],
 '05':[
 V('暂定与合理可能','tentative 表示暂定、需要更多证据；plausible 表示解释看起来合理，并不保证真实。两者允许作出有限判断，而不是完全不表达立场。',[
 ['The recommendation is tentative.','建议是暂定的。','tentative 指可随证据修订。'],['Extra time is a plausible explanation.','额外时间是合理的可能解释。','plausible 不等于已经证明的唯一原因。']], '合理可能不是事实认证；暂定也不表示没有提出任何方案。'),
 V('显示与提示','indicate 和 suggest 都可用于根据证据提出解释，具体力度由语境决定；本例 suggest 保留不能分离两个变量的局限。不能设定所有场景都成立的固定强弱排行榜。',[
 ['The pattern may indicate a problem with the instructions.','这个模式可能提示说明存在问题。','may 限定解释。'],['The lower error rate suggests a possible benefit.','较低错误率提示可能有好处。','没有具体百分比，也没有排除时间因素。']], '不要把 indicate 一律译成“证明”；具体证据范围仍须阅读。'),
 V('可争论判断与不确定性','arguably 引出可辩护但允许讨论的判断；uncertainty 是不确定性，常说 reduce uncertainty。应指出什么不确定及如何检查，而不是只添加更多模糊副词。',[
 ['Arguably, the revision deserves a further test.','可以认为，这次修订值得进一步测试。','这是有理由的建议，不是实测结论。'],['A separate timing comparison could reduce uncertainty.','单独比较时间因素可能减少不确定性。','could 提出研究可能性。']], 'arguably 不能替代论据；reduce uncertainty 也不是保证消除全部未知。')],
 '06':[
 V('名词化与简洁','nominalisation 指把动作或性质表达成名词形式；concision 是用必要词语清楚表达。名词化有助于话题衔接，也可能掩盖执行者，不能简单按词数判断优劣。',[
 ['Nominalisation can connect two sentences.','名词化可以连接两句话。','revision 可回指 revise 的动作。'],['Concision should preserve responsibility.','简洁应保留责任归属。','删掉施事不一定更清楚。']], '不是所有长句都冗长，也不是所有名词形式都应该删除。'),
 V('实施与修订','implementation 是实施，revision 是修订。若实施修订并不增加独立信息，可用直接动词 revised；若讨论执行过程与设计改变不同，两个名词仍可能有必要。',[
 ['The team undertook the implementation of the change.','团队负责实施改变。','可简写 implemented，但须核对意思是否保留。'],['This revision reduced compulsory fields.','这次修订减少了必填项。','revision 在后句作为已知话题有用。']], '压缩前先问名词是否表达独立步骤，不因词长就机械删掉。'),
 V('执行者与清晰','agent 在语法中指动作执行者，不是代理商；clarity 指清晰程度。主动句常便于看见执行者，被动句也可用 by 明示；选语态应看信息重点。',[
 ['The team is the agent of revised.','团队是 revised 的动作执行者。','语法术语中的 agent。'],['Naming the agent improves clarity here.','这里说出执行者提高了清晰度。','here 限定具体编辑情境。']], '不能把清晰一概等同主动语态；被动也能准确保留责任主体。')],
 '07':[
 V('先行词与指代','antecedent 是代词等表达回指的先行内容；reference 指指代关系。语法数一致只是线索之一，段落中存在多个合适名词时，还需要语义和责任主体判断。',[
 ['The antecedent of it must be identifiable.','it 的先行内容应可识别。','不能仅取距离最近的词。'],['The reference becomes clearer when the actor is named.','说出执行者后，指代更清楚。','reference 在此不是参考文献。']], '不要把 reference 的“文献”义套到指代分析，也不能只看单复数。'),
 V('歧义与提案','ambiguity 表示存在多种可能解释；proposal 是拟议方案，不等于已获批准的决定。说 planning team revised the proposal 消除的是执行者歧义，不自动说明方案被采纳。',[
 ['They creates ambiguity in this sentence.','这个句子中的 they 产生了歧义。','讨论的是词语 they，因此用单数 creates。'],['The planning team revised the proposal.','规划团队修订了提案。','revised 不等于 approved。']], '不要为解决指代问题而增加已经批准、实施或完成的事实。'),
 V('咨询与推进','consultation 指征询意见，不能自动理解为意见已获接受；progression 是观点或叙述的发展。连贯推进应说明新话题与旧信息的关系，不只靠重复 this。',[
 ['The concern emerged during consultation.','这项顾虑在咨询过程中出现。','consultation 提供意见来源。'],['Clear progression links the road change to the unresolved funding issue.','清楚推进把道路改变与未解决资金问题连接起来。','连接同时保留两者的区别。']], '咨询并不保证解决一切问题；段落衔接不能制造未证实的因果。')],
 '08':[
 V('草稿与修订','draft 是可修改的初稿，revision 是修订过程或修订版。草稿并不意味着每句话都错；修订时应分清必要纠正、事实核验与可选风格改变。',[
 ['Keep the draft beside the revised sentence.','把草稿放在修订句旁边。','保留比较依据，避免只收藏正确答案。'],['The revision changes have to has.','这次修订把 have 改成 has。','明确最小修改而非整段替换。']], '不能因为文本叫 draft 就把原作者意思全部重写掉。'),
 V('规律与迁移','pattern 是可重复识别的关系；transfer 指把所学用于新语境。number 的一致规则要包含 the number of 与 a number of 的区别，才能正确迁移。',[
 ['Identify the agreement pattern.','识别一致关系的规律。','关注中心词，不只看最近复数词。'],['Use applications to test transfer.','换成 applications 来检验迁移。','变换语境仍要能解释规则。']], '机械复制 has 不算完整迁移；必须检查新的结构是否适用。'),
 V('理由与核验','rationale 是决定背后的理由，通常比只说“更好听”具体；verify 指对照证据核验。语法修改的理由与数据真实性的核验属于不同工作，不能互相代替。',[
 ['Record the rationale for accepting the edit.','记录接受修改的理由。','说明语法、语义或读者需要。'],['Verify the claim separately from the verb form.','把论断核验与动词形式分开处理。','核验事实要回到数据或来源。']], '更正式的词并非自动更准确；动词改对也不会使一个错误事实变真。')],
};
