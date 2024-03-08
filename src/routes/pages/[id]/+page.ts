import { _fetchData } from "$lib";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ params }) => {
    return {
        posts: await _fetchData(Number.parseInt(params.id) - 1)
    }
}