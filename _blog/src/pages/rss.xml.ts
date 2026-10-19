import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPublishedPosts, postPath } from '../lib/posts';
import { categoryBySlug } from '../data/categories';

export async function GET(context: APIContext) {
  const posts = (await getPublishedPosts()).filter((p) => !p.data.draft);
  return rss({
    title: 'Blog da Terapee',
    description: 'Gestão, financeiro, agenda, prontuário e teleconsulta para clínicas de terapia.',
    site: context.site!,
    items: posts.map((p) => ({
      title: p.data.title,
      description: p.data.description,
      pubDate: p.data.publishedAt,
      link: postPath(p),
      categories: [categoryBySlug(p.data.category)?.name ?? p.data.category, ...p.data.tags],
    })),
    customData: '<language>pt-br</language>',
  });
}
