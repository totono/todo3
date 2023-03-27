use std::fs;

use migration::{Migrator, MigratorTrait};
use sea_orm::{Database, DatabaseConnection};
use sqlx::{migrate::MigrateDatabase};
use tauri::api::path::local_data_dir;

pub async fn create_db() -> Result<DatabaseConnection, sqlx::Error> {
    let db_dir = "todo/store";

    let local_data = local_data_dir().unwrap().join(db_dir);
    fs::DirBuilder::new().recursive(true).create(&local_data)?;
    

    if !sqlx::Sqlite::database_exists(local_data.join("database.db").to_str().unwrap()).await? {
        sqlx::Sqlite::create_database(local_data.join("database.db").to_str().unwrap()).await?;
    }

    let db_uri = format!("sqlite://{}", local_data.join("database.db").to_str().unwrap());

    let db: DatabaseConnection = Database::connect(db_uri)
        .await
        .expect("Database connection failed");
    Migrator::up(&db, None).await.expect("migration failed");

    Ok(db)
}
