import gql from 'graphql-tag'

export const poolQuery = gql`
  query poolQuery($poolAddress: String!) {
    accountedBalance:       call(address: $poolAddress, abi: PoolV21, fn: accountedBalance) @client
    currentCommittedDrawId: call(address: $poolAddress, abi: PoolV21, fn: currentCommittedDrawId) @client
    currentOpenDrawId:      call(address: $poolAddress, abi: PoolV21, fn: currentOpenDrawId) @client
    committedSupply:        call(address: $poolAddress, abi: PoolV21, fn: committedSupply) @client
    openSupply:             call(address: $poolAddress, abi: PoolV21, fn: openSupply) @client
    balance:                call(address: $poolAddress, abi: PoolV21, fn: balance) @client
    supplyRatePerBlock:     call(address: $poolAddress, abi: PoolV21, fn: supplyRatePerBlock) @client
  }
`
