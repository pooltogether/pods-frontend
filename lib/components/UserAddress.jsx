import React from 'react'

import { Item } from 'lib/components/Item'

export function UserAddress({ userAddress }) { 
  if (userAddress) {
    return <Item
      label='Address'
      value={userAddress}
    />
  } else {
    return null
  }
}
