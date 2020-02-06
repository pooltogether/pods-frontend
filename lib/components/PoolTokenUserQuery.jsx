import { useQuery } from '@apollo/react-hooks'
import { ethers } from 'ethers'

import { poolTokenUserQuery } from 'lib/queries/poolTokenUserQuery'

const bigNumberify = ethers.utils.bigNumberify

export function PoolTokenUserQuery({ children, poolTokenAddress, userAddress }) { 
  const { loading, data, error } = useQuery(poolTokenUserQuery, {
    variables: { 
      poolTokenAddress,
      userAddress
    }
  })
  
  if (loading) {
    return children({
      balanceOf: bigNumberify(0)
    })
  } else if (error) {
    console.error(error)
    return null
  } else {
    return children(data)
  }
}
