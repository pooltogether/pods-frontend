import React, { useContext } from 'react'
import classnames from 'classnames'

import { ConnectFortmatic } from 'lib/components/ConnectFortmatic'
import { DisconnectFortmatic } from 'lib/components/DisconnectFortmatic'
import { ContractAddressQuery } from 'lib/components/ContractAddressQuery'
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
          networkColorClassname(chainId),
          'inline-block text-xxxs sm:text-xs lg:text-sm'
        )}
      >
        &nbsp;{networkIdToName(chainId)}
      </span>
    }

    const name = 'Fortmatic'
    const walletAndNetworkName = <span
      className='block sm:inline-block py-1 rounded-lg sm:text-purple-500 capitalize'
    >
      {name}{networkName}
    </span>

    jsx = <>
      <div
        className='relative flex justify-end items-center'
      >
        <div>
          <span className='block leading-none text-purple-500 trans'>
            <EtherscanAddressLink
              address={userAddress}
            >
              <span
                className='text-purple-500 hover:text-purple-300 overflow-ellipsis inline-block w-11/12 no-underline'
              >
                {shortenedUserAddress}
              </span>
            </EtherscanAddressLink>

            {walletAndNetworkName}
          </span> <NavUserBalance
            userAddress={userAddress}
          />
        </div>

        <DisconnectFortmatic
          setUserAddress={setUserAddress}
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
