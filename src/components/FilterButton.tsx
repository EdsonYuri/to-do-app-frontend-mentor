type FilterType = 'all' | 'active' | 'completed'

type FilterButtonProps = {
    children: string,
    value: FilterType,
    currentFilter: FilterType,
    setCurrentFilter: (filter: FilterType) => void
}

export default function FilterButton({ children, value, currentFilter, setCurrentFilter }: FilterButtonProps) {
    return (
        <button className={`text-[12px] sm:text-[15px] font-bold   
            ${value === currentFilter
                ? 'text-[hsl(220,98%,61%)] hover:text-[hsl(220,98%,61%)]'
                : 'text-[hsl(236,9%,61%)] dark:text-[hsl(235,16%,43%)] dark:hover:text-[hsl(236,33%,92%)] hover:text-[hsl(235,19%,35%)]'
            }
            `}
            onClick={() => setCurrentFilter(value)}
        >
            {children}
        </button>
    )
}