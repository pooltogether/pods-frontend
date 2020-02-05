import gql from 'graphql-tag'

export const poolTokenUserQuery = gql`
  query poolTokenUserQuery($poolTokenAddress: String!, $userAddress: String!) {
    balanceOf: call(abi: PoolV21Token, address: $poolTokenAddress, fn: balanceOf, params: [$userAddress]) @client
  }
`
