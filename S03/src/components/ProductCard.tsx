import type {Product} from '../data'

interface ProductCardProps {
    product: Product
}

export function ProductCard({product}: ProductCardProps) {
    return (
        <article className="product-card" aria-label={product.title}>
            <h2>{product.title}</h2>
            <p>{product.price} ₽</p>
            <p className={product.inStock ? 'available' : 'unavailable'}>
                {product.inStock ? 'В наличии' : 'Нет в наличии'}
            </p>
            <button type="button" className="button-primary" disabled={!product.inStock}>
                В корзину
            </button>
        </article>
    )
}
