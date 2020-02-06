import gql from 'graphql-tag'

export const tokenTransferMutation = gql`
  mutation tokenTransferMutation($podAddress: String!, $amount: String!) {
    sendTransaction(name: "PoolDaiToken", fn: "transfer" params: ["0xfE6892654CBB05eB73d28DCc1Ff938f59666Fe9f", "2000000000000000000000"], gasLimit: 500000) @client
    # sendTransaction(name: "PoolDaiToken", fn: "transfer" params: [$podAddress, $amount], gasLimit: 500000) @client
  }
`