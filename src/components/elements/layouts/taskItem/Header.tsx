/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import dayjs from "dayjs";
import { CompleteButton } from "../../Input/CompleteButton";
import { DateForm } from "../../Input/DateTime/DateForm";
import { TimeForm } from "../../Input/DateTime/TimeForm";
import { EditConfrimButton } from "./buttons/EditConfirmButton";
import { headerStyle } from "./headerStyle";
import { InputState } from "../../Input/InputState";
import { EditTitleForm } from "./textarea/EditTitleForm";

type HeaderProps = {
  taskState: InputState;
  setTaskState: React.Dispatch<React.SetStateAction<InputState>>;
  setFetch: React.Dispatch<React.SetStateAction<boolean>>;
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Header = ({
  taskState,
  setTaskState,
  setFetch,
  isEditing,
  setIsEditing,
}: HeaderProps) => {
  return (
    <div css={headerStyle(taskState)}>
      {isEditing ? (
        <DateForm
          task={taskState}
          setTask={setTaskState}
          value={dayjs(taskState.limit_date)}
        />
      ) : (
        <div>{taskState.limit_date?.toString()}</div>
      )}
      <div
        css={css`
          min-width: 45px;
          text-align: center;
        `}
      >
        {isEditing ? (
          <TimeForm
            task={taskState}
            setTask={setTaskState}
            value={taskState.limit_time}
          />
        ) : (
          <div>{taskState.limit_time?.toString()}</div>
        )}
      </div>
      {isEditing ? (
        <EditTitleForm taskState={taskState} setTaskState={setTaskState} />
      ) : (
        <div>{taskState.title}</div>
      )}
      {isEditing ? (
        <EditConfrimButton
          task={taskState}
          setFetch={setFetch}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
        />
      ) : (
        <CompleteButton data={taskState.id} setFetch={setFetch} />
      )}
    </div>
  );
};
