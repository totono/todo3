import { Model } from "../bindings/tasks";
import { invoke } from "@tauri-apps/api/tauri";
import { Completed } from "../bindings/status/CompleteStatus";
import { ShouldNotify } from "../bindings/status/ShouldNotify";
import { InputState } from "../components/elements/Input/InputState";

const getTasks = async() : Promise<Model[]> => {
    return await invoke("task_list");
} 

const create = async (
    title: string,
    text: string,
    filePath: string | undefined,
    limitDate: string | undefined,
    limitTime: string | undefined,
    ) => {
    let res:Model = await invoke(
      "create_task",
      {            
        title: title,
        text: text,
        filePath: "",
        shouldNotify: "Yes",
        limitDate: limitDate,
        limitTime: limitTime,
      }
    )
    return res;
}


const updateText = async (
    id: number,
    text: string,
) => {
    let res:Model = await invoke(
        "update_text",
        {
            id: id,
            text: text,
        }
    );
}

const update = async (
    task:InputState) => {
    let res:Model = await invoke(
        "update_task",
        {
            id: task.id,
            title: task.title,
            text: task.text,
            filePath: "",
            limitDate: task.limit_date,
            limitTime: task.limit_time,
            isCompleted: task.is_completed,
        }
    );
}


const setNotification = async (
    task:Model
) => {
    let res =await invoke(
            "set_notification",
        {
            task
        })
    console.log(`invoked set_notification, res is ${res}`)
}

const setStatus = async (id: number, status: Completed) => {
    let e = await invoke(
        "complete_task",
    {
        id : id,
        status: status
    })
}

const logicalDelete = async (id:number) => {
    let e = await invoke(
        "logical_delete_task",
        {
            id: id
        }
    )

}

const physicalDelete = async (id:number) => {
    let e = await invoke(
        "physical_delete_task",
        {
            id:id
        }
    )
}


export const taskCommand = {
    updateText,
    update,
    getTasks,
    create,
    setStatus,
    setNotification,
    logicalDelete,
} as const;