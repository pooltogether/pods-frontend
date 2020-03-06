import gql from 'graphql-tag'

export const podQuery = gql`
  query podQuery($podAddress: String!) {
    totalSupply: call(abi: "Pod", address: $podAddress, fn: "totalSupply") @client
    poolAddress: call(abi: "Pod", address: $podAddress, fn: "pool") @client
  }
`