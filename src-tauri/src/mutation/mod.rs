use ::entity::{status::Completed, status::Deleted,status::ShouldNotify, tasks, tasks::Entity as Tasks};
use chrono::*;
use sea_orm::{prelude::*, ActiveValue::Set};

use crate::store::State;

#[tauri::command(async)]
pub async fn create_task(
    state: State<'_>,
    title: String,
    limit_date: String,
    limit_time: Option<String>,
    should_notify: ShouldNotify,
    text: Option<String>,
    file_path: Option<String>,
) -> Result<tasks::Model, String> {
    let new_task = tasks::ActiveModel {
        title: Set(title),
        text: Set(text),
        should_notify: Set(should_notify),
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
pub async fn update_notify_status(
    state: State<'_>,
    id: i32,
    status: ShouldNotify,
) -> Result<tasks::Model, String> {
    let db = state.db.clone();

    let task = tasks::ActiveModel {
        id: Set(id),
        should_notify: Set(status),
        ..Default::default()
    };

    match task.update(&*db).await {
        Ok(v) => Ok(v),
        Err(e) => Err(format!("{e:?}")),
    }
}

#[tauri::command(async)]
pub async fn update_text(
    state: State<'_>,
    id: i32,
    text: String,
) -> Result<tasks::Model, String> {
    let db = state.db.clone();

    let task = tasks::ActiveModel {
        id: Set(id),
        text: Set(Some(text)),
        ..Default::default()
    };

    match task.update(&*db).await {
        Ok(v) => Ok(v),
        Err(e) => Err(format!("{e:?}")),
    }
}


#[tauri::command(async)]
pub async fn update_task(
    state: State<'_>,
    id: i32,
    title: String,
    limit_date: String,
    limit_time: Option<String>,
    text: Option<String>,
    file_path: Option<String>,
    is_completed: Completed,
) -> Result<tasks::Model, String> {
    let db = state.db.clone();

    let task = tasks::ActiveModel {
        id: Set(id),
        title: Set(title),
        text: Set(text),
        file_path: Set(file_path),
        limit_date: Set(Some(limit_date)),
        limit_time: Set(limit_time),
        is_completed: Set(is_completed),
        ..Default::default()
    };

    match task.update(&*db).await {
        Ok(v) => Ok(v),
        Err(e) => Err(format!("{e:?}")),
    }
}


#[tauri::command(async)]
pub async fn complete_task(
    state: State<'_>,
    id: i32,
    status: Completed,
) -> Result<tasks::Model, String> {
    let db = state.db.clone();
    let current_time = Local::now().format("%Y/%M/%d %H:%M:%S").to_string();

    let task = tasks::ActiveModel {
        id: Set(id),
        is_completed: Set(status),
        completed_at: Set(Some(current_time)),
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
        is_deleted: Set(Deleted::Yes),
        completed_at: Set(Some(current_time)),
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
