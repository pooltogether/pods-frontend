import React from 'react'

import { WalletInfo } from 'lib/components/WalletInfo'

import EthDenverLogo from 'assets/images/ethdenver-logo.svg'
import PoolLogo from 'assets/images/pooltogether-white-logo.svg'

export const Nav = ({ userAddress, setUserAddress }) => {
  return <>
    <div className='nav-and-footer-container'>
      <nav
        className='nav-min-height flex items-center h-full justify-between flex-wrap'
      >
        <div
          className='w-1/2 justify-start h-full flex items-center truncate'
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
          className='w-1/2 flex justify-end h-full items-center text-right'
        >
          <div
            className='mt-0 sm:mt-0 text-xxs sm:text-sm tracking-wide leading-none sm:leading-normal text-right spinner-hidden'
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