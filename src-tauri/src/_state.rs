use sea_orm::DatabaseConnection;
use tauri::State as TauriState;
use std::sync::Arc;

#[derive(Debug)]
pub struct AppState{
    pub db : Arc<DatabaseConnection>
}

impl AppState{
    pub async fn new() -> Self {
        let url = dotenv::var("DATABASE_URL").expect("DATABASE_URL is not set in .env file");
    }
}

pub type State<'a> = TauriState<'a, AppState>;