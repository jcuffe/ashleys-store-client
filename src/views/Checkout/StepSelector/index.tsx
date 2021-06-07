import style from './index.module.scss'

import React from 'react'
import classnames from 'classnames'
import { useCheckoutService } from 'src/machines/checkout'
import { steps } from '../constants'

const StepSelector: React.FC = () => {
  const [checkoutState] = useCheckoutService()

  const states: (keyof typeof steps)[][] = [
    ['shipping'],
    ['payment', 'confirmation'],
  ]

  if (checkoutState.matches({ ui: 'confirmed' })) {
    return null
  }

  return (
    <div className={style.container}>
      {states.map((states) => (
        <div
          className={classnames(style.step, {
            [style.current]: states.some((state) =>
              checkoutState.matches({ ui: state }),
            ),
          })}
        >
          {steps[states[0]]}
        </div>
      ))}
    </div>
  )
}

export default StepSelector
