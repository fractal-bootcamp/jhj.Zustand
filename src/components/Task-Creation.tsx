import { useStore } from "../App"



// type Task = {
//     name: string,
//     description: string
// }
// going to add statuses 
// type TaskList = Task[]
type TaskStatus = 'Pending' | 'In Progress' | 'Completed' | 'Archived'

function TaskCreator() {


    const { setInputTask, addTask, taskList, inputTask, updateTaskStatus } = useStore()


    return (
        <div>
            <div>DESCRIPTION: {inputTask.description}</div>
            <div>NAME: {inputTask.name}</div>
            <label htmlFor="input1">Task Name:</label>
            <input id="input1" value={inputTask.name} onChange={(e) => setInputTask('name', e.target.value)} />
            <label htmlFor="input2">Task Description:</label>
            <input id="input2" value={inputTask.description} onChange={(e) => setInputTask('description', e.target.value)} />

            <label htmlFor="statusDropdown">Status</label>
            <select
                id='statusDropdown'
                value={inputTask.status}
                onChange={(e) => updateTaskStatus(inputTask.name, e.target.value as TaskStatus)}
            >
                <option value='Pending'>Pending</option>
                <option value='In Progress'>In Progress</option>
                <option value='Completed'>Completed</option>
                <option value='Archived'>Archived</option>
            </select>
            <button onClick={() => { addTask(); console.log(taskList) }}>Add Task</button>
        </div>
    )
}

export default TaskCreator