import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './content/posts' }),
  schema: z.object({
    title: z.string(),
    pubDate: z.coerce.date(),
    description: z.string(),
    author: z.string().default('Lucas'),
    excerpt: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    distributed: z
      .object({
        medium: z.boolean().default(false),
        substack: z.boolean().default(false),
        linkedin: z.boolean().default(false),
      })
      .default({
        medium: false,
        substack: false,
        linkedin: false,
      }),
  }),
});

export const collections = { posts };
