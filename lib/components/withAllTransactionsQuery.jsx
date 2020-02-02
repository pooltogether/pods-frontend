import { graphql } from 'react-apollo'
import { allTransactionsQuery } from '@pooltogether/tightbeam/queries'

export function withAllTransactionsQuery (Component) {
  return graphql(allTransactionsQuery,
    {
      name: 'allTransactionsQuery'
    },
  )(Component)
}
