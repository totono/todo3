/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";

const today = () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2,"0");
    const mm = String(today.getMonth()+1).padStart(2,"0");
    const yyyy = today.getFullYear();

    return `${yyyy}-${mm}-${dd}`;
}


const Datetime = css`
    margin: 2px;
    padding: 0.3em 1.0em;
    border-radius: 8px;
    border: 1px solid transparent;
    font-size: 1.0em;
    font-weight: 200;
    font-family: inherit;
    color: #5b5b5b;
    background-color: #ffffff;
    transition: border-color 0.25s;
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
    @media (prefers-color-scheme: dark) {
        color: #d8d8d8;
        background-color: #02020298;
    }
`

export const InputDateTime= () => {

    const [date,setDate] = useState(today());
    const [time,setTime] = useState("13:00");

    return (
        <div>
            <input css={Datetime}
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
            />
            <input css={Datetime}
                type="time"
                step="300"
                value={time}
                onChange={e => setTime(e.target.value)}
            />
        </div>
    )    
}