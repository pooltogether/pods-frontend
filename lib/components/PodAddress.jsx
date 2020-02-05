import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

import { Item } from 'lib/components/Item'

const QUERY = gql`
  {
    pod: contract(name: "Pod") @client
  }
`

export function PodAddress(){ 
  const { loading, data, error } = useQuery(QUERY)
  
  let jsx = null

  if (loading) {
    // return <div>Loading...</div>
  } else if (error) {
    console.error(error)
  } else {
    jsx = <Item
      label='Pod contract address'
      value={data.pod.address}
    />
  }

  return jsx
}
