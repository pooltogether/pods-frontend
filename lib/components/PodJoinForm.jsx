import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { transactionsQuery } from '@pooltogether/tightbeam/queries/transactionsQuery'

import { podUserQuery } from 'lib/queries/podUserQuery'
import { poolQuery } from 'lib/queries/poolQuery'

export default function PodJoinForm({ podAddress, userAddress }) {
  const [
    amount,
    setAmount
  ] = useState('')

  let podUser = useQuery(podUserQuery, {
    variables: { podAddress, userAddress },
    skip: !userAddress || !podAddress
  })

  let pool = useQuery(poolQuery, {
    variables: {
      podAddress,
      poolAddress: podUser.data ? podUser.data.poolAddress : ''
    },
    skip: !podUser.data || !podUser.data.poolAddress
  })

  // let txQuery = gql`
  //   query transactionQuery {
  //     _transactions @client {
  //       id
  //       complete
  //       error
  //       sent
  //     }
  //   }
  // `

  const approveTx = useQuery(transactionsQuery, {
    // variables: {
    //   id: approveResult.data ? approveResult.data.sendTransaction.id : ''
    // },
    // skip: !approveResult.data || !approveResult.data.sendTransaction
    fetchPolicy: 'no-cache'
  })

  const [approve, approveResult] = useMutation(gql`
      mutation approve($tokenAddress: String!, $podAddress: String!, $amount: Float!) {
        sendTransaction(abi: "ERC20", address: $tokenAddress, fn: "approve", params: [$podAddress, $amount]) @client
      }
  `, {
    variables: {
      tokenAddress: pool.data ? pool.data.tokenAddress : '',
      podAddress,
      amount
    },
    refetchQueries: 'transactionsQuery',
    update: () => {
      console.log('UPDATED')
      approveTx.refetch()
    }
  })

  console.log({ approveResult, approveTx: approveTx.data })

  const [deposit, depositResult] = useMutation(gql`
    mutation deposit($podAddress: String!, $amount: Float!) {
      sendTransaction(abi: "Pod", address: $podAddress, fn: "deposit", params: [$amount]) @client
    }
  `, {
    variables: {
      podAddress,
      amount
    }
  })

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
          <button
            className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            type="button"
            onClick={(e) => { e.preventDefault(); approve() } }>
            Approve
          </button>
        </div>
      </div>
    </form>
  )
}

