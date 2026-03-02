import type { PageServerLoad } from "./$types";
import matter from 'gray-matter';
export const prerender = true;

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

export const load: PageServerLoad = async ({ fetch }) => {
  const contents = [
    '/posts/speak/index.md',
    '/posts/directdrawviewer/index.md',
    '/posts/shrine/index.md',
    '/posts/aiwork/index.md',
    '/posts/dotuna/index.md',
    '/posts/phonegame/index.md',
    '/posts/plant/index.md',
    '/posts/daum/index.md',
    '/posts/regexpmisc/index.md',
    '/posts/modinfobuilder/index.md',
    '/posts/learncss/index.md',
    '/posts/pixeler/index.md',
    '/posts/threewindow/index.md',
    '/posts/coloring/index.md',
    '/posts/spacegame/index.md',
    '/posts/anyoung/index.md',
    '/posts/quadrant/index.md',
    '/posts/ten2two/index.md'
  ].map(async (path) => {
    const res = await fetch(path);
    const content = await res.text();
    const data = matter(content);
    const meta = data.data as {
      title?: string;
      img?: string;
      date?: string;
    };
    const docPath = path.replace('/posts/', '/post/').replace('/index.md', '');
    const slug = path.split('/')[2];
    return {
      title: meta.title ?? '',
      img: resolvePostAssetPath(slug, meta.img) ?? '',
      date: meta.date ?? '',
      path: docPath
    };
  });
  const posts = await Promise.all(contents);
  return {
    posts
  };
};
