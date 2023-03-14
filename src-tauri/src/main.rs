#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use mutation::*;
use query::task_list;
use store::AppState;

mod mutation;
mod query;
mod store;

#[tokio::main]
async fn main() {
    let store = AppState::new().await;
    tauri::Builder::default()
        .manage(store)
        .invoke_handler(tauri::generate_handler![
            task_list,
            create_task,
            complete_task,
            logical_delete_task,
            physical_delete_task,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
