import './index.scss'
import style from './index.module.scss'

import React, { FormEvent } from 'react'

import { useCheckoutService } from 'src/machines/checkout'
import FixedActions from 'src/components/FixedActions'

const ShippingAddress: React.FC<{}> = () => {
  const [, send] = useCheckoutService()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    console.log('SENDING IT')
    send({ type: 'confirmPayment' })
  }

  return (
    <form className={style.container} onSubmit={handleSubmit}>
      <label htmlFor="stripe-card-element"></label>
      <div id="stripe-card-element" className={style.cardElement} />
      <FixedActions>
        <button className={style.confirm} type="submit">
          Confirm Payment
        </button>
      </FixedActions>
    </form>
  )
}

export default ShippingAddress
