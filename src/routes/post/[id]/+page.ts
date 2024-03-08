import type { PageLoad } from "./$types"

import { unified } from "unified";
import markdown from "remark-parse";
import remarkRehype from "remark-rehype";
import html from "rehype-stringify";
import rehypeHighlight from "rehype-highlight";
import { _getData } from "$lib";

export const load: PageLoad = async ({ params }) => {
    const data = await _getData(params.id);

    return {
        title: data.metadata.title,
        date: data.metadata.date,
        tags: data.metadata.tags.split(', '),
        content: (await unified()
        .use(markdown)
        .use(remarkRehype)
        .use(html)
        .use(rehypeHighlight)
        .process(data.data))
        .toString()
    }
}