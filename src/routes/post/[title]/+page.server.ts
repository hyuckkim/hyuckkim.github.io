import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import matter from 'gray-matter';
import { marked } from "marked";
export const prerender = true;

export const load: PageServerLoad = async ({ params, fetch }) => {
	const res = await fetch(`/posts/${params.title}.md`);

	if (!res.ok) {
		throw error(404, 'Post not found');
	}

	const content = await res.text();
  const data = matter(content);
	const meta = data.data;
  const html = await marked.parse(data.content);

	return {
    title: params.title,
		post: html,
		meta
	};
};
