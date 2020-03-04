import React from 'react'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import { Button } from 'lib/components/Button'
import { PodUserDetails } from 'lib/components/PodUserDetails'
import PodJoinForm from 'lib/components/PodJoinForm'

function Pod() {
  const router = useRouter()
  const { podAddress } = router.query

  const accountQuery = useQuery(gql`
    query {
      account @client
    }
  `)
  const { account } = accountQuery.data || {}

  return <>
    <div className='container mx-auto mt-12'>
      <div className='mb-8'>
        <Button onClick={() => router.push('/')}>Back</Button>
      </div>
      <PodJoinForm podAddress={podAddress} userAddress={account} />
      <PodUserDetails podAddress={podAddress} userAddress={account} />
    </div>
  </>
}

export default Pod