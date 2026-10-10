interface HeaderProps {
    totalCount: number
    totalPrice: number
    onClear: () => void
}

export function Header({totalCount, totalPrice, onClear}: HeaderProps) {
    return (
        <header className="header">
            <h1>Магазин</h1>
            <div className="cart-summary">
                <span role="status">Корзина: {totalCount} шт. · {totalPrice} ₽</span>
                <button type="button" onClick={onClear} disabled={totalCount === 0}>
                    Очистить
                </button>
            </div>
        </header>
    )
}
