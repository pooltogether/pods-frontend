import React from 'react'

import { ContractAddressQuery } from 'lib/components/ContractAddressQuery'
import { PodUserQuery } from 'lib/components/PodUserQuery'
import { Withdraw } from 'lib/components/Withdraw'

export const ActionsWithdraw = ({ userAddress }) => { 
  let jsx = null
    
  if (userAddress) {
    jsx = <ContractAddressQuery
      contractName='Pod'
    >
      {({ contractAddress }) => {
        return <PodUserQuery
          podAddress={contractAddress}
          userAddress={userAddress}
        >
          {(podUserQuery) => {
            const podUserBalance = podUserQuery.balanceOf

            return <Withdraw
              podUserBalance={podUserBalance}
            />
          }}
        </PodUserQuery>
      }}
    </ContractAddressQuery>
  }

  return jsx
}
