<script lang="ts">
    import { page } from '$app/stores';
    import Pagination from '$lib/components/pagination.svelte';
    import Post from '$lib/components/post.svelte';

    import type { PageData } from './$types';

    export let data: PageData;
</script>

<svelte:head>
    <title>{$page.params.page} 페이지 (#{$page.params.tag}) - 블로그</title>
</svelte:head>

<strong>{$page.params.page} 페이지 (#{$page.params.tag})</strong>
{#each data.posts.data as writes}
    <Post
        href={`/post/${writes.name}`}
        title={writes.metadata.title}
        data={writes.data}
        tags={writes.metadata.tags.split(', ')}
        date={writes.metadata.date}
    />
{/each}
<Pagination
    pages={Math.ceil(data.posts.size / 10)}
    current={Number.parseInt($page.params.page)}
    path={`/tag/${$page.params.tag}`}
/>
