import gql from 'graphql-tag'

export const poolQuery = gql`
  query poolQuery($poolAddress: String!, $podAddress: String!) {
    openDrawId: call(abi: "PoolV2", address: $poolAddress, fn: "currentOpenDrawId") @client
    tokenAddress: call(abi: "PoolV2", address: $poolAddress, fn: "token") @client
    committedBalance: call(abi: "PoolV2", address: $poolAddress, fn: "committedBalanceOf", params: [$podAddress]) @client
    openBalance: call(abi: "PoolV2", address: $poolAddress, fn: "openBalanceOf", params: [$podAddress]) @client
  }
`