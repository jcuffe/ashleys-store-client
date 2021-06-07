import style from 'src/components/Header/index.module.scss'

import React from 'react'
import { Link } from 'react-router-dom'
import CartIcon from './CartIcon'
import { ReactComponent as StoreIcon } from 'src/assets/images/store.svg'

import routes from 'src/views/App/routes'

interface Props {}

const Header: React.FC<Props> = () => {
  return (
    <div className={style.container}>
      <div className={style.navigation}>
        <Link to={routes.products.path} className={style.storeLink}>
          <StoreIcon className={style.store} />
        </Link>
        <Link to={routes.cart.path} className={style.navLink}>
          <CartIcon />
        </Link>
      </div>
    </div>
  )
}

export default Header
