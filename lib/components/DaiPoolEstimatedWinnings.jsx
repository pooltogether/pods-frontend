import React, { useContext } from 'react'
import { useQuery } from '@apollo/react-hooks'

import { ContractAddressQuery } from 'lib/components/ContractAddressQuery'
import { EstimatedWinnings } from 'lib/components/EstimatedWinnings'
import { FortmaticContext } from 'lib/context/FortmaticContext'
import { poolQuery } from 'lib/queries/poolQuery'
import { displayAmountInEther } from 'lib/utils/displayAmountInEther'

export function DaiPoolEstimatedWinnings({}) { 
  const fortmatic = useContext(FortmaticContext)
  const chainId = fortmatic.getProvider().network

  // if (loading) {
  //   return '$----'
  // } else if (error) {
  //   console.error(error)
  //   return null
  // } else {
    return <ContractAddressQuery
      contractName='PoolDai'
    >
      {({ contractAddress }) => {
        const poolDaiAddress = contractAddress
        console.log({ poolDaiAddress})
        return <ContractAddressQuery
          contractName='Dai'
        >
          {({ contractAddress }) => {
            const daiAddress = contractAddress
            console.log({ daiAddress })
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
  // }
}
