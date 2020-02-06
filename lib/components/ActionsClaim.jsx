export const ActionsClaim = ({ userAddress }) => { 
  let jsx = null

  jsx = 'Claim your free ticket!'

  if (userAddress) {
    // TODO: run some sort of query if we have a userAddress to figure out
    // if they have a free ticker they can claim or if they've already done that

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
    //         return <Withdraw
    //           poolTokenUserBalance={poolTokenUserBalance}
    //         />
    //       }}
    //     </PoolTokenUserBalance>
    //   }}
    // </ContractAddressQuery>
  }

  return jsx
}
