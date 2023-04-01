import { Dispatch, SetStateAction } from "react";
import { Model } from "../../../../bindings/tasks";
import { Row } from "./Row";





interface taskListProps {
    tasks: Model[];
    setFetch: Dispatch<SetStateAction<boolean>>;
  }
  
export const TaskList = ({tasks,setFetch}:taskListProps) => {

  const taskList: Model[] = tasks;
  const taskRow = taskList.map((task: Model) => {
    return <Row key={task.id} task={task} setFetch={setFetch} />;
  });

  return <>{taskRow}</>;
};
  