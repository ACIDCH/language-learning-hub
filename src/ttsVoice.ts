/** A preferred-language browser voice is required before we can claim that
 * device TTS is pronunciation-suitable. Browser voices are device-specific.
 */
export function selectDeviceVoice(voices:readonly SpeechSynthesisVoice[],language:'en'|'fr'):SpeechSynthesisVoice|null{
 const family=language+'-';
 const requested=language==='fr'?'fr-fr':'en-gb';
 const candidates=voices.filter(v=>typeof v?.lang==='string'&&
  (v.lang.toLowerCase()===language||v.lang.toLowerCase().startsWith(family)));
 return candidates.find(v=>v.lang.toLowerCase()===requested)||
  candidates.find(v=>v.localService)||
  candidates[0]||null;
}
