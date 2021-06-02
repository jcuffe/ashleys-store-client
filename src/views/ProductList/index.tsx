import style from 'src/views/ProductList/index.module.scss'

import React from 'react'
import { useProductService } from 'src/machines/product'
import ProductListItem from './ProductListItem'

const Products: React.FC = () => {
  const [productState] = useProductService()

  return (
    <div className={style.container}>
      {productState.context.products.map((product) => (
        <ProductListItem product={product} />
      ))}
    </div>
  )
}

export default Products
