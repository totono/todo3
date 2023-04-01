import { useState } from 'react';
import { Tabs } from 'antd';
import { TaskList } from '../../task';
import { Model } from '../../../bindings/tasks';


const filter = ['Incomplete','Complete','All','Deleted'];
type Filter = typeof filter[number];
interface TaskTab{
    tasks: Model[];
    setFetch: React.Dispatch<React.SetStateAction<boolean>>;
}

const filterByStatus = (tasks: Model[], filter: Filter) => {
    switch (filter) {
        case 'Incomplete':
            return tasks.filter((task) => task.is_completed === 'No' && task.is_deleted === 'No');
        case 'Complete':
            return tasks.filter((task) => task.is_completed === 'Yes' && task.is_deleted === 'No');
        case 'All':
            return tasks.filter((task) => task.is_deleted === 'No');
        case 'Deleted':
            return tasks.filter((task) => task.is_deleted === 'Yes');
        default:
            return tasks;
    }
}


export const TaskTab = (props: TaskTab) => {
    const [taskFilter, setFilter] = useState<Filter>('Incomplete');

    const handleFilter = (filter: Filter) => {
        setFilter(filter);
    }

    const filterdTasks = filterByStatus(props.tasks,taskFilter);

    const items = filter.map((value) => {
        return {
            label: value,
            key: value,
            children: <TaskList tasks={filterdTasks} setFetch={props.setFetch} />,
            };
        }
    )

    return (
        <Tabs
            type='card'
            defaultActiveKey={taskFilter}
            onChange={handleFilter}
            items={items}
        />
    )

}