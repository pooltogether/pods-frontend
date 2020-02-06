import React, { useContext } from 'react'
import FeatherIcon from 'feather-icons-react'

import { FortmaticContext } from 'lib/context/FortmaticContext'
import { formatEtherscanAddressUrl } from 'lib/utils/formatEtherscanAddressUrl'

export const EtherscanAddressLink = ({ address, children, className }) => {
  const fortmatic = useContext(FortmaticContext)
  const chainId = fortmatic.getProvider().network
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
        className='is-etherscan-arrow inline-block'
      />
    </a>
  </>
}
