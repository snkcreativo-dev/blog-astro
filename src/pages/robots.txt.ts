interface GetContext {
	site?: URL;
}

/**
 * BLOQUE: Robots dinamico minimo
 * - Permite rastreo general y apunta al sitemap generado por Astro.
 * - Aunque el contenido sea estatico, este archivo sigue siendo parte del SEO tecnico.
 */
export function GET({ site }: GetContext) {
	const baseSite = site ?? new URL('https://example.com');
	const sitemapUrl = new URL('sitemap-index.xml', baseSite).toString();

	return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${sitemapUrl}\n`, {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8',
		},
	});
}
