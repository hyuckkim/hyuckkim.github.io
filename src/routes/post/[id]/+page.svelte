<script lang="ts">
    import { _id } from "./+page";
    import { _getData } from "$lib";
    import { onMount } from "svelte";

    import { unified } from "unified";
    import markdown from "remark-parse";
    import remarkRehype from "remark-rehype";
    import html from "rehype-stringify";

    let data: {
        metadata: {
            [key: string]: string;
        };
        data: string;
    } | null = null;

    let content = "<h1>hello, world!</h1>";

    onMount(async () => {
        data = await _getData(_id);
        content = unified()
            .use(markdown)
            .use(remarkRehype)
            .use(html)
            .processSync(data.data)
            .toString();
    })
</script>

{#if !!data}
<section class="top">
    <h1>{data.metadata.title}</h1>
    <p>{data.metadata.date}</p>
</section>
<section>
    <div bind:innerHTML={content} contenteditable="false" />
</section>
{/if}

<style>
    .top {
        display: flex;
        justify-content: space-between;
        align-items: end;
    }
</style>