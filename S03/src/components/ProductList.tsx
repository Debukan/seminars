import {memo} from 'react'
import type {Product} from '../data'
import {useCartContext} from '../hooks/useCartContext'
import {ProductCard} from './ProductCard'

export const ProductList = memo(function ProductList({products}: { products: Product[] }) {
    const {qtyById, add, remove} = useCartContext()
    if (products.length === 0) {
        return <div className="empty-state"><h2>Ничего не найдено</h2><p>Попробуйте другое название или отключите фильтр
            наличия.</p></div>
    }
    return <div className="product-grid">{products.map((product) => <ProductCard key={product.id} product={product}
                                                                                 qty={qtyById[product.id] ?? 0}
                                                                                 onAdd={add} onRemove={remove}/>)}</div>
})
