import { CompleteCheck } from "../Input/CompleteCheck";
import { Model } from "../../../bindings/tasks";
import { taskCommand } from "../../../ipcs";
import { useState,useEffect } from "react";
import { setAlarm } from '../../../components/interection/notification'

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
            setAlarm(res);
        }
        fetchData();
    },[fetch]);

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
                {p.limit_date} {p.title}
            </li>
        );
    });

    return (
        <div>
            <ul>{list}</ul>
        </div>
    )
}