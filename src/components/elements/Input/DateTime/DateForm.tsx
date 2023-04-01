/** @jsxImportSource @emotion/react */
import { DatePicker} from "antd";
import { Dayjs } from "dayjs";
import { Dispatch, SetStateAction } from "react";
import { InputState } from "../InputState";
import { dateTimeStyle } from "./dateTimeStyle";


type DateFormProps = {
    task: InputState;
    setTask: Dispatch<SetStateAction<InputState>>;
    value: Dayjs | null;
}


const dateFormat = "YYYY/MM/DD";

export const DateForm = ({task,setTask,value}:DateFormProps) => {

    const handleDateInput = (date: Dayjs | null) => {
        setTask({ ...task, limit_date: date?.format(dateFormat) ?? undefined });
      };

    return (
        <DatePicker
            css={dateTimeStyle}
            name="date"
            value={value}
            onChange={handleDateInput}
            format={"MM/DD"}
        />
    )
}