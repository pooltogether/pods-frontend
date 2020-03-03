import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import { poolQuery } from 'lib/queries/poolQuery'

export default function PodJoinForm({ podAddress, poolAddress }) {
  const [
    amount,
    setAmount
  ] = useState('')

  const podQuery = useQuery(podUserQuery, {
    variables: { podAddress, userAddress },
    skip: !userAddress
  })

  const poolQuery = useQuery(poolQuery, {
    variables: {
      podAddress,
      poolAddress: podQuery.data ? podQuery.data.poolAddress : ''
    },
    skip: !podQuery.data
  })

  // const deposit = useMutation(gql`
  //   mutation($podAddress: String!) {
  //     sendTransaction(abi: "Pod", address: $podAddress, fn: "deposit", params) @client
  //   }
  // `)

  console.log({ podQuery, poolQuery })

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
            onClick={(e) => { e.preventDefault(); onOpen(podAddress) } }>
            Open Pod
          </button>
        </div>
      </div>
    </form>
  )
}

