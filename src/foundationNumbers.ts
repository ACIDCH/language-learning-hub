/** Authored beginner cardinal numbers: canonical written forms, not an AI translation.
 * Traditional French vingt et un is used; 1990 hyphenation is accepted in text review.
 */
export type Cardinal={value:number;text:string};
const EN=[
 'zero','one','two','three','four','five','six','seven','eight','nine','ten',
 'eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen',
 'eighteen','nineteen','twenty','twenty-one','twenty-two','twenty-three',
 'twenty-four','twenty-five','twenty-six','twenty-seven','twenty-eight',
 'twenty-nine','thirty'
];
const FR=[
 'zéro','un','deux','trois','quatre','cinq','six','sept','huit','neuf','dix',
 'onze','douze','treize','quatorze','quinze','seize','dix-sept','dix-huit',
 'dix-neuf','vingt','vingt et un','vingt-deux','vingt-trois','vingt-quatre',
 'vingt-cinq','vingt-six','vingt-sept','vingt-huit','vingt-neuf','trente'
];
export const ENGLISH_CARDINALS:Cardinal[]=EN.map((text,value)=>({text,value}));
export const FRENCH_CARDINALS:Cardinal[]=FR.map((text,value)=>({text,value}));
export function foundationCardinals(language:'en'|'fr'):Cardinal[]{
 return language==='fr'?FRENCH_CARDINALS:ENGLISH_CARDINALS;
}
