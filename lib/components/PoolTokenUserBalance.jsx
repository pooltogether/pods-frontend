import { useQuery } from '@apollo/react-hooks'

import { poolTokenUserQuery } from 'lib/queries/poolTokenUserQuery'

export function PoolTokenUserBalance({ children, poolTokenAddress, userAddress }) { 
  const { loading, data, error } = useQuery(poolTokenUserQuery, {
    variables: { 
      poolTokenAddress,
      userAddress
    }
  })
  
  if (loading) {
    return null
  } else if (error) {
    console.error(error)
    return null
  } else {
    return children({
      poolTokenUserBalance: data.balanceOf
    })
  }
}
