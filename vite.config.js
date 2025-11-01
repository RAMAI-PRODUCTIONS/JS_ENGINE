import { defineConfig } from 'vite';

export default defineConfig({
  base: process.env.BASE_URL || '/',
  build: {
    target: 'esnext',
    minify: 'esbuild',
    sourcemap: false,
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks: undefined,
        format: 'es'
      },
    },
  },
  server: {
    open: true,
  },
  optimizeDeps: {
    include: ['three']
  }
});

