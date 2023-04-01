/** @jsxImportSource @emotion/react */
import "dayjs/locale/ja";
import { TimeForm } from "./DateTime/TimeForm";
import { initialState, InputState } from "./InputState";
import { DateForm } from "./DateTime/DateForm";
import { InputForm } from "./Title/TitleForm";
import { inputTaskStyle } from "./inputTaskStyle";
import { useState } from "react";
import dayjs from "dayjs";

type InputProps = {
  setFetch: React.Dispatch<React.SetStateAction<boolean>>;
};


export const InputTask = ({
  setFetch,
}: InputProps): JSX.Element => {
  const [task, setTask] = useState(initialState);

  return (
    <div css={inputTaskStyle}>
      <DateForm
        task={task}
        setTask={setTask}
        value={task.limit_date ? dayjs(task.limit_date) : null} 
      />
      <TimeForm
        task={task}
        setTask={setTask}
        value={task.limit_time}
      />
      <InputForm
        task={task}
        setTask={setTask}
        value={task.title}
        setFetch={setFetch}
      />
    </div>
  );
};
