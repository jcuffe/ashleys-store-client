import type { ApolloClient, NormalizedCacheObject } from '@apollo/client'
import { CheckoutContext } from './types'

export const buildCheckoutContext = (
  apolloClient: ApolloClient<NormalizedCacheObject>,
): CheckoutContext => ({
  contactInfo: {
    phone: '',
    email: '',
  },
  shippingAddress: {
    name: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
  },
  paymentIntent: null,
  apolloClient,
  stripeClient: null,
  cardElement: null,
})
