import { defineConfig } from 'vite';

export default defineConfig({
  // Cloudflare Pages sites are deployed at the root. Do not hardcode the
  // former GitHub Pages /language-learning-hub/ project subpath.
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
