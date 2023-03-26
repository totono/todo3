import { Model } from "../../../bindings/tasks";
import { CompleteStatus } from "../../../bindings/status/CompleteStatus";
import { taskCommand } from "../../../ipcs";
import { Button } from "antd";

export const CompleteCheck = (props: any) => {
    const clickHandle = (e: any) => {
      console.log(props.data);
    taskCommand.changeStatus(parseInt(props.data), "Completed");
    props.setFetch(true);
  };

  return (
    <Button
      value={props.data}
      onClick={clickHandle}
    >
        Complete
    </Button>
  );
};
