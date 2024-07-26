import { create } from "zustand"
import { createJSONStorage, persist } from 'zustand/middleware'
import TaskCreator from "./components/Task-Creation"
import TaskViewer from "./components/Task-Viewer"
import TaskSelector from "./components/Task-Selector"


// import TaskList from "./components/tasklist"

export type TaskStatus = '' | 'Pending' | 'In Progress' | 'Completed' | 'Archived'

export type Task = {
  name: string,
  description: string
  status: TaskStatus
  theme: string
}

// going to add statuses 
export type TaskList = Task[]

export interface StoreState {
  taskList: TaskList
  inputTask: Task
  selectedStatus: TaskStatus
  setSelectedStatus: (status: TaskStatus) => void
  editingField: { taskName: string, field: string } | null
  setEditingField: ((taskName: string | null, field: keyof Task | null) => void)
  addTask: () => void
  removeTask: (name: string) => void
  setInputTask: (field: keyof Task, value: string) => void
  updateTask: (name: string, updates: Partial<Task>) => void
}

export const useStore = create(
  persist<StoreState>(
    (set) => ({
      taskList: [],
      inputTask: { name: '', description: '', status: '', theme: '' },

      selectedStatus: 'Pending',

      ///SET INPUT TASK
      setInputTask: (field, value) => set((state) => ({ inputTask: { ...state.inputTask, [field]: value } })),

      //SET SELECTED STATUS
      setSelectedStatus: (status) => set(() => ({ selectedStatus: status })),

      //EDITING FIELD  

      editingField: null,

      //SET EDITING FIELD
      setEditingField: (taskName, field) => set(() => ({
        editingField: taskName && field ? { taskName, field } : null
      })),

      // ADD TASK
      addTask: () => set((state) => {

        if (!state.inputTask.name || !state.inputTask.description) {
          alert("Please fill out all fields");
          return state
        }

        if (state.taskList.some(task => task.name === state.inputTask.name)) {
          alert("A task with this name already exists");
          return state;
        }

        return {
          taskList: [...state.taskList, state.inputTask], //append the tasklist array 
          inputTask: { name: '', description: '', status: 'Pending', theme: '' } // reset the input tasks}
        }
      }),

      // REMOVE TASK
      removeTask: (name: string) => set((state) => ({
        taskList: state.taskList.filter(task => task.name !== name)
      })),

      //UPDATE TASK STATUS
      updateTask: (name, updates) => set((state) => ({
        taskList: state.taskList.map(task =>
          task.name === name ? { ...task, ...updates } : task
        )
      })),
    }),
    {
      name: 'task-storage',
      storage: createJSONStorage(() => localStorage)
    }
  )
)



function App() {

  return (
    <div>
      <TaskSelector />
      <TaskViewer />
      <TaskCreator />
    </div>
  )
}

export default App