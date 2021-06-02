import ProductList from 'src/views/ProductList'
import Checkout from 'src/views/Checkout'
import About from 'src/views/About'
import Cart from 'src/views/Cart'

const routes = {
  products: {
    component: ProductList,
    path: '/',
    exact: true,
  },
  cart: {
    component: Cart,
    path: '/cart',
  },
  checkout: {
    component: Checkout,
    path: '/checkout',
  },
  about: {
    component: About,
    path: '/about',
  },
}

export default routes
