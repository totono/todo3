import { Model } from "../bindings/tasks";
import { invoke } from "@tauri-apps/api/tauri";
import { CompleteStatus } from "../bindings/status/CompleteStatus";

const getTasks = async() : Promise<Model[]> => {
    return await invoke("task_list");
} 

const create = async (
    title: string,
    text: string,
    filePath: string | null,
    limitDate: string | null,
    limitTime: string | null,
    ) => {
    let res:Model = await invoke(
      "create_task",
      {            
        title: title,
        text: text,
        filePath: "",
        limitDate: limitDate,
        limitTime: limitTime,
      }
    )
    return res;
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

const changeStatus = async (id: number, status: CompleteStatus) => {
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
    getTasks,
    create,
    changeStatus,
    setNotification,
    logicalDelete,
} as const;