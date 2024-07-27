import { useStore } from "../App"
import { Task } from "../types";
import { Fields, FieldType, Theme } from "../types";
import themes from "../data/themes";

export const fields: Fields = [{
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
        { value: 'dark', text: 'Dark' },
        { value: 'custom', text: 'Custom' }
    ]
},
] as const

const getTheme = (task: Task): Theme => {
    return themes.find(theme => theme.name === task.theme) || themes[0];
}

export default function TaskViewer() {

    const {
        taskList,
        selectedStatus,
        editingField,
        setEditingField,
        updateTask
    } = useStore()

    console.log(taskList)

    const handleEdit = (taskName: string, field: keyof Task, value: string) => {
        updateTask(taskName, { [field]: value })
        // setEditingField(null, null)
    }

    const renderInput = (task: Task, fields: Fields) => {
        return (

            fields.map((field) => (
                <div key={field.fieldName} className="mb-2">
                    {editingField?.taskName === task.name && editingField.field === field.fieldName ? (
                        field.fieldType === FieldType.Dropdown ? ( //if fieldtype is dropdown render dropdown
                            <select
                                value={task[field.fieldName as keyof Task]}
                                onChange={(e) => handleEdit(task.id, field.fieldName as keyof Task, e.target.value)}
                                onBlur={() => setEditingField(null, null)}
                                autoFocus
                                className="w-full p-2 border rounded"
                            >
                                {field.options?.map((option) => (
                                    <option key={option.value} value={option.value}>{option.text}</option>
                                ))}
                            </select>
                        ) : (
                            <input //else render and input 
                                value={task[field.fieldName as keyof Task]}
                                onChange={(e) => handleEdit(task.id, field.fieldName as keyof Task, e.target.value)}
                                onBlur={() => setEditingField(null, null)}
                                autoFocus
                                className="w-full p-2 border rounded"
                            />
                        )
                    ) : (
                        <p onClick={() => setEditingField(task.name, field.fieldName as keyof Task)} className="cursor-pointer">
                            <span className="font-semibold">{field.fieldName}:</span> {task[field.fieldName as keyof Task]}
                        </p> //WTF IS THIS DOING AGAIN??
                    )}
                </div>
            ))
        )
    }


    return (
        <div className="space-y-4">
            {taskList
                .filter(task => task.status === selectedStatus)
                .map(task => (
                    <div key={task.id} className="p-4 rounded-lg shadow" style={{ background: getTheme(task).background }}>
                        {renderInput(task, fields)}
                    </div>
                ))}
        </div>
    )
}