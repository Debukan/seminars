import { useMemo, useState } from 'react'
import { filterProducts } from './data'
import { Header } from './components/Header'
import { SearchBar } from './components/SearchBar'
import { ProductList } from './components/ProductList'
import './App.css'

function App() {
    const [query, setQuery] = useState('')
    const [onlyInStock, setOnlyInStock] = useState(false)
    const visible = useMemo(() => filterProducts(query, onlyInStock), [query, onlyInStock])

    return (
        <div className="app" id="top">
            <Header />
            <main>
                <SearchBar query={query} onlyInStock={onlyInStock} onSearch={setQuery} onStockChange={setOnlyInStock} />
                <div className="results-bar"><p>Найдено: <strong>{visible.length}</strong></p></div>
                <ProductList products={visible} />
            </main>
        </div>
    )
}

export default App
