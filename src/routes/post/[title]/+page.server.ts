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

const isExternalOrAbsolutePath = (value: string) => /^(?:[a-z]+:|\/\/|#|\/)/i.test(value);

const resolvePostAssetPath = (slug: string, value?: string) => {
	if (!value) {
		return value;
	}
	const normalized = value.startsWith('./') ? value.slice(2) : value;
	if (normalized.startsWith('assets/')) {
		return `/posts/${slug}/${normalized}`;
	}
	if (!isExternalOrAbsolutePath(normalized)) {
		return `/posts/${slug}/assets/${normalized}`;
	}
	return normalized;
};

const resolvePostAssetLinksInMarkdown = (slug: string, markdown: string) => {
	return markdown
		.replace(/!\[([^\]]*)\]\((?![a-z]+:|\/\/|\/|#)([^)\s]+)([^)]*)\)/gi, (_match, alt, path, suffix) => {
			const normalized = path.startsWith('./') ? path.slice(2) : path;
			const absolutePath = normalized.startsWith('assets/')
				? `/posts/${slug}/${normalized}`
				: `/posts/${slug}/assets/${normalized}`;
			return `![${alt}](${absolutePath}${suffix})`;
		})
		.replace(/(<(?:img|source|audio|video)\b[^>]*\bsrc=)(["'])(?![a-z]+:|\/\/|\/|#)([^"']+)\2/gi, (_match, prefix, quote, path) => {
			const normalized = path.startsWith('./') ? path.slice(2) : path;
			const absolutePath = normalized.startsWith('assets/')
				? `/posts/${slug}/${normalized}`
				: `/posts/${slug}/assets/${normalized}`;
			return `${prefix}${quote}${absolutePath}${quote}`;
		});
};

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
	const normalizedContent = resolvePostAssetLinksInMarkdown(params.title, data.content);
  const html = await marked.parse(normalizedContent);

	return {
    title: params.title,
		post: html,
		meta
	};
};
