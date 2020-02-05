import React, { useContext } from 'react'
import { useAsync } from 'react-async'
import { ApolloProvider } from '@apollo/react-hooks'

import { newApolloClient } from 'lib/apollo/newApolloClient'
import { FortmaticContext } from 'lib/context/FortmaticContext'

export default function ApolloWrapper({ children }) {
  let result = null

  let fortmatic = useContext(FortmaticContext)
  const { data, error, isPending } = useAsync({ promiseFn: newApolloClient, fortmatic })

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

  return result
}