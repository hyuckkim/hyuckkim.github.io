import type { PageServerLoad } from './$types';
import matter from 'gray-matter';
import { resolvePostAssetPath } from '$lib/postMarkdown';

export const prerender = true;

function getDateSortKey(value) {
    if (!value) return '';

    if (value instanceof Date) {
        return value.toISOString().slice(0, 10);
    }

    return String(value);
}

export const load: PageServerLoad = async () => {
	const markdownModules = import.meta.glob('/static/posts/*/index.md', {
		eager: true,
		query: '?raw',
		import: 'default'
	}) as Record<string, string>;

	const slugs = Object.keys(markdownModules)
		.map((filePath) => filePath.split('/')[3])
		.filter((slug): slug is string => Boolean(slug))
		.sort((a, b) => a.localeCompare(b));

	const posts = slugs.map((slug) => {
			const content = markdownModules[`/static/posts/${slug}/index.md`];
			const data = matter(content);
			const meta = data.data as {
				title?: string;
				img?: string;
				date?: string;
			};

			return {
				title: meta.title ?? slug,
				img: resolvePostAssetPath(slug, meta.img) ?? '',
				date: meta.date ?? '',
				dateSortKey: getDateSortKey(meta.date),
				path: `/post/${slug}`
			};
		})
		.sort((a, b) => b.dateSortKey - a.dateSortKey)
		.map(({ dateSortKey: _dateSortKey, ...post }) => post);

	return { posts };
};
