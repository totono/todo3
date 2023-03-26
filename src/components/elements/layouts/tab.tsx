import { useState } from 'react';
import { Tabs } from 'antd';
import TabPane from 'antd/es/tabs/TabPane';
import { TaskList } from '../../task';
import { Model } from '../../../bindings/tasks';


const filter = ['Incomplete','Complete','All','Deleted'];
type Filter = typeof filter[number];
interface TaskTab{
    //filter: Filter;
    tasks: Model[];
    setFetch: React.Dispatch<React.SetStateAction<boolean>>;
}

const filtering = (tasks: Model[], filter: Filter) => {
    switch (filter) {
        case 'Incomplete':
            return tasks.filter((task) => task.is_completed === 'NotComplete' && task.is_deleted === 'NotDelete');
        case 'Complete':
            return tasks.filter((task) => task.is_completed === 'Completed' && task.is_deleted === 'NotDelete');
        case 'All':
            return tasks.filter((task) => task.is_deleted === 'NotDelete');
        case 'Deleted':
            return tasks.filter((task) => task.is_deleted === 'Deleted');
        default:
            return tasks;
    }
}


export const TaskTab = (props: TaskTab) => {
    const [taskFilter, setFilter] = useState<Filter>('Incomplete');

    const handleFilter = (filter: Filter) => {
        console.log(filter);
        setFilter(filter);
    }

    const filterdTasks = filtering(props.tasks,taskFilter);

    return (
        <Tabs type='card' defaultActiveKey={taskFilter} onChange={handleFilter}>
            {filter.map((value) => {
                return (
                    <TabPane tab={value} key={value}>
                        <TaskList tasks={filterdTasks} setFetch={props.setFetch} />
                    </TabPane>
                );
            })}
        </Tabs>
    );
}