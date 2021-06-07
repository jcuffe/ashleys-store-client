import { useActor } from '@xstate/react'
import { useParentMachine, CartActor } from '../parent'

export const useCartService = () => {
  const [{ context }] = useParentMachine()
  return useActor<CartActor>(context.cartActor)
}
