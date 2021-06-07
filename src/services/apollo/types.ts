export type ApolloEvent = ApolloResult | ApolloError

export type ApolloResult = { type: 'apolloResult'; result: any }
export type ApolloError = { type: 'apolloError'; errors: any }
