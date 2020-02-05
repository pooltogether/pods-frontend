import React, { useContext } from 'react'
import { FortmaticContext } from 'lib/context/FortmaticContext'

export function DisconnectFortmatic({ setUserAddress, userAddress }) {
  let fortmatic = useContext(FortmaticContext)

  return <>
    <button
      onClick={
        (e) => {
          e.preventDefault()
          fortmatic.user.logout()
          setUserAddress(undefined)
        }
      }
      disabled={!userAddress}
    >
      Sign out
    </button>
  </>
}