<script lang="ts">
    type Prop = {
        idx: number;
        size: number;
    }

    const { idx, size }: Prop = $props();
</script>

<a href="/post/{Math.max(1, idx - 1)}">이전</a>
<a href="/post/{Math.min(size, idx - - 1)}">다음</a>

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