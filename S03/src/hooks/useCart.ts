import {useCallback, useEffect, useMemo, useReducer} from 'react'
import {cartReducer, getQuantities, getTotalCount, getTotalPrice, initialCart} from '../cart'
import type {CartItem, CartValue} from '../cart'
import {products} from '../data'
import type {Product} from '../data'

const STORAGE_KEY = 'seminar3-cart'

function readSavedItems(): CartItem[] {
    try {
        const text = localStorage.getItem(STORAGE_KEY)
        if (text === null) return []

        const saved: unknown = JSON.parse(text)
        if (saved === null || typeof saved !== 'object') return []
        if (!('items' in saved) || !Array.isArray(saved.items)) return []

        const items: CartItem[] = []
        for (const entry of saved.items) {
            const item: unknown = entry
            if (item === null || typeof item !== 'object') continue
            if (!('id' in item) || !('qty' in item)) continue
            if (typeof item.id !== 'number' || typeof item.qty !== 'number') continue
            if (item.qty <= 0 || item.qty % 1 !== 0) continue

            const product = products.find((product) => product.id === item.id)
            if (!product || !product.inStock) continue

            const existing = items.find((existing) => existing.id === product.id)
            if (existing) {
                existing.qty += item.qty
            } else {
                items.push({
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    qty: item.qty,
                })
            }
        }
        return items
    } catch {
        return []
    }
}

export function useCart(): CartValue {
    const [cart, dispatch] = useReducer(cartReducer, initialCart)

    useEffect(() => {
        dispatch({type: 'restore', items: readSavedItems()})
    }, [])

    useEffect(() => {
        if (!cart.isRestored) return

        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify({items: cart.items}))
        } catch {
            console.warn('Не удалось сохранить корзину: localStorage недоступен.')
        }
    }, [cart])

    const add = useCallback((product: Product) => {
        dispatch({type: 'add', product})
    }, [])

    const remove = useCallback((id: number) => {
        dispatch({type: 'remove', id})
    }, [])

    const clear = useCallback(() => {
        dispatch({type: 'clear'})
    }, [])

    const totalCount = useMemo(() => getTotalCount(cart.items), [cart.items])
    const totalPrice = useMemo(() => getTotalPrice(cart.items), [cart.items])
    const qtyById = useMemo(() => getQuantities(cart.items), [cart.items])

    return useMemo(() => ({
        items: cart.items,
        totalCount,
        totalPrice,
        qtyById,
        add,
        remove,
        clear,
    }), [cart.items, totalCount, totalPrice, qtyById, add, remove, clear])
}
