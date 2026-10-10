import type {Product} from '../data'
import type {CartItem} from '../cart'
import {ProductCard} from './ProductCard'

interface ProductListProps {
    products: Product[]
    items: CartItem[]
    onAdd: (product: Product) => void
    onRemove: (id: number) => void
}

export function ProductList({products, items, onAdd, onRemove}: ProductListProps) {
    if (products.length === 0) {
        return <div className="empty-state"><h2>Ничего не найдено</h2><p>Попробуйте другое название или отключите фильтр
            наличия.</p></div>
    }
    return <div className="product-grid">{products.map((product) => <ProductCard key={product.id} product={product}
                                                                                 qty={items.find((item) => item.id === product.id)?.qty ?? 0}
                                                                                 onAdd={onAdd}
                                                                                 onRemove={onRemove}/>)}</div>
}
