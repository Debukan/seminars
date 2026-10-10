import {useContext} from 'react'
import {CartContext} from '../context/cartContext'

export function useCartContext() {
    const cart = useContext(CartContext)
    if (!cart) throw new Error('Компонент корзины должен находиться внутри CartContext.Provider')
    return cart
}
