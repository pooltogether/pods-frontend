import React, { useState } from 'react'
import Onboard from 'bnc-onboard'
import { ethers } from 'ethers'
import { ApolloProvider } from '@apollo/react-hooks'

import { newApolloClient } from 'lib/apollo/newApolloClient'

export const OnboardWalletContext = React.createContext({})
export const OnboardContext = React.createContext({})

const windowExists = typeof window !== 'undefined'

let onboard

export function OnboardWrapper({ children }) {
  let [wallet, setWallet] = useState(null)
  let [network, setNetwork] = useState(null)
  let [{web3Provider, apolloClient}, setApolloClient ] = useState({})

  if (windowExists && !onboard) {
    onboard = Onboard({
      dappId: process.env.NEXT_JS_BLOCKNATIVE_API_KEY,       // [String] The API key created by step one above
      networkId: 42,  // [Integer] The Ethereum network ID your Dapp uses.
      subscriptions: {
        wallet: wallet => {
          console.log("set wallet", wallet)
          if (!wallet.name) {
            wallet = null
          }
          setWallet(wallet)
          if (wallet) {
            console.log('wallet check....', { wallet })
            onboard.walletCheck().then(ready => {
              console.log('connect wallet check: ', { ready })
              web3Provider = new ethers.providers.Web3Provider(wallet.provider)
              apolloClient = newApolloClient({ provider: web3Provider })
              setApolloClient({ web3Provider, apolloClient })
            })
          } else {
            console.log("reset apollo client")
            web3Provider = new ethers.providers.InfuraProvider("kovan", process.env.NEXT_JS_INFURA_KEY)
            apolloClient = newApolloClient({ provider: web3Provider })
            setApolloClient({ web3Provider, apolloClient })
          }
        },
        network: net => {
          console.log({ net, network })
          if (!network) {
            setNetwork(net)
          } else if (network != net) {
            setNetwork(net)
            web3Provider = new ethers.providers.Web3Provider(wallet.provider)
            apolloClient = newApolloClient({ provider: web3Provider })
            setApolloClient({ web3Provider, apolloClient })
          }
        }
      }
    })
    onboard.walletReset()
    window.onboard = onboard
  }

  if (windowExists && !apolloClient) {
    web3Provider = new ethers.providers.InfuraProvider("kovan", process.env.NEXT_JS_INFURA_KEY)
    apolloClient = newApolloClient({ provider: web3Provider })
    setApolloClient({ web3Provider, apolloClient })
  }

  let result = null
  if (windowExists) {
    result =
      <OnboardContext.Provider value={onboard}>
        <OnboardWalletContext.Provider value={wallet}>
          <ApolloProvider client={apolloClient}>
            {children}
          </ApolloProvider>
        </OnboardWalletContext.Provider>
      </OnboardContext.Provider>
  }

  return (
    result 
  )
}

