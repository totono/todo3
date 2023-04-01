import { Dispatch, SetStateAction } from "react";
import { InputState } from "../../Input/InputState";

export type taskProps = {
    taskState: InputState;
    setTaskState: Dispatch<SetStateAction<InputState>>;
    setFetch: Dispatch<SetStateAction<boolean>>;
    isEditing: boolean;
};