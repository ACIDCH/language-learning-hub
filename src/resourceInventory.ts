/** Inventory helpers for already-authenticated user-owned source records. */
const A1_AUDIO=/^fr-a1-u(0[1-9]|1[0-2])-(dialogue|reading)\.mp3$/;
export function audioNames(files:readonly string[]):Set<string>{
 return new Set(files.filter(name=>A1_AUDIO.test(name)));
}
export function countKnownCourses(stored:readonly string[],catalog:readonly string[]):number{
 const known=new Set(catalog);
 return new Set(stored.filter(id=>known.has(id))).size;
}
