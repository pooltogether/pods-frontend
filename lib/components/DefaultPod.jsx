import React from 'react'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import Link from 'next/link'

export default function DefaultPod() {
  const router = useRouter()

  let networkQuery = useQuery(gql`
  query {
    network @client {
      name
      chainId
    }
  }
`)

  let contractQuery = useQuery(gql`
    query {
      contract(name: "DaiPod") @client
    }
  `)

  let networkName

  if (networkQuery.data) {
    networkName = networkQuery.data.network.name
  }

  let podMessage = null
  if (contractQuery.data) {
    const { contract } = contractQuery.data
    podMessage = <p>
      <strong>{networkName} DaiPod is at</strong>: {contract.address} <Link href="/pods/[podAddress]" as={`/pods/${contract.address}`}><a className='text-blue-500 hover:text-blue-300 underline trans'>View</a></Link>
    </p>
  }

  return (
    <div className='mb-8'>
      <p>Current Network: <b>{networkName}</b></p>
      {podMessage}
    </div>
  )
}