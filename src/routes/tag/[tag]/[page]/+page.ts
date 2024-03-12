import { _fetchTagData } from '$lib';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
    return {
        posts: await _fetchTagData(params.tag, Number.parseInt(params.page) - 1)
    };
};
