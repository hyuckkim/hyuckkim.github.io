<script lang="ts">
    import PostTag from './postTag.svelte';

    export let href: string, title: string, data: string, tags: string[], date: string;
</script>

<article>
    <h4><a {href}>{title}</a></h4>
    <p>
        {data}
    </p>
    <div class="bottom">
        <div class="tags">
            {#each tags as tag}
                <PostTag {tag} />
            {/each}
        </div>
        <div class="date">
            {date}
        </div>
    </div>
</article>

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
    article h4 {
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2; /* number of lines to show */
        line-clamp: 2;
        -webkit-box-orient: vertical;
    }
    article .bottom {
        display: flex;
        justify-content: space-between;
    }
    article .bottom .tags {
        overflow: hidden;
        text-wrap: nowrap;
    }
    article .bottom .date {
        text-wrap: nowrap;
        color: gray;
        margin-left: 8px;
    }
</style>
