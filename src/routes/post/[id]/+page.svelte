<script lang="ts">
    import type { PageData } from "./$types";

    export let data: PageData;
</script>

<section class="top">
    <h1>{data.title}</h1>
    <p>{data.date}</p>
</section>
<section>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/atom-one-dark-reasonable.min.css">
    <div bind:innerHTML={data.content} contenteditable="false" />
</section>
<style>
    .top {
        display: flex;
        justify-content: space-between;
        align-items: end;
    }
</style>