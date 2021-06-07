import { assign, createMachine } from 'xstate'
import { ProductContext, ProductEvent } from 'src/machines/product/types'

export const productMachine = createMachine<ProductContext, ProductEvent>(
  {
    id: 'product',
    initial: 'idle',
    states: {
      idle: {
        on: {
          setProducts: {
            actions: [
              assign({ products: (_, event) => event.products }),
              'logContext',
            ],
          },
        },
      },
    },
  },
  {
    actions: {
      logContext: (ctx) => console.log('Product Context', ctx),
    },
  },
)

export default productMachine
