import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      fileName: 'index',
      entry: 'src/index.ts',
      formats: ['cjs'],
    },
    rollupOptions: {},
  },
});
