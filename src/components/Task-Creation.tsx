import { useStore } from "../App"
import themes from "../data/themes"

type TaskStatus = 'Pending' | 'In Progress' | 'Completed' | 'Archived'

function TaskCreator() {


    const { setInputTask, addTask, taskList, inputTask } = useStore()

    console.log('input task is:', inputTask)
    return (
        <div>
            <label htmlFor="input1">Task Name:</label>
            <input
                className="input" id="input1"
                value={inputTask.name}
                onChange={(e) => setInputTask('name', e.target.value)}
            />
            <label htmlFor="input2">Task Description:</label>
            <input className="input"
                id="input2"
                value={inputTask.description} onChange={(e) => setInputTask('description', e.target.value)}
            />
            <label htmlFor="statusDropdown">Status</label>
            <select
                id='statusDropdown'
                value={inputTask.status}
                onChange={(e) => setInputTask('status', e.target.value as TaskStatus)}
                className="select"
            >
                <option value='Pending'>Pending</option>
                <option value='In Progress'>In Progress</option>
                <option value='Completed'>Completed</option>
                <option value='Archived'>Archived</option>
            </select>
            <label htmlFor="themeDropdown">Theme</label>
            <select
                id='themeDropdown'
                value={inputTask.theme}
                onChange={(e) => setInputTask('theme', e.target.value)}
                className="select"
            >
                {themes.map((theme) => (
                    <option key={theme.name} value={theme.name}>{theme.name}</option>
                ))}
            </select>
            <button
                className="btn"
                onClick={() => { addTask(); console.log(taskList) }}
            >
                Add Task
            </button>
        </div>
    )
}

export default TaskCreator