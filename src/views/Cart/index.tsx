import style from './index.module.scss'

import React from 'react'
import { Link } from 'react-router-dom'

import FixedActions from 'src/components/FixedActions'
import CartListItem from './CartListItem'

import { useCartService } from 'src/machines/cart'
import { labels } from './constants'

const Cart: React.FC = () => {
  const [state] = useCartService()

  return (
    <div className={style.container}>
      {Object.values(state.context.items).map((item) => (
        <CartListItem item={item} key={item.product.id} />
      ))}
      <FixedActions>
        <Link className={style.checkout} to="/checkout">
          {labels.checkout}
        </Link>
      </FixedActions>
    </div>
  )
}

export default Cart
