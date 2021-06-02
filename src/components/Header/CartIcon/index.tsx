import style from './index.module.scss'

import React from 'react'
import { ReactComponent as Icon } from 'src/assets/images/shoppingCart.svg'

import { useCartService } from 'src/machines/cart'

const CartIcon: React.FC = () => {
  const [state] = useCartService()
  const itemCount = Object.keys(state.context.items).length

  return (
    <div className={style.container}>
      <Icon className={style.icon} />
      {itemCount > 0 && <div className={style.badge}>{itemCount}</div>}
    </div>
  )
}

export default CartIcon
