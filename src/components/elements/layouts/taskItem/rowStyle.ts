/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import dayjs from "dayjs";
import { InputState } from "../../Input/InputState";
import { ShouldNotify } from "../../../../bindings/status/ShouldNotify";



// limit_dateとlimit_timeを受け取り、現在日時と比較して、
// 期限が切れているか、期限が切れていないか、期限が今日か、を返す
const date = (state:InputState) => {
  if (state.is_completed === 'Yes' || state.is_deleted === 'Yes') {
    return "before";
  }

  const date = state.limit_date == null ? "3000/1/1" : state.limit_date;
  const time = state.limit_time == null ? "23:59" : state.limit_time;
  const limit = dayjs(date + " " + time);
  const now = dayjs();

  if (limit.isBefore(now) && state.should_notify == "Yes") {
    return "overdue";
  } else if (limit.isBefore(now) && state.should_notify == "No") {
    return "before";
  }  else if (limit.isSame(now, "day")) {
    return "today";
  }
  return "after";
  
};

const colorSwitchByDay = (e: string) => {

  console.log("Date state is " + e + "")

  const background_animation = css`
    animation: background 1s ease-in-out infinite;
    @keyframes background {
      0% {
        background-color: rgba(21, 21, 21, 0.5);
      }
      50% {
        background-color: rgba(150, 50, 50, 0.5);
      }
      100% {
        background-color: rgba(21, 21, 21, 0.5);
      }
    }
  `;


switch (e){
  case "before": return "background-color: rgb(21, 21, 21)";
  case "overdue": return background_animation;
  case "today": return "background-color: rgb(22, 28, 23)";
  case "after": return "background-color: rgb(20, 20, 20)";
}
}


export const listItemStyle = (state:InputState) => {
  //const dateState = dateSwitcher(limit_date, limit_time);
  
  const dateState = date(state);
  
  const color = colorSwitchByDay(dateState);

return css`
    margin-bottom: 3px;
    :hover {
      background-color: rgb(36, 36, 36);
    }
    ${color};

    .ant-collapse-header-text {
        font-size: 15px;
    }
`;
};