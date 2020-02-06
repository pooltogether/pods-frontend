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

export function Withdraw({ poolTokenUserBalance }) {
  const [
    withdraw,
    withdrawMutation
  ] = useMutation(
    WITHDRAW,
    { refetchQueries: ['transactionsQuery'] }
  )

  console.log({ poolTokenUserBalance })
  if (poolTokenUserBalance.lte(0)) {
    return null
  }

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
      Withdraw
    </button>
  }

  return <>
    {jsx}
  </>
}
