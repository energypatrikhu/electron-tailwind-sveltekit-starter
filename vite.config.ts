import { resolve } from 'path';
import { UserConfig } from 'vite';

import { sveltekit } from '@sveltejs/kit/vite';

const config: UserConfig = {
  plugins: [sveltekit()],
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        ecma: 2020,
      },
      safari10: true,
      ecma: 2020,
      format: {
        ecma: 2020,
      },
    },
    chunkSizeWarningLimit: 100000,
  },
  resolve: {
    alias: {
      $components: resolve('./src/components'),
      $stores: resolve('./src/stores'),
      $types: resolve('./src/types'),
      $libs: resolve('./src/libs'),
      $css: resolve('./src/css'),
      $static: resolve('./static'),
    },
  },
};

export default config;
