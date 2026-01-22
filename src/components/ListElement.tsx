import SelectionCircle from './SelectionCircle'
import iconCross from '../assets/icons/icon-cross.svg'

type ListElementProps = {
    children: string,
    id: string,
    changeTaskStatus: VoidFunction
}

export default function ListElement({ children, id, changeTaskStatus }: ListElementProps) {
    return (
        <li className='flex items-center justify-between h-[65px] border-b border-[hsl(237,14%,26%)] px-[25px]' >
            <input type="checkbox" id={id} className='hidden' />
            <label htmlFor={id} className='flex items-center' onClick={changeTaskStatus}>
                <SelectionCircle />
                <span className='text-[18px] cursor-pointer'>{children}</span>
            </label>
            <button>
                <img src={iconCross} alt="" />
            </button>

        </li>
    )
}