import { ApolloError } from 'src/services/apollo'
import { assign, sendParent } from 'xstate'
import type { Stripe } from '@stripe/stripe-js'
import { ParentEvent } from '../parent'
import { CheckoutContext, CheckoutEvent, SubmitAddressEvent } from './types'

export const storeAddress = assign<CheckoutContext, CheckoutEvent>({
  shippingAddress: (_, e) => (e as SubmitAddressEvent).values,
})

export const storePaymentIntent = assign<CheckoutContext, CheckoutEvent>({
  paymentIntent: (_, e) => (e as any).data,
})

export const storeStripeData = assign<CheckoutContext, CheckoutEvent>({
  stripeClient: (_, e) => (e as any).data,
  cardElement: (_, e) => ((e as any).data as Stripe).elements().create('card'),
})

export const logContext = (ctx: CheckoutContext) =>
  console.log('Checkout Context', ctx)

export const logEvent = (ctx: CheckoutContext, e: CheckoutEvent) =>
  console.log('Checkout Event', e)

export const logError = (ctx: CheckoutContext, e: CheckoutEvent) =>
  console.log('Error', (e as ApolloError).errors)

export const requestCart = sendParent<
  CheckoutContext,
  CheckoutEvent,
  ParentEvent
>({
  type: 'requestCart',
})
