import _ from 'lodash'
import { assign, createMachine } from 'xstate'
import { CartContext, CartEvent } from 'src/machines/cart/types'

const initialContext: CartContext = {
  items: {},
}

const cartMachine = createMachine<CartContext, CartEvent>(
  {
    initial: 'starting',
    context: initialContext,
    states: {
      starting: {
        always: {
          actions: 'restoreContext',
          target: 'idle',
        },
      },
      idle: {
        on: {
          addItem: {
            actions: [
              assign({
                items: (ctx, event) => {
                  const item = {
                    product: event.product,
                    quantity: event.quantity,
                  }
                  return { ...ctx.items, [item.product.id]: item }
                },
              }),
              'logContext',
              'persistContext',
            ],
          },
          removeItem: {
            actions: [
              assign({
                items: (ctx, event) =>
                  _.pickBy(ctx.items, (item) => item.product.id !== event.id),
              }),
              'logContext',
              'persistContext',
            ],
          },
          setQuantity: {
            actions: [
              assign({
                items: (ctx, event) =>
                  _.set(ctx.items, [event.id, 'quantity'], event.quantity),
              }),
              'logContext',
              'persistContext',
            ],
          },
        },
      },
    },
  },
  {
    actions: {
      logContext: (ctx) => console.log('Cart Context', ctx),
      persistContext: (ctx) => {
        console.log('persisting...')
        localStorage.setItem('cart', JSON.stringify(ctx))
      },
      restoreContext: assign((ctx, event) => {
        console.log('restoring...')
        try {
          const serializedContext = localStorage.getItem('cart') as string
          const context = JSON.parse(serializedContext) as CartContext
          return context
        } catch {
          return {}
        }
      }),
    },
  },
)

export default cartMachine
