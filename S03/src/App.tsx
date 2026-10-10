import {useMemo, useReducer, useState} from 'react'
import {filterProducts} from './data'
import {Header} from './components/Header'
import {SearchBar} from './components/SearchBar'
import {ProductList} from './components/ProductList'
import {cartReducer, getTotalCount, getTotalPrice, initialCart} from './cart'
import type {Product} from './data'
import './App.css'

function App() {
    const [query, setQuery] = useState('')
    const [onlyInStock, setOnlyInStock] = useState(false)
    const visible = useMemo(() => filterProducts(query, onlyInStock), [query, onlyInStock])

    const [cart, dispatch] = useReducer(cartReducer, initialCart)
    const totalCount = getTotalCount(cart.items)
    const totalPrice = getTotalPrice(cart.items)
    const add = (product: Product) => dispatch({type: 'add', product})
    const remove = (id: number) => dispatch({type: 'remove', id})
    const clear = () => dispatch({type: 'clear'})

    return (
        <div className="app" id="top">
            <Header totalCount={totalCount} totalPrice={totalPrice} onClear={clear}/>
            <main>
                <SearchBar query={query} onlyInStock={onlyInStock} onSearch={setQuery} onStockChange={setOnlyInStock}/>
                <div className="results-bar"><p>Найдено: <strong>{visible.length}</strong></p></div>
                <ProductList products={visible} items={cart.items} onAdd={add} onRemove={remove}/>
            </main>
        </div>
    )
}

export default App
