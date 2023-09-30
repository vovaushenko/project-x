import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  build: {
    outDir: './dist',
    rollupOptions: {
      external: [],
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
  },
});
