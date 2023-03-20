import { CompleteCheck } from "../Input/CompleteCheck";
import { Model } from "../../../bindings/tasks";
import { taskCommand } from "../../../ipcs";
import { useState,useEffect } from "react";
import { setAlarm2 } from '../../../components/interection/notification'
import { TaskList } from "../../task";

type ProjectProps = {
    fetch: number;
    setFetch: React.Dispatch<React.SetStateAction<number>>;
}



export const Projects = ({fetch,setFetch}:ProjectProps):JSX.Element => {

    const [projects, setProjects] = useState<Model[]>([]);

    useEffect(() => {
        const fetchData = async()=> {
            const res = await taskCommand.getTasks();
            setProjects(res);
            setAlarm2(res);
        }
        fetchData();
    },[fetch]);


    return (
        <TaskList
            tasks={projects}
            setFetch={setFetch}
        />
    )

    /*
   const list = projects.map((p:Model) => {
        if (p.completed === "Completed"){
            return null
        }
        return (
            <li className="row" key={p.id}>
                <CompleteCheck
                    data={p.id}
                    setFetch={setFetch}
                />
                <div>
                {p.limit_date}
                </div>
                <div>
                {p.limit_time}
                </div>
                <div>
                {p.title}
                </div>
            </li>
        );
    });

    return (
        <div>
            <ul>{list}</ul>
        </div>
    )*/
}