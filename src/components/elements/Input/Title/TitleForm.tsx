import { Input } from "antd";
import dayjs from "dayjs";
import { ChangeEventHandler, Dispatch, SetStateAction } from "react";
import { initialState, InputState } from "../InputState";
import { titleInputStyle } from "./titleInputStyle";
import { taskRegister } from "../taskRegister";

type InputFormProps = {
  task: InputState;
  setTask: Dispatch<SetStateAction<InputState>>;
  setFetch: Dispatch<SetStateAction<boolean>>;
  value: string;
};


export const InputForm = ({
  task,
  setTask,
  setFetch,
  value,
}: InputFormProps) => {

  const handleInput: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (event) => {
    setTask({ ...task, [event.target.name]: event.target.value });
  };

  const handleKeyDown = (e: any) => {
    if (task.title === "") return;
    if (e.key === "Enter") {
      taskRegister(task);
      setTask(initialState);
      setFetch(true);
      e.preventDefault();
    }
  };

  return (
    <Input
      css={titleInputStyle}
      placeholder="タスクを入力"
      name="title"
      value={value}
      onChange={handleInput}
      onKeyDown={handleKeyDown}
    />
  );
};
