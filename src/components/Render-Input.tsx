import { Task } from "../types";
import { fields } from "./Task-Viewer";
import { FieldType } from "../types";
import { Fields } from "../types";
import { useStore } from "../App";

const { editingField, setEditingField, updateTask } = useStore()

export const RenderInput2 = (task: Task, fields: Fields) => {


    const handleEdit = (taskName: string, field: keyof Task, value: string) => {
        updateTask(taskName, { [field]: value })
        setEditingField(null, null)
    }

    return fields.map((field) => (
        <div key={field.fieldName} className="mb-2">
            {(() => {
                switch (true) {
                    case editingField?.taskName === task.name && editingField.field === field.fieldName:
                        switch (field.fieldType) {
                            case FieldType.Dropdown:
                                return (
                                    <select
                                        value={task[field.fieldName as keyof Task]}
                                        onChange={(e) => handleEdit(task.name, field.fieldName as keyof Task, e.target.value)}
                                        onBlur={() => setEditingField(null, null)}
                                        autoFocus
                                        className="w-full p-2 border rounded"
                                    >
                                        {field.options?.map((option) => (
                                            <option key={option.value} value={option.value}>{option.text}</option>
                                        ))}
                                    </select>
                                );
                            default:
                                return (
                                    <input
                                        value={task[field.fieldName as keyof Task]}
                                        onChange={(e) => handleEdit(task.name, field.fieldName as keyof Task, e.target.value)}
                                        onBlur={() => setEditingField(null, null)}
                                        autoFocus
                                        className="w-full p-2 border rounded"
                                    />
                                );
                        }
                    default:
                        return (
                            <p onClick={() => setEditingField(task.name, field.fieldName as keyof Task)} className="cursor-pointer">
                                <span className="font-semibold">{field.fieldName}:</span> {task[field.fieldName as keyof Task]}
                            </p>
                        );
                }
            })()}
        </div>
    ));
};