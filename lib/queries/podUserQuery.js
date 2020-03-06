import gql from 'graphql-tag'

export const podUserQuery = gql`
  query podUserQuery($podAddress: String!, $userAddress: String!) {
    balance: call(abi: "Pod", address: $podAddress, fn: "balanceOf", params: [$userAddress]) @client
    balanceUnderlying: call(abi: "Pod", address: $podAddress, fn: "balanceOfUnderlying", params: [$userAddress]) @client
    pendingDeposit: call(abi: "Pod", address: $podAddress, fn: "pendingDeposit", params: [$userAddress]) @client
  }
`