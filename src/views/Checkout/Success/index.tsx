import style from './index.module.scss'
import React from 'react'

const Success: React.FC = () => {
  return (
    <div className={style.container}>
      <h1 className={style.success}>Success! Thanks for buying with us!</h1>
    </div>
  )
}

export default Success
