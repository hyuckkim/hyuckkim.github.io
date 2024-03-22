import { _getAllTags } from '$lib';
import { checkTauri } from '$lib/tauri';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
    return {
        tags: await _getAllTags(),
        is_tauri: await checkTauri()
    };
};
