<script lang="ts">
    import { base } from "$app/paths";
    import { page } from "$app/stores";
    import Pagination from "$lib/components/pagination.svelte";
    import Post from "$lib/components/post.svelte";

    import type { PageData } from "./$types";


    export let data: PageData;
</script>

<strong>#{$page.params.tag} ({data.posts.size})</strong>
{#each data.posts.data as writes}
<Post
    href={`${base}/post/${writes.name}`}
    title={writes.metadata.title}
    data={writes.data}
    tags={writes.metadata.tags.split(", ")}
    date={writes.metadata.date} />
{/each}
<Pagination pages={Math.ceil(data.posts.size / 10)} current={1} path={`${base}/tag/${$page.params.tag}`}  />