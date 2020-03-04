import gql from 'graphql-tag'

export const tokenQuery = gql`
  query tokenQuery($tokenAddress: String!, $userAddress: String!, $podAddress: String!) {
    allowance: call(abi: "ERC20", address: $tokenAddress, fn: "allowance", params: [$userAddress, $podAddress]) @client
    balance: call(abi: "ERC20", address: $tokenAddress, fn: "balanceOf", params: [$userAddress]) @client
  }
`