import React, { useState } from 'react'
import { Slide, ToastContainer } from 'react-toastify'

import { ConnectFortmatic } from 'lib/components/ConnectFortmatic'
import { DynamicApolloWrapper } from 'lib/components/DynamicApolloWrapper'
import { DynamicFortmaticWrapper } from 'lib/components/DynamicFortmaticWrapper'
import { Meta } from 'lib/components/Meta'
import { PodAddress } from 'lib/components/PodAddress'
import { TotalSupply } from 'lib/components/TotalSupply'
import { UserAddress } from 'lib/components/UserAddress'
import { Withdraw } from 'lib/components/Withdraw'

import 'odometer/themes/odometer-theme-minimal.css'
import 'react-toastify/dist/ReactToastify.css'
import 'react-hint/css/index.css'

import 'assets/styles/normalize-opentype.css'
import 'assets/styles/index.css'
import 'assets/styles/pool.css'
import 'assets/styles/accordion.css'
import 'assets/styles/layout.css'
import 'assets/styles/pages.css'
import 'assets/styles/tab-menu.css'
import 'assets/styles/pool-toast.css'
import 'assets/styles/footer.css'
import 'assets/styles/utils.css'
import 'assets/styles/animations.css'
import 'assets/styles/loader.css'
import 'assets/styles/transitions.css'

// This page has no blocking data requirements
// it'll be rendered as static HTML at build time
function HomePage() {
  const [
    userAddress,
    setUserAddress
  ] = useState()

  return <>
    <Meta
      title='ETH Denver 2020 Pod'
    />
    
    <div className='flex flex-col' style={{ minHeight: '100vh' }}>
      <div className='nav-and-footer-container text-white'>
        <ToastContainer
          className='pool-toast'
          position='top-center'
          autoClose={6000}
          transition={Slide}
        />

        <DynamicFortmaticWrapper>
          <DynamicApolloWrapper>
            <UserAddress
              userAddress={userAddress}
            />
            <br />
            <br />

            <ConnectFortmatic
              setUserAddress={setUserAddress}
              userAddress={userAddress}
            />
            <br />
            <br />
          </DynamicApolloWrapper>
        </DynamicFortmaticWrapper>
      </div>

      <div className='text-white pool-container'>
        <DynamicFortmaticWrapper>
          <DynamicApolloWrapper>
            <PodAddress />
            <br />
            <br />

            <TotalSupply />
            <br />
            <br />

            <Withdraw />
          </DynamicApolloWrapper>
        </DynamicFortmaticWrapper>
      </div>
    </div>
  </>
}

export default HomePage