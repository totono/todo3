pub mod scheduler;
pub mod scheduler2;
use entity::tasks::Model;

use crate::store::State;

#[tauri::command(async)]
pub fn set_notification(state: State<'_>, task: Model) {
    println!("set_notification invoked on rust backend");
    let sched = state.scheduler.clone();

    let mut sched = sched.lock().unwrap();
    sched.insert(task);
}

#[tauri::command(async)]
pub async fn delete_notification(state: State<'_>, id: i32) {
    let sched = state.scheduler.clone();

    let mut sched = sched.lock().unwrap();

    sched.delete(id);
}
