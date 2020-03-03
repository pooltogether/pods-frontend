import gql from 'graphql-tag'

export const podUserQuery = gql`
  query podUserQuery($podAddress: String!, $userAddress: String!) {
    totalSupply: call(abi: "Pod", address: $podAddress, fn: "totalSupply") @client
    poolAddress: call(abi: "Pod", address: $podAddress, fn: "pool") @client
    balance: call(abi: "Pod", address: $podAddress, fn: "balanceOf", params: [$userAddress]) @client
    balanceUnderlying: call(abi: "Pod", address: $podAddress, fn: "balanceOfUnderlying", params: [$userAddress]) @client
    network @client {
      id
      chainId
      name
    }
  }
`