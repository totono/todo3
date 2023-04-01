import { css } from '@emotion/react';


export const dateTimeStyle = css`
width: 80px;
padding-left: 6px;
height: 21px;
border-radius: 8px;
border: 1px solid transparent;
font-weight: 200;
font-family: inherit;
color: #282828;
background-color: #ffffff;
transition: border-color 0.25s;
box-shadow: 0 2px 2px rgba(32, 32, 32, 0.2);

@media (prefers-color-scheme: dark) {
  color: #ffffff;
  background-color: #02020298;
}
`;