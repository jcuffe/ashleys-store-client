import { createMachine, spawn, assign, forwardTo } from 'xstate'
import { buildCartContext, cartMachine } from '../cart'
import { buildCheckoutContext, checkoutMachine } from '../checkout'
import { buildProductContext, productMachine } from '../product'
import { ParentContext, ParentEvent } from '.'

export const parentMachine = createMachine<ParentContext, ParentEvent>(
  {
    id: 'parent',
    initial: 'idle',
    states: {
      idle: {
        entry: 'spawnActors',
        on: {
          broadcastCart: {
            actions: 'broadcastCart',
          },
          requestCart: {
            actions: 'requestCart',
          },
        },
      },
    },
  },
  {
    actions: {
      spawnActors: assign<ParentContext, ParentEvent>({
        cartActor: (c) =>
          spawn(
            cartMachine.withContext(buildCartContext(c.apolloClient)),
            'cart',
          ),
        checkoutActor: (c) =>
          spawn(
            checkoutMachine.withContext(buildCheckoutContext(c.apolloClient)),
            'checkout',
          ),
        productActor: (c) =>
          spawn(
            productMachine.withContext(buildProductContext(c.apolloClient)),
            'product',
          ),
      }),
      broadcastCart: forwardTo('checkout'),
      requestCart: forwardTo('cart'),
    },
  },
)
