<script lang="ts">
    import ParsedMarkdown from '$lib/components/parsedMarkdown.svelte';
    import PostTag from '$lib/components/postTag.svelte';

    import type { PageData } from './$types';

    export let data: PageData;
</script>

<svelte:head>
    <title>{data.title} - 블로그</title>
</svelte:head>

<hgroup>
    <section class="top">
        <h1>{data.title}</h1>
        <p>{data.date}</p>
    </section>
    <div class="secondLine">
        <div>
            {#each data.tags as tag}
                <PostTag {tag} />
            {/each}
        </div>
        <a href={`/post/${data.index}`}>#</a>
    </div>
</hgroup>
<ParsedMarkdown data={data.content} />

<style>
    .top {
        display: flex;
        justify-content: space-between;
        align-items: end;
    }
    .top p {
        text-wrap: nowrap;
    }
    .secondLine {
        display: flex;
        justify-content: space-between;
    }
</style>
