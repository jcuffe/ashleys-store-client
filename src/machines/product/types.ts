type Price = number

export interface PriceLookup {
  [minimumQuantity: number]: Price
}

export interface Product {
  id: number
  name: string
  description: string
  prices: PriceLookup
}

export interface ProductContext {
  products: Product[]
}

export type ProductEvent =
  | { type: 'setProducts'; products: Product[] }
  | { type: 'fetchProducts' }
