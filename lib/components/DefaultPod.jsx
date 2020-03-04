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
      {networkName} DaiPod is at <Link href={`/pods/${contract.address}`}><a className='underline'>{contract.address}</a></Link>
    </p>
  }

  return (
    <div className='mb-8'>
      <p>Current Network: <b>{networkName}</b></p>
      {podMessage}
    </div>
  )
}