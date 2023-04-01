import { css } from "@emotion/react";


export const inputTaskStyle = css`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 3px;
  padding: 3px;
  @media (prefers-color-scheme: dark) {
    input,
    textarea {
      color: #d8d8d8;
      background-color: #02020298;
    }
  }
`;