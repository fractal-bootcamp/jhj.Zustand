import { useStore } from "../App"
type TaskStatus = '' | 'Pending' | 'In Progress' | 'Completed' | 'Archived'

export default function TaskSelector() {

    const { setSelectedStatus } = useStore()
    const statusOptions: TaskStatus[] = ['Pending', 'In Progress', 'Completed', 'Archived']
    return (
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
    )
}