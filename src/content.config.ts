import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    year: z.number(),
    location: z.string(),
    constructionArea: z.string(),
    landArea: z.string().optional(),
    client: z.string(),
    status: z.string().default('Completed'),
    category: z.string().default('Construction'),
    coverImage: z.string(),
    galleryImages: z.array(z.string()).default([]),
  }),
});

export const collections = { projects };
