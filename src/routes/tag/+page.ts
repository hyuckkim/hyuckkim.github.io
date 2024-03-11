import { _getAllTags } from "$lib";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ params }) => {
    return {
        tags: await _getAllTags()
    }
}