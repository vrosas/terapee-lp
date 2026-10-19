import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { CATEGORY_SLUGS, AUTHORS } from './data/categories';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './_blog/src/content/posts' }),
  schema: ({ image }) =>
    z.object({
      title: z.string().max(110),
      // Aparece no Google e no card do post. Ideal: 120 a 160 caracteres.
      description: z.string().max(200),
      publishedAt: z.coerce.date(),
      updatedAt: z.coerce.date().optional(),
      category: z.enum(CATEGORY_SLUGS),
      tags: z.array(z.string()).default([]),
      author: z.enum(Object.keys(AUTHORS) as [string, ...string[]]).default('equipe-terapee'),
      cover: image().optional(),
      coverAlt: z.string().optional(),
      // Título só para o Google, se quiser diferente do H1.
      seoTitle: z.string().optional(),
      draft: z.boolean().default(false),
    }),
});

export const collections = { posts };
