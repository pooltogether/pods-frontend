import { ContractAddressQuery } from 'lib/components/ContractAddressQuery'
import { PodUserQuery } from 'lib/components/PodUserQuery'
import { PoolTokenUserQuery } from 'lib/components/PoolTokenUserQuery'
import { displayAmountInEther } from 'lib/utils/displayAmountInEther'

export function NavUserBalance({ userAddress }) { 
  let jsx = null

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
                    className='flex justify-end text-cyan-400 hover:text-cyan-200 trans'
                  >
                    {tokenBalance} PT <span
                      className='text-purple-600'
                    >&nbsp;&bull;&nbsp;</span> <span
                      className='text-blue-400'
                    >{podBalance} Pod Tickets</span>
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