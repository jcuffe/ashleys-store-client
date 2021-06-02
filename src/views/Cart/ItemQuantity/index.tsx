import style from './index.module.scss'

import React from 'react'
import { ReactComponent as PlusIcon } from 'src/assets/images/plus.svg'
import { ReactComponent as MinusIcon } from 'src/assets/images/minus.svg'

import { useCartService } from 'src/machines/cart'

interface Props {
  id: number
}

const ItemQuantity: React.FC<Props> = ({ id }) => {
  const [state, send] = useCartService()

  const item = state.context.items[id]

  const increaseQuantity = () =>
    send({
      type: 'setQuantity',
      id: item.product.id,
      quantity: item.quantity + 1,
    })
  const decreaseQuantity = () => {
    if (item.quantity > 1) {
      send({
        type: 'setQuantity',
        id: item.product.id,
        quantity: item.quantity - 1,
      })
    } else {
      send({ type: 'removeItem', id: item.product.id })
    }
  }

  return (
    <div className={style.container}>
      <button onClick={decreaseQuantity} className={style.decrease}>
        <MinusIcon className={style.decreaseIcon} />
      </button>
      <div className={style.quantity}>{item.quantity}</div>
      <button onClick={increaseQuantity} className={style.increase}>
        <PlusIcon className={style.increaseIcon} />
      </button>
    </div>
  )
}

export default ItemQuantity
