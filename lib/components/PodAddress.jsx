import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

import { Item } from 'lib/components/Item'
import { shortenAddress } from 'lib/utils/shortenAddress'
import { EtherscanAddressLink } from 'lib/components/EtherscanAddressLink'

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
    const podAddress = data.pod.address
    // const podAddress = shortenAddress(data.pod.address)
    const etherscanLinkPodAddress = <EtherscanAddressLink
      address={podAddress}
    >
      {podAddress}
    </EtherscanAddressLink>

    jsx = <Item
      label={label}
      value={etherscanLinkPodAddress}
    />
  }

  return jsx
}
