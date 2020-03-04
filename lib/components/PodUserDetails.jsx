import React from 'react'
import { ethers } from 'ethers'
import { useQuery } from '@apollo/react-hooks'

import { podUserQuery } from 'lib/queries/podUserQuery'
import { poolQuery } from 'lib/queries/poolQuery'
import { tokenQuery } from 'lib/queries/tokenQuery'

export function PodUserDetails({ podAddress, userAddress }) {
  let podQuery = useQuery(podUserQuery, {
    variables: { podAddress, userAddress },
    skip: !userAddress
  })

  let poolAddress = podQuery.data ? podQuery.data.poolAddress : null

  let pool = useQuery(poolQuery, {
    variables: {
      podAddress,
      poolAddress
    },
    pollInterval: 2000,
    skip: !poolAddress
  })

  let tokenAddress = pool.data ? pool.data.tokenAddress : null

  let token = useQuery(tokenQuery, {
    variables: {
      podAddress,
      userAddress,
      tokenAddress
    },
    pollInterval: 2000,
    skip: !tokenAddress
  })

  let result = null
  if (podQuery.loading) {
    result = <div>Loading...</div>
  } else if (podQuery.error) {
    console.error(podQuery.error)
    result = <div>Error: {podQuery.error.message}</div>
  } else if (podQuery.data && pool.data && token.data) {
    const data = podQuery.data
    const poolData = pool.data
    const tokenData = token.data
    result = (
      <div>
        <p>Pod address: {podAddress}</p>
        <p>Pool Address: {data.poolAddress}</p>
        <p>Pool Open Draw Id: {poolData.openDrawId.toString()}</p>
        <p>Pod Pool Committed Balance: {ethers.utils.formatEther(poolData.committedBalance)}</p>
        <p>Pod Pool Open Balance: {ethers.utils.formatEther(poolData.openBalance)}</p>
        <p>Account: {userAddress}</p>
        <p>User Token Balance: {ethers.utils.formatEther(tokenData.balance)}</p>
        <p>User Pod Balance: {ethers.utils.formatEther(data.balance)}</p>
        <p>User Pod Balance (underyling): {ethers.utils.formatEther(data.balanceUnderlying)}</p>
        <p>User Pod Pending Deposit: {ethers.utils.formatEther(data.pendingDeposit)}</p>
      </div>
    )
  }

  return result
}