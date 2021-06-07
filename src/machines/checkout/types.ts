import * as yup from 'yup'
import type { ApolloClient, NormalizedCacheObject } from '@apollo/client'
import type { Stripe, StripeCardElement } from '@stripe/stripe-js'
import { ApolloEvent } from 'src/services/apollo'

export type CheckoutPaymentIntent = {
  clientSecret: string
  paymentIntentId: string | null
} | null

export interface CheckoutContext {
  shippingAddress: ShippingAddressValues
  contactInfo: ContactInfoValues
  paymentIntent: CheckoutPaymentIntent
  apolloClient: ApolloClient<NormalizedCacheObject>
  stripeClient: Stripe | null
  cardElement: StripeCardElement | null
}

export type ConfirmPaymentEvent = {
  type: 'confirmPayment'
}

export type SubmitAddressEvent = {
  type: 'submitForm'
  values: ShippingAddressValues
}

export type RequestCartEvent = { type: 'requestCart' }
export type BroadcastCartEvent = { type: 'broadcastCart'; items: CheckoutItems }

type CheckoutItems = CheckoutItem[]
type CheckoutItem = {
  productId: number
  quantity: number
}

export type CheckoutEvent =
  | ApolloEvent
  | SubmitAddressEvent
  | RequestCartEvent
  | BroadcastCartEvent
  | ConfirmPaymentEvent
  | { type: 'next' }
  | { type: 'setQuantity'; itemId: number; value: number }
  | { type: 'removeItem'; itemId: number }
  | { type: 'previous' }

export interface ShippingAddressValues {
  name: string
  address1: string
  address2: string
  city: string
  state: string
  zip: string
}

export interface ContactInfoValues {
  phone: string
  email: string
}

export const shippingAddressSchema = yup.object().shape({
  name: yup.string().required('This field is required'),
  address1: yup.string().required('This field is required'),
  address2: yup.string().required('This field is required'),
  city: yup.string().required('This field is required'),
  state: yup.string().required('This field is required'),
  zip: yup
    .string()
    .required('This field is required')
    .length(5, 'Zip Code must be 5 digits'),
})
