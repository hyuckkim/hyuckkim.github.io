import hljs from 'highlight.js';
import { Marked } from 'marked';
import { markedHighlight } from 'marked-highlight';

const isExternalOrAbsolutePath = (value: string) => /^(?:[a-z]+:|\/\/|#|\/)/i.test(value);

export const resolvePostAssetPath = (slug: string, value?: string) => {
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

const resolveAssetPathsInHtmlToken = (slug: string, html: string) => {
	return html.replace(/(<(?:img|source|audio|video)\b[^>]*\bsrc=)(["'])([^"']+)\2/gi, (_match, prefix, quote, path) => {
		const resolved = resolvePostAssetPath(slug, path);
		return `${prefix}${quote}${resolved}${quote}`;
	});
};

const createPostMarked = (slug: string) => {
	const parser = new Marked();

	parser.use(
		markedHighlight({
			langPrefix: 'hljs language-',
			highlight(code, language) {
				const validLanguage = language && hljs.getLanguage(language) ? language : 'plaintext';
				return hljs.highlight(code, { language: validLanguage }).value;
			}
		})
	);

	parser.use({
		walkTokens(token) {
			if (token.type === 'image') {
				token.href = resolvePostAssetPath(slug, token.href) ?? token.href;
			}

			if (token.type === 'html') {
				token.raw = resolveAssetPathsInHtmlToken(slug, token.raw);
			}
		}
	});

	return parser;
};

export const parsePostMarkdown = async (slug: string, markdown: string) => {
	const parser = createPostMarked(slug);
	return parser.parse(markdown);
};
