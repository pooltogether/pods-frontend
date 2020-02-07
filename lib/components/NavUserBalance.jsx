import { ContractAddressQuery } from 'lib/components/ContractAddressQuery'
import { PodUserQuery } from 'lib/components/PodUserQuery'
import { PoolTokenUserQuery } from 'lib/components/PoolTokenUserQuery'
import { displayAmountInEther } from 'lib/utils/displayAmountInEther'

import plDaiSymbol from 'assets/images/plDai-xs-outlines.svg'

export function NavUserBalance({ userAddress }) { 
  if (!userAddress) {
    return null
  }

  return <ContractAddressQuery
    contractName='Pod'
  >
    {({ contractAddress }) => {
      const podAddress = contractAddress

      return <ContractAddressQuery
        contractName='PoolDaiToken'
      >
        {({ contractAddress }) => {
          const poolDaiTokenAddress = contractAddress

          return <PodUserQuery
            podAddress={podAddress}
            userAddress={userAddress}
          >
            {(podUserQuery) => {
              const podBalance = displayAmountInEther(podUserQuery.balanceOf, { precision: 0 })

              return <PoolTokenUserQuery
                poolTokenAddress={poolDaiTokenAddress}
                userAddress={userAddress}
              >
                {(poolTokenUserQuery) => {
                  const tokenBalance = displayAmountInEther(poolTokenUserQuery.balanceOf, { precision: 0 })

                  return <span
                    className='flex flex-col items-center justify-center text-cyan-400 hover:text-cyan-200 trans'
                  >
                    <div className='text-purple-700 font-headline bg-purple-1200 px-2 py-1 rounded-full'>
                      Your Inventory:
                    </div>
                    
                    <div>
                      {tokenBalance} <img
                        src={plDaiSymbol}
                        className='w-6 inline-block'
                      />
                    </div>

                    <div>
                      <span
                        className='text-blue-400'
                      >{podBalance} Pods</span>
                    </div>
                  </span>
                }}
              </PoolTokenUserQuery>
            }}
          </PodUserQuery>
        }}
      </ContractAddressQuery>
    }}
  </ContractAddressQuery>
}