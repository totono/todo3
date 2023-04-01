import { Input } from "antd";
import { InputState } from "../../../Input/InputState";
import { SetStateAction, Dispatch } from "react";

type EditTitleFormProps = {
  taskState: InputState;
  setTaskState: Dispatch<SetStateAction<InputState>>;
};

export const EditTitleForm = ({ taskState, setTaskState }:EditTitleFormProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskState({ ...taskState, title: e.target.value });
};

  return <Input value={taskState.title} onChange={handleChange} />;
};
