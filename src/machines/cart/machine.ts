import _ from 'lodash'
import { assign, createMachine, sendParent } from 'xstate'
import { CartContext, CartEvent, CartLookup } from 'src/machines/cart/types'

export const cartMachine = createMachine<CartContext, CartEvent>(
  {
    id: 'cart',
    initial: 'idle',
    states: {
      idle: {
        entry: 'restoreContext',
        on: {
          requestCart: {
            actions: ['broadcastCart', 'logEvent'],
          },
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
              'broadcastCart',
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
              'broadcastCart',
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
              'broadcastCart',
            ],
          },
        },
      },
    },
  },
  {
    actions: {
      logContext: (ctx) => console.log('Cart Context', ctx.items),
      logEvent: (_, e) => console.log('Cart Event', e),
      persistContext: (ctx) => {
        console.log('persisting...')
        localStorage.setItem('cartItems', JSON.stringify(ctx.items))
      },
      restoreContext: assign<CartContext, CartEvent>(() => {
        console.log('restoring...')
        try {
          const serializedContext = localStorage.getItem('cartItems') as string

          if (serializedContext === null) {
            return {}
          }

          const items = JSON.parse(serializedContext) as CartLookup
          return { items }
        } catch {
          return {}
        }
      }),
      broadcastCart: sendParent<CartContext, CartEvent>((ctx) => ({
        type: 'broadcastCart',
        items: Object.values(ctx.items).map((item) => ({
          productId: item.product.id,
          quantity: item.quantity,
        })),
      })),
    },
  },
)

export default cartMachine
