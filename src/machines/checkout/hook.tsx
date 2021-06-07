import { useActor } from '@xstate/react'
import { useParentMachine, CheckoutActor } from '../parent'

export const useCheckoutService = () => {
  const [{ context }] = useParentMachine()
  return useActor<CheckoutActor>(context.checkoutActor)
}
