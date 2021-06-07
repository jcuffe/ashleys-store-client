import { ApolloClient, NormalizedCacheObject, gql } from '@apollo/client'
import { Observable } from 'rxjs'
import { ApolloEvent } from './types'

export const invokeQuery = (
  apolloClient: ApolloClient<NormalizedCacheObject>,
  queryString: string,
  variables: any,
  mapper: any,
) => {
  const query = apolloClient.watchQuery({
    query: gql(queryString),
    variables,
  })

  const observable = new Observable<ApolloEvent>((observer) => {
    const subscription = query.subscribe((result) => {
      if (result.errors) {
        console.log('QUERY ERROR', result.errors)
        observer.next({ type: 'apolloError', errors: result.errors })
      } else {
        console.log('QUERY FIRED', result)
        observer.next({ type: 'apolloResult', result: mapper(result) })
      }
    })

    return () => subscription.unsubscribe()
  })

  console.log('WATCHING QUERY')
  return observable
}

export const invokeMutation = (
  apolloClient: ApolloClient<NormalizedCacheObject>,
  mutationString: string,
  variables: any,
  mapper: any,
) => {
  const mutation = apolloClient.mutate({
    mutation: gql(mutationString),
    variables,
    refetchQueries: [],
  })

  console.log('INVOKING MUTATION', variables)
  return mutation.then((result) => {
    if (result.errors) {
      // @ts-ignore what are you even on about TypeScript?
      throw new MutationError('GraphQL mutation failed', result.errors)
    }
    console.log('MUTATED')

    return mapper(result.data!)
  })
}
