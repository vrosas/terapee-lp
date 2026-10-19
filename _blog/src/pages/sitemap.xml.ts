// Sitemap do blog em /blog/sitemap.xml (listado no /sitemap-index.xml da raiz).
import { getPublishedPosts, postPath, isoDate } from '../lib/posts';
import { CATEGORIES } from '../data/categories';

const site = 'https://www.terapee.com.br';

export async function GET() {
  const posts = (await getPublishedPosts()).filter((p) => !p.data.draft);
  const latest = posts[0] ? isoDate(posts[0].data.updatedAt ?? posts[0].data.publishedAt) : undefined;
  const urls: { loc: string; lastmod?: string }[] = [
    { loc: `${site}/blog/`, lastmod: latest },
    ...CATEGORIES.filter((c) => posts.some((p) => p.data.category === c.slug)).map((c) => ({ loc: `${site}/blog/categoria/${c.slug}/` })),
    ...posts.map((p) => ({ loc: site + postPath(p), lastmod: isoDate(p.data.updatedAt ?? p.data.publishedAt) })),
  ];
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u.loc}</loc>${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ''}</url>`).join('\n')}
</urlset>
`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
