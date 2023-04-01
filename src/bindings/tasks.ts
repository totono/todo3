// This file was generated by [ts-rs](https://github.com/Aleph-Alpha/ts-rs). Do not edit this file manually.
import type { Completed } from ".\\status\\CompleteStatus";
import type { Deleted } from ".\\status\\DeleteStatus";
import type { ShouldNotify } from ".\\status\\ShouldNotify";

export interface Model { id: number, title: string, text: string | undefined, file_path: string | null, completed_at: string | null, is_completed: Completed, limit_date: string | undefined, limit_time: string | undefined, should_notify: ShouldNotify, create_at: string, update_at: string | null, deleted_at: string | null, is_deleted: Deleted, }