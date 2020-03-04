import gql from 'graphql-tag'
import { transactionFragment } from '@pooltogether/tightbeam/queries/transactionFragment'

export const transactionsQuery = gql`
  query transactionsQuery {
    _transactions @client {
      ...transaction
    }
  }
  ${transactionFragment}
`
