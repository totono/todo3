#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]


use mutation::*;
use query::{task_list};
use run_event::run_event;
use store::AppState;
use system_tray::{create_system_tray, system_tray_event};
use tauri::Manager;

mod mutation;
mod query;
mod run_event;
mod store;
mod system_tray;

async fn initilize() -> store::AppState {
    let store = AppState::new().await;
    store
}

//#[tokio::main]
fn main() {
    //let store = initilize().await;

    tauri::Builder::default()
        .system_tray(create_system_tray())
        .on_system_tray_event(system_tray_event)
        //.manage(store)
        .setup(|app| {
            tauri::async_runtime::block_on(async move {
                app.manage(initilize().await);
            });
            Ok(())
        })
        .on_window_event(|event| {
            if let tauri::WindowEvent::CloseRequested { api, .. } = event.event() {
                event.window().hide().unwrap();
                api.prevent_close();
            }
        })
        .invoke_handler(tauri::generate_handler![
            task_list,
            create_task,
            complete_task,
            logical_delete_task,
            physical_delete_task,
        ])
        .build(tauri::generate_context!())
        .expect("error while running tauri application")
        .run(run_event());
}
