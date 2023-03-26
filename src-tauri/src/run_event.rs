use tauri::AppHandle;
use tauri::Manager;
use tauri::RunEvent;

pub fn run_event() -> Box<dyn Fn(&AppHandle, RunEvent) + Send + Sync + 'static> {
    Box::new(|app_handle, event| {
        if let RunEvent::ExitRequested { api, .. } = event {
            let window = app_handle.get_window("main").expect("failed to get window");
            window.minimize().unwrap();
            window.set_skip_taskbar(true).unwrap();
            api.prevent_exit();
        }
    })
}
