import { Model } from "../../../bindings/tasks";
import { Completed } from "../../../bindings/status/CompleteStatus";
import { taskCommand } from "../../../ipcs";
import { Button } from "antd";

export const CompleteButton = (props: any) => {
  const clickHandle = (_e: any) => {
    console.log(props.data);
    taskCommand.setStatus(parseInt(props.data), "Yes");
    props.setFetch(true);
  };

  return (
    <Button value={props.data} onClick={clickHandle}>
      Complete
    </Button>
  );
};
