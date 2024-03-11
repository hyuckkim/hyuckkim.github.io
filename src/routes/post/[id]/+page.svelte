<script lang="ts">
    import ParsedMarkdown from "$lib/components/parsedMarkdown.svelte";
    import type { PageData } from "./$types";

    export let data: PageData;
</script>

<section class="top">
    <h1>{data.title}</h1>
    <p>{data.date}</p>
</section>
<ParsedMarkdown data={data.content}/>
<style>
    .top {
        display: flex;
        justify-content: space-between;
        align-items: end;
    }
    .top p {
        text-wrap: nowrap;
    }
</style>