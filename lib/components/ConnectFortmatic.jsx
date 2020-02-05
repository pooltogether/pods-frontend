import React, { useContext } from 'react'

import { FortmaticContext } from 'lib/context/FortmaticContext'

export function ConnectFortmatic({ setUserAddress }) {
  let jsx = null

  const fortmatic = useContext(FortmaticContext)

  const checkIfSignedIn = async () => {
    const provider = await fortmatic.getProvider()
    // await provider.enable()

    const userAddress = provider.account
    setUserAddress(userAddress)
  }
  checkIfSignedIn()

  const showLogin = async (e) => {
    e.preventDefault()

    const provider = await fortmatic.getProvider()
    await provider.enable()
    setUserAddress(fortmatic.getProvider().account)
  }

  // 'Connect Wallet'
  jsx = <button
    className='font-bold rounded-full text-green-300 border-2 sm:border-4 border-green-300 hover:text-white hover:bg-lightPurple-900 text-xxs sm:text-base pt-2 pb-2 px-3 sm:px-6 trans'
    onClick={showLogin}
  >
    Sign in
  </button>

  // if (userAddress) {
  //   jsx = <button
  //     className='font-bold rounded-full text-green-300 border-2 sm:border-4 border-transparent hover:text-white hover:bg-lightPurple-900 text-xxs sm:text-base pt-2 pb-2 px-3 sm:px-6 trans'
  //     onClick={logout}
  //   >
  //     Sign out
  //   </button>
  // }

  return jsx
}