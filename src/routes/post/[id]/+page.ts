import type { PageLoad } from "./$types"
import { _getData } from "$lib";

export const load: PageLoad = async ({ params }) => {
    const data = await _getData(params.id);

    return {
        title: data.metadata.title,
        date: data.metadata.date,
        tags: data.metadata.tags.split(', '),
        content: (data.data)
    }
}