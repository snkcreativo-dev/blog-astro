import { glob } from 'astro/loaders';
import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';

/**
 * BLOQUE: Content Collections de Astro
 * - Define la estructura valida para posts y paginas editables.
 * - Hace que Markdown deje de ser "texto suelto" y pase a ser contenido tipado.
 *
 * Por que es importante:
 * - Astro valida el frontmatter antes de compilar.
 * - Decap CMS y el frontend trabajan contra la misma estructura de datos.
 *
 * Error comun:
 * - Cambiar campos en el CMS sin reflejarlos aqui.
 */
const blog = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		excerpt: z.string(),
		publishDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		draft: z.boolean().default(false),
		featured: z.boolean().default(false),
		author: z.string().default('Equipo Editorial'),
		tags: z.array(z.string()).default([]),
		cover: z.string().optional(),
		coverAlt: z.string().optional(),
	}),
});

const pages = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
	}),
});

export const collections = { blog, pages };
