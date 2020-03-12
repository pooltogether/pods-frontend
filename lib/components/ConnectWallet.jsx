import React, { useContext } from 'react'
import { Button } from 'lib/components/Button'

import { OnboardContext } from 'lib/components/OnboardWrapper'
import { OnboardWalletContext } from 'lib/components/OnboardWrapper'

export function ConnectWallet() {
  const onboard = useContext(OnboardContext)
  const wallet = useContext(OnboardWalletContext)

  let result = null
  if (wallet) {
    result = <Button color='blue' onClick={() => onboard.walletReset()}>Disconnect</Button>
  } else {
    result = <Button onClick={() => onboard.walletSelect()}>Connect Wallet</Button>
  }

  return (
    <>
     {result}
    </>
  )
}