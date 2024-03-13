<script lang="ts">
    import Markdown from '$lib/components/markdown.svelte';
    import { Check } from 'lucide-svelte';
    import type { PageData } from './$types';
    import SelectableTag from './components/selectableTag.svelte';

    $: isPreview = false;

    export let data: PageData;

    let title = '';
    let tags = '';
    $: lastTag = tags.split(', ').reverse()[0];
    $: tagsThatStartWithLastTag = (data?.tags ?? [])
        .filter((v) => v.startsWith(lastTag))
        .sort((a, b) => a.length - b.length);

    let post = '';
    let area: HTMLTextAreaElement;

    let saved = false;

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

    const doSubmit = () => {
        navigator.clipboard.writeText(getStr());
        saved = true;
        setTimeout(() => {
            saved = false;
        }, 3000);
    };

    const appendTag = (tag: string) =>
        (tags = [...tags.split(', ').reverse().slice(1).reverse(), tag].join(', '));

    const keyInput = (ev: KeyboardEvent, key: string, attr: ('ctrl' | 'shift' | 'alt')[] = []) => {
        if (attr.includes('ctrl') && !ev.ctrlKey) return false;
        if (attr.includes('shift') && !ev.shiftKey) return false;
        if (attr.includes('alt') && !ev.altKey) return false;

        if (ev.key !== key) return false;
        return true;
    };

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

    const handleShortcut = (e: KeyboardEvent) => {
        if (keyInput(e, 'Tab')) {
            const tabText = '    ';
            const ln = (idx: number) => (post.slice(0, idx).match(/\n/g) || []).length;
            const startPos = area.selectionStart,
                endPos = area.selectionEnd;
            const startLn = ln(startPos),
                endLn = ln(endPos);
            e.preventDefault();
            if (e.shiftKey) {
                const firsthasTab = post.split('\n')[startLn].startsWith(tabText);
                const hasTabLength = post
                    .split('\n')
                    .filter((l, i) => i >= startLn && i <= endLn && l.startsWith(tabText)).length;
                post = post
                    .split('\n')
                    .map((l, i) =>
                        i >= startLn && i <= endLn && l.startsWith(tabText)
                            ? l.slice(tabText.length)
                            : l
                    )
                    .join('\n');
                setTimeout(() => {
                    area.setSelectionRange(
                        startPos - (firsthasTab ? tabText.length : 0),
                        endPos - hasTabLength * (endLn - startLn + 1)
                    );
                }, 0);
            } else {
                if (startLn === endLn) {
                    post = [...post.slice(0, startPos), tabText, ...post.slice(endPos)].join('');
                    setTimeout(() => {
                        area.setSelectionRange(
                            startPos + tabText.length,
                            startPos + tabText.length
                        );
                    }, 0);
                } else {
                    post = post
                        .split('\n')
                        .map((l, i) => (i >= startLn && i <= endLn ? tabText + l : l))
                        .join('\n');
                    setTimeout(() => {
                        area.setSelectionRange(
                            startPos + tabText.length,
                            endPos + tabText.length * (endLn - startLn + 1)
                        );
                    }, 0);
                }
            }
        }
        if (keyInput(e, 's', ['ctrl'])) {
            doSubmit();
            e.preventDefault();
        }

        if (keyInput(e, '.', ['ctrl'])) {
            isPreview = true;

            setTimeout(() => {
                const event = (e: KeyboardEvent) => {
                    if (keyInput(e, '.', ['ctrl'])) {
                        isPreview = false;
                        window.removeEventListener('keydown', event);
                        setTimeout(() => {
                            if (area) area.focus();
                        }, 0);
                    }
                };
                window.addEventListener('keydown', event);
            }, 0);
        }
    };
</script>

<svelte:head>
    <title>글쓰기 - 블로그</title>
</svelte:head>

<small>(뭔가 시도하려다 포기한 흔적)</small>
<!-- svelte-ignore a11y-no-redundant-roles -->
<fieldset role="group">
    <input placeholder="제목" bind:value={title} />
    <button value="복사" on:click={doSubmit} disabled={!title || !tags || !post}>
        {#if saved}
            <div class="spin">
                <Check size="22" />
            </div>
        {:else}
            복사
        {/if}
    </button>
</fieldset>
<input placeholder="태그" bind:value={tags} on:keydown={handleTag} />
{#if !!tagsThatStartWithLastTag}
    <div role="list" class="searchTags">
        {#each tagsThatStartWithLastTag.slice(0, 5) as tag}
            <SelectableTag {tag} onClick={() => appendTag(tag)} />
        {/each}
    </div>
{/if}
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
    <textarea bind:this={area} bind:value={post} on:keydown={handleShortcut} />
{/if}

<style>
    small {
        font-style: italic;
        color: gray;
    }
    textarea {
        height: 500px;
        font-size: 14px;
        resize: none;
        padding: 8px;
    }
    fieldset input {
        flex: 11;
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

    .searchTags {
        height: 31px;
        margin-bottom: 12px;
        overflow: hidden;
    }
</style>
