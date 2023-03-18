#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use mutation::*;
use query::{task_list, todays_task};
use run_event::run_event;
use store::AppState;
use system_tray::{create_system_tray, system_tray_event};

mod interection;
mod mutation;
mod query;
mod run_event;
mod store;
mod system_tray;

async fn initilize() -> store::AppState {
    let store = AppState::new().await;

    if let Ok(Some(tasks)) = todays_task(&store).await {
        for task in tasks {
            let mut sched = store.scheduler.lock().unwrap();
            sched.insert(task).await;
        }
    }
    store
}

#[tokio::main]
async fn main() {
    let store = initilize().await;

    tauri::Builder::default()
        .system_tray(create_system_tray())
        .on_system_tray_event(system_tray_event)
        .manage(store)
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
