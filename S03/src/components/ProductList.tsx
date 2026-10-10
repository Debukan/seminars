import type {Product} from '../data'
import {memo} from 'react'
import {ProductCard} from './ProductCard'

interface ProductListProps {
    products: Product[]
    qtyById: number[]
    onAdd: (product: Product) => void
    onRemove: (id: number) => void
}

export const ProductList = memo(function ProductList({products, qtyById, onAdd, onRemove}: ProductListProps) {
    if (products.length === 0) {
        return <div className="empty-state"><h2>Ничего не найдено</h2><p>Попробуйте другое название или отключите фильтр
            наличия.</p></div>
    }
    return <div className="product-grid">{products.map((product) => <ProductCard key={product.id} product={product}
                                                                                 qty={qtyById[product.id] ?? 0}
                                                                                 onAdd={onAdd}
                                                                                 onRemove={onRemove}/>)}</div>
})
