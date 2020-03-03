import React from 'react'
import FeatherIcon from 'feather-icons-react'

import { formatEtherscanAddressUrl } from 'lib/utils/formatEtherscanAddressUrl'

export const EtherscanAddressLink = ({ address, children, className }) => {
  chainId = 1
  const url = formatEtherscanAddressUrl(address, chainId || 1)

  return <>
    <a
      href={url}
      className={`trans no-underline text-green-300 ${className}`}
      target='_blank'
      rel='noopener noreferrer'
      title={'View on Etherscan'}
    >
      {children}<FeatherIcon
        icon='arrow-up-right'
        className='is-etherscan-arrow inline-block trans no-underline text-purple-400 hover:text-green-300'
      />
    </a>
  </>
}
