import {useCallback, useMemo, useReducer, useState} from 'react'
import {filterProducts} from './data'
import {Header} from './components/Header'
import {SearchBar} from './components/SearchBar'
import {ProductList} from './components/ProductList'
import {cartReducer, getQuantities, getTotalCount, getTotalPrice, initialCart} from './cart'
import type {Product} from './data'
import './App.css'

function App() {
    const [query, setQuery] = useState('')
    const [onlyInStock, setOnlyInStock] = useState(false)
    const visible = useMemo(() => filterProducts(query, onlyInStock), [query, onlyInStock])

    const [cart, dispatch] = useReducer(cartReducer, initialCart)
    const totalCount = useMemo(() => getTotalCount(cart.items), [cart.items])
    const totalPrice = useMemo(() => getTotalPrice(cart.items), [cart.items])
    const add = useCallback((product: Product) => dispatch({type: 'add', product}), [])
    const remove = useCallback((id: number) => dispatch({type: 'remove', id}), [])
    const clear = useCallback(() => dispatch({type: 'clear'}), [])
    const qtyById = useMemo(() => getQuantities(cart.items), [cart.items])

    return (
        <div className="app" id="top">
            <Header totalCount={totalCount} totalPrice={totalPrice} onClear={clear}/>
            <main>
                <SearchBar query={query} onlyInStock={onlyInStock} onSearch={setQuery} onStockChange={setOnlyInStock}/>
                <div className="results-bar"><p>Найдено: <strong>{visible.length}</strong></p></div>
                <ProductList products={visible} qtyById={qtyById} onAdd={add} onRemove={remove}/>
            </main>
        </div>
    )
}

export default App
