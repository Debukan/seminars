import {useCartContext} from '../hooks/useCartContext'

export function Header() {
    const {totalCount, totalPrice, clear} = useCartContext()

    return (
        <header className="header">
            <h1>Магазин</h1>
            <div className="cart-summary">
                <span role="status">Корзина: {totalCount} шт. · {totalPrice} ₽</span>
                <button type="button" onClick={clear} disabled={totalCount === 0}>
                    Очистить
                </button>
            </div>
        </header>
    )
}
