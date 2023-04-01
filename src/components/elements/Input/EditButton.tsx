import { EditOutlined } from "@ant-design/icons";
import { taskCommand } from "../../../ipcs";

type EditButtonProps  = {
    isEditing: boolean;
    setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}



export const EditButton = ({setIsEditing,isEditing}:EditButtonProps) => {

    const handleClick = () => {
        setIsEditing(!isEditing);
    }
    
  return <EditOutlined onClick={handleClick}/>;
};
