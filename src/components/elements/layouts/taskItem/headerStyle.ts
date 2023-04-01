/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import dayjs, { Dayjs } from "dayjs";
import { Model } from "../../../../bindings/tasks";
import { InputState } from "../../Input/InputState";



const isToday = (date: string | null) => {
    if (date === null) {
      return false;
    }
    const today = dayjs().format("YYYY/MM/DD");
    return date === today;
  };


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
  const isExpired = (limit_date: string | undefined, limit_time: string | undefined) => {
    const date = limit_date == null ? "3000/1/1" : limit_date;
    const time = limit_time == null ? "23:59" : limit_time;
    const limit = dayjs(date + " " + time);
    const now = dayjs();
    return limit.isBefore(now);
  };

/*
  //limit_date + limit_timeを現在時刻と比較して期限切れかどうかを判定する
  //limit_dateがnullの場合、"3000/1/1"とする
  //limit_timeがnullの場合、"23:59"とする
  const isExpired = (limit_date: Dayjs | null, limit_time: Dayjs | null) => {
    if (limit_date === null) {
        limit_date = dayjs("3000/1/1");
    }
    if (limit_time === null) {
        limit_time = dayjs("23:59");
    }
    const limit = dayjs(limit_date.format("YYYY/MM/DD") + " " + limit_time.format("HH:mm"));
    const now = dayjs();
    return limit.isBefore(now);
    };
*/
 




export const headerStyle = (task: InputState) => {
    
    const expire = isExpired(task.limit_date, task.limit_time);
    
    return css`
      display: flex;
      justify-content: left;
      align-items: center;
      color: ${expire ? "rgb(144, 29, 29)" : "white"};

      .ant-btn{
        height:23px;
        font-size: 8px;
        display: none;
        margin-top: 0;
        margin-bottom: 0;
        padding-top: 0;
        padding-bottom: 0;
        margin-left: auto;
      }

      .editConfirm{
        color: green;
        margin-left:auto;
        font-size: 22px;

      }

      :hover .ant-btn,
      :hover .editConfirm {
        display: initial;
    }
        Input {
            width: 60%;
            margin-left: 5px;
            margin-right: 5px;
        }
    `;
  };