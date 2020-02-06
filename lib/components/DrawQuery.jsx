import { graphql } from 'react-apollo'

import { drawQuery } from 'lib/queries/drawQuery'

export const DrawQuery = graphql(drawQuery, {
  name: 'drawQuery',
  // skip: (props) => !props.drawId || !props.poolAddress,
  options: ({ poolAddress, drawId }) => {
    const variables = {
      poolAddress,
      drawId
    }
    return {
      variables
    }
  }
})(
  function _DrawQuery({ poolAddress, drawId, drawQuery, children }) {
    return children({ poolAddress, drawId, drawQuery })
  }
)
