import React, { useState, useContext } from 'react'
import { ethers } from 'ethers'
import { ApolloProvider } from '@apollo/react-hooks'

import { EthersContext } from 'lib/context/EthersContext'
import { newApolloClient } from 'lib/apollo/newApolloClient'
import { OnboardWalletContext } from 'lib/components/OnboardWrapper'

const windowExists = typeof window !== 'undefined'

export default function EthersWrapper({ children }) {
  let [ state, setApolloClient ] = useState({})

  let { web3Provider, apolloClient } = state

  let wallet = useContext(OnboardWalletContext)

  if (windowExists && wallet) {
    web3Provider = new ethers.providers.Web3Provider(wallet.provider)
    apolloClient = newApolloClient({ provider: web3Provider })
    setApolloClient({ web3Provider, apolloClient })
  } else {

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