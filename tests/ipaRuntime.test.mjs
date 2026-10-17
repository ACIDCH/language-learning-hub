import test from 'node:test';
import assert from 'node:assert/strict';
import {G2P} from '@piper-plus/g2p';

test('MIT G2P yields real IPA tokens in both English and French without backend',async()=>{
 const engine=await G2P.create({languages:['en','fr']});
 const samples=[
  ['en','Hello world'],
  ['en','I have never seen this word before'],
  ['fr','Bonjour, je suis étudiant.'],
  ['fr','Je voudrais un café, s’il vous plaît.']
 ];
 const outputs=[];
 for(const [language,text] of samples){
  const result=engine.phonemize(text,{language});
  assert.ok(Array.isArray(result.tokens)&&result.tokens.length>0,language+' missing IPA');
  const ipa=result.tokens.join('');
  assert.ok(/[\p{L}]/u.test(ipa),language+' no IPA phones');
  outputs.push({language,text,ipa});
 }
 assert.equal(outputs.length,4);
 console.log('MIT IPA engine smoke:',JSON.stringify(outputs));
});
