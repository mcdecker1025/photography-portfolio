import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const photoSchema = z.object({
  image: z.string(),
  alt: z.string(),
  caption: z.string(),
  favorite: z.boolean().default(false),
  orientation: z.enum(['landscape', 'portrait', 'square']).optional(),
});

const trips = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/trips' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    location: z.string(),
    dateStart: z.string(),
    dateEnd: z.string(),
    summary: z.string(),
    story: z.string(),
    coverImage: z.string(),
    heroImage: z.string(),
    photos: z.array(photoSchema).default([]),
  }),
});

export const collections = { trips };
