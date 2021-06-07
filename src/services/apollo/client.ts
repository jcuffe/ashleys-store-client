import { ApolloClient, HttpLink, InMemoryCache, from } from '@apollo/client'
import { onError } from '@apollo/client/link/error'

const httpLink = new HttpLink({ uri: process.env.REACT_APP_GRAPHQL_ENDPOINT })

const errorLink = onError((error) => {
  console.log('APOLLO ERROR', error)
})

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([errorLink, httpLink]),
})
