import { useQuery } from '@apollo/react-hooks'
import { ethers } from 'ethers'

import { podUserQuery } from 'lib/queries/podUserQuery'

const bigNumberify = ethers.utils.bigNumberify

export function PodUserQuery({ children, podAddress, userAddress }) { 
  const { loading, data, error } = useQuery(podUserQuery, {
    variables: { 
      podAddress,
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
