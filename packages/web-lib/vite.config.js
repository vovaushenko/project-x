// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  test: {
    environment: 'jsdom',
  },
  define: {
    global: 'window',
    'process.env.NODE_ENV': JSON.stringify('production'),
  },
});
