<script lang="ts">
    import { base } from '$app/paths';
    export let page: number;
    export let current: number;
</script>

<hgroup>
    {#if current === page}
    <strong><a href={`${base}/pages/${page}`} class="contrast">
        {page}
    </a></strong>
    {:else}
    <p><a href={`${base}/pages/${page}`} class="contrast">
        {page}
    </a></p>
    {/if}
</hgroup>

<style>
    a {
        text-decoration: none;
        width: 32px;
        height: 32px;

        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>