use ::entity::{status::CompleteStatus, status::DeleteStatus, tasks, tasks::Entity as Tasks};
use chrono::Local;
use sea_orm::prelude::*;

use crate::store::{AppState, State};

#[tauri::command(async)]
pub async fn task_list(
    state: State<'_>,
    //id: i32
) -> Result<Option<Vec<tasks::Model>>, String> {
    let db = state.db.clone();
    match Tasks::find().all(&*db).await {
        Ok(tasks) => Ok(Some(tasks)),
        Err(err) => Err(format!("{err:?}")),
    }
}

pub async fn todays_task(state: &AppState) -> Result<Option<Vec<tasks::Model>>, String> {
    let db = state.db.clone();

    let now = Local::now().format("%Y/%m/%d").to_string();

    match Tasks::find()
        .filter(tasks::Column::LimitDate.contains(&now))
        .filter(tasks::Column::LimitTime.is_not_null())
        .all(&*db)
        .await
    {
        Ok(tasks) => Ok(Some(tasks)),
        Err(err) => Err(format!("{err:?}")),
    }
}
