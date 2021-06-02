import React, { createContext, useContext } from 'react'
import { useMachine, useService } from '@xstate/react'
import cartMachine from 'src/machines/cart/machine'
import { CartContext, CartEvent } from 'src/machines/cart/types'

const Context = createContext(null as any)

export const CartProvider: React.FC = ({ children }) => {
  const [, , service] = useMachine(cartMachine)
  return <Context.Provider value={service}>{children}</Context.Provider>
}

export const useCartService = () => {
  const cartService = useContext(Context)
  return useService<CartContext, CartEvent>(cartService)
}
