<script lang="ts">
    export let tag: string;
</script>

<a href={`/tag/${tag}`} class="contrast"><small>#{tag}</small></a>

<style>
    small {
        background-color: var(--pico-muted-border-color);
        padding: 2px 6px;
        margin-right: 8px;
    }
    a {
        text-decoration: none;
    }
</style>
