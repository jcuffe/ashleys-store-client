import React, { createContext, useContext } from 'react'
import { useMachine, useService } from '@xstate/react'
import checkoutMachine from 'src/machines/checkout/machine'
import { CheckoutContext, CheckoutEvent } from 'src/machines/checkout/types'

const Context = createContext(null as any)

export const CheckoutProvider: React.FC = ({ children }) => {
  const [, , service] = useMachine(checkoutMachine)
  return <Context.Provider value={service}>{children}</Context.Provider>
}

export const useCheckoutService = () => {
  const checkoutService = useContext(Context)
  return useService<CheckoutContext, CheckoutEvent>(checkoutService)
}
