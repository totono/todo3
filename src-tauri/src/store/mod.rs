use sea_orm::{Database, DatabaseConnection};
use std::sync::{Arc,Mutex};
use tauri::State as TauriState;

use create_db::create_db;

mod create_db;

#[derive(Debug)]
pub struct AppState {
    pub db: Arc<DatabaseConnection>,
}

impl AppState {
    pub async fn new() -> Self {
        let url = dotenv::var("DATABASE_URL").expect("DATABASE_URL is not set in .env file");
        //let conn: DatabaseConnection = Database::connect(url)
        //    .await
        //    .expect("Database connection failed");

        let db = create_db(&url).await.expect("Database connection failed");
        Self {
            db: Arc::new(db),
        }
    }
}

pub type State<'a> = TauriState<'a, AppState>;
