import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dynamicImport from 'vite-plugin-dynamic-import';
// import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
// import inject from '@rollup/plugin-inject';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), dynamicImport(/* options */)],
  // base: './',
  optimizeDeps: {
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: 'globalThis',
      },
    },
  },
});
