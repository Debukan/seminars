import {useEffect, useRef} from 'react'

interface SearchBarProps {
    query: string
    onlyInStock: boolean
    onSearch: (value: string) => void
    onStockChange: (value: boolean) => void
}

export function SearchBar({query, onlyInStock, onSearch, onStockChange}: SearchBarProps) {
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (inputRef.current !== null) {
            inputRef.current.focus()
        }
    }, [])

    return (
        <section className="search-panel" aria-label="Фильтры каталога">
            <input
                ref={inputRef}
                id="search"
                type="search"
                aria-label="Поиск по названию"
                placeholder="Поиск по названию..."
                value={query}
                onChange={(event) => onSearch(event.target.value)}
            />
            <label className="stock-filter">
                <input
                    type="checkbox"
                    checked={onlyInStock}
                    onChange={(event) => onStockChange(event.target.checked)}
                />
                Только в наличии
            </label>
        </section>
    )
}
