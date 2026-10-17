/** Minimal public types for @piper-plus/g2p 0.4.2.
 * Upstream provides types/ but its package exports map omits a types condition,
 * so TypeScript bundler resolution cannot discover them automatically.
 */
declare module '@piper-plus/g2p' {
  export type G2PLanguage='en'|'fr'|'ja'|'zh'|'ko'|'es'|'pt'|'sv';
  export type G2PResult={tokens:string[];prosody:(unknown|null)[];language:G2PLanguage};
  export class G2P {
    static create(options?:{languages?:G2PLanguage[]}):Promise<G2P>;
    phonemize(text:string,options?:{language?:G2PLanguage}):G2PResult;
  }
}
