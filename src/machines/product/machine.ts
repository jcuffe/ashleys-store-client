import { assign, createMachine } from 'xstate'
import { ProductContext, ProductEvent } from 'src/machines/product/types'

const initialContext = {
  products: [
    {
      id: 1,
      name: 'CBD Balm',
      description:
        'Great for sore feet! Rub this balm on sore spots for long-lasting pain relief.',
      prices: {
        1: 10,
      },
    },
    {
      id: 2,
      name: 'CBD Bath Salts',
      description:
        'Dissolve these CBD-infused salts into your next bath for instant relaxation.',
      prices: {
        1: 15,
      },
    },
    {
      id: 3,
      name: 'THC Fruit Punch',
      description: 'Fruit juices and THC-infused sugar!',
      prices: {
        1: 15,
      },
    },
  ],
}

const productMachine = createMachine<ProductContext, ProductEvent>(
  {
    initial: 'idle',
    context: initialContext,
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
