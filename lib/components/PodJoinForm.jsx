import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { ethers } from 'ethers'
import gql from 'graphql-tag'

import { Button } from 'lib/components/Button'
import { tokenQuery } from 'lib/queries/tokenQuery'
import { transactionsQuery } from 'lib/queries/transactionsQuery'
import { podUserQuery } from 'lib/queries/podUserQuery'
import { poolQuery } from 'lib/queries/poolQuery'

export default function PodJoinForm({ podAddress, userAddress }) {
  const [
    amount,
    setAmount
  ] = useState('')

  const [
    lastRefetchTxId,
    setLastRefetchTxId
  ] = useState(0)

  const weiAmount = ethers.utils.parseEther(amount || '0')

  let podUser = useQuery(podUserQuery, {
    variables: { podAddress, userAddress },
    skip: !userAddress || !podAddress
  })

  let poolAddress = podUser.data ? podUser.data.poolAddress : null

  let pool = useQuery(poolQuery, {
    variables: {
      podAddress,
      poolAddress
    },
    skip: !poolAddress
  })

  let tokenAddress = pool.data ? pool.data.tokenAddress : null

  let token = useQuery(tokenQuery, {
    variables: {
      podAddress,
      userAddress,
      tokenAddress
    },
    skip: !tokenAddress
  })

  let transactions = useQuery(transactionsQuery)

  let loading = podUser.loading || pool.loading || token.loading || transactions.loading
  let error = podUser.error || pool.error || token.error || transactions.error

  const [approve, approveResult] = useMutation(gql`
    mutation approveMutation($tokenAddress: String!, $podAddress: String!, $amount: Float!) {
      sendTransaction(abi: "ERC20", address: $tokenAddress, fn: "approve", params: [$podAddress, $amount]) @client
    }
  `, {
    variables: {
      tokenAddress,
      podAddress,
      amount: weiAmount
    },
    refetchQueries: ['transactionsQuery']
  })

  let approveTx
  if (!loading && !error && approveResult.data) {
    approveTx = transactions.data._transactions.find(tx => tx.id === approveResult.data.sendTransaction.id)  
  }

  const [deposit, depositResult] = useMutation(gql`
    mutation depositMutation($podAddress: String!, $amount: Float!) {
      sendTransaction(abi: "Pod", address: $podAddress, fn: "deposit", params: [$amount, "0x0"]) @client
    }
  `, {
    variables: {
      podAddress,
      amount: weiAmount
    },
    refetchQueries: ['transactionsQuery']
  })

  let depositTx
  if (!loading && !error && depositResult.data) {
    depositTx = transactions.data._transactions.find(tx => tx.id === depositResult.data.sendTransaction.id)
  }

  if (approveTx && approveTx.completed && approveTx.id > lastRefetchTxId) {
    token.refetch()
    setLastRefetchTxId(approveTx.id)
  }

  if (depositTx && depositTx.completed && depositTx.id > lastRefetchTxId) {
    setAmount(0)
    token.refetch()
    podUser.refetch()
    pool.refetch()
    setLastRefetchTxId(depositTx.id)
  }

  let needsApproval = true
  let sufficientBalance = false

  if (!loading && !error && token.data) {
    needsApproval = token.data.allowance.lt(ethers.utils.bigNumberify(weiAmount))
    sufficientBalance = token.data.balance.gte(ethers.utils.bigNumberify(weiAmount))
  }

  return (
    <form className="w-full max-w-sm">
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3">
          <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
            Deposit
          </label>
        </div>
        <div className="md:w-2/3">
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            id="inline-full-name"
            type="text"
            placeholder="enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            />
        </div>
      </div>
      <div className="md:flex md:items-center">
        <div className="md:w-1/3"></div>
        <div className="md:w-2/3">
          <Button
            disabled={!needsApproval}
            onClick={(e) => { e.preventDefault(); approve(); } }>
            Approve
          </Button>
          &nbsp;
          <Button
            disabled={needsApproval}
            onClick={(e) => { e.preventDefault(); deposit(); } }>
            Deposit
          </Button>
        </div>
      </div>
    </form>
  )
}

