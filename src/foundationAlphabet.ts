/** Letter-name reference for first English and French foundation units.
 * Letter names are not fixed letter-to-phoneme mappings inside words.
 * IPA is a pedagogical reference (General American EN, common metropolitan FR),
 * not a calibrated pronunciation benchmark.
 */
export type LetterEntry={letter:string;name:string;ipa:string;example:string};
export type DiacriticEntry={symbol:string;example:string;explanation:string};
export const ENGLISH_LETTERS:LetterEntry[]=[
 ['A','A','/eɪ/','apple'],['B','B','/biː/','book'],['C','C','/siː/','city'],
 ['D','D','/diː/','day'],['E','E','/iː/','egg'],['F','F','/ɛf/','fish'],
 ['G','G','/dʒiː/','green'],['H','H','/eɪtʃ/','house'],['I','I','/aɪ/','ink'],
 ['J','J','/dʒeɪ/','job'],['K','K','/keɪ/','kite'],['L','L','/ɛl/','light'],
 ['M','M','/ɛm/','map'],['N','N','/ɛn/','name'],['O','O','/oʊ/','orange'],
 ['P','P','/piː/','pen'],['Q','Q','/kjuː/','queen'],['R','R','/ɑɹ/','red'],
 ['S','S','/ɛs/','sun'],['T','T','/tiː/','tea'],['U','U','/juː/','umbrella'],
 ['V','V','/viː/','voice'],['W','W','/ˈdʌbəl.juː/','water'],
 ['X','X','/ɛks/','xylophone'],['Y','Y','/waɪ/','yes'],['Z','Z','/ziː/','zebra']
].map(([letter,name,ipa,example])=>({letter,name,ipa,example}));

export const FRENCH_LETTERS:LetterEntry[]=[
 ['A','a','/a/','ami'],['B','bé','/be/','bonjour'],['C','cé','/se/','café'],
 ['D','dé','/de/','demain'],['E','e','/ə/','école'],['F','effe','/ɛf/','français'],
 ['G','gé','/ʒe/','gare'],['H','ache','/aʃ/','hôtel'],['I','i','/i/','ici'],
 ['J','ji','/ʒi/','jardin'],['K','ka','/ka/','kilo'],['L','elle','/ɛl/','livre'],
 ['M','emme','/ɛm/','maison'],['N','enne','/ɛn/','nuit'],['O','o','/o/','orange'],
 ['P','pé','/pe/','pain'],['Q','cu','/ky/','qui'],['R','erre','/ɛʁ/','rue'],
 ['S','esse','/ɛs/','soleil'],['T','té','/te/','table'],['U','u','/y/','université'],
 ['V','vé','/ve/','vélo'],['W','double vé','/dubləve/','wagon'],
 ['X','ixe','/iks/','xylophone'],['Y','i grec','/iɡʁɛk/','yoga'],
 ['Z','zède','/zɛd/','zéro']
].map(([letter,name,ipa,example])=>({letter,name,ipa,example}));

export const FRENCH_DIACRITICS:DiacriticEntry[]=[
 {symbol:'é',example:'été',explanation:'accent aigu：常提示 /e/；不构成第 27 个字母。'},
 {symbol:'è',example:'père',explanation:'accent grave：在这个词中标记 /ɛ/。'},
 {symbol:'ê',example:'tête',explanation:'accent circonflexe：在这个词中为 /ɛ/；实际音值随词与地区变化。'},
 {symbol:'ë',example:'Noël',explanation:'tréma：常提示相邻元音分开读；不要直接把它当一个新音素。'},
 {symbol:'ç',example:'garçon',explanation:'cédille：在这个词中让 c 发 /s/，而不是 /k/。'},
 {symbol:'à',example:'à Paris',explanation:'accent grave：在介词 à 中主要区别拼写与词义，不自动产生新元音。'},
 {symbol:'ù',example:'où',explanation:'只用于少数词，如 où；与 ou 的拼写和意义不同。'},
 {symbol:'œ',example:'sœur',explanation:'字母连写（ligature），不是第 27 个字母；具体发音随词变化。'}
];
export function alphabetFor(language:'en'|'fr'):LetterEntry[]{
 return language==='fr'?FRENCH_LETTERS:ENGLISH_LETTERS;
}
