import test from 'node:test';
import assert from 'node:assert/strict';
import createEphone, {en_all,roa} from 'ephone';

test('actual pinned eSpeak WASM yields IPA for US English, GB English and French',async()=>{
 const engine=await createEphone([en_all,roa]);
 const outputs=[];
 for(const [locale,example] of [['en-US','Hello world'],['en-GB-x-rp','Hello world'],['fr','Bonjour, je suis étudiant.']]){
  engine.setVoice(locale);
  const result=engine.textToIpaWithSourceMap(example);
  assert.ok(typeof result.ipa==='string'&&result.ipa.trim(),locale+' produced no IPA');
  assert.ok(typeof result.asSpans==='function',locale+' missing source mapping');
  const spans=result.asSpans();
  assert.ok(Array.isArray(spans)&&spans.length>0,locale+' source map empty');
  outputs.push({locale,example,ipa:result.ipa,spans:spans.length});
 }
 // One entire bilingual text should not initialize a second server/model.
 assert.equal(outputs.length,3);
 console.log('Browser phonemizer language pack smoke:',JSON.stringify(outputs));
});
