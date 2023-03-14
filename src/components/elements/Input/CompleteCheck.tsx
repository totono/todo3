import { Model } from "../../../bindings/tasks";
import { CompleteStatus } from "../../../bindings/status/CompleteStatus";
import { taskCommand } from "../../../ipcs";

export const CompleteCheck = (props:any) => {
    console.log(props.data) 
    const checkHandle = (e:any) => {
        taskCommand.changeTaskStatus(parseInt(e.target.value),"Completed");
    }
    
    return (
        <input 
            className="project-check"
            type = "checkbox"
            value = {props.data}
            onChange = {checkHandle}
        />
    )
}