import { assign, createMachine } from 'xstate'
import { CheckoutContext, CheckoutEvent } from 'src/machines/checkout/types'

const initialContext = {
  shippingAddress: {
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
  },
}

const checkoutMachine = createMachine<CheckoutContext, CheckoutEvent>(
  {
    initial: 'itemSummary',
    context: initialContext,
    states: {
      itemSummary: {
        on: {
          next: 'shippingAddress',
        },
      },
      shippingAddress: {
        on: {
          previous: 'itemSummary',
          next: 'confirmation',
          submitForm: {
            actions: [
              assign({
                shippingAddress: (ctx, event) => event.values,
              }),
              'logContext',
            ],
          },
        },
      },
      confirmation: {
        on: {
          previous: 'shippingAddress',
        },
      },
    },
  },
  {
    actions: {
      logContext: (ctx) => console.log('Checkout Context', ctx),
    },
  },
)

export default checkoutMachine
