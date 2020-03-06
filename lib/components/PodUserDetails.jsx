import React from 'react'
import { ethers } from 'ethers'
import { useQuery } from '@apollo/react-hooks'

import { podQuery } from 'lib/queries/podQuery'
import { podUserQuery } from 'lib/queries/podUserQuery'
import { poolQuery } from 'lib/queries/poolQuery'
import { tokenQuery } from 'lib/queries/tokenQuery'

export function PodUserDetails({ podAddress, userAddress }) {
  let pod = useQuery(podQuery, {
    variables: { podAddress },
  })

  let poolAddress = pod.data ? pod.data.poolAddress : null

  let podUser = useQuery(podUserQuery, {
    variables: { podAddress, userAddress },
    skip: !userAddress
  })

  let pool = useQuery(poolQuery, {
    variables: {
      podAddress,
      poolAddress
    },
    pollInterval: 2000,
    skip: !poolAddress
  })

  let tokenAddress = pool.data ? pool.data.tokenAddress : null

  const skipToken = !tokenAddress || !userAddress

  let token = useQuery(tokenQuery, {
    variables: {
      podAddress,
      userAddress,
      tokenAddress
    },
    pollInterval: skipToken ? 0 : 2000,
    skip: skipToken
  })

  let result = null
  if (podQuery.loading) {
    result = <div>Loading...</div>
  } else if (podQuery.error) {
    console.error(podQuery.error)
    result = <div>Error: {podQuery.error.message}</div>
  } else if (pod.data && pool.data) {
    const podData = pod.data
    const poolData = pool.data
    let tokenData
    if (token.data) {
      tokenData = token.data
    }
    let podUserData
    if (podUser.data) {
      podUserData = podUser.data
    }
    result = (
      <div>
        <p>Pod address: {podAddress}</p>
        <p>Pool Address: {podData.poolAddress}</p>
        <p>Pool Open Draw Id: {poolData.openDrawId.toString()}</p>
        <p>Pod Pool Committed Balance: {ethers.utils.formatEther(poolData.committedBalance)}</p>
        <p>Pod Pool Open Balance: {ethers.utils.formatEther(poolData.openBalance)}</p>
        <p>Account: {userAddress}</p>
        <p>User Token Balance: {tokenData ? ethers.utils.formatEther(tokenData.balance) : '?'}</p>
        <p>User Pod Balance: {podUserData ? ethers.utils.formatEther(podUserData.balance) : '?'}</p>
        <p>User Pod Balance (underyling): {podUserData ? ethers.utils.formatEther(podUserData.balanceUnderlying) : '?'}</p>
        <p>User Pod Pending Deposit: {podUserData ? ethers.utils.formatEther(podUserData.pendingDeposit) : '?'}</p>
      </div>
    )
  }

  return result
}