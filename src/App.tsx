import { create } from "zustand"
// import TaskList from "./components/tasklist"

type Task = {
  name: string,
  description: string
}
// going to add statuses 
type TaskList = Task[]

interface StoreState {
  taskList: TaskList
  inputTask: Task
  addTask: () => void
  removeTask: (name: string) => void
  setInputTask: (field: keyof Task, value: string) => void
}

const useStore = create<StoreState>((set) => ({
  taskList: [],
  inputTask: { name: '', description: '' },
  addTask: () => set((state) => ({
    taskList: [...state.taskList, state.inputTask], //append the tasklist array 
    inputTask: { name: '', description: '' } // reset the input tasks
  })),
  removeTask: (name: string) => set((state) => ({
    taskList: state.taskList.filter(task => task.name !== name)
  })),
  setInputTask: (field, value) => set((state) => ({ inputTask: { ...state.inputTask, [field]: value } }))
}))

function App() {


  const { setInputTask, addTask, taskList, inputTask } = useStore()

  const addTaskThenBarf = () => {
    addTask()
    console.log("BARF")
  }


  return (
    <div>
      {taskList.map(task => (
        <div key={task.name}>
          <h3>{task.name}</h3>
          <p>{task.description}</p>
        </div>
      ))}
      <div>DESCRIPTION: {inputTask.description}</div>
      <div>NAME: {inputTask.name}</div>
      <label htmlFor="input1">Task Name:</label>
      <input id="input1" value={inputTask.name} onChange={(e) => setInputTask('name', e.target.value)} />
      <label htmlFor="input2">Task Description:</label>
      <input id="input2" value={inputTask.description} onChange={(e) => setInputTask('description', e.target.value)} />
      <button onClick={() => { addTaskThenBarf(); console.log(taskList) }}>Add Task</button>
    </div>
  )
}

export default App
