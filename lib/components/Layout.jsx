import 'odometer/themes/odometer-theme-minimal.css'
import 'react-toastify/dist/ReactToastify.css'
import 'react-hint/css/index.css'

import 'assets/styles/normalize-opentype.css'
import 'assets/styles/index.css'
import 'assets/styles/utils.css'
import 'assets/styles/animations.css'
import 'assets/styles/transitions.css'

import React from 'react'
import { Slide, ToastContainer } from 'react-toastify'

import { OnboardWrapper } from 'lib/components/OnboardWrapper'
import { ConnectWallet } from 'lib/components/ConnectWallet'
import EthersWrapper from 'lib/components/EthersWrapper'
import { Meta } from 'lib/components/Meta'

// This page has no blocking data requirements
// it'll be rendered as static HTML at build time
export function Layout({ children }) {
  return <>
    <Meta
      title='Pod Reference Implementation'
    />

    <ToastContainer
      className='pool-toast'
      position='top-center'
      autoClose={6000}
      transition={Slide}
    />
    
    <OnboardWrapper>
      <div className='container mx-auto py-4'>
        <ConnectWallet />
      </div>

      {children}
    </OnboardWrapper>
  </>
}
