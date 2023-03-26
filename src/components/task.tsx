/** @jsxImportSource @emotion/react */
import { DeleteOutlined } from "@ant-design/icons";
import { css } from "@emotion/react";
import { appWindow } from "@tauri-apps/api/window";
import { Collapse } from "antd";
import { Children, Dispatch, SetStateAction, useState } from "react";
import { Model } from "../bindings/tasks";
import { taskCommand } from "../ipcs";
import { CompleteCheck } from "./elements/Input/CompleteCheck";

const { Panel } = Collapse;

const headerStyle = css`
  display: flex;
  align-items: center;
  text-align: left;
  :hover {
    background-color: rgb(36, 36, 36);
  }
  button {
    display: none;
  }
  :hover .ant-btn {
    display: initial;
    height: 20px;
    margin-left: auto;
    font-size: 10px;
  }
`;

const contentStyle = css`
  display: block;
`;

interface listItemProps {
  task: Model;
  setFetch: Dispatch<SetStateAction<boolean>>;
}

const ListItem = (props: listItemProps) => {
  return (
    <li
      css={css`
        list-style: none;
        background-color: rgb(21, 21, 21);
      `}
    >
      <Collapse>
        <Panel
          key="taskHeader"
          header={
            <Header {...props} />
          }
        >
          <Content {...props} />
        </Panel>
      </Collapse>
    </li>
  );
};

const Header = (props: listItemProps) => {
  return (
    <div css={headerStyle}>
      <div>{props.task.limit_date}</div>
      <div
        css={css`
          min-width: 50px;
          text-align: center;
        `}
      >
        {props.task.limit_time}
      </div>
      <div>{props.task.title}</div>
          <CompleteCheck
        data={props.task.id} setFetch={props.setFetch} />
    </div>
  );
};


const Content = (props: listItemProps) => {
  const clickHandle = async () =>  {
    props.setFetch(true);
    taskCommand.logicalDelete(props.task.id);
  }


  return (
    <div css={contentStyle}>
      <div>
        <div>
          <p>{props.task.text}</p>
        </div>
        <div>
          <DeleteOutlined
            onClick={clickHandle}
            css={css`
              float: right;
              font-size: 15px;
              transform: translateY(-100%);
              :hover {
                color: red;
              }
            `}
          />
        </div>
      </div>
    </div>
  );
};


interface taskListProps {
  tasks: Model[];
  setFetch: Dispatch<SetStateAction<boolean>>;
}



export const TaskList = (props: taskListProps) => {
  //const [filter, setFilter] = useState<Filter>('');

  const tasks: Model[] = props.tasks;
  const task = tasks.map((t: Model) => {
    return <ListItem key={t.id} task={t} setFetch={props.setFetch} />;
  });
  return <>{task}</>;
};
