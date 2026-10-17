import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';

const cfg=readFileSync(resolve('src/cloudPublicDefaults.ts'),'utf8');
const cloud=readFileSync(resolve('src/CloudWorkspace.tsx'),'utf8');

test('public client configuration is explicit and uses public-only credentials',()=>{
  assert.match(cfg,/https:\/\/szukmwvyyvjajdjoltzy\.supabase\.co/);
  assert.match(cfg,/sb_publishable_[A-Za-z0-9_]+/);
  assert.match(cfg,/https:\/\/language-hub-api\.xilu329\.workers\.dev/);
  assert.doesNotMatch(cfg,/eyJhbGci|sb_secret_|service_role\s*[:=]/);
  assert.doesNotMatch(cfg,/private[_-]?key\s*[:=]/i);
});
test('Cloudflare environment overrides continue to work',()=>{
  assert.match(cloud,/VITE_SUPABASE_URL\?\.trim\(\) \|\| cloudPublicDefaults\.supabaseUrl/);
  assert.match(cloud,/VITE_SUPABASE_PUBLISHABLE_KEY\?\.trim\(\) \|\| cloudPublicDefaults\.supabasePublishableKey/);
  assert.match(cloud,/VITE_WORKER_API_URL\?\.trim\(\) \|\| cloudPublicDefaults\.workerApiUrl/);
});
test('cloud progress still routes to authenticated Worker endpoints',()=>{
  assert.match(cloud,/Authorization: 'Bearer ' \+ token/);
  assert.match(cloud,/auth\.signInWithPassword/);
  assert.match(cloud,/\/v1\/progress\//);
});
