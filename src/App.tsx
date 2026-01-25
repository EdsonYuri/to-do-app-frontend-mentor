import { useState } from 'react'

import iconSun from './assets/icons/icon-sun.svg'

import FilterButton from './components/FilterButton'
import SelectionCircle from './components/SelectionCircle'
import ListElement from './components/ListElement'

interface Task {
  id: string,
  task: string,
  completedStatus: boolean
}

type FilterType = 'all' | 'active' | 'completed'

export default function App() {
  const [currentFilter, setCurrentFilter] = useState<FilterType>('all')
  const [taskList, setTaskList] = useState<Task[]>([])
  const [task, setTask] = useState<Task>({
    id: '',
    task: '',
    completedStatus: false
  })

  const addTask = () => {
    if (task.task.trim()) setTaskList(prev => [...prev, { ...task, id: crypto.randomUUID() }])
  }

  const removeCompleteTask = () => {
    setTaskList(prev => prev.filter(e => e.completedStatus === false))
  }

  const removeTask = (id: string) => setTaskList(prev => prev.filter(e => e.id !== id))

  const changeTaskStatus = (id: string) => {
    setTaskList(prev => prev.map(e => e.id === id ? { ...e, completedStatus: !e.completedStatus } : e))
  }

  const getTasksByFilter = {
    all: () => taskList,
    active: () => taskList.filter(e => !e.completedStatus),
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
    <div className="flex flex-col w-full">
      <header className='mt-[4.1vh] my-[3.8vh] justify-between flex w-[full] items-center sm:mt-[7vh] sm:mb-[4vh]' >
        <h1 className='text-[1.5rem] font-semibold sm:text-[2.4rem] tracking-[0.20em] sm:tracking-[0.43em]'>TODO</h1>
        <div className="w-[25px]">
          <img src={iconSun} alt="" />
        </div>
      </header>

      <main className='w-[full]'>
        <div className="flex items-center h-[50px] sm:h-[65px] bg-[hsl(235,24%,19%)] rounded-[5px] justify-start px-[25px] mb-[2.5vh] shadow-input border-0">
          <SelectionCircle />

          <input className='text-[hsl(234,39%,85%)] text-[12px] sm:text-[18px] h-full bg-transparent outline-none w-full caret-[hsl(220,98%,61%)]'
            name='task'
            onChange={e => handleTask(e)}
            type="text"
            id="taskInput"
            onKeyDown={e => handleKeyDown(e)}
            value={task.task}
            placeholder='Create a new todo...'
          />
        </div>


        <div className="bg-[hsl(235,24%,19%)] rounded-[5px] shadow-list">
          <ul id="todoList" className="list-none">
            {getTasksByFilter[currentFilter]().map(e => (
              <ListElement key={e.id} id={e.id} changeTaskStatus={() => changeTaskStatus(e.id)} completed={e.completedStatus} removeTask={removeTask}>{e.task}</ListElement>
            ))}
          </ul>

          <div className="flex justify-between items-center px-[28px] h-[56px] w-full">
            <p className=' whitespace-nowrap text-[hsl(235,16%,43%)] text-[14px] font-normal'><span id="task_counter" className='text-[hsl(235,16%,43%)] text-[12px] sm:text-[14px]'>{getTasksByFilter[currentFilter]().length}</span> items left</p>

            <div className="justify-around items-center gap-[20px]  text-[hsl(233,14%,35%)] hidden md:flex">
              <FilterButton value='all' currentFilter={currentFilter} setCurrentFilter={setCurrentFilter}>All</FilterButton>
              <FilterButton value='active' currentFilter={currentFilter} setCurrentFilter={setCurrentFilter}>Active</FilterButton>
              <FilterButton value='completed' currentFilter={currentFilter} setCurrentFilter={setCurrentFilter}>Completed</FilterButton> 

            </div>

            <button id="clear_completed" className='font-normal text-[hsl(235,16%,43%)] text-[12px] sm:text-[14px] hover:text-[hsl(236,33%,92%)] whitespace-nowrap' onClick={removeCompleteTask}>Clear Completed</button>
          </div>
        </div>

        <div className="flex items-center justify-center  gap-[20px] h-[50px] bg-[hsl(235,24%,19%)] rounded-[5px] mt-[2.5vh] shadow-input border-0 md:hidden">
          <FilterButton value='all' currentFilter={currentFilter} setCurrentFilter={setCurrentFilter}>All</FilterButton>
          <FilterButton value='active' currentFilter={currentFilter} setCurrentFilter={setCurrentFilter}>Active</FilterButton>
          <FilterButton value='completed' currentFilter={currentFilter} setCurrentFilter={setCurrentFilter}>Completed</FilterButton>
        </div>

        <footer className='h-[13vh] flex items-center justify-center'>
          <p className='text-[hsl(235,16%,43%)] text-[14px] font-semibold'>Drag and drop to recorder list</p>
        </footer>
      </main>

    </div>
  )
}