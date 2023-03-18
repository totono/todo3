import { Model } from "../bindings/tasks";
import { invoke } from "@tauri-apps/api/tauri";
import { CompleteStatus } from "../bindings/status/CompleteStatus";

const getTasks = async() : Promise<Model[]> => {
    return await invoke("task_list");
} 

const createTask = async (
    title: string,
    text: string,
    filePath: string,
    limitDate: string | undefined,
    limitTime: string | undefined,
    ) => {
    let e = await invoke(
      "create_task",
      {
        title: title,
        text: text,
        filePath: filePath,
        limitDate: limitDate,
        limitTime: limitTime,
            
      }
    )
}

const changeTaskStatus = async (id: number, status: CompleteStatus) => {
    let e = await invoke(
        "complete_task",
    {
        id : id,
        status: status
    })
}

const logicalDeleteTask = async (id:number) => {
    let e = await invoke(
        "logical_delete_task",
        {
            id: id
        }
    )

}

const physicalDeleteTask = async (id:number) => {
    let e = await invoke(
        "physical_delete_task",
        {
            id:id
        }
    )
}


export const taskCommand = {
    getTasks,
    createTask,
    changeTaskStatus,
} as const;