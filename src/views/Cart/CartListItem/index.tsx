import style from './index.module.scss'

import React from 'react'
import DeleteItem from 'src/views/Cart/DeleteItem'
import ItemQuantity from 'src/views/Cart/ItemQuantity'

import { CartItem } from 'src/machines/cart'

interface Props {
  item: CartItem
}

const CartListItem: React.FC<Props> = ({ item }) => {
  return (
    <div className={style.container}>
      <div className={style.body}>
        <img className={style.image} alt="" />
        <div className={style.details}>
          <span className={style.name}>{item.product.name}</span>
          <span className={style.description}>{item.product.description}</span>
        </div>
      </div>
      <div className={style.actions}>
        <ItemQuantity id={item.product.id} />
        <DeleteItem id={item.product.id} />
      </div>
    </div>
  )
}

export default CartListItem
