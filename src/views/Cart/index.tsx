import style from './index.module.scss'

import React from 'react'
import CartListItem from './CartListItem'

import { useCartService } from 'src/machines/cart'

const Cart: React.FC = () => {
  const [state] = useCartService()

  return (
    <div className={style.container}>
      {Object.values(state.context.items).map((item) => (
        <CartListItem item={item} />
      ))}
    </div>
  )
}

export default Cart
