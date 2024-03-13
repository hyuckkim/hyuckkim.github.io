export const keyInput = (
    ev: KeyboardEvent,
    key: string,
    attr: ('ctrl' | 'shift' | 'alt')[] = []
) => {
    if (attr.includes('ctrl') && !ev.ctrlKey) return false;
    if (attr.includes('shift') && !ev.shiftKey) return false;
    if (attr.includes('alt') && !ev.altKey) return false;

    if (ev.key !== key) return false;
    return true;
};
