import type { PageServerLoad } from './$types';
import matter from 'gray-matter';
import { resolvePostAssetPath } from '$lib/postMarkdown';

export const prerender = true;

const getDateSortKey = (value?: string) => {
	if (!value) return 0;

	const parts = value.match(/\d+/g);
	if (!parts || parts.length === 0) return 0;

	const year = Number(parts[0]);
	const month = Number(parts[1] ?? '1');
	const day = Number(parts[2] ?? '1');

	if (!Number.isFinite(year) || !Number.isFinite(month) || !Number.isFinite(day)) return 0;

	return Date.UTC(year, Math.max(month - 1, 0), Math.max(day, 1));
};

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
