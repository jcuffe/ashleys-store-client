import { createMachine } from 'xstate'
import { CheckoutContext, CheckoutEvent } from './types'
import * as services from './services'
import * as actions from './actions'

export const checkoutMachine = createMachine<CheckoutContext, CheckoutEvent>(
  {
    id: 'checkout',
    type: 'parallel',
    states: {
      ui: {
        initial: 'shipping',
        states: {
          shipping: {
            on: {
              submitForm: {
                target: 'payment',
                actions: ['storeAddress', 'logContext'],
              },
            },
          },
          payment: {
            invoke: {
              src: 'mountCardElement',
            },
            on: {
              previous: 'shipping',
              confirmPayment: 'confirmation',
            },
          },
          confirmation: {
            invoke: { src: 'confirmPayment', onDone: 'success' },
          },
          success: {
            type: 'final',
            // entry: 'clearCart'
          },
        },
      },
      stripe: {
        initial: 'loading',
        states: {
          loading: {
            invoke: {
              src: 'initStripe',
              onDone: {
                actions: ['storeStripeData', 'logContext'],
                target: 'ready',
              },
            },
          },
          ready: {},
        },
      },
      data: {
        initial: 'idle',
        states: {
          idle: { entry: 'requestCart' },
          active: {
            invoke: {
              src: 'createOrUpdatePaymentIntent',
              onDone: {
                actions: ['storePaymentIntent', 'logContext'],
              },
              onError: { actions: 'logEvent' },
            },
          },
          error: {},
        },
        on: {
          broadcastCart: 'data.active',
          submitForm: 'data.active',
        },
      },
    },
  },
  { services, actions },
)

export default checkoutMachine
