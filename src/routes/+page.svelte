<script lang="ts">
    import Pagination from '$lib/components/pagination.svelte';
    import Post from '$lib/components/post.svelte';
    import type { PageData } from './$types';

    export let data: PageData;
</script>

<svelte:head>
    <title>블로그</title>
</svelte:head>

<strong>글 목록 ({data.posts.size})</strong>
{#each data.posts.data as writes}
    <Post
        href={`/post/${writes.name}`}
        title={writes.metadata.title}
        data={writes.data}
        tags={writes.metadata.tags.split(', ')}
        date={writes.metadata.date}
    />
{/each}
<Pagination pages={Math.ceil(data.posts.size / 10)} current={1} path={`/pages`} />
