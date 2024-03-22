import { invoke } from '@tauri-apps/api/tauri';
import { save } from '@tauri-apps/api/dialog';
import { writeTextFile } from '@tauri-apps/api/fs';

export async function checkTauri() {
    try {
        return (await invoke('tauri_loaded')) as boolean;
    }
    catch {
        return false;
    }
}

export async function saveFile(data: string) {
    const filePath = await save({});
    console.log("!!!");
    if (!filePath) return;

    await writeTextFile(filePath, data);
}