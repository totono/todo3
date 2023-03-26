/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Checkbox, Collapse } from "antd";
import TextArea from "antd/es/input/TextArea";
import dayjs, { Dayjs } from "dayjs";
import { ChangeEventHandler, SetStateAction, useState } from "react";
import { Model } from "../../../bindings/tasks";
import { taskCommand } from "../../../ipcs";
import { InputProject } from "../Input/InputProject";

const { Panel } = Collapse;

type HeaderProps = {
  fetch: boolean;
  setFetch: React.Dispatch<SetStateAction<boolean>>;
};

const headerStyle = css`
  text-align: center;

  .ant-collapse > .ant-collapse-item > .ant-collapse-header {
    display: initial;
    padding: 0;
  }

  .ant-collapse-expand-icon {
    position: fixed;
    top: 10px;
    left: 10px;
  }
  background-color: rgb(30, 30, 30);
`;

const today = () => {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const yyyy = today.getFullYear();

  return `${yyyy}/${mm}/${dd}`;
};

export const Header = ({ fetch, setFetch }: HeaderProps) => {
  type state = {
    title: string;
    text: string;
    date: Dayjs | null;
    time: Dayjs | null;
    filePath: string;
  };

  const initialState: state = {
    title: "",
    text: "",
    date: dayjs(today(), "YYYY/MM/DD"),
    time: null,
    filePath: "",
  };

  const [task, setTask] = useState(initialState);

  const handleInput: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (event) => {
    setTask({ ...task, [event.target.name]: event.target.value });
  };

  return (
    <div css={headerStyle}>
      <Collapse ghost>
        <Panel
          extra={InputProject({ task, setTask, fetch, setFetch })}
          collapsible="icon"
          key={"panel1"}
          header={undefined}
        >
          <TextArea
            value={task.text}
            name="text"
            onChange={handleInput}
            css={css`
              width: 50%;
            `}
            autoSize={{ minRows: 1 }}
          />
          <Checkbox>通知しない</Checkbox>
        </Panel>
      </Collapse>
    </div>
  );
};
