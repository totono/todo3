import { Completed } from "../../../bindings/status/CompleteStatus";
import { Deleted } from "../../../bindings/status/DeleteStatus";
import { ShouldNotify } from "../../../bindings/status/ShouldNotify";


const today = () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const yyyy = today.getFullYear();
  
    return `${yyyy}/${mm}/${dd}`;
  };

export type InputState = {
    id: number;
    title: string;
    text: string | undefined;
    limit_date: string | undefined;
    limit_time: string | undefined;
    file_path: string | null;
    should_notify: ShouldNotify;
    is_completed: Completed;
    is_deleted: Deleted;
};


export const initialState: InputState = {
    id: 0,
    title: "",
    text: "",
    limit_date: today(),
    limit_time: undefined,
    file_path: "",
    should_notify: "Yes",
    is_completed: "No",
    is_deleted: "No",
};