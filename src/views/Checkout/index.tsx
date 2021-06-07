import style from './index.module.scss'

import React, { useMemo } from 'react'
import { useCheckoutService } from 'src/machines/checkout'

import Payment from './Payment'
import Success from './Success'
import ShippingAddress from './ShippingAddress'
import StepSelector from './StepSelector'

interface Props {}

const Checkout: React.FC<Props> = () => {
  const [state] = useCheckoutService()

  const StepComponent = useMemo(() => {
    switch (true) {
      case state.matches({ ui: 'shipping' }):
        return ShippingAddress
      case state.matches({ ui: 'payment' }):
      case state.matches({ ui: 'confirmation' }):
        return Payment
      case state.matches({ ui: 'success' }):
        return Success
      default:
        return () => null
    }
  }, [state])

  return (
    <div className={style.container}>
      <StepSelector />
      <StepComponent />
    </div>
  )
}

export default Checkout
