import React from 'react'
import { useMutation, useQuery } from '@apollo/react-hooks'
import { transactionsQuery } from '@pooltogether/tightbeam/queries'

import { PINK_BUTTON_CLASSES } from 'lib/constants'
import { tokenTransferMutation } from 'lib/mutations/tokenTransferMutation'

export function Transfer({ podAddress, poolTokenUserBalance }) {
  if (poolTokenUserBalance.lte(0)) {
    return null
  }
  
  const variables = {
    podAddress,
    amount: poolTokenUserBalance.toString()
  }
  console.log(variables)

  const [
    transfer,
    transferMutation
  ] = useMutation(
    tokenTransferMutation,
    variables,
    { refetchQueries: ['transactionsQuery'] }
  )

  const transferTxId = transferMutation.data ? transferMutation.data.sendTransaction.id : null
  
  const tx = useQuery(transactionsQuery, { variables: { id: transferTxId } })
  if (tx && tx.data && tx.data.transactions && tx.data.transactions.length) {
    const { id, completed, sent, error } = tx.data.transactions[0]
    console.log({ id, completed, sent, error })
  }

  return <button
    onClick={transfer}
    className={PINK_BUTTON_CLASSES}
  >
    Join Pod
  </button>
}
