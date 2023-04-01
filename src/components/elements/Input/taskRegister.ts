import { Model } from "../../../bindings/tasks";
import { taskCommand } from "../../../ipcs";
import { InputState } from "./InputState";



export const taskRegister = async (task:InputState) => {
    const date = task.date?.format("YYYY/MM/DD") ?? null;
    const time = task.time?.format("HH:mm") ?? null;

    const res: Model = await taskCommand.create(
        task.title,
        task.text,
        null,
        date,
        time,
    );
    return res;
}