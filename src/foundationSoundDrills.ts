/** Original phonetics mini-lab content, independent of the experimental V3 acoustic model. */
export type SoundContrast={id:string;language:'en'|'fr';topic:string;soundA:string;soundB:string;wordsA:string[];wordsB:string[];instruction:string;warning:string};
export const SOUND_CONTRASTS:SoundContrast[]=[
{id:'en-vowels-1',language:'en',topic:'短元音与长元音 /ɪ/–/iː/',soundA:'/ɪ/',soundB:'/iː/',wordsA:['ship','sit','live'],wordsB:['sheep','seat','leave'],instruction:'先听 ship/sheep、sit/seat，再对照舌位和元音时长。元音时长并非唯一差异，注意口型与音质。',warning:'不要把所有带字母 i 的词都读成同一个音；具体发音可能因口音而异。'},
{id:'en-vowels-2',language:'en',topic:'英语前元音 /æ/–/e/',soundA:'/æ/',soundB:'/e/',wordsA:['bad','pan','sat'],wordsB:['bed','pen','set'],instruction:'先放慢 bad/bed、pan/pen 的口型，再放进短句 I have a pen / I have a pan。',warning:'此处 /e/ 为常见英式转写，美式词典也可能写作 /ɛ/。'},
{id:'en-vowels-3',language:'en',topic:'英语 /ʊ/–/uː/',soundA:'/ʊ/',soundB:'/uː/',wordsA:['full','pull','look'],wordsB:['fool','pool','Luke'],instruction:'练 full/fool 与 pull/pool。观察短元音较松、长元音唇形更圆的区别。',warning:'不同地区英语会影响部分元音音质，不能只按时长判断。'},
{id:'en-consonants-1',language:'en',topic:'清浊辅音 /θ/–/ð/',soundA:'/θ/',soundB:'/ð/',wordsA:['think','three','thank'],wordsB:['this','they','those'],instruction:'舌尖轻触上齿附近：/θ/ 不振动声带，/ð/ 振动。先轻读 th，再读完整词。',warning:'这不是 /s/ 和 /z/ 的简单替代。'},
{id:'en-consonants-2',language:'en',topic:'英语 /v/–/w/',soundA:'/v/',soundB:'/w/',wordsA:['vest','vine','vet'],wordsB:['west','wine','wet'],instruction:'发 /v/ 时上齿接触下唇；发 /w/ 时先圆唇再迅速转入元音。',warning:'不要仅靠字母猜测实际发音。'},
{id:'en-stress-1',language:'en',topic:'词重音与词性变化',soundA:'名词：REcord',soundB:'动词：reCORD',wordsA:['a REcord','an IMport'],wordsB:['to reCORD','to imPORT'],instruction:'对照名词与动词的常见重音位置，将重音词节说得更清晰，练 a REcord / to reCORD。',warning:'不是所有双音节名词/动词都遵守此规则；个别词和方言存在差异。'},
{id:'en-rhythm-1',language:'en',topic:'实词与功能词弱读',soundA:'强读：can /kæn/',soundB:'弱读：can /kən/',wordsA:['Yes, I CAN.'],wordsB:['I can SEE it.'],instruction:'练对比句：Yes, I CAN. / I can SEE it. 强调位置会影响功能词的弱读。',warning:'实际弱读形式、语速和强调因地区与上下文不同。'},
{id:'en-ending-1',language:'en',topic:'英语过去式 -ed 尾音',soundA:'/t/ 与 /d/',soundB:'/ɪd/',wordsA:['walked /t/','played /d/'],wordsB:['wanted /ɪd/','needed /ɪd/'],instruction:'先判断动词词尾原音的清浊；以 /t/ 或 /d/ 结尾时通常增加一个音节 /ɪd/。',warning:'拼写 -ed 并不总是读作单独的 “ed”。'},
{id:'fr-nasal-1',language:'fr',topic:'法语鼻化元音 /ɑ̃/–/ɔ̃/',soundA:'/ɑ̃/',soundB:'/ɔ̃/',wordsA:['sans','blanc','temps'],wordsB:['son','bon','nom'],instruction:'先对照 sans /sɑ̃/ 和 son /sɔ̃/；注意舌位与口腔开度，鼻化并非在词尾另加一个 n 音。',warning:'不要把所有 an/en/on 简单对应固定音值；法语口音与词形可能影响实现。'},
{id:'fr-nasal-2',language:'fr',topic:'法语鼻化 /ɛ̃/ 与口腔元音',soundA:'/ɛ̃/',soundB:'/ɛ/',wordsA:['pain','vin','main'],wordsB:['paix','vais','mais'],instruction:'对照 pain /pɛ̃/ 与 paix /pɛ/；从听辨开始，再练短句 Je prends du pain。',warning:'不同地区法语鼻化系统有差别；不能凭语音转写文字判定鼻化正确。'},
{id:'fr-rounded-1',language:'fr',topic:'法语 /u/–/y/ 圆唇元音',soundA:'/u/',soundB:'/y/',wordsA:['vous','tout','roue'],wordsB:['vu','tu','rue'],instruction:'先发 /i/ 并保持舌位，把双唇收圆形成 /y/。对照 vous/vu、tout/tu、roue/rue。',warning:'/y/ 并不是英语字母 y 的常规读音。'},
{id:'fr-rounded-2',language:'fr',topic:'法语 /ø/–/œ/',soundA:'/ø/',soundB:'/œ/',wordsA:['peu','deux','feu'],wordsB:['peur','neuf','sœur'],instruction:'练 peu/peur、deux/heureux 中的圆唇前元音，观察闭口与开口差异。',warning:'所选词不是全部构成严格最小对立，应结合标准音频听辨。'},
{id:'fr-uvular-1',language:'fr',topic:'法语 /ʁ/ 与英语 r 的区别',soundA:'法语 /ʁ/',soundB:'英语 /ɹ/',wordsA:['rue','Paris','rouge'],wordsB:['red','around','right'],instruction:'听辨法语 rue 和英语 red，尝试轻微的小舌/喉部摩擦，避免用力过大。',warning:'法语 r 的具体变体广泛；不要只接受一种口音或过度用力。'},
{id:'fr-liaison-1',language:'fr',topic:'法语联诵 liaison',soundA:'les amis /lezami/',soundB:'les livres /le livʁ/',wordsA:['les amis','vous avez','un ami'],wordsB:['les livres','vous partez','un livre'],instruction:'对照 les amis 与 les livres，关注词间原本不发出的辅音在元音前如何出现。',warning:'联诵有必选、可选、禁止等语法条件，不能一律强行连读。'},
{id:'fr-schwa-1',language:'fr',topic:'法语 e caduc（弱化 e）',soundA:'je /ʒə/',soundB:'j’ /ʒ/',wordsA:['je parle','le petit'],wordsB:["j'aime","l'ami"],instruction:'练 je parle 与 j’aime，观察省音是书写规则还是语流中可选的弱读；先按标准句训练。',warning:'e caduc 的发音省略高度依赖地区、语速与词组环境。'},
{id:'fr-question-1',language:'fr',topic:'语调与疑问句',soundA:'Tu viens.',soundB:'Tu viens ?',wordsA:['Tu viens.','Il part.'],wordsB:['Tu viens ?','Il part ?'],instruction:'在相同词句上分别朗读陈述和疑问，注意末尾语调及说话意图。',warning:'法语疑问句不只有升调一种形式；语法结构和焦点同样重要。'}
];
export const soundLessonsFor=(language:'en'|'fr')=>SOUND_CONTRASTS.filter(item=>item.language===language);
export function checkSoundLessons():string[]{
 const err:string[]=[],seen=new Set<string>();
 for(const s of SOUND_CONTRASTS){
  if(seen.has(s.id))err.push('duplicate '+s.id);seen.add(s.id);
  if(!s.topic||!s.soundA||!s.soundB||s.wordsA.length<2||s.wordsB.length<2||!s.instruction||!s.warning)err.push('missing '+s.id);
 }
 if(soundLessonsFor('en').length!==8||soundLessonsFor('fr').length!==8)err.push('expected 8 per language');
 return err;
}
