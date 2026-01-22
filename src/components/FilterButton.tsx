type FilterType = 'all' | 'active' | 'completed'

type FilterButtonProps = {
    children: string,
    value: FilterType,
    currentFilter: FilterType,
    setCurrentFilter: (filter: FilterType) => void
}

export default function FilterButton({ children, value, currentFilter, setCurrentFilter }: FilterButtonProps) {
    return (
        <button className={`text-[15px] font-[700]  hover:text-[hsl(236,33%,92%)]
            ${value === currentFilter
                ? 'text-[hsl(220,98%,61%)]'
                : 'text-[hsl(235,16%,43%)]'
            }
            `}
            onClick={() => setCurrentFilter(value)}
        >
            {children}
        </button>
    )
}