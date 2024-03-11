<script lang="ts">
    import { _buildMarkdown } from "$lib";
    import ParsedMarkdown from "./parsedMarkdown.svelte";

    export let data: string;
</script>

{#await _buildMarkdown(data)}
<p>building...</p>
{:then content} 
<ParsedMarkdown data={content} />
{/await}