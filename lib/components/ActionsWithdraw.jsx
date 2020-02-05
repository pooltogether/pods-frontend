import React from 'react'

import { ContractAddressQuery } from 'lib/components/ContractAddressQuery'
import { PoolTokenUserBalance } from 'lib/components/PoolTokenUserBalance'
import { Withdraw } from 'lib/components/Withdraw'

export const ActionsWithdraw = ({ userAddress }) => { 
  let jsx = null
    
  if (userAddress) {
    jsx = <ContractAddressQuery
      contractName='PoolDaiToken'
    >
      {({ contractAddress }) => {
        console.log(contractAddress)
        return <PoolTokenUserBalance
          poolTokenAddress={contractAddress}
          userAddress={userAddress}
        >
          {({ poolTokenUserBalance }) => {
            return <Withdraw
              poolTokenUserBalance={poolTokenUserBalance}
            />
          }}
        </PoolTokenUserBalance>
      }}
    </ContractAddressQuery>
  }

  return jsx
}
