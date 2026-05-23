<script lang="ts">
    type Prop = {
        idx: number;
        size: number;
    }

    const { idx, size }: Prop = $props();
</script>

{#if idx > 1}
	<a href="/post/{idx - 1}">이전</a>
{/if}

{#if idx < size}
	<a href="/post/{idx + 1}">다음</a>
{/if}

<style>
    a {
        display: inline-block;
        padding: 0.5em 1em;
        background-color: #fff6;
        color: #333;
        text-decoration: none;
        border-radius: 8px;
        margin: 0.5em;
    }

    a:hover {
        background-color: #ddda;
    }
</style>