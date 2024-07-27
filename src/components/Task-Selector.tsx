import { useStore } from "../App"
import { TaskStatus } from "../types"


export default function TaskSelector() {

    const { setSelectedStatus } = useStore()
    const statusOptions: TaskStatus[] = ['Pending', 'In Progress', 'Completed', 'Archived']
    return (
        <div>
            {statusOptions.map((status) => (
                <button
                    key={status}
                    onClick={() => setSelectedStatus(status)}
                    className="btn border btn-rounded"
                >
                    {status}
                </button>
            ))}
        </div>
    )
}