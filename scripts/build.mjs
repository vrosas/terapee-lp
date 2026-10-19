// Build usado pela Vercel (ver vercel.json).
// 1) Copia o site estático da raiz para dist/, sem mudar nada.
// 2) Gera o blog com o Astro em dist/blog/.
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const dist = path.join(root, 'dist');

// O que NÃO vai para o site publicado.
const SKIP = new Set([
  '.git', '.github', '.vercel', '.astro', '.vscode', 'node_modules', 'dist', '_blog', 'scripts',
  'package.json', 'package-lock.json', 'astro.config.mjs', 'cms.config.mjs', 'keystatic.config.ts', 'tsconfig.json',
  'vercel.json', '.gitignore', 'README.md', 'CLAUDE.md', 'blog',
]);

fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(dist, { recursive: true });
for (const name of fs.readdirSync(root)) {
  if (SKIP.has(name) || name.startsWith('.')) continue;
  fs.cpSync(path.join(root, name), path.join(dist, name), { recursive: true });
}
console.log('✓ site estático copiado para dist/');

execSync('npx astro build', { cwd: root, stdio: 'inherit' });
console.log('✓ blog gerado em dist/blog/');
