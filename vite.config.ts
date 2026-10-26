import { defineConfig,loadEnv } from 'vite';
import {assertDraftDeploymentAllowed} from './src/v44Publication';

export default defineConfig({
  // Cloudflare Pages sites are deployed at the root. Do not hardcode the
  // former GitHub Pages /language-learning-hub/ project subpath.
  plugins: [{name:'v44-owner-publication-gate',apply:'build',buildStart(){
    const env=loadEnv('production','.', ['CF_PAGES_BRANCH','LLH_DEPLOY_TARGET']);
    assertDraftDeploymentAllowed(env.CF_PAGES_BRANCH==='main'||env.LLH_DEPLOY_TARGET==='production'?'production':'preview');
  }}],
  base: '/',
  server: {
    host: '127.0.0.1',
    port: 5173,
    strictPort: true,
    proxy: { '/api': 'http://127.0.0.1:8765' }
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    assetsDir: 'assets',
    // Large private-workspace dependencies are lazy-loaded in public mode.
    cssCodeSplit: true
  }
});
