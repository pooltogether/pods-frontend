import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { ethers } from 'ethers'
import gql from 'graphql-tag'

import { Button } from 'lib/components/Button'
import { transactionsQuery } from 'lib/queries/transactionsQuery'
import { podUserQuery } from 'lib/queries/podUserQuery'

export function PodRedeemForm({ podAddress, userAddress }) {
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

  let transactions = useQuery(transactionsQuery)

  let loading = podUser.loading || transactions.loading
  let error = podUser.error || transactions.error

  const [redeem, redeemResult] = useMutation(gql`
    mutation redeemMutation($podAddress: String!, $amount: Float!) {
      sendTransaction(abi: "Pod", address: $podAddress, fn: "redeem", params: [$amount, "0x0"], gasLimit: 900000) @client
    }
  `, {
    variables: {
      podAddress,
      amount: weiAmount
    },
    refetchQueries: ['transactionsQuery']
  })

  let redeemTx
  if (!loading && !error && redeemResult.data) {
    redeemTx = transactions.data._transactions.find(tx => tx.id === redeemResult.data.sendTransaction.id)
  }

  if (redeemTx && redeemTx.completed && redeemTx.id > lastRefetchTxId) {
    setAmount(0)
    podUser.refetch()
    setLastRefetchTxId(redeemTx.id)
  }

  let sufficientBalance = false

  if (!loading && !error && podUser.data) {
    sufficientBalance = podUser.data.balance.gte(ethers.utils.bigNumberify(weiAmount))
  }

  return (
    <form className="w-full max-w-sm" onSubmit={(e) => { e.preventDefault(); redeem(); } }>
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3">
          <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
            Redeem
          </label>
        </div>
        <div className="md:w-2/3">
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            id="inline-full-name"
            type="text"
            placeholder="enter amount"
            value={amount}
            onChange={(e) => { e.preventDefault(); setAmount(e.target.value) } }
            />
        </div>
      </div>
      <div className="md:flex md:items-center">
        <div className="md:w-1/3"></div>
        <div className="md:w-2/3">
          <Button
            disabled={!sufficientBalance}
            onClick={(e) => { e.preventDefault(); redeem(); } }>
            Redeem
          </Button>
        </div>
      </div>
    </form>
  )
}
