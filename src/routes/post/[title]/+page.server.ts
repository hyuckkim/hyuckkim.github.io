import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import matter from 'gray-matter';
import hljs from 'highlight.js';
import { marked } from "marked";
import { markedHighlight } from 'marked-highlight';
export const prerender = true;

marked.use(
	markedHighlight({
		langPrefix: 'hljs language-',
		highlight(code, language) {
			const validLanguage = language && hljs.getLanguage(language) ? language : 'plaintext';
			return hljs.highlight(code, { language: validLanguage }).value;
		}
	})
);

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
