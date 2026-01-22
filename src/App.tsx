import { Activity, useState } from 'react'

import SelectionCircle from './components/SelectionCircle'
import iconSun from './assets/icons/icon-sun.svg'

import ListElement from './components/ListElement'

interface Task {
  id: string,
  task: string,
  completedStatus: boolean
}

type FilterType = 'all' | 'actived' | 'completed'

export default function App() {
  const [currentFilter, setCurrentFIlter] = useState<FilterType>('all')
  const [taskList, setTaskList] = useState<Task[]>([])
  const [task, setTask] = useState<Task>({
    id: '',
    task: '',
    completedStatus: false
  })

  const addTask = () => {
    setTaskList(prev => [...prev, { ...task, id: crypto.randomUUID() }])
  }

  const removeCompleteTask = () => {
    setTaskList(prev => prev.filter(e => e.completedStatus === false))
  }

  const changeTaskStatus = (id: string) => {
    setTaskList(prev => prev.map(e => e.id === id ? { ...e, completedStatus: !e.completedStatus } : e))
  }

  const getTasksByFilter = {
    all: () => taskList,
    actived: () => taskList.filter(e => !e.completedStatus),
    completed: () => taskList.filter(e => e.completedStatus)
  }

  const handleTask = (e: React.ChangeEvent<HTMLInputElement>) => setTask(prev => ({ ...prev, task: e.target.value }))

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addTask()
      clearInput()
    }
  }

  const clearInput = () => setTask({ id: '', task: '', completedStatus: false })

  return (
    <div className="flex flex-col">
      <header className=' justify-between flex w-[100%] items-center mt-[10.5vh] mb-[6.2vh]' >
        <h1 className='text-[2.6rem] tracking-[0.15em]'>TODO</h1>
        <div className="w-[25px]">
          <img src={iconSun} alt="" />
        </div>
      </header>

      <main>
        <div className="flex items-center h-[65px] bg-[hsl(235,24%,19%)] rounded-[5px] justify-start px-[25px] mb-[2.5vh] shadow-input border-0">
          <SelectionCircle />

          <input className='text-[hsl(234,39%,85%)] text-[18px] h-full bg-transparent outline-none w-full'
            name='task'
            onChange={e => handleTask(e)}
            type="text"
            id="taskInput"
            onKeyDown={e => handleKeyDown(e)}
            value={task.task}
          />
        </div>


        <div className="bg-[hsl(235,24%,19%)] rounded-[5px] shadow-list">
          <ul id="todoList" className="list-none">
            {getTasksByFilter[currentFilter]().map(e => (
              <ListElement key={e.id} id={e.id} changeTaskStatus={() => changeTaskStatus(e.id)}>{e.task}</ListElement>
            ))}
          </ul>

          <div className="flex justify-between items-center px-[28px]">
            <p className='text-[hsl(235,16%,43%)] text-[14px] font-semibold font-[500]'><span id="task_counter" className='text-[hsl(235,16%,43%)] text-[14px]'>{taskList.length}</span> items left</p>

            <div className="flex justify-around items-center gap-[20px] h-[56px] text-[hsl(233,14%,35%);]">
              <button className='text-[15px] text-[hsl(235,16%,43%)] hover:text-[hsl(236,33%,92%)] font-[700]'
                onClick={() => setCurrentFIlter('all')}>
                All
              </button>

              <button className='text-[15px] font-[700] text-[hsl(235,16%,43%)] hover:text-[hsl(236,33%,92%)]'
                id="filter_active_tasks"
                onClick={() => setCurrentFIlter('actived')}>
                Active
              </button>

              <button className='text-[15px] font-[700] text-[hsl(235,16%,43%)] hover:text-[hsl(236,33%,92%)]'
                onClick={() => setCurrentFIlter('completed')}>
                Completed
              </button>
            </div>

            <button id="clear_completed" className='font-[500]' onClick={removeCompleteTask}>Clear Completed</button>
          </div>
        </div>

        <footer className='h-[13vh] flex items-center justify-center'>
          <p className='text-[hsl(235,16%,43%)] text-[14px] font-semibold font-[500]'>Drag and drop to recorder list</p>
        </footer>
      </main>

    </div>
  )
}