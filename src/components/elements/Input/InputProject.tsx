/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { taskCommand } from "../../../ipcs";
import { AiOutlinePlusCircle } from "react-icons/ai"
import { InputDateTime } from "./InputDatetime";
import { ChangeEventHandler, useState, } from "react";
import { TimePicker,DatePicker,Input,Checkbox } from "antd";
import 'dayjs/locale/ja';
import dayjs, { Dayjs } from "dayjs";

type InputProps = {
    fetch : number;
    setFetch: React.Dispatch<React.SetStateAction<number>>;
}

const { TextArea } = Input;

const today = () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2,"0");
    const mm = String(today.getMonth()+1).padStart(2,"0");
    const yyyy = today.getFullYear();

    return `${yyyy}-${mm}-${dd}`;
}

const timeFormat = 'HH:mm'

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
`


const buttonStyle = css`
    transform: translateX(-50%);
    font-size: 20px;
    cursor: pointer;  
`

const Datetime = css`
    margin: 2px;
    padding: 0.3em 1.0em;
    border-radius: 8px;
    border: 1px solid transparent;
    font-size: 1.0em;
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
`


const textInputStyle = css`
    width: 250px;
    min-width: 20px;
    margin: 1px;
    padding: 0.2em 1.0em;
    border-radius: 8px;
    border: 1px solid transparent;
    font-size: 1.0em;
    font-weight: 200;
    font-family: inherit;
    color: #5b5b5b;
    background-color: #ffffff;
    transition: border-color 0.25s;
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
`

export const InputProject = ({fetch,setFetch}:InputProps):JSX.Element  => {

  type state = {
    title: string,
    text: string,
    date: Dayjs|null,
    time: Dayjs|null,
    filePath: string
  }

  const initialState:state = {
    title: "",
    text: "",
    date: dayjs(today(),'YYYY-MM-DD'),
    time: null, 
    filePath: "",
  }
 
  const [task, setTask] = useState(initialState);

  const createTask = () => {
    const time = task.time != null ? task.time.format('HH:mm') : '       ';

    console.log(time)

    const limitDate = `${task.date?.format('YYYY/MM/DD')} ${time}`
    taskCommand.createTask(
      task.title,
      task.text,
      task.filePath,
      limitDate,
    );
  }
  
  const handleKeyDown = (e:any) => {
    if(task.title === '') return;
    if (e.key === 'Enter') {
      createTask();
      setTask(initialState);
      setFetch(fetch + 1);
    }
  }

  const handleInput:ChangeEventHandler<HTMLInputElement|HTMLTextAreaElement> = (event) => {
    setTask({...task,[event.target.name]: event.target.value})
  }

  const handleTimeInput = (time: Dayjs|null) => {
    setTask({...task,time:time})
  }

  const handleDateInput = (date:Dayjs|null) => {
    setTask({...task,date:date})
  }


  const clickHandle = () => {
    if(task.title === '') return;
    createTask();
    setTask(initialState);
    setFetch(fetch + 1);
  }

  return (
  <div>
    <div css={formStyle}>
        <DatePicker css={Datetime}
          name="date"
          value={task.date}
          onChange={handleDateInput}
        />
        <TimePicker css={Datetime}
          //type="time"
          name="time"
          value={task.time}
          onChange={handleTimeInput}
          defaultValue={dayjs(null,timeFormat)}
          minuteStep={5}
          format={timeFormat}
        />
        <Input css={textInputStyle} 
          placeholder="タスクを入力"
          name="title"
          value={task.title}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          />
        <AiOutlinePlusCircle css={buttonStyle}
          onClick={clickHandle}/>
    </div>
    <div css={formStyle}>
        <TextArea
          name="text"
          value={task.text}
          onChange={handleInput}
          css={css`
          width: 50%
          `}
          autoSize={{minRows:1}}
          />
        <Checkbox>
          通知を無効化
        </Checkbox>
    </div>
  </div>
  )
}