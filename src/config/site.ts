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
		'Publicacion editorial sobre desarrollo web moderno, criterio tecnico y proyectos hechos para entenderse.',
	tagline: 'Edicion digital sobre codigo, contenido y criterio visual.',
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
