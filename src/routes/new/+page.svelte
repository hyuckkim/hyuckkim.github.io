<script lang="ts">
    import { _fetchData } from "$lib";
    import Markdown from "$lib/components/markdown.svelte";

    $: isPreview = false;
    let title = "";
    let tags = "";
    let post = "";
    let area: HTMLTextAreaElement;

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

    const handleShortcut = (e: KeyboardEvent) => {
        const keyInput = (key: string, attr: ("ctrl" | "shift" |"alt")[] = [], ev: KeyboardEvent = e) => {
            if (attr.includes("ctrl") && !ev.ctrlKey) return false;
            if (attr.includes("shift") && !ev.shiftKey) return false;
            if (attr.includes("alt") && !ev.altKey) return false;

            if (e.key !== key) return false;
            return true;
        }

        if (keyInput("Tab")) {
            const tabText = "    ";
            const ln = (idx: number) => (post.slice(0, idx).match(/\n/g) || []).length;
            const startPos = area.selectionStart, endPos = area.selectionEnd;
            const startLn = ln(startPos), endLn = ln(endPos);
            e.preventDefault();
            if (e.shiftKey) {
                const firsthasTab = post.split('\n')[startLn].startsWith(tabText);
                const hasTabLength = post.split('\n').filter((l, i) => (i >= startLn && i <= endLn && l.startsWith(tabText))).length;
                post = post.split('\n').map((l, i) => (i >= startLn && i <= endLn && l.startsWith(tabText)) ? l.slice(tabText.length) : l).join('\n');
                setTimeout(() => {
                    area.setSelectionRange(startPos - (firsthasTab ? tabText.length : 0), endPos - hasTabLength * (endLn - startLn + 1));
                }, 0);
            }
            else {
                if (startLn === endLn) {
                    post = [...post.slice(0, startPos), tabText, ...post.slice(endPos)].join('');
                    setTimeout(() => {
                        area.setSelectionRange(startPos + tabText.length, startPos + tabText.length);
                    }, 0);
                }
                else {
                    post = post.split('\n').map((l, i) => (i >= startLn && i <= endLn) ? tabText + l : l).join('\n');
                    setTimeout(() => {
                        area.setSelectionRange(startPos + tabText.length, endPos + tabText.length * (endLn - startLn + 1));
                    }, 0);
                }
            }
        }
        if (keyInput("s", ["ctrl"])) {
            doSubmit();
            e.preventDefault();
        }

        if (keyInput(".", ["ctrl"])) {
            isPreview = true;

            setTimeout(() => {
                const event = (e: KeyboardEvent) => {
                    if (keyInput(".", ["ctrl"], e)) {
                        isPreview = false;
                        window.removeEventListener("keydown", event);
                        setTimeout(() => {
                            if (area) area.focus();
                        }, 0);
                    }
                };
                window.addEventListener("keydown", event);
            }, 0);
        }
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
</style>