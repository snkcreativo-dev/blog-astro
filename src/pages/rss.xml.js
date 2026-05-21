import rss from '@astrojs/rss';
import { siteConfig } from '../config/site';
import { getPublishedPosts } from '../utils/blog';

/**
 * BLOQUE: Feed RSS
 * - Expone los articulos publicados en un formato legible por lectores RSS.
 * - Es util para sindicar contenido sin depender de JavaScript en cliente.
 */
export async function GET(context) {
	const posts = await getPublishedPosts();

	return rss({
		title: siteConfig.title,
		description: siteConfig.description,
		site: context.site,
		items: posts.map((post) => ({
			title: post.data.title,
			description: post.data.description,
			pubDate: post.data.publishDate,
			link: `/blog/${post.id}/`,
		})),
	});
}
