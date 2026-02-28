import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  site: 'https://afterlive.net',
  build: {
    assets: '_assets',
  },
  vite: {
    build: {
      assetsInlineLimit: 0,
    },
  },
});
