import React, { useContext } from 'react'

import { ContractAddressQuery } from 'lib/components/ContractAddressQuery'
import { EstimatedWinnings } from 'lib/components/EstimatedWinnings'
import { FortmaticContext } from 'lib/context/FortmaticContext'
import { displayAmountInEther } from 'lib/utils/displayAmountInEther'

export function DaiPoolEstimatedWinnings({}) { 
  const fortmatic = useContext(FortmaticContext)
  const chainId = fortmatic.getProvider().network

  return <ContractAddressQuery
    contractName='PoolDai'
  >
    {({ contractAddress }) => {
      const poolDaiAddress = contractAddress
      return <ContractAddressQuery
        contractName='Dai'
      >
        {({ contractAddress }) => {
          const daiAddress = contractAddress
          return <EstimatedWinnings
            poolAddress={poolDaiAddress}
            erc20ContractAddress={daiAddress}
            ticker='dai'
            chainId={chainId}
          >
            {({ estimatedWinnings }) => {
              return `$${displayAmountInEther(estimatedWinnings, { precision: 2 })}`
            }}
          </EstimatedWinnings>
        }}
      </ContractAddressQuery>
    }}
  </ContractAddressQuery>
}
