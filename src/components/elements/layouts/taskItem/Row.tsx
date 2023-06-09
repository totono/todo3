/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Collapse } from "antd";
import { Dispatch, SetStateAction, useState } from "react";
import { Model } from "../../../../bindings/tasks";
import { InputState } from "../../Input/InputState";
import { Content } from "./Content";
import { Header } from "./Header";
import { listItemStyle } from "./rowStyle";
import dayjs from "dayjs";

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

  // check task is overdue
  const activeId = () => {
    if (taskState.limit_date === undefined
        || taskState.is_completed === "Yes"
        || taskState.is_deleted === "Yes") {
      return undefined;
    }
    let time = taskState.limit_time;
    if (time === undefined) {
      time = "23:59";
    }
    const today = dayjs();
    const limit = dayjs(taskState.limit_date + " " + time);
    if (today.isAfter(limit)) {
      return taskState.id;
    } else {
      undefined
    };
  };


  return (
    <li css={listItemStyle(state)}>
      <Collapse activeKey={activeId()}>
        <Panel
          key={taskState.id}
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
