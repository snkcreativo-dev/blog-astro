/**
 * BLOQUE: Enlaces con `base`
 * - Adapta rutas internas al valor de `import.meta.env.BASE_URL`.
 * - Es clave cuando el sitio vive en una subcarpeta de GitHub Pages.
 *
 * Error comun:
 * - Construir enlaces absolutos "a mano" y romperlos al desplegar en `/blog-astro/`.
 */
export function withBase(path = '/') {
	const base = import.meta.env.BASE_URL ?? '/';
	const normalizedBase = base.endsWith('/') ? base : `${base}/`;
	const normalizedPath = path.startsWith('/') ? path.slice(1) : path;

	return normalizedPath ? `${normalizedBase}${normalizedPath}` : normalizedBase;
}
