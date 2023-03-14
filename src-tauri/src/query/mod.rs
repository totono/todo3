use ::entity::{tasks, tasks::Entity as Tasks , status::CompleteStatus, status::DeleteStatus};
use sea_orm::prelude::*;

use crate::store::State;


#[tauri::command(async)]
pub async fn task_list(
    state: State<'_>,
    //id: i32
) -> Result<Option<Vec<tasks::Model>>,String> {
    let db = state.db.clone();
    match Tasks::find().all(&*db).await {
        Ok(tasks) => Ok(Some(tasks)),
        Err(err) => Err(format!("{err:?}")),
    }
}
