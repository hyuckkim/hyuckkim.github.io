<script lang="ts">
    import { keyInput } from '../utils';
    import SelectableTag from './selectableTag.svelte';

    export let dataTags: Array<string>;
    export let tags: string;

    $: lastTag = tags.split(', ').reverse()[0];
    $: tagsThatStartWithLastTag = dataTags
        .filter((v) => v.startsWith(lastTag))
        .sort((a, b) => a.length - b.length);

    const appendTag = (tag: string) =>
        (tags = [...tags.split(', ').reverse().slice(1).reverse(), tag].join(', '));
    const handleTag = (e: KeyboardEvent) => {
        if (keyInput(e, '1', ['alt'])) {
            appendTag(tagsThatStartWithLastTag[0]);
        }
        if (keyInput(e, '2', ['alt'])) {
            appendTag(tagsThatStartWithLastTag[1]);
        }
        if (keyInput(e, '3', ['alt'])) {
            appendTag(tagsThatStartWithLastTag[2]);
        }
        if (keyInput(e, '4', ['alt'])) {
            appendTag(tagsThatStartWithLastTag[3]);
        }
        if (keyInput(e, '5', ['alt'])) {
            appendTag(tagsThatStartWithLastTag[4]);
        }
    };
</script>

<input placeholder="태그" bind:value={tags} on:keydown={handleTag} />
{#if !!tagsThatStartWithLastTag}
    <div role="list" class="searchTags">
        {#each tagsThatStartWithLastTag.slice(0, 5) as tag}
            <SelectableTag {tag} onClick={() => appendTag(tag)} />
        {/each}
    </div>
{/if}

<style>
    .searchTags {
        height: 31px;
        margin-bottom: 12px;
        overflow: hidden;
    }
</style>
