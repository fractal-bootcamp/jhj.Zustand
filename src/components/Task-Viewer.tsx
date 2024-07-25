import { useStore } from "../App"

export default function TaskViewer() {

    const { taskList } = useStore()


    return (
        <div>
            {taskList.map(task => (
                <div key={task.name}>
                    <h3>{task.name}</h3>
                    <p>{task.description}</p>
                    <p>{task.status}</p>
                    <p>{task.theme}</p>
                </div>
            ))}
        </div>
    )
}