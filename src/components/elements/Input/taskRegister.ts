import { Model } from "../../../bindings/tasks";
import { taskCommand } from "../../../ipcs";
import { InputState } from "./InputState";



export const taskRegister = async (task:InputState) => {
    //const date = task.limit_date?.format("YYYY/MM/DD") ?? null;
    //const time = task.limit_time?.format("HH:mm") ?? null;
    const text = task.text === null ? "" : task.text;

    const res: Model = await taskCommand.create(
        task.title,
        text,
        null,
        (task.limit_date)?.toString() ?? null,
        (task.limit_time)?.toString() ?? null,
    );
    return res;
}