import rss from '@astrojs/rss';
import { siteConfig } from '../config/site';
import { getPublishedPosts } from '../utils/blog';

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
