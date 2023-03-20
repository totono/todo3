#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use interection::scheduler2::Scheduler2;
use mutation::*;
use query::{task_list, todays_task};
use run_event::run_event;
use store::AppState;
use system_tray::{create_system_tray, system_tray_event};
use tauri::Manager;

use crate::interection::set_notification;

mod interection;
mod mutation;
mod query;
mod run_event;
mod store;
mod system_tray;

async fn initilize() -> store::AppState {
    let store = AppState::new().await;

    //if let Ok(Some(tasks)) = todays_task(&store).await {
    //    for task in tasks {
    //        let mut sched = store.scheduler.lock().unwrap();
    //        sched.insert(task);
    //    }
    //}
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

                //let mut sched = Scheduler2::new(app).await;
                //sched.add("TEXT".to_string()).await;
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
            set_notification,
        ])
        .build(tauri::generate_context!())
        .expect("error while running tauri application")
        .run(run_event());
}
