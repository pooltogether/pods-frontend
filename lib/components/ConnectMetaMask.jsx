import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { Button } from 'lib/components/Button'

export function ConnectMetaMask() {
  const { loading, data, error, refetch } = useQuery(gql`
    query podQuery($podAddress: String!) {
      account @client
    }
  `, { pollInterval: 1000 })

  function enable() {
    window.ethereum.enable().then((success) => {
      if (success) {
        refetch()
      }
    })
  }

  let result = null
  if (error) {
    console.error(error)
    result = <div>Error: {error.message}</div>
  } else if (!loading && !data.account) {
    result = (
      <Button
        onClick={enable}>
        Connect MetaMask
      </Button>
    )
  }

  return result
}