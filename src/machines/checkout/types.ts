import * as yup from 'yup'

export interface CheckoutContext {
  shippingAddress: ShippingAddressValues
}

export type CheckoutEvent =
  | { type: 'next' }
  | { type: 'submitForm'; values: ShippingAddressValues }
  | { type: 'setQuantity'; itemId: number; value: number }
  | { type: 'removeItem'; itemId: number }
  | { type: 'previous' }

export interface ShippingAddressValues {
  address1: string
  address2: string
  city: string
  state: string
  zip: string
}

export const shippingAddressSchema = yup.object().shape({
  address1: yup.string().required(),
  address2: yup.string().required(),
  city: yup.string().required(),
  state: yup.string().required(),
  zip: yup.string().required().length(5),
})
