// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['fake-indexeddb/auto'],
  },
  define: {
    global: 'window',
    'process.env.NODE_ENV': JSON.stringify('production'),
  },
});
