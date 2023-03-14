use sea_orm_migration::prelude::*;

#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .create_table(
                Table::create()
                    .table(Tasks::Table)
                    .if_not_exists()
                    .col(
                        ColumnDef::new(Tasks::Id)
                            .integer()
                            .not_null()
                            .auto_increment()
                            .primary_key(),
                    )
                    .col(ColumnDef::new(Tasks::Title).string().not_null())
                    .col(ColumnDef::new(Tasks::Text).string())
                    .col(ColumnDef::new(Tasks::FilePath).string())
                    .col(ColumnDef::new(Tasks::Completed).integer().not_null().default(0))
                    .col(ColumnDef::new(Tasks::CompletedDate).date_time())
                    .col(ColumnDef::new(Tasks::LimitDate).date_time())
                    .col(ColumnDef::new(Tasks::CreateDate).date_time().not_null())
                    .col(ColumnDef::new(Tasks::UpdateDate).date_time().not_null())
                    .col(ColumnDef::new(Tasks::DeletedDate).date_time())
                    .col(ColumnDef::new(Tasks::IsDeleted).integer().not_null().default(0))
                    .to_owned(),
            )
            .await
    }

    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .drop_table(Table::drop().table(Tasks::Table).to_owned())
            .await
    }
}

/// Learn more at https://docs.rs/sea-query#iden
#[derive(Iden)]
enum Tasks {
    Table,
    Id,
    Title,
    Text,
    FilePath,
    Completed,
    CompletedDate,
    LimitDate,
    CreateDate,
    UpdateDate,
    DeletedDate,
    IsDeleted,
}
