import { getCollection, type CollectionEntry } from 'astro:content';

export type BlogPost = CollectionEntry<'blog'>;

/**
 * BLOQUE: Utilidades del blog
 * - Reune la logica de consulta y ordenado para no duplicarla en cada pagina.
 * - Hace que los templates Astro se centren en renderizar, no en mezclar reglas.
 *
 * Relacion con Astro:
 * - `getCollection()` es la puerta de entrada habitual cuando trabajas con Content Collections.
 * - Conviene centralizar estos accesos para que cambiar reglas editoriales sea sencillo.
 */
export async function getPublishedPosts() {
	const posts = await getCollection('blog', ({ data }) => !data.draft);
	return sortPostsByDate(posts);
}

/**
 * BLOQUE: Orden editorial por fecha
 * - Garantiza que portada, archivo y relaciones usen el mismo criterio de orden.
 *
 * Error comun:
 * - Ordenar en cada pagina con reglas distintas y acabar mostrando resultados inconsistentes.
 */
export function sortPostsByDate(posts: BlogPost[]) {
	return [...posts].sort(
		(firstPost, secondPost) =>
			secondPost.data.publishDate.getTime() - firstPost.data.publishDate.getTime(),
	);
}

/**
 * BLOQUE: Tiempo estimado de lectura
 * - Aporta contexto editorial rapido al lector.
 * - No es una medicion exacta, sino una senal util para escanear el contenido.
 */
export function estimateReadingTime(content: string) {
	const wordsPerMinute = 220;
	const words = content.trim().split(/\s+/).filter(Boolean).length;
	return Math.max(1, Math.ceil(words / wordsPerMinute));
}

/**
 * BLOQUE: Slug de etiquetas
 * - Convierte etiquetas legibles en fragmentos seguros para URL.
 *
 * Por que existe:
 * - Una etiqueta puede contener espacios, tildes o mayusculas.
 * - La ruta publica necesita una version estable y predecible.
 */
export function slugifyTerm(value: string) {
	return value
		.toLowerCase()
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');
}

/**
 * BLOQUE: Taxonomia ligera
 * - Recorre todos los posts, junta etiquetas y elimina duplicados.
 * - Sirve para construir el archivo tematico sin base de datos.
 */
export function getUniqueTags(posts: BlogPost[]) {
	return [...new Set(posts.flatMap((post) => post.data.tags))].sort((firstTag, secondTag) =>
		firstTag.localeCompare(secondTag, 'es'),
	);
}
