import React from 'react'
import { useRouter } from 'next/router'

import { Layout } from 'lib/components/Layout'
import DefaultPod from 'lib/components/DefaultPod'
import PodForm from 'lib/components/PodForm'

function HomePage() {
  const router = useRouter()

  return (
    <Layout>
      <div className='container mx-auto mt-12'>
        <DefaultPod />
        <PodForm onOpen={(address) => router.push(`/pods/${address}`)}/>
      </div>
    </Layout>
  )
}

export default HomePage