import React, { useContext } from 'react'
import { FortmaticContext } from 'lib/context/FortmaticContext'

export function ConnectFortmatic({ setUserAddress, userAddress }) {
  let fortmatic = useContext(FortmaticContext)

  const showLogin = async (e) => {
    e.preventDefault()

    await fortmatic.getProvider().enable()
    setUserAddress(fortmatic.getProvider().account)
  }

  return <>
    <button
      onClick={showLogin}
      disabled={userAddress}
    >
      Sign in
    </button>
  </>
}