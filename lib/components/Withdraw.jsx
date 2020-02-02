import React from 'react'
import { useMutation, useQuery } from '@apollo/react-hooks';
import { transactionsQuery } from '@pooltogether/tightbeam/queries'
import gql from 'graphql-tag';

const WITHDRAW = gql`
  mutation {
    sendTransaction(name: "Pod", fn: "redeem" params: [0, "0x"], gasLimit: 500000) @client
  }
`

export function Withdraw() {
  const [withdraw, withdrawMutation] = useMutation(WITHDRAW, { refetchQueries: ['transactionsQuery'] })
  let withdrawTxId = withdrawMutation.data ? withdrawMutation.data.sendTransaction.id : null
  
  let tx = useQuery(transactionsQuery, { variables: { id: withdrawTxId } })
  if (tx && tx.data && tx.data.transactions && tx.data.transactions.length) {
    const { id, completed, sent, error } = tx.data.transactions[0]
    console.log({ id, completed, sent, error })
  }

  let result
  let loading, error
  if (loading) {
    result = <div>Loading Withdraw....</div>
  } else if (error) {
    console.error(error)
    result = <div>Withdraw error: {error.toString()}</div>
  } else {
    result = (
      <button onClick={withdraw}>Withdraw</button>
    )
  }

  return (
    result
  )
}
