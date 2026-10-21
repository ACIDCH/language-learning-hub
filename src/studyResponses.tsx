import {createContext,useContext,useState} from 'react';
export type StudyResponses=Record<string,string>;
export const StudyResponseContext=createContext<{values:StudyResponses;change:(patch:StudyResponses)=>void;ready:boolean}|null>(null);
/** Existing course progress owns persistence; isolated lesson previews keep a local fallback. */
export function useStudyResponses(namespace:string){
 const context=useContext(StudyResponseContext);
 const [local,setLocal]=useState<StudyResponses>({});
 const values=context?.values??local;
 return {ready:context?.ready??true,
  get:(key:string)=>values[namespace+':'+key]||'',
  set:(key:string,value:string)=>{const patch={[namespace+':'+key]:value};if(context)context.change(patch);else setLocal(old=>({...old,...patch}));}};
}
