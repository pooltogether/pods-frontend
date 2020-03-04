import React, { useState, useContext } from 'react'
import { ethers } from 'ethers'
import { ApolloProvider } from '@apollo/react-hooks'

import { EthersContext } from 'lib/context/EthersContext'
import { newApolloClient } from 'lib/apollo/newApolloClient'

const windowExists = typeof window !== 'undefined'

export default function EthersWrapper({ children }) {
  let [ state, setApolloClient ] = useState({})

  let { web3Provider, apolloClient } = state

  if (windowExists && !apolloClient) {
    console.log('CREATING CLIENT')
    web3Provider = new ethers.providers.Web3Provider(window.ethereum)
    apolloClient = newApolloClient({ provider: web3Provider })
    setApolloClient({ web3Provider, apolloClient })

    window.ethereum.on('networkChanged', () => {
      console.log('NETWORK CHANGED')
      web3Provider = new ethers.providers.Web3Provider(window.ethereum)
      apolloClient = newApolloClient({ provider: web3Provider })
      setApolloClient({ web3Provider, apolloClient })
    })
  }

  let apolloProvider = null
  if (apolloClient) {
    apolloProvider =
      <ApolloProvider client={apolloClient}>
        {children}
      </ApolloProvider>
  }
  
  return (
    <EthersContext.Provider
        value={web3Provider}
      >
      {apolloProvider}
    </EthersContext.Provider>
  )
}