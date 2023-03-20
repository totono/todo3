use tauri::AppHandle;
use tauri::Manager;
use tauri::RunEvent;

pub fn run_event() -> Box<dyn Fn(&AppHandle, RunEvent) + Send + Sync + 'static> {
    Box::new(|_app_handle, event| {
        if let RunEvent::ExitRequested { api, .. } = event {
            api.prevent_exit();
        }
    })
}
