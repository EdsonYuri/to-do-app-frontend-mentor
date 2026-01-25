import SelectionCircle from './SelectionCircle'
import iconCross from '../assets/icons/icon-cross.svg'

type ListElementProps = {
    children: string,
    id: string,
    changeTaskStatus: VoidFunction,
    completed: boolean,
    removeTask: (id: string) => void
}

export default function ListElement({ children, id, changeTaskStatus, completed, removeTask }: ListElementProps) {
    return (
        <li className='flex items-center justify-between h-[50px] sm:h-[65px] border-b border-[hsl(237,14%,26%)] px-[25px]' >
            <input type="checkbox" id={id} className='hidden' onChange={changeTaskStatus} checked={completed} />
            <label htmlFor={id} className='flex items-center'>
                <SelectionCircle />
                <span className='text-[12px] sm:text-[18px] cursor-pointer'>{children}</span>
            </label>
            <button className='w-[13px] sm:w-[18px]'  onClick={() => removeTask(id)}>
                <img src={iconCross} alt=""/>
            </button>

        </li>
    )
}
