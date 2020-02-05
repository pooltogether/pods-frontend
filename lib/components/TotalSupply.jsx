import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

import { Item } from 'lib/components/Item'
import { displayAmountInEther } from 'lib/utils/displayAmountInEther'

const QUERY = gql`
  {
    totalSupply: call(name: "Pod", fn: "totalSupply") @client
  }
`

export function TotalSupply() {
  const { loading, data, error } = useQuery(QUERY)

  let result = null
  
  if (loading) {
    // result = <div>Loading...</div>
  } else if (error) {
    console.error(error)
    result = <>
      <strong>Total supply query error:</strong>
      <br />{error.message}
    </>
  } else {
    result = <Item
      label='plDai in Pod'
      value={displayAmountInEther(
        data.totalSupply, {
          precision: 0
        }
      )}
    />
  }

  return result
}