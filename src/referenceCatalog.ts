/** Verified source-family routing. Never imply exact lesson/audio alignment. */
export type ReferenceSource='fi-phonetics'|'fi-vocabulary'|'inspire-a1'|'unclassified';
export type ReferenceRecord={
 asset_id:string;filename:string;source_kind:string;course_id:string|null;
 duration_seconds:number;decoded:boolean;audio_verified:boolean;sha256:string;
};
export function identifyReference(item:Pick<ReferenceRecord,'asset_id'|'source_kind'>):ReferenceSource{
 if(item.source_kind!=='open_reference')return 'unclassified';
 if(/^pho_\d\d\.zip\//.test(item.asset_id))return 'fi-phonetics';
 if(/^voc_\d\d\.zip\//.test(item.asset_id))return 'fi-vocabulary';
 if(/^Inspire-A1-/.test(item.asset_id))return 'inspire-a1';
 return 'unclassified';
}
export const REFERENCES={
 'fi-phonetics':{title:'Français interactif · 语音',rights:'旧版 COERLL / UT Austin CC BY 3.0，注意个别嵌入素材的例外',url:'https://laits.utexas.edu/fi/page/adopt/'},
 'fi-vocabulary':{title:'Français interactif · 词汇',rights:'旧版 COERLL / UT Austin CC BY 3.0，注意个别嵌入素材的例外',url:'https://laits.utexas.edu/fi/page/adopt/'},
 'inspire-a1':{title:'Inspire 1 A1 官方配套',rights:'商业版权资源；仅私人学习，暂不在本站重托管',url:'https://inspire.hachettefle.fr/inspire-1_livre-de-l-eleve_fr.html'},
 'unclassified':{title:'未归类资源',rights:'暂不开放音频播放或下载',url:''}
} as const;
export function referenceCounts(items:ReferenceRecord[]){
 const counts:Record<ReferenceSource,number>={'fi-phonetics':0,'fi-vocabulary':0,'inspire-a1':0,'unclassified':0};
 for(const item of items)counts[identifyReference(item)]++;
 return counts;
}

export function uniqueMediaHashes(items:ReferenceRecord[]):number {
 return new Set(items.map(item=>item.sha256).filter(Boolean)).size;
}
