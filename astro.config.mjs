import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  output: 'static',
  site: 'https://afterlive.net',
  integrations: [sitemap()],
  build: {
    assets: '_assets',
  },
  vite: {
    build: {
      assetsInlineLimit: 0,
    },
  },
});
