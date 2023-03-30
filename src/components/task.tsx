/** @jsxImportSource @emotion/react */
import { DeleteOutlined } from "@ant-design/icons";
import { css } from "@emotion/react";
import { appWindow } from "@tauri-apps/api/window";
import { Collapse, DatePicker } from "antd";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { Children, Dispatch, SetStateAction, useState } from "react";
import { Model } from "../bindings/tasks";
import { taskCommand } from "../ipcs";
import { CompleteButton } from "./elements/Input/CompleteCheck";
import { EditButton } from "./elements/Input/EditButton";
dayjs.extend(isSameOrBefore);

const { Panel } = Collapse;

const contentStyle = css`
  display: block;
`;

interface listItemProps {
  task: Model;
  setFetch: Dispatch<SetStateAction<boolean>>;
}

const isToday = (date: string | null) => {
  if (date === null) {
    return false;
  }
  const today = dayjs().format("YYYY/MM/DD");
  return date === today;
};

const isBeforeToday = (date: string | null) => {
  if (date === null) {
    return false;
  }
  const today = dayjs().format("YYYY/MM/DD");
  return dayjs(date).isSameOrBefore(today);
};



//limit_date + limit_timeを日付型に変換して、本日ならば"today"、本日より前ならば"before"、本日より後ならば"after"を返す
const dateSwitcher = (limit_date: string | null, limit_time: string | null) => {
  const date = limit_date == null ? "3000/1/1" : limit_date;
  const time = limit_time == null ? "23:59" : limit_time;
  const limit = dayjs(date + " " + time);
  const now = dayjs();
  if (limit.isSame(now, "day")) {
    return "today";
  } else if (limit.isBefore(now)) {
    return "before";
  } else {
    return "after";
  }
};


const ListItem = (props: listItemProps) => {

  const e = "today";

  const colorSwitchByDay = (e: string) => {
    switch (e){
      case "before": return "rgb(21, 21, 21)";
      case "today": return "rgb(22, 28, 23)";
      case "after": return "rgb(20, 20, 20)";
    }
  }

  const listItemStyle = () => {
    return css`
      list-style: none;
      :hover {
        background-color: rgb(36, 36, 36);
      }
      background-color: ${colorSwitchByDay(dateSwitcher(props.task.limit_date, props.task.limit_time))};
    `;
  };

  return (
    <li css={listItemStyle}>
      <Collapse>
        <Panel key="taskHeader" header={<Header {...props} />}>
          <Content {...props} />
        </Panel>
      </Collapse>
    </li>
  );
};

const Header = (props: listItemProps) => {

  const [isEditing, setIsEditing] = useState(false);

  const date = (limit_date: string | null) => {
    if (limit_date === null) {
      return "";
    }
    if (isToday(limit_date)) {
      return "";
    } else {
      return limit_date;
    }
  };

  //limit_date+limit_timeを日付型に変換して、現在時刻と比較して、期限切れかどうかを判定する
  const isExpired = (limit_date: string | null, limit_time: string | null) => {
    const date = limit_date == null ? "3000/1/1" : limit_date;
    const time = limit_time == null ? "23:59" : limit_time;
    const limit = dayjs(date + " " + time);
    const now = dayjs();
    return limit.isBefore(now);
  };

  //期限切れの場合は、文字色を赤にする
  const headerStyle = (isExpired: boolean, isEditing: boolean) => {
    return css`
      display: flex;
      align-items: center;
      text-align: left;
      color: ${isExpired ? "rgb(144, 29, 29)" : "white"};

      button{ 
        display: none;
        padding: auto;
        height: 20px;
        font-size: 11px;
      }

      .anticon-edit{
        display: ${isEditing ? "initial" : "none"};
        padding-right: 20px;
        margin-right: 0;
        margin-left: auto;
        font-size: 20px;
        color: ${isEditing ? "rgb(144, 29, 29)" : "white"};

      }

      :hover .ant-btn, :hover .anticon{
        display: initial;
      }
    `;
  };




  return (
    <div
      css={headerStyle(isExpired(props.task.limit_date, props.task.limit_time), isEditing)}
    >
      {isEditing ? (<DatePicker value={dayjs(props.task.limit_date)}/>) : (<div>{date(props.task.limit_date)}</div>) }
      <div
        css={css`
          min-width: 50px;
          text-align: center;
        `}
      >
       {isEditing ? (<Tim)} {props.task.limit_time}
      </div>
      <div>{props.task.title}</div>
      <EditButton isEditing={isEditing} setIsEditing={setIsEditing} />
      <CompleteButton data={props.task.id} setFetch={props.setFetch} />
    </div>
  );
};

const Content = (props: listItemProps) => {
  const clickHandle = async () => {
    props.setFetch(true);
    taskCommand.logicalDelete(props.task.id);
  };

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
