import { defineConfig } from 'vite';

export default defineConfig({
  base: '/language-learning-hub/',
  server: { host: '127.0.0.1', port: 5173, strictPort: true, proxy: { '/api': 'http://127.0.0.1:8765' } },
  build: {
    outDir: 'dist',
    sourcemap: false,
    assetsDir: 'assets',
  },
});
