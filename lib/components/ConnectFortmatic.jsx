import React, { useContext } from 'react'
import { FortmaticContext } from 'lib/context/FortmaticContext'

export function ConnectFortmatic({ setUserAddress, userAddress }) {
  let fortmatic = useContext(FortmaticContext)

  const showLogin = async (e) => {
    e.preventDefault()

    await fortmatic.getProvider().enable()
    setUserAddress(fortmatic.getProvider().account)
  }

  const logout = async (e) => {
    e.preventDefault()

    fortmatic.user.logout()
    setUserAddress(undefined)
  }

  let jsx = <button
    onClick={showLogin}
  >
    Sign in
  </button>

  if (userAddress) {
    jsx = <button
      onClick={logout}
    >
      Sign out
    </button>
  }

  return jsx
}