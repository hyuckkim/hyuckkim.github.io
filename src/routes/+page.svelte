<script lang="ts">
    import { onMount } from "svelte";
    import { _fetchData } from "$lib"; 

    let data: {
        size: number;
        data: {
            name: string;
            metadata: {[key: string]: string};
            data: string;
        }[];
    } | null = null;
    onMount(async () => {
        data = await _fetchData();
    })
</script>

{#if data}
<strong>글 목록 ({data.size})</strong>
{#each data.data as writes}
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
{/if}

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