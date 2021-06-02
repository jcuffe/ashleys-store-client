import React from 'react'
import { CheckoutProvider } from 'src/machines/checkout'
import { CartProvider } from 'src/machines/cart'
import { ProductProvider } from 'src/machines/product'

const MachineProvider: React.FC = ({ children }) => (
  <ProductProvider>
    <CartProvider>
      <CheckoutProvider>{children}</CheckoutProvider>
    </CartProvider>
  </ProductProvider>
)

export default MachineProvider
