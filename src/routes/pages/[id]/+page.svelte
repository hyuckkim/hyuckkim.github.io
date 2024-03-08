<script lang="ts">
    import { page } from "$app/stores";
    import { _fetchData } from "$lib";
    import Pagination from "$lib/components/pagination.svelte";
    import type { PageData } from "./$types";

    export let data: PageData;
</script>

<strong>{$page.params.id} 페이지</strong>
{#each data.posts.data as writes}
<article>
    <h4><a href={`/post/${writes.name}`}>{writes.metadata.title}</a></h4>
    <p>
        {writes.data}
    </p>
    <div class="bottom">
        <div class="tags">
            {#each writes.metadata.tags.split(", ") as tag}
                <small>#{tag}</small>
            {/each}
        </div>
        <div class="date">
            {writes.metadata.date}
        </div>
    </div>
</article>
{/each}
<Pagination pages={Math.ceil(data.posts.size / 10)} current={parseInt($page.params.id)} />

<style>
    article {
        margin: 18px;
        padding: 24px;
        height: 170px;
    }
    article p {
        text-wrap: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    article .bottom {
        display: flex;
        justify-content: space-between;
    }
    article .bottom .tags {
        overflow: hidden;
        text-wrap: nowrap;
    }
    article .bottom .tags small {
        background-color: #ddd;
        padding: 2px 6px;
        margin-right: 8px;
    }
    article .bottom .date {
        text-wrap: nowrap;
        color: gray;
        margin-left: 8px;
    }
</style>