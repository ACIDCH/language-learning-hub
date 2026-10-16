import { defineConfig } from 'vite';

export default defineConfig({
  base: '/language-learning-hub/',
  build: {
    outDir: 'dist',
    sourcemap: false,
    assetsDir: 'assets',
  },
});
