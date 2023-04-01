/** @jsxImportSource @emotion/react */
import { DeleteOutlined } from "@ant-design/icons";
import { taskCommand } from "../../../../../ipcs";
import { deleteButtonStyle } from "./buttonStyle";

type DeleteButonProps = {
  setFetch: React.Dispatch<React.SetStateAction<boolean>>;
  id: number;
};

export const DeleteButton = ({ id, setFetch }: DeleteButonProps) => {
  const clickHandle = async () => {
    setFetch(true);
    taskCommand.logicalDelete(id);
  };

  return (
    <DeleteOutlined
      onClick={clickHandle}
      css={deleteButtonStyle}
    />
  );
};
