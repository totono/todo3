use tauri::{AppHandle, CustomMenuItem, SystemTray, SystemTrayEvent, SystemTrayMenu};
use tauri::{Manager};

pub fn create_system_tray() -> SystemTray {
    let quit = CustomMenuItem::new("quit".to_string(), "Quit");
    let open = CustomMenuItem::new("open".to_string(), "Open");
    let tray_menu = SystemTrayMenu::new().add_item(open).add_item(quit);

    SystemTray::new().with_menu(tray_menu)
}

pub fn system_tray_event(app_handle: &AppHandle, event: SystemTrayEvent) {
    let window = app_handle.get_window("main").expect("failed to get window");
    match event {
        SystemTrayEvent::LeftClick {
            position: _,
            size: _,
            ..
        } => {
            window.set_skip_taskbar(false).unwrap();
            window.unminimize().unwrap();
            window.set_focus().unwrap();
        }

        SystemTrayEvent::MenuItemClick { id, .. } => match id.as_str() {
            "open" => {
                window.set_skip_taskbar(false).unwrap();
                window.unminimize().unwrap();
                window.set_focus().unwrap();
            }
            "quit" => {
                std::process::exit(0);
            }
            _ => {}
        },
        _ => {}
    }
}
