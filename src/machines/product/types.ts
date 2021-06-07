import { ApolloClient, NormalizedCacheObject } from '@apollo/client'

export interface ProductContext {
  products: Product[]
  apolloClient: ApolloClient<NormalizedCacheObject>
}

export interface Product {
  id: number
  name: string
  description: string
  price: number
}

export type ProductEvent =
  | { type: 'setProducts'; products: Product[] }
  | { type: 'fetchProducts' }

export const buildProductContext = (
  apolloClient: ApolloClient<NormalizedCacheObject>,
): ProductContext => ({
  products: [
    {
      id: 1,
      name: 'CBD Balm',
      description:
        'Great for sore feet! Rub this balm on sore spots for long-lasting pain relief.',
      price: 1000,
    },
    {
      id: 2,
      name: 'CBD Bath Salts',
      description:
        'Dissolve these CBD-infused salts into your next bath for instant relaxation.',
      price: 1500,
    },
    {
      id: 3,
      name: 'THC Fruit Punch',
      description: 'Fruit juices and THC-infused sugar!',
      price: 2000,
    },
  ],
  apolloClient,
})
