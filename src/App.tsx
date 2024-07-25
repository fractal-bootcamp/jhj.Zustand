import { create } from "zustand"
import { createJSONStorage, persist } from 'zustand/middleware'
import TaskCreator from "./components/Task-Creation"
import TaskViewer from "./components/Task-Viewer"


// import TaskList from "./components/tasklist"

type TaskStatus = '' | 'Pending' | 'In Progress' | 'Completed' | 'Archived'

type Task = {
  name: string,
  description: string
  status: TaskStatus
  theme: string
}

// going to add statuses 
type TaskList = Task[]

interface StoreState {
  taskList: TaskList
  inputTask: Task
  selectedStatus: TaskStatus
  setSelectedStatus: (status: TaskStatus) => void
  addTask: () => void
  removeTask: (name: string) => void
  setInputTask: (field: keyof Task, value: string) => void
  updateTaskStatus: (name: string, status: TaskStatus) => void
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
      updateTaskStatus: (name: string, status: TaskStatus) => set((state) => ({
        taskList: state.taskList.map(task =>
          task.name === name ? { ...task, status } : task
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
      <TaskViewer />
      <TaskCreator />
    </div>
  )
}

export default App
