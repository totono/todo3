/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Dispatch, SetStateAction } from "react";
import { Model } from "../bindings/tasks";
import { CompleteCheck } from "./elements/Input/CompleteCheck";

const taskStyle = css`
    margin: 3px;
    display:flex;
    align-items: center;
    text-align: left;
`;

const taskStyle2 = css`
    display:block;
`

interface listItemProps {
    task: Model;
    setFetch: Dispatch<SetStateAction<number>>;
}

const ListItem = (props:listItemProps) => {
    return (
        <li>
        <div css={taskStyle}>
            <CompleteCheck
                data={props.task.id}
                setFetch={props.setFetch}
                />
            <div>
                {props.task.limit_date}
            </div>
            <div css={css`
                min-width: 50px;
                text-align : center;`}>
                {props.task.limit_time}
            </div>
            <div>
                {props.task.title}
            </div>
        </div>
        <div css={taskStyle2}>
            <div>
                <button>aaa</button>
            </div>
        </div>
    </li>
    )
}



interface taskListProps {
    tasks: Model[];
    setFetch: Dispatch<SetStateAction<number>>;
}


export const TaskList = (props:taskListProps) => {
    const tasks:Model[] = props.tasks;
    const task = tasks.map((t:Model) => {
    return <ListItem
        key={t.id}
        task={t}
        setFetch={props.setFetch}
        />
    });
    return (
    <>
        {task}
    </>
    )
}