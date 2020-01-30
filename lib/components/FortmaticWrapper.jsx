import React, { useState } from 'react'
import { FortmaticContext } from 'lib/context/FortmaticContext'
import Fortmatic from 'fortmatic';

let customNodeOptions
if (process.env.NEXT_JS_FORTMATIC_CUSTOM_NODE_URL &&
    process.env.NEXT_JS_FORTMATIC_CUSTOM_NODE_CHAIN_ID) {
  customNodeOptions = {
    rpcUrl: process.env.NEXT_JS_FORTMATIC_CUSTOM_NODE_URL,
    chainId: process.env.NEXT_JS_FORTMATIC_CUSTOM_NODE_CHAIN_ID
  }
}

function newFortmatic() {
  let fm
  if (customNodeOptions) {
    fm = new Fortmatic(process.env.NEXT_JS_FORTMATIC_API_KEY, customNodeOptions)
  } else {
    fm = new Fortmatic(process.env.NEXT_JS_FORTMATIC_API_KEY);
  }
  return fm
}

export default function FortmaticWrapper({ children }) {
  const [fortmatic, setFortmatic] = useState()
  if (!fortmatic) {
    setFortmatic(newFortmatic())
  }
  return (
    <FortmaticContext.Provider value={fortmatic}>
      {children}
    </FortmaticContext.Provider>
  )
}