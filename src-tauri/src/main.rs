// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![tauri_loaded])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}

#[tauri::command]
fn tauri_loaded() -> bool {
  return true;
}