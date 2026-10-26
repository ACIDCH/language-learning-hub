import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
for (const name of ['confirmation','recovery']) {
 test(name+' email template keeps Supabase email verification placeholders',()=>{
  const s=readFileSync('docs/auth_templates/'+name+'.html','utf8');
  assert.ok(s.includes('{{ .ConfirmationURL }}'));
  assert.ok(s.includes('{{ .Token }}'));
  assert.doesNotMatch(s,/token_hash=sk-|sb_secret_|service_role/);
  assert.doesNotMatch(s,/https?:\/\/[a-z]+\.example\.com\/auth\/verify/);
 });
}
