#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]


use mutation::*;
use query::{task_list};
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

    tauri::Builder::default()
        .plugin(tauri_plugin_single_instance::init(|app , _argv, _cwd|{
            if let Some(window) = app.get_window("main"){
                if let Err(e) = window.unminimize() {
                    println!("failed to unminimize window: {e}");
                }
                if let Err(e) = window.set_focus() {
                    println!("failed to set focus: {e}");
                }
            }
        }))
        .plugin(tauri_plugin_window_state::Builder::default().build())
        .system_tray(create_system_tray())
        .on_system_tray_event(system_tray_event)
        .setup(|app| {
            tauri::async_runtime::block_on(async move {
                app.manage(initilize().await);
            });
            Ok(())
        })
        .on_window_event(|event| {
            if let tauri::WindowEvent::CloseRequested { api, .. } = event.event() {
                event.window().minimize().unwrap();
                let window = event.window().get_window("main").expect("falied to get window");
                window.set_skip_taskbar(true).unwrap();
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
        .run(tauri::generate_context!())
        .expect("error while running tauri application")
}
