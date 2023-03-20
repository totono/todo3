/** @jsxImportSource @emotion/react */
import { css, } from "@emotion/react";
import { Checkbox, Collapse } from "antd";
import TextArea from "antd/es/input/TextArea";

const { Panel } = Collapse;

type HeaderProps = {
    children: React.ReactNode;
}

const headerStyle = css`
    text-align: center;

  .ant-collapse
  > .ant-collapse-item
  > .ant-collapse-header {
    display: initial;
    padding: 0;
    }

    .ant-collapse-expand-icon {
      position: fixed;
      top: 10px;
      left: 10px
    }

  background-color: rgb(30,30,30);
  //color: #f6f6f6;
  //cursor: default;
  //  overflow: hidden;
 `


export const Header = ({children}:HeaderProps):JSX.Element => {
    return (
        <div css={headerStyle}>

        <Collapse ghost>
            <Panel extra={children} collapsible="icon" key={"panel"} header={undefined}>
                <TextArea 
                    name="text"
                    //value={task.text}
                    //onChange={handleInput}
                    css={css`
                    width: 50%`}
                    autoSize={{minRows:1}}
                    />
                <Checkbox>
                    通知しない
                </Checkbox>
            </Panel>
        </Collapse>
        </div>
        )
}
            