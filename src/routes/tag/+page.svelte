<script lang="ts">
    import PostTag from '$lib/components/postTag.svelte';
    import type { PageData } from './$types';

    export let data: PageData;
</script>

<svelte:head>
    <title>태그 - 블로그</title>
</svelte:head>
<strong>태그</strong>
<article>
    {#each data.tags as tag}
        <PostTag {tag} />
    {/each}
</article>

<style>
    article {
        margin: 18px;
        padding: 24px;
    }
</style>
