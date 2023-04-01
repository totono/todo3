//! `SeaORM` Entity. Generated by sea-orm-codegen 0.11.1

use async_trait::async_trait;
use sea_orm::{entity::prelude::*,ActiveValue::Set};
use serde::{Serialize,Deserialize};
use super::status;
use chrono::prelude::*;
use ts_rs::TS;

#[derive(Clone, Debug, PartialEq, DeriveEntityModel, Eq, Serialize, Deserialize,TS)]
#[sea_orm(table_name = "tasks")]
#[ts(export, export_to = "src\\bindings\\tasks.ts" )]
pub struct Model {
    #[sea_orm(primary_key)]
    pub id: i32,
    pub title: String,
    pub text: Option<String>,
    pub file_path: Option<String>,
    pub completed_at: Option<String>,
    pub is_completed: status::Completed,
    pub limit_date: Option<String>,
    pub limit_time: Option<String>,
    pub should_notify: status::ShouldNotify,
    pub create_at: String,
    pub update_at: Option<String>,
    pub deleted_at: Option<String>,
    pub is_deleted: status::Deleted,
}

#[derive(Copy, Clone, Debug, EnumIter, DeriveRelation)]
pub enum Relation {}

#[async_trait]
impl ActiveModelBehavior for ActiveModel {

    fn new() -> Self {
        let current_time  = Local::now().format("%Y/%M/%d %H:%M:%S").to_string().to_owned();
        Self { 
            create_at: Set(current_time),
            ..ActiveModelTrait::default()
            }
    }



    async fn before_save<C>(mut self, _db: &C, _insert: bool) -> Result<Self, DbErr>
    where
        C: ConnectionTrait,
    {
        let current_time  = Local::now().format("%Y/%M/%d %H:%M:%S").to_string().to_owned();
        self.update_at = Set(Some(current_time));

        Ok(self)
    }
}