interface ListErrorFallbackProps {
    resetErrorBoundary: () => void
}

export function ListErrorFallback({resetErrorBoundary}: ListErrorFallbackProps) {
    return (
        <div className="error-state" role="alert">
            <h2>Не удалось показать товары</h2>
            <p>Попробуйте загрузить список ещё раз. Корзина сохранена.</p>
            <button type="button" className="button-secondary" onClick={resetErrorBoundary}>
                Повторить
            </button>
        </div>
    )
}
