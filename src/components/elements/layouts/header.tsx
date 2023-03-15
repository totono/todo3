/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { CompleteStatus } from "../../../bindings/status/CompleteStatus";
import { InputProject } from "../Input/InputProject";
import { CompleteCheck } from "../Input/CompleteCheck";
import { useState } from 'react';
import { CaretRightOutlined } from '@ant-design/icons';

type HeaderProps = {
    children: React.ReactNode;
}

const headerStyle = css`
  height: 50px;
  width: 100%;
  background-color: rgb(30,30,30);
  color: #f6f6f6;
  cursor: default;
    overflow: hidden;
 `
const headerExpanded =css(
    headerStyle,
    css` 
    height: auto;
    `,
);

const expandButton = css`
    font-size:20px;
    position:absolute;
    top: 40px;
    left: 5px;
`

const expandedButton = css(
    expandButton,
    css`
        transform:rotate(90deg);
    `
)
    


 
export const Header = ({children}:HeaderProps):JSX.Element => {
    const [expand, setExpand] = useState(false);
    
    return (

        <div css={expand ? headerExpanded : headerStyle}>
            {children}
          <CaretRightOutlined
            css={expand? expandedButton : expandButton}
            onClick={e => setExpand(!expand)} />   
        </div>
    )
}
