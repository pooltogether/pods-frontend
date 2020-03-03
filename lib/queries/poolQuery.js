import gql from 'graphql-tag'

export const poolQuery = gql`
  query poolQuery($poolAddress: String!, $podAddress: String!) {
    totalSupply: call(abi: "PoolV2", address: $poolAddress, fn: "totalSupply") @client
    tokenAddress: call(abi: "PoolV2", address: $poolAddress, fn: "token") @client
    balance: call(abi: "PoolV2", address: $poolAddress, fn: "balanceOf", params: [$podAddress]) @client
    balanceUnderlying: call(abi: "PoolV2", address: $poolAddress, fn: "balanceOfUnderlying", params: [$podAddress]) @client
  }
`