<script lang="ts">
    import Markdown from '$lib/components/markdown.svelte';
    import { Check } from 'lucide-svelte';
    import type { PageData } from './$types';
    import Editor from './components/editor.svelte';
    import { keyInput } from './utils';
    import TagSelector from './components/tagSelector.svelte';
    import { loadFile, saveFile } from '$lib/tauri';
    import { onMount } from 'svelte';
    import { parseMarkdownWithMetadata } from '$lib';

    $: isPreview = false;

    export let data: PageData;

    let title = '';
    let tags = '';
    let post = '';

    let saved: -1 | number = -1;
    let loaded: -1 | number = -1;

    const getDay = () => {
        const today = new Date();

        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
        const day = String(today.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    };
    const getStr = () =>
        '---\n' +
        `title: ${title}\n` +
        `tags: ${tags}\n` +
        `date: ${getDay()}\n` +
        '---\n' +
        `${post}`;

    const doSubmit = async () => {
        const result = getStr();
        if (data.is_tauri) {
            await saveFile(result);
        } else {
            navigator.clipboard.writeText(result);
        }

        if (saved !== -1) {
            clearTimeout(saved);
        }
        saved = setTimeout(() => {
            saved = -1;
        }, 2000);
    };

    const doLoad = async () => {
        if (!data.is_tauri) return;
        const text = await loadFile();
        if (!text) return;

        const parsed = parseMarkdownWithMetadata(text);

        title = parsed.metadata.title;
        tags = parsed.metadata.tags;
        post = parsed.data;

        if (loaded !== -1) {
            clearTimeout(loaded);
        }
        loaded = setTimeout(() => {
            loaded = -1;
        }, 2000);
    };

    const doChangeFocus = (e: KeyboardEvent) => {
        if (keyInput(e, '.', ['ctrl'])) {
            isPreview = !isPreview;
        }
    };

    onMount(() => {
        window.addEventListener('keydown', doChangeFocus);
    });
</script>

<svelte:head>
    <title>글쓰기 - 블로그</title>
</svelte:head>

<small>(뭔가 시도하려다 포기한 흔적)</small>
<!-- svelte-ignore a11y-no-redundant-roles -->
<fieldset role="group">
    <input placeholder="제목" bind:value={title} class:tauri={data.is_tauri} />
    {#if data.is_tauri}
        <button on:click={doLoad}>
            {#if loaded !== -1}
                <div class="spin">
                    <Check size="22" />
                </div>
            {:else}
                열기
            {/if}
        </button>
    {/if}
    <button on:click={doSubmit} disabled={!title || !tags || !post}>
        {#if saved !== -1}
            <div class="spin">
                <Check size="22" />
            </div>
        {:else if data.is_tauri}
            저장
        {:else}
            복사
        {/if}
    </button>
</fieldset>
<TagSelector bind:tags dataTags={data.tags ?? []} />
<div role="group">
    <button class={isPreview ? 'secondary' : ''} on:click={() => (isPreview = false)}
        >마크다운</button
    >
    <button class={isPreview ? '' : 'secondary'} on:click={() => (isPreview = true)}
        >미리보기</button
    >
</div>
{#if isPreview}
    <Markdown data={post} />
{:else}
    <Editor bind:post doSave={doSubmit} />
{/if}

<style>
    small {
        font-style: italic;
        color: gray;
    }
    fieldset input {
        flex: 11;
    }
    fieldset input.tauri {
        flex: 22;
    }
    fieldset button {
        text-wrap: nowrap;
        flex: 1;
    }
    .spin {
        animation: spin 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
    }

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
</style>
