import React, { useContext } from 'react'
import { useAsync } from 'react-async'
import { ApolloProvider } from '@apollo/react-hooks'

import { newApolloClient } from 'lib/apollo/newApolloClient'
import { EthersContext } from 'lib/context/EthersContext'

export default function ApolloWrapper({ children }) {
  let result = null

  let provider = useContext(EthersContext)
  let newApolloClientResult = {}
  if (provider) {
    newApolloClientResult = useAsync({ promiseFn: newApolloClient, provider })
  }
  const { data, error, isPending } = newApolloClientResult

  if (data) {
    result = (
      <ApolloProvider client={data}>
        {children}
      </ApolloProvider>
    )
  } else if (error) {
    console.error(error)
    result = <span>Apollo Error: {error.message}</span>
  } else if (isPending) {
    result = <span>Loading...</span>
  }

  return <div>{result}</div>
}