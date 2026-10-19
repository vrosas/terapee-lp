// Painel de edição do blog (Keystatic), só para uso local: `npm run cms`
// e abra http://localhost:4322/keystatic. Os posts salvos aqui são os mesmos
// arquivos que o blog publica (_blog/src/content/posts/).
//
// Fica separado do astro.config.mjs porque o Keystatic só funciona na raiz
// (/keystatic), e o blog roda com base /blog.
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';
import node from '@astrojs/node';

export default defineConfig({
  srcDir: './_blog/cms',
  publicDir: './_blog/cms/public',
  outDir: './.astro/cms-dist',
  adapter: node({ mode: 'standalone' }),
  integrations: [react(), keystatic()],
  server: { port: 4322 },
});
