import { getCollection, type CollectionEntry } from 'astro:content';

export type BlogPost = CollectionEntry<'blog'>;

/**
 * BLOQUE: Utilidades del blog
 * - Reune la logica de consulta y ordenado para no duplicarla en cada pagina.
 * - Hace que los templates Astro se centren en renderizar, no en mezclar reglas.
 */
export async function getPublishedPosts() {
	const posts = await getCollection('blog', ({ data }) => !data.draft);
	return sortPostsByDate(posts);
}

export function sortPostsByDate(posts: BlogPost[]) {
	return [...posts].sort(
		(firstPost, secondPost) =>
			secondPost.data.publishDate.getTime() - firstPost.data.publishDate.getTime(),
	);
}

export function estimateReadingTime(content: string) {
	const wordsPerMinute = 220;
	const words = content.trim().split(/\s+/).filter(Boolean).length;
	return Math.max(1, Math.ceil(words / wordsPerMinute));
}

export function slugifyTerm(value: string) {
	return value
		.toLowerCase()
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');
}

export function getUniqueTags(posts: BlogPost[]) {
	return [...new Set(posts.flatMap((post) => post.data.tags))].sort((firstTag, secondTag) =>
		firstTag.localeCompare(secondTag, 'es'),
	);
}
