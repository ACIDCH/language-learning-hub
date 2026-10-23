/** Exact, reviewed errata projected onto the learner view. Original manuscripts stay intact.
 * Provenance: docs/editorial/a1-qa-v14/README.md records the same private-copy corrections.
 * Each entry is intentionally literal: do not apply broad grammar substitutions to user text. */
export const SOURCE_ERRATA=[
 {id:'fr-a1-u03-parents-vowel',from:'/ɑ̃/ dans "parents" 的第一个元音；',to:'/ɑ̃/ 在 parents /paʁɑ̃/ 的第二个音节；第一个元音是口腔元音 /a/。'},
 {id:'fr-a1-u03-negation-blank',from:"6. Je ne ___ pas de frère. n'ai（完整句 Je n'ai pas de frère）。",to:"6. Je ___ pas de frère. 答案：n'ai（完整句 Je n'ai pas de frère）。"},
 {id:'fr-a1-u03-dans-vowel',from:'/ɛ̃/ dans, /ɔ̃/ mon 的鼻化元音对比（注意 dans 实际常见为 /dɑ̃/；因此训练目标应调整为单词 pain /pɛ̃/ 与 mon /mɔ̃/）',to:'鼻化元音对比：dans /dɑ̃/、mon /mɔ̃/ 与 pain /pɛ̃/；dans 的元音是 /ɑ̃/，不是 /ɛ̃/'},
] as const;
export function projectSourceErrata(text:string){
 return SOURCE_ERRATA.reduce((result,e)=>result.replaceAll(e.from,e.to),text);
}
