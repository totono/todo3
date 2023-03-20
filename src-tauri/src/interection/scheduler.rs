use chrono::{Local, NaiveTime};
use entity::tasks::Model;
use std::collections::HashMap;
use tauri::api::notification::Notification;
use tokio::{task, time};

#[derive(Debug)]
pub struct Scheduler {
    schedule: HashMap<String, task::JoinHandle<()>>,
}

impl Scheduler {
    pub fn new() -> Scheduler {
        Self {
            schedule: HashMap::new(),
        }
    }

    pub fn insert(&mut self, task: Model) {
        println!("notificaiton insert ");
        let context = tauri::generate_context!("tauri.conf.json");
        let handle = tokio::spawn(async move {
            let time = NaiveTime::parse_from_str(&task.limit_time.unwrap(), "%H:%M").unwrap();
            let now = Local::now().time();
            let diff = (time - now).num_seconds();

            if diff.is_positive() {
                println!("Setting notification");
                println!("alart in {diff} secs");
                let sleeptime: u64 = diff.try_into().unwrap();
                time::sleep(time::Duration::from_secs(sleeptime)).await;
                println!("alart!");
                Notification::new(&context.config().tauri.bundle.identifier)
                    .title("タスクの時間です")
                    .body(&task.title)
                    .show()
                    .unwrap();
            }
        });

        self.schedule.insert(task.id.to_string(), handle);
    }

    pub async fn delete(&mut self, id: i32) {
        if let Some(handle) = self.schedule.get_mut(&id.to_string()) {
            handle.abort();
        }
    }
}
