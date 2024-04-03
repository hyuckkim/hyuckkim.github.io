<script lang="ts">
    import ParsedMarkdown from '$lib/components/parsedMarkdown.svelte';
    import PostTag from '$lib/components/postTag.svelte';
    import { getAllRegexp } from 'regexp-misc';

    import type { PageData } from './$types';
    import SubtitleMenu from './components/subtitleMenu.svelte';

    export let data: PageData;
    $: subtitles = getAllRegexp(data.content, /<h([1-6]) id="(.+)"><a.+\/a>(.+)<\/h[1-6]>/g).map(
        (d) => ({ level: d[1], id: d[2], text: d[3] })
    );
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
<SubtitleMenu {subtitles} />
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
