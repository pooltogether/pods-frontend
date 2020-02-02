import { cloneDeep } from 'lodash'

import { withAllTransactionsQuery } from 'lib/components/withAllTransactionsQuery'

const debug = require('debug')('pt:components:DepositForm')

export const TransactionQuery = withAllTransactionsQuery(
  ({
    allTransactionsQuery,
    children,
    contractName,
    contractAddress,
    method
  }) => {
    let transaction = null

    console.log({ allTransactionsQuery })

    if (!contractName && !contractAddress) {
      debug('<TransactionQuery> used w/o a contract name and/or address')

      return children(null)
    } else {
      const { transactions } = allTransactionsQuery
      const txs = cloneDeep(transactions) || []
      txs.reverse()

      if (contractAddress) {
        contractAddress = contractAddress.toLowerCase()
      }

      transaction = txs.find(transaction => {
        if (method && method !== transaction.fn) {
          return false
        }

        if (contractName && contractName !== transaction.name) {
          return false
        }

        const txAddress = transaction.address.toLowerCase()
        if (contractAddress && contractAddress !== txAddress) {
          return false
        }

        return true
      })

      return children(transaction)
    }
    
  }
)
