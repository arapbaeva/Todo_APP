import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterValuesType} from "./App";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type ToDoListPropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (taskID: string) => void
    changeFilter: (filter: FilterValuesType) => void
    addTask: (title: string) => void


}

const ToDoList = (props: ToDoListPropsType) => {
    const [title, setTitle] = useState('')
    const tasksListItems = props.tasks.map(task => {
        const removeTask = () => props.removeTask(task.id)
        return (
            <li>
                <input type="checkbox" checked={task.isDone}/>
                <span>{task.title}</span>
                <button onClick={removeTask}>x</button>
            </li>
        )
    })


    const addTask = () => {
        props.addTask(title)
        setTitle('')
    }

    const onKeyDownAddTaskHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTask()
        }
    }

    const onChangeAddHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

    const getChangeFilterHandler = (filter: FilterValuesType) => {
        return () => props.changeFilter(filter)
    }


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={title} onChange={onChangeAddHandler}
                    onKeyDown={onKeyDownAddTaskHandler}/>
                <button onClick={addTask}>+</button>
            </div>
            <ul>

                {tasksListItems}
            </ul>
            <div>
                <button onClick={getChangeFilterHandler('all')}>All</button>
                <button onClick={getChangeFilterHandler("active")}>Active</button>
                <button onClick={getChangeFilterHandler("completed")}>Completed</button>
            </div>

        </div>
    );
};

export default ToDoList;