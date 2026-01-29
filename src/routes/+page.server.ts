import type { PageServerLoad } from "./$types";
import matter from 'gray-matter';

export const load: PageServerLoad = async ({ fetch }) => {
  const contents = [
    '/posts/speak.md',
    '/posts/directdrawviewer.md',
    '/posts/shrine.md',
    '/posts/aiwork.md',
    '/posts/dotuna.md',
    '/posts/phonegame.md',
    '/posts/plant.md',
    '/posts/daum.md',
    '/posts/regexpmisc.md',
    '/posts/modinfobuilder.md',
    '/posts/learncss.md',
    '/posts/pixeler.md',
    '/posts/threewindow.md',
    '/posts/coloring.md',
    '/posts/spacegame.md',
    '/posts/anyoung.md',
    '/posts/quadrant.md',
    '/posts/ten2two.md'
  ].map(async (path) => {
    const res = await fetch(path);
    const content = await res.text();
    const data = matter(content);
    const meta = data.data;
    const docPath = path.replace('/posts/', '/post/').replace('.md', '');
    return { title: meta.title, img: meta.img, date: meta.date, path: docPath };
  });
  const posts = await Promise.all(contents);
  return {
    posts
  };
};
