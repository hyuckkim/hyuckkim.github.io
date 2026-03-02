import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import matter from 'gray-matter';
import { parsePostMarkdown, resolvePostAssetPath } from '$lib/postMarkdown';
export const prerender = true;

export const load: PageServerLoad = async ({ params, fetch }) => {
	const res = await fetch(`/posts/${params.title}/index.md`);

	if (!res.ok) {
		throw error(404, 'Post not found');
	}

	const content = await res.text();
  const data = matter(content);
	const meta = data.data as {
		title?: string;
		img?: string;
		date?: string;
		[key: string]: unknown;
	};
	meta.img = resolvePostAssetPath(params.title, meta.img);
	const html = await parsePostMarkdown(params.title, data.content);

	return {
    title: params.title,
		post: html,
		meta
	};
};
