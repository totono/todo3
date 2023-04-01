/** @jsxImportSource @emotion/react */
import { Dispatch, SetStateAction } from "react";
import { InputState } from "../../Input/InputState";
import { DeleteButton } from "./buttons/DeleteButton";
import { EditButton } from "./buttons/EditButton";
import { contentStyle } from "./contentStyle";
import { Input } from "antd";
import { TextForm } from "./textarea/TextForm";

const {TextArea} = Input;

interface contentProps {
  taskState: InputState;
  setTaskState: Dispatch<SetStateAction<InputState>>;
  setFetch: Dispatch<SetStateAction<boolean>>;
  isEditing: boolean;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
}

export const Content = ({
  taskState,
  setFetch,
  setTaskState,
  isEditing,
  setIsEditing,
}: contentProps) => {
  return (
    <div css={contentStyle}>
      <div>
        <div>
          <TextForm id={taskState.id} value={taskState.text} />
        </div>
        <DeleteButton id={taskState.id} setFetch={setFetch} />
        <EditButton isEditing={isEditing} setIsEditing={setIsEditing} />
      </div>
    </div>
  );
};
