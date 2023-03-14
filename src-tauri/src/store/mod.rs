use sea_orm::{Database,DatabaseConnection};
use tauri::State as TauriState;
use std::sync::Arc;

#[derive(Debug)]
pub struct AppState{
    pub db : Arc<DatabaseConnection>
}

impl AppState{
    pub async fn new() -> Self {
        let url = dotenv::var("DATABASE_URL").expect("DATABASE_URL is not set in .env file");
        let conn: DatabaseConnection = Database::connect(url).await.expect("Database connection failed");
        Self {
            db : Arc::new(conn)
        } 
    }
}

pub type State<'a> = TauriState<'a, AppState>;


/* 
#[allow(dead_code)]
pub struct Store {
    conn: DatabaseConnection,
}

impl Store {
    pub async fn new() -> Self  {

        let url = dotenv::var("DATABASE_URL").expect("DATABASE_URL is not set in .env file");
        let conn: DatabaseConnection = Database::connect(url).await.expect("Database connection failed");
        Store { conn }
    }

}
*/