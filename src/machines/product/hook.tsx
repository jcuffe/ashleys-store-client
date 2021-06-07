import { useActor } from '@xstate/react'
import { ProductActor, useParentMachine } from '../parent'

export const useProductService = () => {
  const [{ context }] = useParentMachine()
  return useActor<ProductActor>(context.productActor)
}
