import React, { useState } from 'react'
import { Slide, ToastContainer } from 'react-toastify'

import { DynamicApolloWrapper } from 'lib/components/DynamicApolloWrapper'
import { DynamicFortmaticWrapper } from 'lib/components/DynamicFortmaticWrapper'
import { Meta } from 'lib/components/Meta'
import { Nav } from 'lib/components/Nav'
import { PodAddress } from 'lib/components/PodAddress'
import { TotalSupply } from 'lib/components/TotalSupply'
import { Withdraw } from 'lib/components/Withdraw'

import { CSSFiles } from 'lib/components/CSSFiles'

// This page has no blocking data requirements
// it'll be rendered as static HTML at build time
function HomePage() {
  const [
    userAddress,
    setUserAddress
  ] = useState()

  return <>
    <CSSFiles />

    <Meta
      title='ETH Denver 2020 Pod'
    />

    <ToastContainer
      className='pool-toast'
      position='top-center'
      autoClose={6000}
      transition={Slide}
    />
    
    <DynamicFortmaticWrapper>
      <DynamicApolloWrapper>
        <div className='flex flex-col text-white' style={{ minHeight: '100vh' }}>
          <div
            className='main-nav relative spinner-hidden z-20'
          >
            <Nav
              setUserAddress={setUserAddress}
              userAddress={userAddress}
            />
          </div>

          <div className='text-white pool-container'>
            <div
              className='trans justify-between text-sm sm:text-lg mx-8 lg:mx-12 mt-0 mb-1'
            >
              <PodAddress />
              <br />

              <TotalSupply />
              <br />

              <Withdraw />
            </div>
          </div>
        </div>
      </DynamicApolloWrapper>
    </DynamicFortmaticWrapper>
  </>
}

export default HomePage