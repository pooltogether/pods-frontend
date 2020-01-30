import React, { useContext } from 'react'
import { FortmaticContext } from 'lib/context/FortmaticContext'

export function ConnectFortmatic() {
  let fortmatic = useContext(FortmaticContext)

  return (
    <button onClick={() => fortmatic.getProvider().enable()}>Login</button>
  )
}