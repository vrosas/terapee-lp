// Painel para escrever posts: rode `npm run cms` e abra http://localhost:4322/keystatic
// Os posts são salvos como arquivos .mdx em _blog/src/content/posts/. Depois é só
// fazer commit e push (ou abrir um PR) que a Vercel publica.
import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: { kind: 'local' },
  ui: { brand: { name: 'Blog Terapee' } },
  collections: {
    posts: collection({
      label: 'Posts',
      slugField: 'title',
      path: '_blog/src/content/posts/*',
      format: { contentField: 'content' },
      entryLayout: 'content',
      columns: ['title', 'publishedAt'],
      schema: {
        title: fields.slug({
          name: { label: 'Título', validation: { length: { min: 10, max: 110 } } },
          slug: { label: 'Endereço (slug)', description: 'Fica em terapee.com.br/blog/<slug>. Não mude depois de publicar.' },
        }),
        description: fields.text({
          label: 'Descrição',
          description: 'Resumo para o Google e para o card do post. Ideal: 120 a 160 caracteres.',
          multiline: true,
          validation: { length: { min: 50, max: 200 } },
        }),
        category: fields.select({
          label: 'Categoria',
          options: [
            { label: 'Gestão de clínicas', value: 'gestao' },
            { label: 'Agenda', value: 'agenda' },
            { label: 'Financeiro', value: 'financeiro' },
            { label: 'Prontuário', value: 'prontuario' },
            { label: 'Teleconsulta', value: 'teleconsulta' },
          ],
          defaultValue: 'gestao',
        }),
        tags: fields.array(fields.text({ label: 'Tag' }), {
          label: 'Tags',
          itemLabel: (props) => props.value,
        }),
        author: fields.select({
          label: 'Autor',
          options: [
            { label: 'Equipe Terapee', value: 'equipe-terapee' },
            { label: 'Vitor Rosas', value: 'vitor' },
          ],
          defaultValue: 'equipe-terapee',
        }),
        publishedAt: fields.date({ label: 'Publicado em', defaultValue: { kind: 'today' }, validation: { isRequired: true } }),
        updatedAt: fields.date({ label: 'Atualizado em', description: 'Preencha quando revisar o conteúdo de um post antigo.' }),
        cover: fields.image({
          label: 'Imagem de capa',
          description: 'Também vira a imagem de compartilhamento. Ideal: 1200 × 630.',
          directory: '_blog/src/assets/posts',
          publicPath: '../../assets/posts/',
        }),
        coverAlt: fields.text({ label: 'Texto alternativo da capa' }),
        seoTitle: fields.text({ label: 'Título para o Google (opcional)', description: 'Use se quiser um título diferente do H1. Até ~60 caracteres.' }),
        draft: fields.checkbox({ label: 'Rascunho', description: 'Rascunhos não são publicados.', defaultValue: true }),
        content: fields.mdx({
          label: 'Conteúdo',
          options: { image: { directory: '_blog/src/assets/posts', publicPath: '../../assets/posts/' } },
          components: {},
        }),
      },
    }),
  },
});
