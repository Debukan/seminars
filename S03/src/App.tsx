import {useMemo, useState, useTransition} from 'react'
import {ErrorBoundary} from 'react-error-boundary'
import {filterProducts} from './data'
import {Header} from './components/Header'
import {SearchBar} from './components/SearchBar'
import {ProductList} from './components/ProductList'
import {ListErrorFallback} from './components/ListErrorFallback'
import {useCart} from './hooks/useCart'
import {CartContext} from './context/cartContext'
import './App.css'

function App() {
    const [query, setQuery] = useState('')
    const [filter, setFilter] = useState('')
    const [onlyInStock, setOnlyInStock] = useState(false)
    const [isPending, startTransition] = useTransition()
    const cart = useCart()
    const visible = useMemo(() => filterProducts(filter, onlyInStock), [filter, onlyInStock])

    function handleSearch(value: string) {
        setQuery(value)
        startTransition(() => setFilter(value))
    }

    return (
        <CartContext.Provider value={cart}>
            <div className="app" id="top">
                <Header/>
                <main>
                    <SearchBar query={query} onlyInStock={onlyInStock} onSearch={handleSearch}
                               onStockChange={setOnlyInStock}/>
                    <div className="results-bar"><p>Найдено: <strong>{visible.length}</strong></p><span
                        role="status">{isPending && 'Обновляем список…'}</span></div>
                    <div aria-busy={isPending}>
                        <ErrorBoundary FallbackComponent={ListErrorFallback}>
                            <ProductList products={visible}/>
                        </ErrorBoundary>
                    </div>
                </main>
            </div>
        </CartContext.Provider>
    )
}

export default App
