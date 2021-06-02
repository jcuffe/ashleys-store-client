import style from './index.module.scss'

import React from 'react'
import { useCartService } from 'src/machines/cart'
import { ReactComponent as DeleteIcon } from 'src/assets/images/delete.svg'

interface Props {
  id: number
}

const DeleteItem: React.FC<Props> = ({ id }) => {
  const [, send] = useCartService()
  const handleClick = () => send({ type: 'removeItem', id })
  return (
    <button className={style.container} onClick={handleClick}>
      <DeleteIcon className={style.icon} />
    </button>
  )
}

export default DeleteItem
