import { Product } from '../product'

export interface CartContext {
  items: CartLookup
}

export interface CartLookup {
  [id: number]: CartItem
}

export interface CartItem {
  product: Product
  quantity: number
}

export type CartEvent =
  | { type: 'setQuantity'; id: number; quantity: number }
  | { type: 'removeItem'; id: number }
  | { type: 'addItem'; product: Product; quantity: number }
