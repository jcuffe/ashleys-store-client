import React, { createContext, useContext } from 'react'
import { useMachine, useService } from '@xstate/react'
import productMachine from 'src/machines/product/machine'
import { ProductContext, ProductEvent } from 'src/machines/product/types'

const Context = createContext(null as any)

export const ProductProvider: React.FC = ({ children }) => {
  const [, , service] = useMachine(productMachine)
  return <Context.Provider value={service}>{children}</Context.Provider>
}

export const useProductService = () => {
  const productService = useContext(Context)
  return useService<ProductContext, ProductEvent>(productService)
}
