import { useStore } from "../App"

type TaskStatus = 'Pending' | 'In Progress' | 'Completed' | 'Archived'

type Task = {
    name: string,
    description: string
    status: TaskStatus
    theme: string
}

export default function TaskViewer() {

    const {
        taskList,
        selectedStatus,
        setSelectedStatus,
        editingField,
        setEditingField,
        updateTask
    } = useStore()

    const handleEdit = (taskName: string, field: keyof Task, value: string) => {
        updateTask(taskName, { [field]: value })
        setEditingField(null, null)
    }

    return (
        <div>
            {taskList
                .filter(task => task.status === selectedStatus)
                .map(task => (
                    <div key={task.name}>
                        {(['name', 'description', 'status', 'theme'] as const).map((field) => (
                            <div key={field}>
                                {editingField?.taskName === task.name && editingField.field === field ? (
                                    field === 'theme' ?
                                        (<select
                                            value={task[field]}
                                            onChange={(e) => handleEdit(task.name, field, e.target.value)}
                                            onBlur={() => setEditingField(null, null)}
                                            autoFocus
                                        >
                                            <option value='light'>Light</option>
                                            <option value='dark'>Dark</option>
                                        </select>
                                        ) : (
                                            <input
                                                value={task[field]}
                                                onChange={(e) => handleEdit(task.name, field, e.target.value)}
                                                onBlur={() => setEditingField(null, null)}
                                                autoFocus
                                            />
                                        )
                                ) : (
                                    <p onClick={() => setEditingField(task.name, field)}>
                                        {field}: {task[field]}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                ))
            }
        </div>
    )
}