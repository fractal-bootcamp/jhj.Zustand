import { useStore } from "../App"

enum TaskStatus {
    Pending = 'Pending',
    InProgress = 'In Progress',
    Completed = 'Completed',
    Archived = 'Archived'
}

type Theme = {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
}

type Task = {
    name: string,
    description: string
    status: TaskStatus
    theme: Theme | string
}

const lightTheme: Theme = {
    primary: '#3498db',
    secondary: '#2ecc71',
    accent: '#e74c3c',
    background: '#ecf0f1',
    text: '#2c3e50',
}

enum FieldType {
    Simple = 'simple',
    Dropdown = 'dropdown'
}

const fields = [{
    fieldName: 'name',
    fieldType: FieldType.Simple
}, {
    fieldName: 'description',
    fieldType: FieldType.Simple
}, {
    fieldName: 'status',
    fieldType: FieldType.Dropdown,
    options: [
        { value: 'Pending', text: 'Pending' },
        { value: 'In Progress', text: 'In Progress' },
        { value: 'Completed', text: 'Completed' },
        { value: 'Archived', text: 'Archived' }
    ]
}, {
    fieldName: 'theme',
    fieldType: FieldType.Dropdown,
    options: [
        { value: 'light', text: 'Light' },
        { value: 'dark', text: 'Dark' }
    ]
},] as const

export default function TaskViewer() {

    const {
        taskList,
        selectedStatus,
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
                    <div key={task.name} style={{ background: task.theme.background }}>
                        {fields.map((field) => (
                            <div key={field.fieldName}>
                                {editingField?.taskName === task.name && editingField.field === field.fieldName ? (
                                    field.fieldType === FieldType.Dropdown ?
                                        (<select
                                            value={task[field.fieldName]}
                                            onChange={(e) => handleEdit(task.name, field.fieldName, e.target.value)}
                                            onBlur={() => setEditingField(null, null)}
                                            autoFocus
                                        >
                                            {field.options.map((option) => { return <option value={option.value}>{option.text}</option> })}
                                        </select>
                                        ) : (
                                            <input
                                                value={task[field.fieldName]}
                                                onChange={(e) => handleEdit(task.name, field.fieldName, e.target.value)}
                                                onBlur={() => setEditingField(null, null)}
                                                autoFocus
                                            />
                                        )
                                ) : (
                                    <p onClick={() => setEditingField(task.name, field.fieldName)}>
                                        {field.fieldName}: {task[field.fieldName]}
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