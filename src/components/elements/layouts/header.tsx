/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { ChangeEventHandler, SetStateAction, useState } from "react";
import { initialState, InputState } from "../Input/InputState";
import { InputTask } from "../Input/InputTask";


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



export const Header = ({ fetch, setFetch }: HeaderProps) => {
  return (
    <div css={headerStyle}>
      <InputTask
        setFetch={setFetch}
      />
    </div>
  );
};
