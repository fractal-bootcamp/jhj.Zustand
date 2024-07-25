import { useStore } from "../App"

type TaskStatus = 'Pending' | 'In Progress' | 'Completed' | 'Archived'

export default function TaskViewer() {

    const { taskList, selectedStatus, setSelectedStatus } = useStore()

    const statusOptions: TaskStatus[] = ['Pending', 'In Progress', 'Completed', 'Archived']

    return (
        <div>
            <div>
                {statusOptions.map((status) => (
                    <button
                        key={status}
                        onClick={() => setSelectedStatus(status)}
                    >
                        {status}
                    </button>
                ))}
            </div>
            {taskList
                .filter(task => task.status === selectedStatus)
                .map(task => (
                    <div key={task.name}>
                        <h3>{task.name}</h3>
                        <p>{task.description}</p>
                        <p>{task.status}</p>
                        <p>{task.theme}</p>
                    </div>
                ))
            }
        </div>
    )
}