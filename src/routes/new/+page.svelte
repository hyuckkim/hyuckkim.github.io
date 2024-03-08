<script lang="ts">
    import Markdown from "$lib/components/markdown.svelte";
    import type { PageData } from "./$types";

    export let data: PageData;
    $: isPreview = false;
    let title = "";
    let tags = "";
    let post = "";

    const doLogin = () => {
        window.location.href = "https://github.com/login/oauth/authorize?client_id=Iv1.7d4ae3f643d15c1a";
    }

    const doSubmit = () => {

    }
</script>

<!-- svelte-ignore a11y-no-redundant-roles -->
<fieldset role="group">
    <input placeholder="제목" bind:value={title} />
    <input type="button" value="로그인" on:click={doLogin} disabled={data.key !== null} />
    <input type="button" value="업로드" on:click={doSubmit} disabled={data.key === null}/>
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
    textarea {
        height: 600px;
    }
</style>