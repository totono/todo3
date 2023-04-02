import { Model } from "../../../bindings/tasks";
import { taskCommand } from "../../../ipcs";
import { useState, useEffect } from "react";
import { setAlarm } from "../../../components/interection/notification";
import dayjs from "dayjs";
import { TaskTab } from "./tab";

type ProjectProps = {
  fetch: boolean;
  setFetch: React.Dispatch<React.SetStateAction<boolean>>;
};


const byRecent = (a: Model, b: Model) => {
  const aDate = a.limit_date == null ? "3000/01/01" : a.limit_date;
  const aTime = a.limit_time == null ? "23:59" : a.limit_time;

  const bDate = b.limit_date == null ? "3000/01/01" : b.limit_date;
  const bTime = b.limit_time == null ? "23:59" : b.limit_time;

  const aDatetime = dayjs(aDate + aTime);
  const bDatetime = dayjs(bDate + bTime);;
  return aDatetime.diff(bDatetime);
}



export const Tasks = ({ fetch, setFetch }: ProjectProps): JSX.Element => {
  const [tasks, setTasks] = useState<Model[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await taskCommand.getTasks();
      const sortedRes = res.sort(byRecent);
      setTasks(sortedRes);
      setAlarm(sortedRes);
      setFetch(false);
      console.log(sortedRes);
    };
    fetchData();
  }, [fetch]);

  return <TaskTab tasks={tasks} setFetch={setFetch} />;
};
