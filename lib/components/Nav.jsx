import React from 'react'

import { NavUserBalance } from 'lib/components/NavUserBalance'
import { WalletInfo } from 'lib/components/WalletInfo'

import EthDenverLogo from 'assets/images/ethdenver-logo.svg'
import PoolLogo from 'assets/images/pooltogether-white-logo.svg'

export const Nav = ({ userAddress, setUserAddress }) => {
  return <>
    <div className='nav-and-footer-container'>
      <nav
        className='nav-min-height flex items-center h-full justify-between flex-wrap sm:mb-10'
      >
        <div
          className='w-full sm:w-1/3 mx-auto sm:mx-0 mb-4 sm:mb-0 justify-center sm:justify-start flex items-center'
        >
          <a
            href='https://www.pooltogether.com'
            title={'To PoolTogether.com!'}
          >
            <img
              alt={`PoolTogether Logo`}
              src={PoolLogo}
              className='w-16'
            />
          </a>
          <span
            className='inline-block'
            style={{marginLeft: 7}}
          >
            <img
              alt={`EthDenver Logo`}
              src={EthDenverLogo}
              className='w-32'
            />
          </span>
        </div>

        <div
          // className='relative flex justify-center sm:justify-end items-center mt-1 sm:hidden'
          className='w-full sm:w-1/3 justify-center items-center hidden sm:flex'
        >
          <NavUserBalance
            userAddress={userAddress}
          />
        </div>
        
        <div
          className='w-full sm:w-1/3 flex justify-center sm:justify-end items-center text-right'
        >
          <div
            className='mt-0 sm:mt-0 text-sm tracking-wide sm:leading-normal text-right spinner-hidden'
          >
            <WalletInfo
              setUserAddress={setUserAddress}
              userAddress={userAddress}
            />
          </div>
        </div>
      </nav>
    </div>
  </>
  
}