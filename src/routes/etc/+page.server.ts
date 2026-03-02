import type { PageServerLoad } from "./$types";
import matter from 'gray-matter';
import { resolvePostAssetPath } from '$lib/postMarkdown';
export const prerender = true;

export const load: PageServerLoad = async ({ fetch }) => {
  const contents = [
    '/posts/learncss/index.md',
    '/posts/anyoung/index.md',
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
