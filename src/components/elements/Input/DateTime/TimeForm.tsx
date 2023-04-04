/** @jsxImportSource @emotion/react */
import { TimePicker } from "antd"
import dayjs, { Dayjs } from "dayjs";
import { Dispatch, SetStateAction, useState } from "react";
import * as objectSupport from "dayjs/plugin/objectSupport";
import { Model } from "../../../../bindings/tasks";
import { InputState } from "../InputState";
import { dateTimeStyle } from "./dateTimeStyle";


dayjs.extend(objectSupport);


const timeFormat = "HH:mm";
//const disabledTime = () => {
//    return { disabledHours: () => [0, 1, 2, 3, 4, 5, 6, 7] }
//};

type TimeFormProps = {
    task: InputState;
    setTask: Dispatch<SetStateAction<InputState>>;
    value: string | undefined;
}


export const TimeForm = ({task,setTask,value}:TimeFormProps) => {

    console.log("TimeForm");
    console.log(value);

    const hour = value ? parseInt(value.split(":")[0]) : undefined;
    const minute = value ? parseInt(value.split(":")[1]) : undefined;

    const time = value ? dayjs({hour:hour, minute:minute}) : undefined;

    const handleTimeInput = (time: Dayjs | null) => {
        console.log("task set");
        console.log(time?.format(timeFormat));
        setTask({ ...task, limit_time: time?.format(timeFormat) ?? undefined });
        //console.log(task);
      };

    return (
        <TimePicker
            css = {dateTimeStyle}
            name="time"
            value={time}
            onSelect={handleTimeInput}
            onChange={handleTimeInput}
            hideDisabledOptions={true}
            minuteStep={5}
            format={timeFormat}
        />
    )

}
