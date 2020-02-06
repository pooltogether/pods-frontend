import React from 'react'
import { graphql } from 'react-apollo'

import { EventSubscription } from 'lib/components/EventSubscription'
import { poolQuery } from 'lib/queries/poolQuery'
import { refetchQuery } from 'lib/utils/refetchQuery'

export const PoolQuery = graphql(poolQuery, {
  name: 'poolQuery',
  skip: (props) => !props.poolAddress,
  options: (props) => {
    return {
      variables: {
        poolAddress: props.poolAddress
      }
    }
  }
})(
  function _PoolQuery({ poolAddress, poolQuery, children }) {
    if (!poolQuery) {
      return children({ poolAddress, poolQuery })
    }

    return (
      <>
        <EventSubscription
          abi='PoolV21'
          address={poolAddress}
          onEvent={() => refetchQuery(poolQuery)}
        />
        {children({ poolAddress, poolQuery })}
      </>
    )
  }
)