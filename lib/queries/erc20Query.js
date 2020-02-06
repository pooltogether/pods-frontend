import gql from 'graphql-tag'

export const erc20Query = gql`
  query erc20Query($contractAddress: String!) {
    decimals: call(abi: ERC20, address: $contractAddress, fn: decimals) @client
  }
`
