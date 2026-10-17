export type FoundationLanguage='en'|'fr';
export type FoundationQuestion={
  prompt:string;choices:[string,string,string];answer:0|1|2;explanation:string;
};
export type FoundationUnit={
  id:string;language:FoundationLanguage;level:string;phase:0|1|2|3|4|5;
  title:string;goal:string;concepts:[string,string,string];examples:[string,string,string];
  vocab:[string,string][];listening:string;reading:string;
  questions:[FoundationQuestion,FoundationQuestion];production:string;
  pronunciation:string;commonMistake:string;
};
export type FoundationRecord={lesson_id:string;answers:Record<string,number>;notes:string;completed:boolean;updated_at:string};
