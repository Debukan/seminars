import type {Product} from '../data'
import {ProductCard} from './ProductCard'

export function ProductList({products}: { products: Product[] }) {
    if (products.length === 0) {
        return <div className="empty-state"><h2>Ничего не найдено</h2><p>Попробуйте другое название или отключите фильтр
            наличия.</p></div>
    }
    return <div className="product-grid">{products.map((product) => <ProductCard key={product.id}
                                                                                 product={product}/>)}</div>
}
