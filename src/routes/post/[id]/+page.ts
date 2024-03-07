import type { PageLoad } from "./$types"

export let _id = "";
export const load: PageLoad = ({ params }) => {
    if (typeof params.id === "string") {
        _id = params.id;
    }
}