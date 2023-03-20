use chrono::{Local, NaiveTime};
use entity::tasks::Model;
use std::collections::HashMap;
use std::sync::Arc;
use std::time::Duration;
use tauri::{api::notification::Notification, App};
use tokio::sync::Mutex;
use tokio::{task, time};
use tokio_cron_scheduler::{Job, JobScheduler, JobToRun};
use uuid::Uuid;

pub struct Scheduler2<'a> {
    schedules: HashMap<String, Uuid>,
    scheduler: Arc<Mutex<JobScheduler>>,
    app: &'a tauri::App,
}

impl<'a> Scheduler2<'a> {
    pub async fn new(app: &'a mut App) -> Scheduler2<'a> {
        Self {
            schedules: HashMap::new(),
            scheduler: Arc::new(Mutex::new(JobScheduler::new().await.unwrap())),
            app,
        }
    }

    pub async fn add(&mut self, task: Model) {
        if let Some(i) = self.schedules.get("123") {
            return;
        }

        let notify = Job::new_one_shot(Duration::from_secs(10), |_uuid, _lock| {
            println!("ONE SHOT JOB");
        })
        .unwrap();

        // lock the scheduler before adding a job
        let mut scheduler = self.scheduler.lock().await;

        let id = scheduler.add(notify).await.unwrap();

        // clone the Arc to pass it to the closure
        let scheduler = self.scheduler.clone();

        tokio::spawn(async move {
            // lock the scheduler before starting it
            let mut scheduler = scheduler.lock().await;
            scheduler.start().await;
        });
        self.schedules.insert(task.limit_date.unwrap(), id);
    }

    // pub async fn remove(&mut self, limit_date: String) {
    //     if let Some(i) = self.schedules.get_mut(&limit_date) {
    //         self.scheduler.remove(i).await.unwrap();
    //     }
    // }
}
