import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

import { Item } from 'lib/components/Item'
import { shortenAddress } from 'lib/utils/shortenAddress'

const QUERY = gql`
  {
    pod: contract(name: "Pod") @client
  }
`

export function PodAddress() { 
  const { loading, data, error } = useQuery(QUERY)
  
  let jsx = null

  const label = 'Pod contract address'

  if (loading) {
    return <Item
      label={label}
      value='Loading...'
    />
  } else if (error) {
    console.error(error)
  } else {
    const podAddress = shortenAddress(data.pod.address)
    jsx = <Item
      label={label}
      value={podAddress}
    />
  }

  return jsx
}
