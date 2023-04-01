import { CheckSquareOutlined } from "@ant-design/icons"
import { InputState } from "../../../Input/InputState";
import { taskCommand } from "../../../../../ipcs";
import dayjs from "dayjs";


type EditConfirmButtonProps = {
    task: InputState;
    setFetch: React.Dispatch<React.SetStateAction<boolean>>;
    isEditing: boolean;
    setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}


export const EditConfrimButton = ({task,setFetch,isEditing,setIsEditing}:EditConfirmButtonProps) => {


const handleClick = () => {
    

    task.is_completed = isFuture(task);
    taskCommand.update(task);
    setIsEditing(!isEditing);
    setFetch(true);
}


return (
    <CheckSquareOutlined onClick={handleClick} className="editConfirm"/>
)
    
}


//task.limit_date + task.limit_time が現時点より未来の場合Noを返す
const isFuture = (task:InputState) => {
    if (task.limit_date == undefined) {return "No"}

    let time = ""
    if (task.limit_time == undefined) { time = "23:59"}
    const now = dayjs();
    const limit = dayjs(task.limit_date +" "+ time);
    if (now.isBefore(limit)){
        return "No"
    } else {
        return "Yes"
    }
}