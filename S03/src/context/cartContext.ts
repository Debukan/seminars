import {createContext} from 'react'
import type {CartValue} from '../cart'

export const CartContext = createContext<CartValue | null>(null)
