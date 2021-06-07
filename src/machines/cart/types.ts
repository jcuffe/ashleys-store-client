import { ApolloClient, NormalizedCacheObject } from '@apollo/client'
import { Product } from '../product'
import { BroadcastCartEvent, RequestCartEvent } from '../checkout'

export interface CartContext {
  items: CartLookup
  apolloClient: ApolloClient<NormalizedCacheObject>
}

export interface CartLookup {
  [id: number]: CartItem
}

export interface CartItem {
  product: Product
  quantity: number
}

export type CartEvent =
  | BroadcastCartEvent
  | RequestCartEvent
  | { type: 'setQuantity'; id: number; quantity: number }
  | { type: 'removeItem'; id: number }
  | { type: 'addItem'; product: Product; quantity: number }

export const buildCartContext = (
  apolloClient: ApolloClient<NormalizedCacheObject>,
): CartContext => ({
  items: [],
  apolloClient,
})
