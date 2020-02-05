import React, { useContext } from 'react'
import classnames from 'classnames'
import FeatherIcon from 'feather-icons-react'

import { FortmaticContext } from 'lib/context/FortmaticContext'

export function DisconnectFortmatic({ setUserAddress }) {
  const fortmatic = useContext(FortmaticContext)

  const logout = async (e) => {
    e.preventDefault()

    fortmatic.user.logout()
    setUserAddress(undefined)
  }

  return <button
    onClick={logout}
    className={classnames(
      'text-lightPurple-500 hover:text-white trans ml-2 outline-none focus:outline-none',
      'block border rounded-full w-4 h-4 sm:w-5 sm:h-5 text-center text-lg',
      'border-purple-700 hover:bg-lightPurple-700',
      'trans'
    )}
  >
    <FeatherIcon
      icon='x'
      className={classnames(
        'w-3 h-3 hover:text-white m-auto'
      )}
    />
  </button>
}