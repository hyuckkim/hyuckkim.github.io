import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { _postList } from '../+page.server';

export const prerender = true;
export const load: PageServerLoad = async ({ params }) => {
    const posts = _postList()

    const slicedPosts = posts
        .slice(params.no * 10 - 10)
        .slice(0, 10);

    if (posts.length === 0) {
        throw error(404, 'No posts found');
    }
    
    return { posts, no: params.no, size: Math.ceil(posts.length / 10) };
};
