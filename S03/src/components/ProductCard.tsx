import {memo} from 'react'
import type {Product} from '../data'

interface ProductCardProps {
    product: Product
    qty: number
    onAdd: (product: Product) => void
    onRemove: (id: number) => void
}

export const ProductCard = memo(function ProductCard({product, qty, onAdd, onRemove}: ProductCardProps) {
    console.log('render', product.id)

    return (
        <article className="product-card" aria-label={product.title}>
            <h2>{product.title}</h2>
            <p>{product.price} ₽</p>
            <p className={product.inStock ? 'available' : 'unavailable'}>
                {product.inStock ? 'В наличии' : 'Нет в наличии'}
            </p>
            {qty > 0 && <p>В корзине: {qty}</p>}
            <div className="card-actions">
                <button
                    type="button"
                    className="button-primary"
                    disabled={!product.inStock}
                    onClick={() => onAdd(product)}
                >
                    В корзину
                </button>
                {qty > 0 && (
                    <button type="button" onClick={() => onRemove(product.id)}>
                        Убрать
                    </button>
                )}
            </div>
        </article>
    )
})
