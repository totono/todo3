/** @jsxImportSource @emotion/react */
import { EditOutlined } from "@ant-design/icons";
import { taskCommand } from "../../../../../ipcs";
import { deleteButtonStyle, editButtonStyle } from "./buttonStyle";

type EditButtonProps  = {
    isEditing: boolean;
    setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}



export const EditButton = ({setIsEditing,isEditing}:EditButtonProps) => {

    const handleClick = () => {
        setIsEditing(!isEditing);
    }
    
  return <EditOutlined
    css={editButtonStyle(isEditing)}
    onClick={handleClick}
    />;
};
