import { _getAllTags } from '$lib';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
    console.log(await _getAllTags());
    return {
        tags: await _getAllTags()
    };
};
