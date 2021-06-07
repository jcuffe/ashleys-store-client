import { loadStripe, StripeCardElement } from '@stripe/stripe-js'
import { invokeMutation } from 'src/services/apollo'
import { sleep } from 'src/services/util'
import { BroadcastCartEvent, CheckoutContext, CheckoutEvent } from './types'

export const createOrUpdatePaymentIntent = (
  ctx: CheckoutContext,
  event: CheckoutEvent,
) => {
  const mutation = `
    mutation CreateOrUpdatePaymentIntent($checkout: PaymentIntentInput!) {
      createOrUpdatePaymentIntent(checkout: $checkout) {
        clientSecret
        paymentIntentId
      }
    }
  `

  const variables = {
    checkout: {
      items: (event as BroadcastCartEvent).items,
      shippingAddress: ctx.shippingAddress,
      paymentIntentId: ctx.paymentIntent?.paymentIntentId,
    },
  }

  const mapper = (a: any) => a.createOrUpdatePaymentIntent
  return invokeMutation(ctx.apolloClient, mutation, variables, mapper)
}

export const initStripe = async () => {
  const stripeClient = await loadStripe(
    process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY,
  )
  return stripeClient
}

export const mountCardElement = async (ctx: CheckoutContext) => {
  let mounted = false
  while (!mounted) {
    try {
      // TODO allow the component to register with a function ref and get rid of this id
      ctx.cardElement!.mount('#stripe-card-element')
      mounted = true
    } catch {
      await sleep(100)
    }
  }
}

export const confirmPayment = async (ctx: CheckoutContext) => {
  console.log('CONFIRMING')
  const { paymentIntent, error } = await ctx.stripeClient!.confirmCardPayment(
    ctx.paymentIntent!.clientSecret,
    {
      payment_method: {
        card: ctx.cardElement as StripeCardElement,
      },
    },
  )
  console.log('DONE', paymentIntent, error)
}
