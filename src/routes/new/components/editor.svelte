<script lang="ts">
    import { keyInput } from '../utils';

    const tabText = '    ';

    let area: HTMLTextAreaElement;
    let areaDummy: HTMLDivElement;

    export let post: string;
    export let doSave: () => void;

    const handleShortcut = (e: KeyboardEvent) => {
        if (keyInput(e, 'Tab')) {
            e.preventDefault();

            const startPos = area.selectionStart,
                endPos = area.selectionEnd;
            const splitted = post.split('\n');
            const ln = (idx: number) => (post.slice(0, idx).match(/\n/g) || []).length;

            const startLn = ln(startPos),
                endLn = ln(endPos);
            const onFocus = (idx: number) => idx >= startLn && idx <= endLn;

            const tabSingleLine = () => {
                post = [...post.slice(0, startPos), tabText, ...post.slice(endPos)].join('');
                setTimeout(() => {
                    area.setSelectionRange(startPos + tabText.length, startPos + tabText.length);
                }, 0);
            };
            const tabMultiLine = () => {
                post = splitted.map((l, i) => (onFocus(i) ? tabText + l : l)).join('\n');
                setTimeout(() => {
                    area.setSelectionRange(
                        startPos + tabText.length,
                        endPos + tabText.length * (endLn - startLn + 1)
                    );
                }, 0);
            };
            const unTabLine = () => {
                const firsthasTab = splitted[startLn].startsWith(tabText);
                const hasTabLength = splitted.filter(
                    (l, i) => onFocus(i) && l.startsWith(tabText)
                ).length;
                post = splitted
                    .map((l, i) =>
                        onFocus(i) && l.startsWith(tabText) ? l.slice(tabText.length) : l
                    )
                    .join('\n');

                setTimeout(() => {
                    area.setSelectionRange(
                        startPos - (firsthasTab ? tabText.length : 0),
                        (ln(endPos - hasTabLength * tabText.length) === endLn
                            ? endPos
                            : splitted.slice(0, endLn).join('\n').length + tabText.length + 1) -
                            hasTabLength * tabText.length
                    );
                }, 0);
            };

            if (e.shiftKey) {
                unTabLine();
            } else {
                if (startLn === endLn) {
                    tabSingleLine();
                } else {
                    tabMultiLine();
                }
            }
        }
        if (keyInput(e, 's', ['ctrl'])) {
            doSave();
            e.preventDefault();
        }
        if (keyInput(e, 'Escape')) {
            changeFocusToDummy();
            e.preventDefault();
        }
    };

    const changeFocusToDummy = () => {
        areaDummy.tabIndex = 0;
        areaDummy.focus();
        area.tabIndex = -1;

        const handleBlur = () => {
            areaDummy.tabIndex = -1;
            area.tabIndex = 0;
            areaDummy.removeEventListener('blur', handleBlur);
        };
        areaDummy.addEventListener('blur', handleBlur);
    };
</script>

<textarea bind:this={area} bind:value={post} on:keydown={handleShortcut} />
<div bind:this={areaDummy} />

<style>
    textarea {
        height: 500px;
        font-size: 14px;
        resize: none;
        padding: 8px;
    }
</style>
