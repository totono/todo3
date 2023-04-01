/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import dayjs from "dayjs";

const dateSwitcher = (limit_date: string | undefined, limit_time: string | undefined) => {
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

const colorSwitchByDay = (e: string) => {
switch (e){
  case "before": return "rgb(21, 21, 21)";
  case "today": return "rgb(22, 28, 23)";
  case "after": return "rgb(20, 20, 20)";
}
}


export const listItemStyle = (limit_date: string|undefined,limit_time:string|undefined) => {
  const dateState = dateSwitcher(limit_date, limit_time);
  const color = colorSwitchByDay(dateState);

return css`
    margin-bottom: 3px;
    :hover {
      background-color: rgb(36, 36, 36);
    }
    background-color: ${color};

    .ant-collapse-header-text {
        font-size: 15px;
    }
`;
};