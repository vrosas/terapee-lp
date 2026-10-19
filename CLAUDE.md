# terapee-lp

Site institucional da Terapee (www.terapee.com.br). As páginas são HTML estático na
raiz; o blog (`/blog`) é Astro, em `_blog/`. Detalhes técnicos em `_blog/README.md`.

## Padrão para novos posts do blog

Todo post novo segue o mesmo processo dos 5 primeiros (PR #34):

1. **Pesquisa antes de escrever.** Regras de conselhos (CFP, CFFa, COFFITO), Receita
   Federal, NFS-e, LGPD e afins são conferidas em fontes oficiais ou confiáveis na data
   da escrita. Nada de número ou regra de memória. Leis e resoluções citadas pelo número.
2. **Fatos sobre a Terapee só do que o site já diz** (páginas em `funcionalidades/` e
   `llms.txt`). Funcionalidade planejada não entra como existente.
3. **Texto**: português do Brasil, direto, para dono de clínica ou terapeuta. Estrutura
   com H2 (viram o índice lateral), exemplos numéricos quando ajudam, tabela ou checklist
   quando cabem, links internos para páginas de funcionalidade e para outros posts.
   Posts com regra fiscal, legal ou de conselho terminam com aviso de que o conteúdo é
   informativo e com a lista de fontes.
4. **Capa ilustrada**, 1200 × 630, no estilo das ilustrações das páginas de
   funcionalidades (cards de interface, fundo claro em grade, selos flutuantes), feita
   em `_blog/covers/covers.html` e gerada com `_blog/covers/render.py` para
   `_blog/src/assets/posts/<slug>.png`. Sem fotos de banco de imagens. Sempre com
   `coverAlt`.
5. **Frontmatter completo**: `title`, `seoTitle` (até ~60 caracteres), `description`
   (120 a 160), `category`, `tags`, `cover`, `coverAlt`, `publishedAt`, `draft: true`.
6. **Entrega como rascunho em PR.** O preview da Vercel mostra rascunhos, então o link
   do PR serve para revisão. Antes de abrir o PR: `npm run build` sem erro e conferência
   visual da listagem e do post (desktop e celular).
