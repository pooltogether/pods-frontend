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
        <p className='mb-1 font-mono'><span className='font-bold'>Pod Address</span>:&nbsp; <a className='text-blue-500 hover:text-blue-300 trans underline' href={`https://kovan.etherscan.io/address/${podAddress}`}>{podAddress}</a></p>
        <p className='mb-6 font-mono'><span className='font-bold'>Pool Address</span>: <a className='text-blue-500 hover:text-blue-300 trans underline' href={`https://kovan.etherscan.io/address/${podData.poolAddress}`}>{podData.poolAddress}</a></p>
        <p className='mb-1 font-mono'><span className='font-bold'>Pool Open Draw Id</span>:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {poolData.openDrawId.toString()}</p>
        <p className='mb-1 font-mono'><span className='font-bold'>Pool Committed Balance</span>: {ethers.utils.formatEther(poolData.committedBalance)}</p>
        <p className='mb-6 font-mono'><span className='font-bold'>Pool Open Balance</span>:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {ethers.utils.formatEther(poolData.openBalance)}</p>
        <p className='mb-1 font-mono'><span className='font-bold'>User's Address</span>: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <a className='text-blue-500 hover:text-blue-300 trans underline' href={`https://kovan.etherscan.io/address/${userAddress}`}>{userAddress}</a></p>
        <p className='mb-1 font-mono'><span className='font-bold'>User Token Balance</span>: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {tokenData ? ethers.utils.formatEther(tokenData.balance) : '?'}</p>
        <p className='mb-1 font-mono'><span className='font-bold'>User Pod Balance</span>:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {podUserData ? ethers.utils.formatEther(podUserData.balance) : '?'}</p>
        <p className='mb-1 font-mono'><span className='font-bold'>User Pod Balance (underyling)</span>: {podUserData ? ethers.utils.formatEther(podUserData.balanceUnderlying) : '?'}</p>
        <p className='mb-6 font-mono'><span className='font-bold'>User Pod Pending Deposit</span>:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {podUserData ? ethers.utils.formatEther(podUserData.pendingDeposit) : '?'}</p>
      </div>
    )
  }

  return result
}