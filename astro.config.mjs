// Blog da Terapee (www.terapee.com.br/blog).
//
// O resto do site é HTML estático na raiz do repositório e continua sem build.
// Só o blog passa pelo Astro: o código fica em _blog/ e sai em dist/blog/.
// O scripts/build.mjs junta as duas coisas em dist/, que é o que a Vercel publica.
// O painel de edição (Keystatic) tem configuração própria: cms.config.mjs.
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = path.dirname(fileURLToPath(import.meta.url));
const isDev = process.argv.includes('dev');

// No dev, os arquivos estáticos da raiz (logo, fontes, /assets/visual.css,
// páginas do site) são servidos para o blog aparecer igual ao publicado.
const IGNORED = new Set(['_blog', 'node_modules', 'dist', 'scripts', '.git', '.astro']);
const TYPES = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.woff2': 'font/woff2', '.xml': 'application/xml', '.txt': 'text/plain' };
const devServerPlugin = {
  name: 'terapee-dev-server',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      // O Vite tira o /blog de req.url; o endereço original fica em originalUrl.
      const url = decodeURIComponent((req.originalUrl || req.url || '/').split('?')[0]);
      if (url.startsWith('/blog') || url.startsWith('/@') || url.startsWith('/node_modules')) return next();
      if (IGNORED.has(url.split('/')[1])) return next();
      let file = path.join(rootDir, url);
      if (!file.startsWith(rootDir)) return next();
      if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
      else if (!fs.existsSync(file) && fs.existsSync(file + '/index.html')) file = file + '/index.html';
      if (!fs.existsSync(file) || !fs.statSync(file).isFile() || !TYPES[path.extname(file)]) return next();
      res.setHeader('Content-Type', TYPES[path.extname(file)] || 'application/octet-stream');
      fs.createReadStream(file).pipe(res);
    });
  },
};

export default defineConfig({
  site: 'https://www.terapee.com.br',
  base: '/blog',
  trailingSlash: 'ignore',
  srcDir: './_blog/src',
  publicDir: './_blog/public',
  outDir: './dist/blog',
  build: { format: 'directory' },
  integrations: [mdx()],
  vite: { plugins: isDev ? [devServerPlugin] : [] },
});
