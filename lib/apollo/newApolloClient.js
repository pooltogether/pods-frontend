import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { Tightbeam, typeDefs } from '@pooltogether/tightbeam'
import { newAbiMapping } from 'lib/apollo/newAbiMapping'
import { ethers } from 'ethers'

let provider
function bindProviderSource(fortmatic) {
  return () => {
    if (!provider) {
      provider = new ethers.providers.Web3Provider(fortmatic.getProvider())
    }
    return provider
  }
}

export async function newApolloClient({ fortmatic }) {
  const tb = new Tightbeam({
    providerSource: bindProviderSource(fortmatic),
    abiMapping: newAbiMapping()
  })
  const cache = new InMemoryCache()
  cache.writeData(tb.defaultCacheData())
  const client = new ApolloClient({
    cache,
    resolvers: tb.resolvers(),
    typeDefs: typeDefs
  });

  return client
}