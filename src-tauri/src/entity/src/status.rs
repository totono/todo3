use sea_orm::entity::prelude::*;
use serde::{Serialize, Deserialize};
use ts_rs::TS;

#[derive(TS,Serialize,Deserialize,EnumIter, DeriveActiveEnum, Debug, Clone, PartialEq, Eq)]
#[sea_orm(rs_type = "i32", db_type = "Integer")]
#[ts(export)]
pub enum Completed{
    No = 0,
    Yes = 1,
}

#[derive(TS,Serialize, Deserialize, EnumIter, DeriveActiveEnum, Debug, Clone, PartialEq, Eq)]
#[sea_orm(rs_type = "i32", db_type = "Integer")]
#[ts(export)]
pub enum Deleted{
    No = 0,
    Yes = 1,
}

#[derive(TS,Serialize, Deserialize, EnumIter, DeriveActiveEnum, Debug, Clone, PartialEq, Eq)]
#[sea_orm(rs_type = "i32", db_type = "Integer")]
#[ts(export)]
pub enum ShouldNotify{
    No = 0,
    Yes = 1,
}