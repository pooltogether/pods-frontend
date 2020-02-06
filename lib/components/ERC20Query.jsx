import React from 'react'
import { graphql } from 'react-apollo'

import { EventSubscription } from 'lib/components/EventSubscription'
import { erc20Query } from 'lib/queries/erc20Query'
import { refetchQuery } from 'lib/utils/refetchQuery'

export const ERC20Query = graphql(erc20Query, {
  name: 'erc20Query',
  skip: (props) => (
    !props.contractAddress
  ),
  options: (props) => {
    return {
      variables: {
        contractAddress: props.contractAddress,
      }
    }
  }
})(
  function _ERC20Query({
    children,
    contractAddress,
    erc20Query,
  }) {
    return <>
      <EventSubscription
        abi='ERC20'
        address={contractAddress}
        params={[contractAddress]}
        onEvent={() => refetchQuery(erc20Query)}
      />
      {children({ erc20Query })}
    </>
  }
)