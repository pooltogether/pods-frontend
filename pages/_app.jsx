// import App from 'next/app'
import React from 'react'

import { Layout } from 'lib/components/Layout'

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp