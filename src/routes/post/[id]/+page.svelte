<script lang="ts">
    import Markdown from "$lib/components/markdown.svelte";
    import type { PageData } from "./$types";

    export let data: PageData;
</script>

<section class="top">
    <h1>{data.title}</h1>
    <p>{data.date}</p>
</section>
<Markdown data={data.content}/>
<style>
    .top {
        display: flex;
        justify-content: space-between;
        align-items: end;
    }
</style>