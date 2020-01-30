import {
  ApolloClient,
  InMemoryCache
} from 'apollo-boost'
import { Tightbeam } from '@pooltogether/tightbeam'
import { newAbiMapping } from 'lib/apollo/newAbiMapping'
import { withClientState } from 'apollo-link-state'
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
  // Now attach the Tightbeam resolvers
  const link = withClientState({
    cache,
    resolvers: tb.resolvers()
  })
  return new ApolloClient({
    cache,
    link
  });
}