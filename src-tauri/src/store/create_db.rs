use std::fs;

use migration::{Migrator, MigratorTrait};
use sea_orm::{Database, DatabaseConnection};
use sqlx::{migrate::MigrateDatabase};

pub async fn create_db(db_path: &str) -> Result<DatabaseConnection, sqlx::Error> {
    let db_uri: &str = "store/database.db";

    fs::DirBuilder::new().recursive(true).create("store")?;

    if !sqlx::Sqlite::database_exists(db_uri).await? {
        println!("Creating database: {db_uri}");
        sqlx::Sqlite::create_database(db_uri).await?;
    }

    let db: DatabaseConnection = Database::connect(db_path)
        .await
        .expect("Database connection failed");
    Migrator::up(&db, None).await.expect("migration failed");

    Ok(db)
}
