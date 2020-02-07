import React, { useContext } from 'react'
import classnames from 'classnames'

import { ConnectFortmatic } from 'lib/components/ConnectFortmatic'
import { DisconnectFortmatic } from 'lib/components/DisconnectFortmatic'
import { NavUserBalance } from 'lib/components/NavUserBalance'
import { FortmaticContext } from 'lib/context/FortmaticContext'
import { networkColorClassname } from 'lib/utils/networkColorClassname'
import { networkIdToName } from 'lib/utils/networkIdToName'
import { shortenAddress } from 'lib/utils/shortenAddress'
import { EtherscanAddressLink } from './EtherscanAddressLink'

export const WalletInfo = ({ userAddress, setUserAddress }) => { 
  let jsx = null
    
  if (userAddress) {
    const shortenedUserAddress = shortenAddress(userAddress)

    const fortmatic = useContext(FortmaticContext)
    const chainId = fortmatic.getProvider().network

    let networkName = null
    if (chainId && chainId !== 1) {
      networkName = <span
        className={classnames(
          networkColorClassname(chainId)
        )}
      >
        &nbsp;{networkIdToName(chainId)}
      </span>
    }

    const name = 'Fortmatic'
    const walletAndNetworkName = <span
      className='capitalize'
    >
      {name}{networkName}
    </span>

    jsx = <>
      <div
        className='text-purple-500 trans flex items-center mt-2 sm:mt-0'
      >
        <EtherscanAddressLink
          address={userAddress}
        >
          <span
            className='text-purple-500 hover:text-green-300 trans'
          >
            {shortenedUserAddress} <span
              className='trans trans-fast hover:text-green-300 inline-block sm:hidden lg:inline-block'
            >&bull;</span> {walletAndNetworkName} 
          </span>
        </EtherscanAddressLink> <DisconnectFortmatic
          setUserAddress={setUserAddress}
        />
      </div>
      <div
        className='relative flex justify-center sm:justify-end items-center sm:hidden mt-4'
      >
        <NavUserBalance
          userAddress={userAddress}
        />
      </div>
    </>
  } else {
    return <ConnectFortmatic
      setUserAddress={setUserAddress}
      userAddress={userAddress}
    />
  }

  return jsx
}
