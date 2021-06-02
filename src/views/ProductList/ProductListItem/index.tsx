import style from './index.module.scss'

import React from 'react'
import { Link } from 'react-router-dom'
import { Product } from 'src/machines/product'
import { useCartService } from 'src/machines/cart'
import routes from 'src/views/App/routes'

import { ReactComponent as AddIcon } from 'src/assets/images/addToCart.svg'
import { ReactComponent as CartIcon } from 'src/assets/images/shoppingCart.svg'

interface Props {
  product: Product
}

const ProductListItem: React.FC<Props> = ({ product }) => {
  const [state, send] = useCartService()
  const addItemToCart = (product: Product) =>
    send({ type: 'addItem', product, quantity: 1 })

  const cartContainsItem = (id: number) => !!state.context.items[id]

  return (
    <div className={style.container}>
      <div className={style.body}>
        <img className={style.image} alt={`${product.name}`} />
        <div className={style.details}>
          <span className={style.name}>{product.name}</span>
          <span className={style.description}>{product.description}</span>
        </div>
      </div>
      <div className={style.actions}>
        {cartContainsItem(product.id) ? (
          <Link to={routes.cart.path} className={style.cartLink}>
            View in Cart
            <CartIcon className={style.icon} />
          </Link>
        ) : (
          <button
            onClick={() => addItemToCart(product)}
            className={style.addToCart}
          >
            Add to Cart
            <AddIcon className={style.icon} />
          </button>
        )}
      </div>
    </div>
  )
}

export default ProductListItem
