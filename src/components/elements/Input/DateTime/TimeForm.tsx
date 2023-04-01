import { TimePicker } from "antd"
import { Dayjs } from "dayjs";
import { Dispatch, SetStateAction, useState } from "react";
import { InputState } from "../InputState";
import { dateTimeStyle } from "./dateTimeStyle";



const timeFormat = "HH:mm";
const disabledTime = () => {
    return { disabledHours: () => [0, 1, 2, 3, 4, 5, 6, 7] }
};

type TimeFormProps = {
    task: InputState;
    setTask: Dispatch<SetStateAction<InputState>>;
    value: Dayjs | null;
}


export const TimeForm = ({task,setTask,value}:TimeFormProps) => {

    const handleTimeInput = (time: Dayjs | null) => {
        console.log("task set");
        setTask({ ...task, time: time });
        console.log(task);
      };

    return (
        <TimePicker
            css = {dateTimeStyle}
            name="time"
            value={value}
            onSelect={handleTimeInput}
            onChange={handleTimeInput}
            disabledTime={disabledTime}
            hideDisabledOptions={true}
            minuteStep={5}
            format={timeFormat}
        />
    )

}