import type {SpecialtyLesson,LearningExample,LearningSection,LearningTable} from './specialtyLibrary';
const e=(target:string,zh:string,analysis:string):LearningExample=>({target,zh,analysis});
const s=(title:string,concept:string,pattern:string,examples:LearningExample[],caution:string,table?:LearningTable):LearningSection=>({title,concept,pattern,examples,caution,table});
export const ADVANCED_FRENCH_SPECIALTIES:SpecialtyLesson[]=[
{
 id:'fr-mood-concession-b2',type:'grammar',language:'fr',level:'B2',unitLink:'fr-b2-u01',
 title:'虚拟式与直陈式：确信、疑问、让步和条件',subtitle:'同一个 que 从句如何随立场与连接词改变语气',
 prerequisite:'已掌握 subjonctif présent 的高频变位、penser que 和 B1 常见观点结构。',
 objective:'在讨论中辨明确信、怀疑与让步，准确区分 penser que / ne pas penser que、bien que / même si、à condition que。',
 sections:[
 s('01 肯定陈述通常用直陈式；怀疑可触发虚拟式',
 '肯定的 je pense que、je crois que、il est certain que 通常接直陈式。否定或疑问形式若表达怀疑，则常接虚拟式；这里判断的是说话人对命题的态度，不能仅凭 que 本身决定语气。',
 'Je pense qu’il vient. / Je ne pense pas qu’il vienne.',[
 e('Je pense que cette solution est efficace.','我认为这一方案有效。','肯定判断通常使用直陈式 est。'),
 e('Je ne pense pas que cette solution soit suffisante.','我不认为这个方案足够。','否定判断表达怀疑，用 soit。'),
 e('Il est possible que les résultats changent.','结果有可能发生变化。','il est possible que 表达不确定性，后接 changent（虚拟式）。')
 ],'不是所有否定表达都必然用虚拟式：应考虑句式是否确实引出怀疑及所选表达的语用功能。',
 {title:'态度与语气对照',columns:['表达','常见语气','简短示范'],rows:[['Je pense que…','indicatif','qu’il est prêt'],['Je ne pense pas que…','subjonctif','qu’il soit prêt'],['Il est possible que…','subjonctif','qu’il vienne'],['Il est certain que…','indicatif','qu’il viendra']],note:'“常见语气”指所示意义下的常规选择；更复杂的语境仍要判断说话人态度。'}),
 s('02 bien que 与 même si 不可按中文逐字互换',
 'bien que、quoique 表让步，标准结构通常带 subjonctif；même si 后使用 indicatif。两者在中文可都被译为“虽然/即使”，但所要求的动词语气不同。书面表达需要保证语气与让步关系同时成立。',
 'bien que + subjonctif / même si + indicatif',[
 e('Bien que le budget soit limité, le projet reste utile.','尽管预算有限，这个项目仍有用。','bien que 后采用 soit。'),
 e('Même si le budget est limité, nous continuerons le projet.','即使预算有限，我们仍将继续项目。','même si 后用直陈式 est。'),
 e('Quoique cette méthode paraisse simple, elle exige du temps.','尽管这种方法看似简单，却需要时间。','quoique 后 paraisse 是虚拟式。')
 ],'不能写 bien que le budget est limité 作为此处标准书面表达；应使用 soit limité。'),
 s('03 提出条件：si、à condition que 与 pourvu que',
 '现实未来的 si 条件句通常接直陈式现在时，主句可用未来时；à condition que、pourvu que 在表达条件时通常接虚拟式。它们虽都表示条件，却有不同构句规则与语气，不可把所有条件从句都套用将来时。',
 'Si + présent → futur / à condition que + subjonctif',[
 e('Si nous avons le temps, nous partirons demain.','如果有时间，我们明天出发。','si 后是现在时 avons。'),
 e('Nous partirons demain à condition que vous soyez prêts.','只要您准备好了，我们就明天出发。','à condition que 后使用 soyez。'),
 e('Le projet pourra avancer pourvu que chacun participe.','只要每个人都参与，项目就能推进。','pourvu que 后 participe 为虚拟式。')
 ],'不能写 à condition que vous serez prêts；这里需要 soyez prêts。'),
 s('04 将观点、局限和前提组合为完整论证',
 'B2 讨论应同时说清楚主张、支持理由、仍存疑问和决定实施的条件。语法形式服务于语义：确信用陈述结构、局限用 bien que、尚需核查的条件用 à condition que，避免四句都简单重复 je pense que。',
 'claim → concession → uncertainty → condition → decision',[
 e('Je pense que cette mesure répond à un besoin réel.','我认为这项措施回应了真实需求。','先用直陈式提出判断。'),
 e('Bien qu’elle puisse coûter cher, elle faciliterait certaines activités.','尽管它可能昂贵，却可能方便某些活动。','bien que 后 puisse，主句条件式保留可能性。'),
 e('Je ne crois pas que son efficacité soit encore démontrée.','我不认为它的有效性已经得到证明。','否定判断使用 soit，避免夸大证据。'),
 e('Nous pourrions l’essayer à condition que les résultats soient évalués.','如果能评估结果，我们可以试行。','条件语气与虚拟式被动配合。')
 ],'“推行以后可能有效”不能被改写成“已证明一定有效”；主张和证据之间应保持一致。')
 ],
 questions:[
 {question:'填空：Je ne pense pas que ce ___ (être) nécessaire.',answer:'soit',why:'ne pas penser que 表示怀疑时，être 使用虚拟式 soit。'},
 {question:'填空：Bien que le coût ___ (être) élevé, nous continuerons.',answer:'soit',why:'bien que 后标准结构使用 subjonctif。'},
 {question:'改错：À condition que vous serez disponibles, nous partirons.',answer:'À condition que vous soyez disponibles, nous partirons.',why:'à condition que 后使用虚拟式 soyez，而不是将来时 serez。'},
 {question:'même si 与 bien que 后的动词语气分别是什么？',answer:'même si 通常接直陈式；bien que 通常接虚拟式。',why:'中文含义部分重合，但句法选择与说话态度不同。'}
 ],
 output:'写九句法语讨论一项校园措施，使用肯定判断、否定怀疑、bien que 让步、si 现实条件、à condition que 前提和审慎结论。',
 model:[
 e('Je pense que cette mesure pourrait améliorer l’organisation du campus.','我认为这项措施可能改善校园管理。','先说明观点且保留可能性。'),
 e('Elle répond à un besoin dont plusieurs étudiants parlent.','它回应了多位学生谈到的需求。','用 dont 限定需求来源。'),
 e('Bien que son coût soit élevé, elle peut présenter des avantages.','尽管成本高，它仍可能有优势。','bien que + soit。'),
 e('Cependant, je ne pense pas que ses effets soient déjà démontrés.','但是我不认为其效果已得到证明。','否定判断和 soient。'),
 e('Il est possible que certains étudiants en profitent davantage.','部分学生有可能更加受益。','保留分配不均的不确定性。'),
 e('Si l’université dispose du budget, elle pourra lancer un essai.','如果学校预算允许，就可以试行。','现实 si 条件句。'),
 e('Cet essai devrait être limité dans le temps.','试行应当有明确期限。','提出实施限制。'),
 e('Nous soutiendrons la proposition à condition que les résultats soient évalués.','只要评估结果，我们就会支持这一提案。','à condition que 后被动虚拟式。'),
 e('Le choix définitif dépendra donc des observations recueillies.','因此最终选择将取决于收集到的观察资料。','条件性结论。')
 ],
 referenceUrls:['https://www.laits.utexas.edu/tex/gr/tas3b.html','https://www.laits.utexas.edu/tex/gr/tas5.html'],
 sourceNote:'对应 fr-b2-u01 主观态度、让步与复杂假设。Tex 中语气触发和让步条件规则用于校核，例文新写。'
},
{
 id:'fr-precise-academic-lexicon-c1',type:'vocabulary',language:'fr',level:'C1',unitLink:'fr-c1-u01',
 title:'精准书面词汇：论点归属、语域与高频搭配',subtitle:'从“说、认为、造成”进阶到能够核对证据力度的摘要',
 prerequisite:'熟悉 B1 观点连接、B2 虚拟式和常见书面段落结构；能区分事实、观点和推断。',
 objective:'选择与信息来源和语体一致的表述，准确使用 soutenir, constater, supposer, nuancer, mise en œuvre 等搭配，组织精炼的论证段落。',
 sections:[
 s('01 soutenir、constater、supposer 不同于一个泛用“说”',
 'soutenir que 表示支持某论点；constater que 表示报告观察到的事实；supposer que 表示提出尚待证实的假设；prétendre que 可带对所引主张的保留态度。要根据原文实际功能选择词，而不是随意更换为更“高级”的动词。',
 'soutenir que / constater que / supposer que / nuancer une affirmation',[
 e('L’auteur soutient que cette mesure serait utile.','作者主张该措施可能有用。','soutient que 表示立场而不是已证实事实。'),
 e('Les chercheurs constatent une hausse de fréquentation.','研究者观察到使用人数增加。','constatent 对应已观察的指标。'),
 e('On peut supposer que plusieurs facteurs interviennent.','可以假设有多种因素在起作用。','supposer 明确保留假设状态。')
 ],'constater 与 supposer 并不等价；不能把尚未测得的因果效果写成 les chercheurs constatent。',
 {title:'书面动词与宾语搭配',columns:['动词','常见搭配','表达功能'],rows:[['soutenir','soutenir une thèse','提出并支持论点'],['constater','constater une évolution','报告观察'],['supposer','supposer que…','提出假设'],['nuancer','nuancer un propos','限制强度'],['mettre en évidence','mettre en évidence un écart','凸显具体差异']],note:'mettre en évidence 指呈现差异或事实，不自动等于证明某个因果机制。'}),
 s('02 搭配决定表达是否自然准确',
 '实施方案可说 mettre en œuvre une mesure；考虑条件可说 tenir compte de；应对挑战可说 faire face à；追求目标可说 viser à + infinitif。写作时先记词组的支配介词，再把它放进完整句子。',
 'mettre en œuvre / tenir compte de / faire face à / viser à',[
 e('L’établissement veut mettre en œuvre une nouvelle mesure.','学校希望实施一项新措施。','mettre en œuvre + 名词。'),
 e('Il faut tenir compte des contraintes budgétaires.','必须考虑预算限制。','tenir compte de + 复数名词，缩合 des。'),
 e('Cette initiative vise à améliorer l’accès aux ressources.','这一举措旨在改善资源可及性。','viser à + infinitif 描述目的。')
 ],'不能写 viser de améliorer，也不能把 mettre en œuvre 按字面拆成“放置工作”。'),
 s('03 nuance 和 restriction 要有真实语义对象',
 'certes…mais、toutefois、néanmoins 可承认一项情况再提出限制；en revanche 更强调两种对象或维度之间的对比。学术写作里连接词应与其实际信息关系对应，不能把任何句子用 toutefois 随机拼接。',
 'certes…mais / toutefois / néanmoins / en revanche',[
 e('Certes, le système est pratique, mais il reste coûteux.','诚然，该系统方便，但成本仍较高。','让步后引出明确的限制。'),
 e('Le résultat paraît encourageant. Toutefois, l’échantillon demeure réduit.','结果看似令人鼓舞，但样本仍然较小。','toutefois 限定解释范围。'),
 e('Cette méthode est rapide. En revanche, l’autre permet un suivi plus détaillé.','这一方法速度快，相比之下另一方法能进行更细致的跟踪。','en revanche 对照两种方法的优劣。')
 ],'不能仅因为 cependant 与 en revanche 都译成“然而”就不加判断地互换：后者通常具有较明确的对照关系。'),
 s('04 从重复口语表达改写为有来源的书面段落',
 'C1 精确表达不是单纯把词换长，而是缩减不必要重复、明确动作来源和适用范围。好的摘要应说明谁提出判断、观察实际覆盖什么、哪些局限仍然存在，以及提出怎样的审慎建议。',
 'source → observed result → limitation → recommendation',[
 e('Le rapport met en évidence une variation de fréquentation selon les horaires.','报告显示使用人数随时段变化。','明确测量对象和变化维度。'),
 e('Toutefois, ces données ne permettent pas d’établir un effet sur les résultats scolaires.','不过，这些数据不能确立对学习成绩的影响。','准确保留指标局限。'),
 e('Il convient donc d’évaluer les besoins avant de mettre en œuvre une extension.','因此，在实施扩建前应评估需求。','以 Il convient de + infinitif 提出谨慎建议。')
 ],'一条描述使用情况的报告不能仅凭换成 effet 或 incidence 等名词就被解释为证明成绩改善。')
 ],
 questions:[
 {question:'用于尚未证实的推测：constater 或 supposer？',answer:'supposer',why:'supposer 表示假设，constater 表示观察并报告结果。'},
 {question:'补全：Il faut tenir compte ___ ces limites.',answer:'de',why:'固定搭配 tenir compte de quelque chose。'},
 {question:'补全：Cette politique vise ___ réduire les coûts.',answer:'à',why:'viser à + infinitif 表示目标。'},
 {question:'“这一方法较快，另一方法更详细”应优先选择哪个对比词？',answer:'en revanche',why:'en revanche 适合明确对照不同方法的特征。'}
 ],
 output:'写九句法语摘要校园学习空间方案：引述一项观点、一个可观察指标、一个尚未证实的推断、两种方法的比较及条件化建议，至少使用四种本节搭配。',
 model:[
 e('Le rapport examine la fréquentation des espaces de travail.','这份报告分析学习空间的使用情况。','说明材料与对象。'),
 e('Les auteurs constatent que certains créneaux sont plus chargés que d’autres.','作者观察到某些时段比其他时段更繁忙。','报告观察结果。'),
 e('Ils soutiennent que cette variation mérite une attention particulière.','他们认为这种变化值得特别关注。','区分作者判断。'),
 e('On peut supposer que les horaires influencent les besoins.','可以假设时间安排影响需求。','提出假设。'),
 e('Toutefois, ces observations ne démontrent pas une amélioration des résultats.','然而这些观察不能证明成绩有所改善。','明确限制。'),
 e('Une première solution viserait à mieux répartir les salles disponibles.','第一种方案旨在更合理地分配现有教室。','viser à + infinitif。'),
 e('Une autre proposition consiste à prolonger les horaires d’ouverture.','另一项提案是延长开放时间。','consister à + infinitif。'),
 e('Il convient de tenir compte du coût de chaque option.','应该考虑每种方案的成本。','tenir compte de 缩合为 du。'),
 e('La décision finale dépendra des besoins vérifiés avant toute mise en œuvre.','最终决定应取决于实施前核实的需求。','实施前核查，结论受证据约束。')
 ],
 referenceUrls:['https://www.coe.int/en/web/common-european-framework-reference-languages/cefr-descriptors','https://www.laits.utexas.edu/tex/gr/'],
 sourceNote:'对齐 fr-c1-u01 词汇精度、语域及搭配的既有课程主题；示例与语义解释原创，不假装引述真实科研报告。'
}
];