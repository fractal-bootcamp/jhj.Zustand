import { create } from "zustand"
import { createJSONStorage, persist } from 'zustand/middleware'
import TaskCreator from "./components/Task-Creation"
import TaskViewer from "./components/Task-Viewer"
import TaskSelector from "./components/Task-Selector"
import { TaskList, Task, TaskStatus } from "./types"


export interface StoreState {
  taskList: TaskList
  inputTask: Task
  selectedStatus: TaskStatus
  setSelectedStatus: (status: TaskStatus) => void
  editingField: { taskName: string, field: string } | null
  setEditingField: ((taskName: string | null, field: keyof Task | null) => void)
  addTask: () => void
  removeTask: (id: string) => void
  setInputTask: (field: keyof Task, value: string) => void
  updateTask: (name: string, updates: Partial<Task>) => void
  activeTab: 'create' | 'view'
  setActiveTab: (tab: 'create' | 'view') => void
  // delete a single task 
  deleteAll: () => void
}

export const useStore = create(
  persist<StoreState>(
    (set) => ({

      taskList: [],

      //INPUT TASK INITIALIZATION
      inputTask: { id: crypto.randomUUID(), name: 'Add task name...', description: 'Add description..', status: 'Pending', theme: 'light' },

      selectedStatus: 'Pending' as TaskStatus,

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
          inputTask: { id: crypto.randomUUID(), name: 'Add task name..', description: 'Add description..', status: 'Pending' as TaskStatus, theme: 'light' } // reset the input tasks}
        }
      }),

      // REMOVE TASK
      removeTask: (id: string) => set((state) => ({
        taskList: state.taskList.filter(task => task.id !== id)
      })),

      //UPDATE TASK STATUS
      updateTask: (id, updates) => set((state) => ({
        taskList: state.taskList.map(task => // map over task listn and find the task with corresponding name
          task.id === id ? { ...task, ...updates } : task // copy that task and append changes 
        )
      })),

      //ACTIVE TAB
      activeTab: 'create',

      //SET ACTIVE TAB
      setActiveTab: (tab: 'create' | 'view') => set(() => ({ activeTab: tab })),

      // CLEAR STORAGE

      deleteAll: () => {
        useStore.persist.clearStorage();
        console.log('delete');
        window.location.reload();
      },

    }),

    {
      name: 'task-storage',
      storage: createJSONStorage(() => localStorage)
    }
  )
)



function App() {

  const { activeTab, setActiveTab, deleteAll } = useStore();

  // const handleTabChange = (tab: 'create' | 'view') => {
  //   setActiveTab(tab);
  // };

  return (
    <div>
      <div>
        <button className="btn border btn-rounded" onClick={() => setActiveTab('create')}>Create</button>
        <button className="btn border btn-rounded" onClick={() => setActiveTab('view')}>View</button>
        <button className="btn border btn-rounded bg-red-500 text-white" onClick={() => deleteAll()}>Delete All</button>
      </div>
      {activeTab === 'create' ? (
        <TaskCreator />
      ) : (
        <>
          <TaskSelector />
          <TaskViewer />
        </>
      )}
    </div>
  )
}

export default App