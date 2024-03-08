<script lang="ts">
    import { _buildMarkdown } from "$lib";

    export let data: string;
</script>

{#await _buildMarkdown(data)}
<p>building...</p>
{:then content} 
<section>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/atom-one-dark-reasonable.min.css">
    {@html content}
</section>
{/await}