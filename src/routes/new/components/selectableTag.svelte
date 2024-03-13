<script lang="ts">
    export let tag: string;
    export let onClick: (() => void) | undefined = undefined;
</script>

<!-- This element can be accessed with Alt + num in ../+page.svelte -->
<!-- svelte-ignore a11y-interactive-supports-focus -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<span on:click={onClick} role="button"><small>#{tag}</small></span>

<style>
    span {
        color: #2e2e2e;
        border: 0;
        padding: 0;
        border-radius: 0;
        margin-right: 8px;
        cursor: pointer;
    }

    small {
        background-color: #ddd;
        padding: 4px 6px;
    }
</style>
