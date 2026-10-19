# Blog da Terapee

Publicado em **www.terapee.com.br/blog**, feito com [Astro](https://astro.build). O resto do
site continua sendo HTML estático na raiz do repositório; só o blog passa por build.

## Escrever um post

**Pelo painel (recomendado)**

```bash
npm install        # só na primeira vez
npm run cms        # abra http://localhost:4322/keystatic
```

Crie o post em **Posts → Create**. Ele nasce como rascunho: desmarque **Rascunho**
quando estiver pronto. O painel salva um arquivo `.mdx` em `_blog/src/content/posts/`
(e imagens em `_blog/src/assets/posts/`). Faça commit e push: a Vercel publica sozinha.

**Direto no arquivo**

Copie `_blog/src/content/posts/modelo-de-post.mdx`, renomeie (o nome do arquivo vira o
endereço do post) e edite. Campos do topo:

| Campo | Obrigatório | Observação |
| --- | --- | --- |
| `title` | sim | Título do post (H1) |
| `description` | sim | Resumo para o Google e os cards; 120 a 160 caracteres |
| `category` | sim | `gestao`, `agenda`, `financeiro`, `prontuario` ou `teleconsulta` |
| `publishedAt` | sim | `2026-10-19` |
| `updatedAt` | não | Data da última revisão relevante |
| `tags` | não | Lista de tags |
| `author` | não | `equipe-terapee` (padrão) ou `vitor` |
| `cover` / `coverAlt` | não | Capa e texto alternativo; ideal 1200 × 630 |
| `seoTitle` | não | Título diferente para o Google |
| `draft` | não | `true` não publica |

## Ver o blog localmente

```bash
npm run dev        # http://localhost:4321/blog/ (mostra rascunhos)
npm run preview    # build completo do site + blog em http://localhost:4321
```

## Como funciona

- `astro.config.mjs`: blog com base `/blog`, código em `_blog/src`, saída em `dist/blog`.
- `scripts/build.mjs`: copia o site estático para `dist/` e roda o build do Astro. A Vercel
  publica `dist/` (ver `vercel.json`).
- `cms.config.mjs` + `keystatic.config.ts`: painel de edição, só local.
- Topo e rodapé do blog são cópias dos do site (`_blog/src/components/SiteHeader.astro` e
  `SiteFooter.astro`). Ao mudar o menu ou o rodapé do site, mude lá também.
- Para criar uma categoria: `_blog/src/data/categories.ts` e `keystatic.config.ts`.
- Cada post já sai com canonical, Open Graph, schema `BlogPosting` e `BreadcrumbList`,
  índice lateral, posts relacionados e CTA de teste grátis com UTM. RSS em `/blog/rss.xml`
  e sitemap em `/blog/sitemap.xml` (listado no `/sitemap-index.xml`).
- Enquanto não houver post publicado, a página do blog e as categorias vazias ficam com
  `noindex`.
