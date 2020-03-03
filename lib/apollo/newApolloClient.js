import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { Tightbeam, typeDefs } from '@pooltogether/tightbeam'
import { newAbiMapping } from 'lib/apollo/newAbiMapping'
import gql from 'graphql-tag'

export function newApolloClient({ provider }) {
  const tb = new Tightbeam({
    providerSource: () => provider,
    abiMapping: newAbiMapping()
  })
  const cache = new InMemoryCache()
  cache.writeData(tb.defaultCacheData())
  const client = new ApolloClient({
    cache,
    resolvers: tb.resolvers(),
    typeDefs: typeDefs
  });

  client.watchQuery({
    query: gql`query {
      network @client {
        id
        chainId
        name
      }
    }`,
    pollInterval: 2000,
    fetchPolicy: 'network-only'
  }).subscribe()

  client.watchQuery({
    query: gql`query { account @client }`,
    pollInterval: 2000,
    fetchPolicy: 'network-only'
  }).subscribe()

  return client
}