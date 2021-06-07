import type { ApolloClient, NormalizedCacheObject } from '@apollo/client'
import { Interpreter, ActorRefFrom } from 'xstate'
import { CartContext, CartEvent } from '../cart'
import { ProductContext, ProductEvent } from '../product'
import {
  BroadcastCartEvent,
  CheckoutContext,
  CheckoutEvent,
  RequestCartEvent,
} from '../checkout'

export type CartActor = ActorRefFrom<
  Interpreter<CartContext, any, CartEvent>['machine']
>

export type ProductActor = ActorRefFrom<
  Interpreter<ProductContext, any, ProductEvent>['machine']
>

export type CheckoutActor = ActorRefFrom<
  Interpreter<CheckoutContext, any, CheckoutEvent>['machine']
>

export interface ParentContext {
  apolloClient: ApolloClient<NormalizedCacheObject>
  cartActor: CartActor
  checkoutActor: CheckoutActor
  productActor: ProductActor
}

export type ParentEvent = BroadcastCartEvent | RequestCartEvent
