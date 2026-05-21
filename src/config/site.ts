/**
 * BLOQUE: Metadatos del sitio
 * - Centraliza el nombre, la navegacion y los textos base del proyecto.
 * - Evita duplicar informacion en varias paginas.
 *
 * Cuando se usa:
 * - En layouts, cabecera, footer, RSS y portada.
 */
export const siteConfig = {
	title: 'Notas de Taller',
	description:
		'Blog sobre desarrollo web moderno con Astro, contenido editable y una base pensada para aprender sin ruido.',
	tagline: 'Astro, contenido y despliegue explicados con criterio.',
	author: 'Equipo Editorial',
	locale: 'es-ES',
	navigation: [
		{ label: 'Inicio', href: '/' },
		{ label: 'Blog', href: '/blog/' },
		{ label: 'Sobre este blog', href: '/sobre-este-blog/' },
		{ label: 'CMS', href: '/admin/' },
	],
	footerLinks: [
		{ label: 'RSS', href: '/rss.xml' },
		{ label: 'Sitemap', href: '/sitemap-index.xml' },
		{ label: 'GitHub Pages', href: 'https://pages.github.com/' },
	],
	featuredTopics: ['Astro', 'Markdown', 'Decap CMS', 'GitHub Pages'],
};
