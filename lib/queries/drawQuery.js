import gql from 'graphql-tag'

export const drawQuery = gql`
  query drawQuery($poolAddress: String!, $drawId: String!) {
    draw: call(abi: PoolV21, address: $poolAddress, fn: getDraw, params: [$drawId]) @client
  }
`