import type {Product} from './data'

export interface CartItem {
    id: number
    title: string
    price: number
    qty: number
}

export interface CartState {
    items: CartItem[]
}

export type CartAction =
    | { type: 'add'; product: Product }
    | { type: 'remove'; id: number }
    | { type: 'clear' }

export const initialCart: CartState = {items: []}

export function cartReducer(state: CartState, action: CartAction): CartState {
    switch (action.type) {
        case 'add': {
            if (!action.product.inStock) return state

            const existing = state.items.find((item) => item.id === action.product.id)

            if (existing) {
                const items = state.items.map((item) => {
                    if (item.id === action.product.id) {
                        return {...item, qty: item.qty + 1}
                    }
                    return item
                })
                return {items}
            }

            const newItem: CartItem = {
                id: action.product.id,
                title: action.product.title,
                price: action.product.price,
                qty: 1,
            }
            return {items: [...state.items, newItem]}
        }
        case 'remove':
            return {items: state.items.filter((item) => item.id !== action.id)}
        case 'clear':
            return {items: []}
        default:
            return state
    }
}

export function getTotalCount(items: CartItem[]): number {
    let total = 0
    for (const item of items) {
        total += item.qty
    }
    return total
}

export function getTotalPrice(items: CartItem[]): number {
    let total = 0
    for (const item of items) {
        total += item.price * item.qty
    }
    return total
}

export function getQuantities(items: CartItem[]): number[] {
    const quantities: number[] = []
    for (const item of items) {
        quantities[item.id] = item.qty
    }
    return quantities
}
