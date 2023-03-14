import { CompleteCheck } from "../Input/CompleteCheck";
import { Model } from "../../../bindings/tasks";
import { taskCommand } from "../../../ipcs";
import { useState,useEffect } from "react";

type ProjectProps = {
    isFetching: boolean;
    setIsFetching: React.Dispatch<React.SetStateAction<boolean>>;
}


export const Projects = ({isFetching,setIsFetching}:ProjectProps):JSX.Element => {

    const [projects, setProjects] = useState<Model[]>([]);

    useEffect(() => {
        const fetchData = async()=> {
            const res = await taskCommand.getTasks();
            setProjects(res);
        }
        fetchData();
        setIsFetching(false);
    },[isFetching]);

    const list = projects.map((p:Model) => {
        if (p.completed === "Completed"){
            return null
        }
        return (
            <li className="row" key={p.id}>
                <CompleteCheck
                    data={p.id}
                    setIsFetching={setIsFetching}
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