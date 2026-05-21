interface GetContext {
	site?: URL;
}

export function GET({ site }: GetContext) {
	const baseSite = site ?? new URL('https://example.com');
	const sitemapUrl = new URL('sitemap-index.xml', baseSite).toString();

	return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${sitemapUrl}\n`, {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8',
		},
	});
}
