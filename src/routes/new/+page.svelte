<script lang="ts">
    import { _fetchData } from "$lib";
    import Markdown from "$lib/components/markdown.svelte";

    $: isPreview = false;
    let title = "";
    let tags = "";
    let post = "";

    const getDay = () => {
        const today = new Date();

        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
        const day = String(today.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;

    }
    const getStr = () => (
        "---\n" +
        `title: ${title}\n` +
        `tags: ${tags}\n` +
        `date: ${getDay()}\n` +
        "---\n" +
        `${post}`
    );

    const doSubmit = () => {
        navigator.clipboard.writeText(getStr());
    }
</script>

<small>(뭔가 시도하려다 포기한 흔적)</small>
<!-- svelte-ignore a11y-no-redundant-roles -->
<fieldset role="group">
    <input placeholder="제목" bind:value={title} />
    <input type="button" value="복사" on:click={doSubmit} disabled={!title || !tags || !post}/>
</fieldset>
<input placeholder="태그" bind:value={tags} />
<div role="group">
    <button class={isPreview ? "secondary" : ""} on:click={() => isPreview = false}>마크다운</button>
    <button class={isPreview ? "" : "secondary"} on:click={() => isPreview = true}>미리보기</button>
</div>
{#if isPreview}
<Markdown data={post} />
{:else}
<textarea bind:value={post} />
{/if}

<style>
    small {
        font-style: italic;
        color: gray;
    }
    textarea {
        height: 600px;
    }
</style>