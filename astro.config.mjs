// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

/**
 * BLOQUE: Configuracion base de Astro
 * - Calcula `site` y `base` para que el mismo proyecto funcione en local y en GitHub Pages.
 * - Integra el sitemap para mejorar SEO y descubrimiento del blog.
 *
 * Por que es importante:
 * - GitHub Pages suele desplegar proyectos dentro de una subruta (`/repositorio/`).
 * - Si no ajustamos `base`, los enlaces y assets pueden romperse al publicar.
 */
const repository = process.env.GITHUB_REPOSITORY?.split('/')[1];
const owner = process.env.GITHUB_REPOSITORY?.split('/')[0];
const isUserSite = Boolean(repository && owner && repository === `${owner}.github.io`);
const inferredBase =
	process.env.BASE_PATH ?? (repository && !isUserSite ? `/${repository}` : '/');
const inferredSite =
	process.env.SITE_URL ??
	(owner
		? isUserSite
			? `https://${owner}.github.io`
			: `https://${owner}.github.io/${repository}`
		: 'https://example.com');

export default defineConfig({
	site: inferredSite,
	base: inferredBase,
	integrations: [sitemap()],
	markdown: {
		shikiConfig: {
			theme: 'houston',
			wrap: true,
		},
	},
});
