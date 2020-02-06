import gql from 'graphql-tag'

export const podUserQuery = gql`
  query podUserQuery($podAddress: String!, $userAddress: String!) {
    balanceOf: call(abi: Pod, address: $podAddress, fn: balanceOf, params: [$userAddress]) @client
  }
`
