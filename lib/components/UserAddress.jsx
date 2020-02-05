import React from 'react'

export function UserAddress({ userAddress }) { 
  if (userAddress) {
    return <>
      <strong>UserAddress:</strong>
      <br />{userAddress}
    </>
  } else {
    return null
  }
}
