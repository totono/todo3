use sea_orm::entity::prelude::*;
use serde::{Serialize, Deserialize};
use ts_rs::TS;

#[derive(TS,Serialize,Deserialize,EnumIter, DeriveActiveEnum, Debug, Clone, PartialEq, Eq)]
#[sea_orm(rs_type = "i32", db_type = "Integer")]
#[ts(export)]
pub enum CompleteStatus{
    #[sea_orm(num_value = 0)]
    NotComplete,
    #[sea_orm(num_value = 1)]
    Completed,
}

#[derive(TS,Serialize, Deserialize, EnumIter, DeriveActiveEnum, Debug, Clone, PartialEq, Eq)]
#[sea_orm(rs_type = "i32", db_type = "Integer")]
#[ts(export)]
pub enum DeleteStatus{
    #[sea_orm(num_value = 0)]
    NotDelete,
    #[sea_orm(num_value = 1)]
    Deleted,
}