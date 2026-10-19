import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'posts'>;

/** Posts publicados (rascunhos só aparecem no `npm run dev`), do mais novo ao mais antigo. */
export async function getPublishedPosts(): Promise<Post[]> {
  const posts = await getCollection('posts', ({ data }) => import.meta.env.DEV || !data.draft);
  return posts.sort((a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf());
}

export const postPath = (post: Post) => `/blog/${post.id}/`;

export function readingMinutes(post: Post): number {
  const words = (post.body ?? '').replace(/<[^>]+>|[#*_>`\[\]()!-]/g, ' ').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

const fmt = new Intl.DateTimeFormat('pt-BR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
export const formatDate = (d: Date) => fmt.format(d);
export const isoDate = (d: Date) => d.toISOString().slice(0, 10);
