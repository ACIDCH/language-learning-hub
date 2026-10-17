import type {FoundationUnit} from './foundationTypes';
export const englishFoundation:FoundationUnit[]=[
{
id:'en-fnd-01',language:'en',level:'Pre-A1',phase:0,title:'26 个字母与英语声音',
goal:'区分字母名称、拼写与实际语音；能正确拼读名字。',
concepts:['英语字母有 26 个，但英语语音的数量并不等于字母数；不同口音的音位分析也不完全相同。','字母名称 A /eɪ/、E /iː/、I /aɪ/、O /oʊ/（美式）和 U /juː/ 不等于字母在单词中的每次发音。','拼写时逐个报字母：My name is Amy. A-M-Y.'],
examples:['A is the first letter.','How do you spell your name?','My name is Mei: M-E-I.'],
vocab:[['letter','字母'],['sound','语音'],['spell','拼写'],['name','名字']],
listening:'How do you spell your name? My name is Lily: L-I-L-Y.',
reading:'Anita writes her name on a card. Her teacher asks her to spell it. She says, “A-N-I-T-A.”',
questions:[{prompt:'Which response actually spells a name?',choices:['My name is Ben.','B-E-N.','Ben is here.'],answer:1,explanation:'spell 要逐一说出字母名称。'},{prompt:'Which statement is accurate?',choices:['Each letter always has one sound.','English has exactly 26 sounds.','Letters and speech sounds are not the same thing.'],answer:2,explanation:'英文字母数量固定，但字母、字母组合和语音之间并非一一对应。'}],
production:'写出你的英文姓名，再用字母名称逐个拼写。',pronunciation:'先听每个字母的名称，再读单词；不要把字母名称直接替代词中发音。',commonMistake:'把单词 A 的字母名称 /eɪ/ 当作 apple 的起始元音。'
},
{
id:'en-fnd-02',language:'en',level:'Pre-A1',phase:0,title:'英语元音长短与口型',
goal:'初步听辨 sit/seat、ship/sheep，理解元音质量而不只是时长。',
concepts:['sit 的 /ɪ/ 与 seat 的 /iː/ 在英式和美式发音中有舌位与时长差异；时长并非唯一线索。','ship 与 sheep 只有关键元音不同，适合用最小对立体（minimal pairs）练习。','注意一些音标符号表示的是声音，不等于标准英文字母。'],
examples:['I sit near the window.','Take a seat, please.','The ship is far away.'],
vocab:[['sit','坐'],['seat','座位'],['ship','船'],['sheep','绵羊']],
listening:'Please sit here. Your seat is near the window.',
reading:'Sam sees a sheep near the road. He later sees a ship in a picture. Sheep and ship are different words.',
questions:[{prompt:'Which word means “座位”?',choices:['sit','seat','ship'],answer:1,explanation:'seat 是名词“座位”；sit 是动词“坐”。'},{prompt:'Which is a minimal pair for ship?',choices:['sheep','chair','book'],answer:0,explanation:'ship /ʃɪp/ 与 sheep /ʃiːp/ 的主要区别在元音。'}],
production:'分别造一个包含 sit 和 seat 的短句，再慢速读两遍。',pronunciation:'注意 /ɪ/ 与 /iː/ 的舌位及听感；文字识别正确不等于音素发得准确。',commonMistake:'认为所有带 ee 的单词发音都和字母 E 的字母名称完全相同。'
},
{
id:'en-fnd-03',language:'en',level:'Pre-A1',phase:0,title:'辅音清浊、th 与词尾',
goal:'识别 /p b/、/t d/ 与 /θ ð/ 的常见区别。',
concepts:['/p/ 是清辅音，/b/ 是浊辅音；区分时注意声带振动和送气等线索。','think 中常见 /θ/，this 中常见 /ð/；舌尖轻触牙齿区域，避免直接用 /s/ 或 /z/ 替代。','英语词尾辅音会影响词义，例如 cap 和 cab；不要自动加元音。'],
examples:['This is my bag.','I think it is a good idea.','Put the cap on the bottle.'],
vocab:[['think','认为'],['this','这个'],['cap','帽盖'],['cab','出租车']],
listening:'This is my bag. I think it is blue.',
reading:'Mina takes her bag to school. She puts a cap on a bottle. A cab stops outside the school.',
questions:[{prompt:'Which word typically begins with /θ/?',choices:['this','think','there'],answer:1,explanation:'think 通常以清齿擦音 /θ/ 开头；this、there 常为 /ð/。'},{prompt:'Which pair changes only the last consonant?',choices:['cap / cab','this / those','blue / bag'],answer:0,explanation:'cap 与 cab 主要以词尾 /p/ 和 /b/ 区别。'}],
production:'用 this 和 think 各写一句话；先慢速读，再连成自然语速。',pronunciation:'对比 this/think 和 cap/cab；建议听辨加复读，不输出未经校准的发音百分制。',commonMistake:'把 think 读成 sink，或在词尾 /p/ 后额外加一个元音。'
},
{
id:'en-fnd-04',language:'en',level:'A1',phase:0,title:'音节、单词重音与基础节奏',
goal:'能划分常见音节，找出简单单词的重读位置。',
concepts:['音节围绕元音核心组织；英语单词不一定按拼写字母个数分音节。','TA-ble 常重读第一音节，be-GIN 常重读第二音节；重音位置会影响理解。','自然语流里的弱读和连读可在词汇熟悉后循序练习。'],
examples:['TAble: a table.','beGIN: Let us begin.','I want a CUP of TEA.'],
vocab:[['syllable','音节'],['stress','重音'],['table','桌子'],['begin','开始']],
listening:'Let us begin. Put the book on the table.',
reading:'Anna sits at a table. She has a cup of tea and a new book. It is time to begin.',
questions:[{prompt:'Which syllable is commonly stressed in table?',choices:['TA-','-ble','Both equally'],answer:0,explanation:'table /ˈteɪ.bəl/ 通常在第一音节重读。'},{prompt:'Which is a commonly correct stress pattern for begin?',choices:['BE-gin','be-GIN','Neither syllable'],answer:1,explanation:'begin /bɪˈɡɪn/ 通常第二音节重读。'}],
production:'为 table、begin 画出重读标记，并写一段两句自我介绍。',pronunciation:'练习重音前先确认词形和词义；不同语速下重音可能伴随音量、时长及元音变化。',commonMistake:'认为每个单词的每个音节都要同样用力朗读。'
},
{
id:'en-fnd-05',language:'en',level:'A1',phase:1,title:'数字、日期和个人信息',
goal:'能介绍年龄、电话号码、日期和简单价格。',
concepts:['eleven、twelve、thirteen 等不规则数字需要单独记忆；thirteen 与 thirty 的重音和音节不可混淆。','表达日期可说 October eighteenth 或 the eighteenth of October；习惯用法随地区变化。','年龄用 I am twenty years old，不能说 I have twenty years。'],
examples:['I am twenty years old.','The class starts on Monday.','The book costs fifteen dollars.'],
vocab:[['twenty','二十'],['thirteen','十三'],['thirty','三十'],['Monday','星期一']],
listening:'My name is Alex. I am twenty. My English class starts on Monday.',
reading:'Leo is nineteen years old. His class starts on Tuesday at nine. He pays fifteen dollars for a used book.',
questions:[{prompt:'Which sentence describes age correctly?',choices:['I have twenty years.','I am twenty years old.','I twenty years old.'],answer:1,explanation:'英语通常用 be + 年龄。'},{prompt:'Which is 30?',choices:['thirteen','thirty','three'],answer:1,explanation:'thirty 表示三十；thirteen 表示十三。'}],
production:'写出你的年龄、下次上课日期和一件商品的价格。',pronunciation:'用数字成对听辨 thirteen/thirty；日常电话号码通常逐个数字读。',commonMistake:'把 thirteen 与 thirty 混读，或照搬部分欧洲语言“我有 X 岁”的结构。'
},
{
id:'en-fnd-06',language:'en',level:'A1',phase:2,title:'问候、代词与 be 动词',
goal:'用 I am、you are、she is 写出完整简单句和问候。',
concepts:['一般现在时 be 随主语变化：I am，you/we/they are，he/she/it is。','疑问句交换 be 与主语的位置：Are you ready?','缩写 I’m、you’re、she’s 在日常会话常见，书面正式语境可用完整形式。'],
examples:['Hello! I am Nina.','She is my classmate.','Are you a student? Yes, I am.'],
vocab:[['student','学生'],['classmate','同学'],['ready','准备好'],['hello','你好']],
listening:'Hello, I am Nina. I am a student. Are you a student too?',
reading:'Nina is a student in Auckland. Her classmate is Omar. They are in the library. They are ready for class.',
questions:[{prompt:'Complete: She ___ a student.',choices:['am','are','is'],answer:2,explanation:'she 搭配 is。'},{prompt:'Which question is correctly formed?',choices:['You are ready?','Are you ready?','Is you ready?'],answer:1,explanation:'一般 be 疑问句使用 Are you ...?'}],
production:'写 3 句介绍自己与一位同学，并提出 1 个 be 疑问句。',pronunciation:'连读 I am /aɪ æm/ 常缩写为 I’m；不要遗漏句末上扬或自然语调。',commonMistake:'说 She are ... 或 He am ...。'
},
{
id:'en-fnd-07',language:'en',level:'A1',phase:2,title:'冠词、单复数与 there is/are',
goal:'描述身边物品数量及位置。',
concepts:['a/an 取决于后面词语的起始发音，例如 an apple、a university。','可数名词通常有单复数：one book、two books；some water 是不可数名词示例。','存在句：There is a chair；There are two chairs。'],
examples:['There is an apple on the table.','There are two books in my bag.','A university is near my home.'],
vocab:[['chair','椅子'],['book','书'],['table','桌子'],['water','水']],
listening:'There are two books and an apple on the table.',
reading:'A small room has a table, two chairs, and three books. There is some water in a bottle.',
questions:[{prompt:'Which phrase is correct?',choices:['a apple','an apple','an university'],answer:1,explanation:'apple 起始发音为元音，使用 an；university 起始 /j/，通常用 a。'},{prompt:'Complete: There ___ three chairs.',choices:['is','am','are'],answer:2,explanation:'复数名词 three chairs 搭配 there are。'}],
production:'写 4 句描述你的书包或房间，至少包含一个复数名词。',pronunciation:'比较 a /ə/ 和 an /ən/ 在自然语流中的弱读。',commonMistake:'误以为 a/an 只看首字母，而不是下一词的发音。'
},
{
id:'en-fnd-08',language:'en',level:'A1',phase:2,title:'日常活动与一般现在时',
goal:'说明每天常做的事并询问习惯。',
concepts:['I/you/we/they work；he/she/it works（大多数动词第三人称单数加 -s/-es）。','频率副词 usually、often、sometimes 常放在普通动词前、be 动词后。','一般现在时表达习惯，不等于此刻正在进行的动作。'],
examples:['I study English every morning.','She usually takes the bus.','He works near the city centre.'],
vocab:[['usually','通常'],['sometimes','有时'],['study','学习'],['take the bus','乘公交']],
listening:'I usually study in the morning. My friend works in the afternoon.',
reading:'Kim studies English at home. She usually reads after breakfast. On Fridays she meets a friend near the library.',
questions:[{prompt:'Complete: He ___ English every day.',choices:['study','studies','studying'],answer:1,explanation:'he 作主语的一般现在时通常用 studies。'},{prompt:'Which sentence describes a routine?',choices:['I am eating right now.','I study every morning.','I ate yesterday.'],answer:1,explanation:'every morning 是习惯频率。'}],
production:'写一段 4 句的日常时间表，包含 usually 和 sometimes。',pronunciation:'留意 works 词尾 /s/、studies 词尾 /z/ 等发音区别。',commonMistake:'第三人称单数忘加 -s，或用进行时表达所有日常习惯。'
},
{
id:'en-fnd-09',language:'en',level:'A1',phase:2,title:'do/does 提问与否定',
goal:'能询问他人的日常习惯并回答。',
concepts:['一般现在时疑问句：Do you study? Does she work?','does 已承载第三人称单数语法标记，动词使用原形：Does he live ...?','否定：I do not (don’t) know；She does not (doesn’t) know。'],
examples:['Do you like tea?','Does he live near the school?','She does not work on Sundays.'],
vocab:[['like','喜欢'],['live','居住'],['know','知道'],['Sunday','星期日']],
listening:'Do you like coffee? No, I do not. Does your sister like tea? Yes, she does.',
reading:'Omar lives near his school. He does not drive. His friend asks, “Do you walk to class?” He says, “Yes, I do.”',
questions:[{prompt:'Choose the correct question.',choices:['Does she works?','Do she work?','Does she work?'],answer:2,explanation:'does 后使用动词原形 work。'},{prompt:'Correct negative for He likes coffee.',choices:['He does not like coffee.','He do not likes coffee.','He not likes coffee.'],answer:0,explanation:'does not 后用 like 原形。'}],
production:'写 2 个 do/does 问句，并各写一个肯定或否定的回答。',pronunciation:'短答 Yes, I do./No, she doesn’t. 保留关键助动词，训练完整节奏。',commonMistake:'说 Does she likes ...?，把第三人称单数变化重复加两次。'
},
{
id:'en-fnd-10',language:'en',level:'A2',phase:3,title:'方向、时间与连接短句',
goal:'用 in/on/at 和 and/but/because 组合多个事实。',
concepts:['常见时间表达：at nine、on Monday、in October；并非所有语境都遵循单一翻译规则。','and 增加信息；but 表示对比；because 引出原因。','写段落时先用明确主语，保持句子时态与指代一致。'],
examples:['Class starts at nine on Monday.','I study at home because the library is closed.','I like French, but I need more practice.'],
vocab:[['because','因为'],['but','但是'],['library','图书馆'],['near','附近']],
listening:'The library opens at nine, but my class begins at ten.',
reading:'I study English on Mondays. I usually go to the library because it is quiet. My friend studies at home, but we practise together online.',
questions:[{prompt:'Which sentence explains a reason?',choices:['I study because I want to improve.','I study but I improve.','I study on Monday.'],answer:0,explanation:'because 引导原因。'},{prompt:'Choose the natural time phrase.',choices:['at Monday','in nine o’clock','on Monday'],answer:2,explanation:'星期几常用 on。'}],
production:'用 because 和 but 各连接一组短句，组成至少 4 句的小段落。',pronunciation:'朗读长句时在意义自然分组处短暂停顿，避免每个单词之间机械停顿。',commonMistake:'混用 because 和 but，或忘记连接词前后逻辑关系。'
},
{
id:'en-fnd-11',language:'en',level:'A2',phase:4,title:'过去、计划与较长句',
goal:'区分过去事实、现在习惯与明确的未来计划。',
concepts:['规则动词一般过去时常加 -ed：worked；go 的过去式 went 是不规则变化。','be going to 常表达已存在的计划或有依据的预期；will 可用于当下决定或预测。','使用 when/after/before 建立简单从属结构，注意主从句时间关系。'],
examples:['I went to the library yesterday.','I am going to study French tomorrow.','After class, I will call my friend.'],
vocab:[['yesterday','昨天'],['tomorrow','明天'],['after','之后'],['plan','计划']],
listening:'Yesterday I visited my friend. Tomorrow I am going to study at home.',
reading:'Yesterday Mina went to the library because she had an assignment. She read two articles. After she finished, she met her friend. Next week she is going to revise her notes.',
questions:[{prompt:'Which sentence is about the past?',choices:['I went to class yesterday.','I go to class every day.','I am going to class tomorrow.'],answer:0,explanation:'went 是 go 的过去式，yesterday 标记过去时间。'},{prompt:'Choose a clear future plan.',choices:['I visited tomorrow.','I am going to revise tomorrow.','I revise yesterday.'],answer:1,explanation:'be going to + 动词原形表达计划。'}],
production:'写 5 句短文，按昨天—今天—明天顺序叙述经历和计划。',pronunciation:'规则 -ed 有 /t/、/d/、/ɪd/ 等读法；不要每次都读成独立的 /ɪd/。',commonMistake:'把所有过去式写成 -ed，例如 goed；或把 next week 与过去时不加说明地并用。'
},
{
id:'en-fnd-12',language:'en',level:'A2',phase:5,title:'从短段落走向学术表达',
goal:'将主题句、例子和结论组织成一段可理解文字。',
concepts:['主题句给出核心观点；支持句补充原因或例子；末句可归纳但不能凭空添加证据。','使用 first、for example、therefore 时要注意逻辑，不是堆砌高级连接词。','基础段落写作是进入 IELTS 训练的桥梁，不等于已经达到 IELTS B1/B2 熟练度。'],
examples:['Regular reading can improve vocabulary.','For example, short articles offer new words in context.','Therefore, a small daily reading habit can be useful.'],
vocab:[['main idea','中心思想'],['supporting detail','支持细节'],['for example','例如'],['therefore','因此']],
listening:'A good paragraph usually has one main idea and clear supporting details.',
reading:'Reading a short article every day can support language learning. A learner meets new vocabulary in context and notices common sentence patterns. For example, a news summary may repeat words about transport or work. Regular reading is therefore a useful part of a balanced study routine.',
questions:[{prompt:'Which sentence best introduces a paragraph about daily reading?',choices:['Because and but.','Daily reading can support language learning.','Therefore, therefore.'],answer:1,explanation:'主题句应直接介绍段落的中心思想。'},{prompt:'What is the purpose of For example?',choices:['Introduce supporting illustration','Change to an unrelated topic','Signal the end without evidence'],answer:0,explanation:'for example 用来提供支持观点的例子。'}],
production:'围绕自己的学习计划写 70–100 词短段落，包含主题句、至少两条支持细节与合理收尾。',pronunciation:'录入自己的段落后分句朗读；先保证词句可理解，再练句重音与语调。',commonMistake:'使用大量连接词，却没有明确的主题句或充分的支持理由。'
}
];