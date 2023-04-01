import { Model } from "../../../bindings/tasks";
import { taskCommand } from "../../../ipcs";
import { useState, useEffect } from "react";
import { setAlarm } from "../../../components/interection/notification";
import { TaskList } from "../../task";
import dayjs from "dayjs";
import { TaskTab } from "./tab";

type ProjectProps = {
  fetch: boolean;
  setFetch: React.Dispatch<React.SetStateAction<boolean>>;
};

//limit_dateがnullの場合は3000/01/01とし、limit_timeがnullの場合は23:59とする。
//taskのフィールドであるlimit_dateとlimit_timeで日時が最近の順にソートする。
const byRecent = (a: Model, b: Model) => {
  const aDate = a.limit_date === null ? "3000/01/01" : a.limit_date;
  const bDate = b.limit_date === null ? "3000/01/01" : b.limit_date;
  const aTime = a.limit_time === null ? "23:59" : a.limit_time;
  const bTime = b.limit_time === null ? "23:59" : b.limit_time;

  const aDatetime = dayjs(aDate + aTime);
  const bDatetime = dayjs(bDate + bTime);;
  return aDatetime.diff(bDatetime);
}


export const Projects = ({ fetch, setFetch }: ProjectProps): JSX.Element => {
  const [projects, setProjects] = useState<Model[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await taskCommand.getTasks();
      const sortedRes = res.sort(byRecent);
      setProjects(sortedRes);
      setAlarm(sortedRes);
      setFetch(false);
    };
    fetchData();
  }, [fetch]);

  return <TaskTab tasks={projects} setFetch={setFetch} />;
};
