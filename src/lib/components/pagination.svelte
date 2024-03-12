<script lang="ts">
    import PaginationDots from "./paginationDots.svelte";
    import PaginationItem from "./paginationItem.svelte";

    const buildPageArray = () => {
        let first = current - 3;
        let length = 7;

        if (first < 2) {
            first = 2;
        }

        if (first + length > pages) {
            first = pages - length;
        }

        if (first < 2) {
            length -= 2 - first;
            first = 2;
        }
        return Array.from({ length }, (_, i) => first + i);
    }

    export let pages: number;
    export let current: number;
    export let path: string;
    const pageArray = buildPageArray();

</script>

<div class="pagination">
    <PaginationItem page={1} current={current} path={path} />
    {#if pageArray[0] > 2}
    <PaginationDots />
    {/if}

    {#each pageArray as i}
    <PaginationItem page={i} current={current} path={path} />
    {/each}

    {#if pageArray[pageArray.length - 1] < pages - 1}
    <PaginationDots />
    {/if}

    {#if pages > 1}
    <PaginationItem page={pages} current={current} path={path} />
    {/if}
</div>

<style>
    .pagination {
        display: flex;
        margin: 0 auto;
        justify-content: center;
    }
</style>