/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { taskCommand } from "../../../ipcs";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { ChangeEventHandler, SetStateAction, useState } from "react";
import { TimePicker, DatePicker, Input, Checkbox } from "antd";
import "dayjs/locale/ja";
import dayjs, { Dayjs } from "dayjs";
import { Model } from "../../../bindings/tasks";

type InputProps = {
  task: state;
  setTask: React.Dispatch<React.SetStateAction<state>>;
  fetch: boolean;
  setFetch: React.Dispatch<React.SetStateAction<boolean>>;
};

const { TextArea } = Input;

const timeFormat = "HH:mm";
const dateFormat = "MM/DD";

const formStyle = css`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 3px;
  padding: 3px;
  @media (prefers-color-scheme: dark) {
    input,
    textarea {
      color: #d8d8d8;
      background-color: #02020298;
    }
  }
`;

const buttonStyle = css`
  transform: translateX(-50%);
  font-size: 20px;
  cursor: pointer;
`;

const Datetime = css`
  margin: 2px;
  padding: 0.3em 1em;
  border-radius: 8px;
  border: 1px solid transparent;
  font-size: 1em;
  font-weight: 200;
  font-family: inherit;
  color: #282828;
  background-color: #ffffff;
  transition: border-color 0.25s;
  box-shadow: 0 2px 2px rgba(32, 32, 32, 0.2);

  @media (prefers-color-scheme: dark) {
    color: #ffffff;
    background-color: #02020298;
  }
`;

const textInputStyle = css`
  width: 300px;
  min-width: 20px;
  margin: 1px;
  padding: 0.2em 1em;
  border-radius: 8px;
  border: 1px solid transparent;
  font-size: 1em;
  font-weight: 200;
  font-family: inherit;
  color: #5b5b5b;
  background-color: #ffffff;
  transition: border-color 0.25s;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
`;
const today = () => {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const yyyy = today.getFullYear();

  return `${yyyy}/${mm}/${dd}`;
};

type state = {
  title: string;
  text: string;
  date: Dayjs | null;
  time: Dayjs | null;
  filePath: string;
};

const initialState: state = {
  title: "",
  text: "",
  date: dayjs(today(), "YYYY/MM/DD"),
  time: null,
  filePath: "",
};

export const InputProject = ({
  task,
  setTask,
  fetch,
  setFetch,
}: InputProps): JSX.Element => {
  const handleKeyDown = (e: any) => {
    if (task.title === "") return;
    if (e.key === "Enter") {
      createTask();
      setTask(initialState);
      setFetch(true);
      e.preventDefault();
    }
  };

  const handleInput: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (event) => {
    setTask({ ...task, [event.target.name]: event.target.value });
  };

  const handleTimeInput = (time: Dayjs | null) => {
    setTask({ ...task, time: time });
  };

  const handleDateInput = (date: Dayjs | null) => {
    setTask({ ...task, date: date });
  };

  const createTask = async () => {
    const date = task.date?.format("YYYY/MM/DD") ?? null;
    const time = task.time?.format("HH:mm") ?? null;



    const res: Model = await taskCommand.create(
      task.title,
      task.text,
      null,
      date,
      time
    );
  };

  const clickHandle = () => {
    if (task.title === "") return;
    createTask();
    setTask(initialState);
    setFetch(true);
  };

  const disabledTime = () => {
    return {disabledHours: () => [0,1,2,3,4,5,6,7]}
  };

  return (
    <div css={formStyle}>
      <DatePicker
        css={Datetime}
        name="date"
        value={task.date}
        onChange={handleDateInput}
        format={dateFormat}
      />
      <TimePicker
        css={Datetime}
        name="time"
        value={task.time}
        onSelect={handleTimeInput}
        onChange={handleTimeInput}
        disabledTime={disabledTime}
        hideDisabledOptions={true}
        minuteStep={5}
        format={timeFormat}
      />
      <Input
        css={textInputStyle}
        placeholder="タスクを入力"
        name="title"
        value={task.title}
        onChange={handleInput}
        onKeyDown={handleKeyDown}
      />
      <AiOutlinePlusCircle css={buttonStyle} onClick={clickHandle} />
    </div>
  );
};
