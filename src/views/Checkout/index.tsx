import './index.scss'

import React from 'react'
import ShippingAddress from 'src/views/Checkout/ShippingAddress'
import StepSelector from './StepSelector'

interface Props {}

const Checkout: React.FC<Props> = () => {
  return (
    <div className="Checkout__Container">
      <StepSelector />
      <ShippingAddress />
    </div>
  )
}

export default Checkout
