import React from 'react'
import { ethers } from 'ethers'
import { useQuery } from '@apollo/react-hooks'

import { podUserQuery } from 'lib/queries/podUserQuery'

export function PodUserDetails({ podAddress, userAddress }) {
  let podQuery = useQuery(podUserQuery, {
    variables: { podAddress, userAddress },
    skip: !userAddress
  })

  let result = null
  if (podQuery.loading) {
    result = <div>Loading...</div>
  } else if (podQuery.error) {
    console.error(podQuery.error)
    result = <div>Error: {podQuery.error.message}</div>
  } else if (podQuery.data) {
    const data = podQuery.data
    result = (
      <div>
        <p>Pod address: {podAddress}</p>
        <p>Pool Address: {data.poolAddress}</p>
        <p>Account: {userAddress}</p>
        <p>Balance: {ethers.utils.formatEther(data.balance)}</p>
        <p>Balance (underyling): {ethers.utils.formatEther(data.balanceUnderlying)}</p>
      </div>
    )
  }

  return result
}