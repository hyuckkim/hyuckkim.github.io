import { invoke } from '@tauri-apps/api/tauri';
import { save, open } from '@tauri-apps/api/dialog';
import { readTextFile, writeTextFile } from '@tauri-apps/api/fs';

export async function checkTauri() {
    try {
        return (await invoke('tauri_loaded')) as boolean;
    } catch {
        return false;
    }
}

export async function saveFile(data: string) {
    const filePath = await save({
        filters: [
            {
                name: 'YAML이 있는 마크다운 파일',
                extensions: ['md']
            },
            {
                name: '아무 파일',
                extensions: ['*']
            }
        ]
    });
    if (!filePath) return;

    await writeTextFile(filePath, data);
}

export async function loadFile() {
    let filePath = await open({
        filters: [
            {
                name: 'YAML이 있는 마크다운 파일',
                extensions: ['md']
            },
            {
                name: '아무 파일',
                extensions: ['*']
            }
        ]
    });
    if (!filePath) return;
    if (typeof filePath === 'object') {
        filePath = filePath[0];
    }

    return await readTextFile(filePath);
}
