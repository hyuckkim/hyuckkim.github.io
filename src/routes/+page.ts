import { _fetchData } from '$lib';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
    return {
        posts: await _fetchData(0)
    };
};
