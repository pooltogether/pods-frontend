import { PINK_BUTTON_CLASSES } from 'lib/constants'

export const ActionsClaim = ({ userAddress }) => { 
  return null
  return <button
    onClick={() => {}}
    className={PINK_BUTTON_CLASSES}
  >
    Claim your free ticket
  </button>

  if (userAddress) {
    let jsx = null
    // TODO: run some sort of query if we have a userAddress to figure out
    // if they have a free ticket they can claim or if they've already done that

    // jsx = <ContractAddressQuery
    //   contractName='PoolDaiToken'
    // >
    //   {({ contractAddress }) => {
    //     console.log(contractAddress)
    //     return <PoolTokenUserBalance
    //       poolTokenAddress={contractAddress}
    //       userAddress={userAddress}
    //     >
    //       {({ poolTokenUserBalance }) => {
    //         return <Claim
    //           poolTokenUserBalance={poolTokenUserBalance}
    //         />
    //       }}
    //     </PoolTokenUserBalance>
    //   }}
    // </ContractAddressQuery>
  }

  return jsx
}
