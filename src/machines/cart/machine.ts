import _ from 'lodash'
import { assign, createMachine } from 'xstate'
import { CartContext, CartEvent } from 'src/machines/cart/types'

const initialContext: CartContext = {
  items: {},
}

const cartMachine = createMachine<CartContext, CartEvent>(
  {
    initial: 'idle',
    context: initialContext,
    states: {
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
            ],
          },
          removeItem: {
            actions: [
              assign({
                items: (ctx, event) =>
                  _.pickBy(ctx.items, (item) => item.product.id !== event.id),
              }),
              'logContext',
            ],
          },
          setQuantity: {
            actions: [
              assign({
                items: (ctx, event) =>
                  _.set(ctx.items, [event.id, 'quantity'], event.quantity),
              }),
              'logContext',
            ],
          },
        },
      },
    },
  },
  {
    actions: {
      logContext: (ctx) => console.log('Cart Context', ctx),
    },
  },
)

export default cartMachine
