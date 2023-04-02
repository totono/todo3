/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Collapse } from "antd";
import { Dispatch, SetStateAction, useState } from "react";
import { Model } from "../../../../bindings/tasks";
import { InputState } from "../../Input/InputState";
import { Content } from "./Content";
import { Header } from "./Header";
import { listItemStyle } from "./rowStyle";

const { Panel } = Collapse;

type rowProps = {
  task: Model;
  setFetch: Dispatch<SetStateAction<boolean>>;
};

export const Row = ({ task, setFetch }: rowProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const state: InputState = (({
    id,
    title,
    text,
    limit_date,
    limit_time,
    should_notify,
    file_path,
    is_completed,
    is_deleted,
  }) => ({
    id,
    title,
    text,
    limit_date,
    limit_time,
    should_notify,
    file_path,
    is_completed,
    is_deleted,
  }))(task);
  const [taskState, setTaskState] = useState(state);

  return (
    <li css={listItemStyle(state)}>
      <Collapse>
        <Panel
          key="taskHeader"
          collapsible={"icon"}
          showArrow={!isEditing}
          header={
            <Header
              taskState={taskState}
              setTaskState={setTaskState}
              setFetch={setFetch}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
            />
          }
        >
          <Content
            taskState={taskState}
            setTaskState={setTaskState}
            setFetch={setFetch}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
          />
        </Panel>
      </Collapse>
    </li>
  );
};
