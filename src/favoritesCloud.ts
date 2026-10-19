/** Merge old local-only favorites with account-owned Supabase rows without losing either source. */
export type FavoriteSelection={courseId:string;text:string;id?:string};
export const favoritesLocalKey=(uid:string)=>'llh-v44-favorites:'+uid;
export function safeFavorites(raw:unknown):FavoriteSelection[]{
 if(!Array.isArray(raw))return [];
 const out:FavoriteSelection[]=[];
 for(const row of raw.slice(0,600)){
  if(!row||typeof row!=='object')continue;
  const v=row as Record<string,unknown>;
  if(typeof v.courseId!=='string'||v.courseId.length>100||v.courseId.length<3||
     typeof v.text!=='string'||v.text.length>2000||v.text.length<1)continue;
  const item:FavoriteSelection={courseId:v.courseId,text:v.text};
  if(typeof v.id==='string'&&/^[a-f0-9-]{36}$/i.test(v.id))item.id=v.id;
  if(!out.some(x=>x.courseId===item.courseId&&x.text===item.text))out.push(item);
 }
 return out;
}
export function mergeFavorites(local:FavoriteSelection[],remote:FavoriteSelection[]):FavoriteSelection[]{
 const result=[...remote];
 for(const item of local){
  if(!result.some(x=>x.courseId===item.courseId&&x.text===item.text))result.push(item);
 }
 return result;
}
export function readLocalFavorites(uid:string):FavoriteSelection[]{
 try{return safeFavorites(JSON.parse(localStorage.getItem(favoritesLocalKey(uid))||'[]'));}
 catch{return [];}
}
export function saveLocalFavorites(uid:string,items:FavoriteSelection[]):void{
 try{localStorage.setItem(favoritesLocalKey(uid),JSON.stringify(safeFavorites(items).map(({courseId,text})=>({courseId,text}))));}
 catch{/* Browser storage may be disabled. */}
}
