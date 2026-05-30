import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const photoSchema = z.object({
  image: z.string(),
  title: z.string().optional(),
  location: z.string().optional(),
  description: z.string().optional(),
  alt: z.string().optional(),
  caption: z.string().optional(),
  favorite: z.boolean().default(false),
  orientation: z.enum(['landscape', 'portrait', 'square']).optional(),
});

const imageListSchema = z.preprocess((value) => {
  if (value === undefined || value === null || value === '') return [];
  if (Array.isArray(value)) return value;
  if (typeof value === 'string') return [value];
  return value;
}, z.array(z.string()).default([]));

const paragraphListSchema = z.preprocess((value) => {
  if (value === undefined || value === null || value === '') return [];
  if (!Array.isArray(value)) return value;

  return value.map((item) => {
    if (typeof item === 'string') return item;
    if (item && typeof item === 'object' && 'paragraph' in item) return item.paragraph;
    return item;
  });
}, z.array(z.string()).default([]));

const galleries = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/galleries' }),
  schema: z.object({
    title: z.string(),
    slug: z.string().optional(),
    summary: z.string(),
    description: z.string().optional(),
    coverImage: z.string(),
    heroImage: z.string().optional(),
    order: z.number().default(999),
    photos: z.array(photoSchema).default([]),
    bulkPhotos: imageListSchema,
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    eyebrow: z.string(),
    heading: z.string(),
    intro: z.string().optional(),
    paragraphs: paragraphListSchema,
    submitLabel: z.string().optional(),
  }),
});

export const collections = { galleries, pages };
