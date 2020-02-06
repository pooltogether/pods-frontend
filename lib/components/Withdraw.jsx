import React from 'react'
import gql from 'graphql-tag'
import { useMutation, useQuery } from '@apollo/react-hooks'
import { transactionsQuery } from '@pooltogether/tightbeam/queries'

import { PINK_BUTTON_CLASSES } from 'lib/constants'

const WITHDRAW = gql`
  mutation {
    sendTransaction(name: "Pod", fn: "redeem" params: [0, "0x"], gasLimit: 500000) @client
  }
`

export function Withdraw({ podUserBalance }) {
  if (podUserBalance.lte(0)) {
    return null
  }

  const [
    withdraw,
    withdrawMutation
  ] = useMutation(
    WITHDRAW,
    { refetchQueries: ['transactionsQuery'] }
  )

  let withdrawTxId = withdrawMutation.data ? withdrawMutation.data.sendTransaction.id : null
  
  let tx = useQuery(transactionsQuery, { variables: { id: withdrawTxId } })
  if (tx && tx.data && tx.data.transactions && tx.data.transactions.length) {
    const { id, completed, sent, error } = tx.data.transactions[0]
    console.log({ id, completed, sent, error })
  }

  let jsx
  let loading, error
  if (loading) {
    // jsx = <div>Loading Withdraw....</div>
  } else if (error) {
    console.error(error)
    jsx = <div>Withdraw error: {error.toString()}</div>
  } else {
    jsx = <button
      onClick={withdraw}
      className={PINK_BUTTON_CLASSES}
    >
      Withdraw from Pod
    </button>
  }

  return <>
    {jsx}
  </>
}
