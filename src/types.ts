export type Theme = {
    name: string;
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
}

export enum FieldType {
    Simple = 'simple',
    Dropdown = 'dropdown'
}

type Field = {
    fieldName: string;
    fieldType: FieldType;
    options?: Array<{
        value: string;
        text: string;
    }>;
};

export type Fields = Field[];
// import TaskList from "./components/tasklist"


export type TaskStatus = 'Pending' | 'In Progress' | 'Completed' | 'Archived'

export type Task = {
    id: string
    name: string
    description: string
    status: TaskStatus
    theme: string
}
// going to add statuses 

export type TaskList = Task[]

