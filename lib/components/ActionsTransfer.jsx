import React from 'react'

import { ContractAddressQuery } from 'lib/components/ContractAddressQuery'
import { PoolTokenUserBalance } from 'lib/components/PoolTokenUserBalance'
import { Transfer } from 'lib/components/Transfer'

export const ActionsTransfer = ({ userAddress }) => { 
  let jsx = null
    
  if (userAddress) {
    jsx = <ContractAddressQuery
      contractName='Pod'
    >
      {({ contractAddress }) => {
        const podAddress = contractAddress

        return <ContractAddressQuery
          contractName='PoolDaiToken'
        >
          {({ contractAddress }) => {
            const poolTokenAddress = contractAddress

            return <PoolTokenUserBalance
              poolTokenAddress={poolTokenAddress}
              userAddress={userAddress}
            >
              {({ poolTokenUserBalance }) => {
                return <Transfer
                  podAddress={podAddress}
                  poolTokenUserBalance={poolTokenUserBalance}
                />
              }}
            </PoolTokenUserBalance>
          }}
        </ContractAddressQuery>
      }}
    </ContractAddressQuery>
  }

  return jsx
}
