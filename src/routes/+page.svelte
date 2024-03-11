<script lang="ts">
    import { base } from "$app/paths";
    import { _fetchData } from "$lib"; 
    import Pagination from "$lib/components/pagination.svelte";
    import Post from "$lib/components/post.svelte";
    import type { PageData } from "./$types";

    export let data: PageData;
</script>

<strong>글 목록 ({data.posts.size})</strong>
{#each data.posts.data as writes}
<Post
    href={`${base}/post/${writes.name}`}
    title={writes.metadata.title}
    data={writes.data}
    tags={writes.metadata.tags.split(", ")}
    date={writes.metadata.date} />
{/each}
<Pagination pages={Math.ceil(data.posts.size / 10)} current={1} />
