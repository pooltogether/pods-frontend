import React, { useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

export default function PodForm({ onOpen }) {
  let [
    podAddress,
    setPodAddress
  ] = useState('')

  let contractQuery = useQuery(gql`
    query {
      contract(name: "DaiPod") @client
      network @client {
        name
        chainId
      }
    }
  `)

  let podMessage
  if (contractQuery.data) {
    const { contract, network } = contractQuery.data
    console.log({ contract })
    podMessage = <div className='mb-8'>
      DaiPod on <b>{network.name}</b> is at {contract.address}
    </div>
  }

  return (
    <>
      {podMessage}
      <form className="w-full max-w-sm">
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
              Pod Address
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="inline-full-name"
              type="text"
              placeholder="0x..."
              value={podAddress}
              onChange={(e) => setPodAddress(e.target.value)} />
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
    </>
  )
}

