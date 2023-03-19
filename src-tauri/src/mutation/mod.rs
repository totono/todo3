use std::sync::Arc;

//use entity::{status, projects::Model};
use ::entity::{status::CompleteStatus, status::DeleteStatus, tasks, tasks::Entity as Tasks};
use chrono::*;
use sea_orm::{prelude::*, sea_query::Expr, ActiveValue::Set, UpdateResult};

use crate::store::State;

#[tauri::command(async)]
pub async fn create_task(
    state: State<'_>,
    title: String,
    limit_date: String,
    limit_time: Option<String>,
    text: Option<String>,
    file_path: Option<String>,
) -> Result<tasks::Model, String> {
    let new_task = tasks::ActiveModel {
        title: Set(title),
        text: Set(text),
        file_path: Set(file_path),
        limit_date: Set(Some(limit_date)),
        limit_time: Set(limit_time),
        ..Default::default()
    };

    let db = state.db.clone();
    match new_task.insert(&*db).await {
        Ok(v) => Ok(v),
        Err(e) => Err(format!("{e:?}")),
    }
}

#[tauri::command(async)]
pub async fn complete_task(
    state: State<'_>,
    id: i32,
    status: CompleteStatus,
) -> Result<tasks::Model, String> {
    let db = state.db.clone();
    let current_time = Local::now().format("%Y/%M/%d %H:%M:%S").to_string();

    let task = tasks::ActiveModel {
        id: Set(id),
        completed: Set(status),
        completed_date: Set(Some(current_time)),
        ..Default::default()
    };

    match task.update(&*db).await {
        Ok(v) => Ok(v),
        Err(e) => Err(format!("{e:?}")),
    }
}

#[tauri::command(async)]
pub async fn logical_delete_task(state: State<'_>, id: i32) -> Result<tasks::Model, String> {
    let db = state.db.clone();
    let current_time = Local::now().format("%Y/%M/%d %H:%M:%S").to_string();

    let task = tasks::ActiveModel {
        id: Set(id),
        is_deleted: Set(DeleteStatus::Deleted),
        completed_date: Set(Some(current_time)),
        ..Default::default()
    };

    match task.update(&*db).await {
        Ok(v) => Ok(v),
        Err(e) => Err(format!("{e:?}")),
    }
}

#[tauri::command(async)]
pub async fn physical_delete_task(state: State<'_>, id: i32) -> Result<u64, String> {
    let db = state.db.clone();

    match Tasks::delete_by_id(id).exec(&*db).await {
        Ok(a) => Ok(a.rows_affected),
        Err(e) => Err(format!("{e:?}")),
    }
}
