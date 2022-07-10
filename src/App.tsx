import React, {useState} from 'react';
import './App.css';
import ToDoList, {TaskType} from "./ToDoList";
import {v1} from "uuid";




//CRUD
//GUI & CLI
 export type FilterValuesType = "all" | "active" | "completed"
function App() {
    const title_1: string = "What we learn?"

    const [tasks, setTasks] = useState(
        [
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "JS/ES6", isDone: false}

        ])

    const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all')

    const removeTask = (taskID: string): void => {
        setTasks(tasks.filter((task:TaskType) => task.id !== taskID))
    }

    const addTask = (title: string) => {
        setTasks([{id: v1(), title, isDone: false}, ...tasks])
    }
    let tasksForRender;
    switch (filter) {
        case 'completed':
            tasksForRender = tasks.filter(t => t.isDone === true)
            break
        case "active":
            tasksForRender = tasks.filter(t => t.isDone === false)
            break
        default:
            tasksForRender = tasks
    }

const changeFilter = (filter: FilterValuesType) =>
        setFilter(filter)

    return (

        <div className="App">

            <ToDoList
                title={title_1}
                tasks={tasksForRender}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
            />
        </div>

    );
}

export default App;
