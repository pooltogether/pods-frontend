import gql from 'graphql-tag'

export const poolQuery = gql`
  query poolQuery($poolAddress: String!, $podAddress: String!) {
    tokenAddress: call(abi: "PoolV2", address: $poolAddress, fn: "token") @client
    committedBalanceOf: call(abi: "PoolV2", address: $poolAddress, fn: "committedBalanceOf", params: [$podAddress]) @client
    openBalanceOf: call(abi: "PoolV2", address: $poolAddress, fn: "openBalanceOf", params: [$podAddress]) @client
  }
`