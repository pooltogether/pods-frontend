import React, { useState } from 'react'
import Fortmatic from 'fortmatic'

import { FortmaticContext } from 'lib/context/FortmaticContext'

let customNodeOptions

const fortmaticApiKeyTest = process.env.NEXT_JS_FORTMATIC_API_KEY
const fortmaticApiKeyProd = process.env.NEXT_JS_FORTMATIC_PRODUCTION_API_KEY
const fortmaticApiKey = fortmaticApiKeyProd ? fortmaticApiKeyProd : fortmaticApiKeyTest

if (
  process.env.NEXT_JS_FORTMATIC_CUSTOM_NODE_URL &&
  process.env.NEXT_JS_FORTMATIC_CUSTOM_NODE_CHAIN_ID
) {
  customNodeOptions = {
    rpcUrl: process.env.NEXT_JS_FORTMATIC_CUSTOM_NODE_URL,
    chainId: process.env.NEXT_JS_FORTMATIC_CUSTOM_NODE_CHAIN_ID
  }
} else if (process.env.NEXT_JS_FORTMATIC_NETWORK_NAME) {
  customNodeOptions = process.env.NEXT_JS_FORTMATIC_NETWORK_NAME
}

function newFortmatic() {
  let fm

  if (customNodeOptions) {
    fm = new Fortmatic(fortmaticApiKey, customNodeOptions)
  } else {
    fm = new Fortmatic(fortmaticApiKey)
  }

  return fm
}

export default function FortmaticWrapper({ children }) {
  const [
    fortmatic,
    setFortmatic
  ] = useState()

  if (!fortmatic) {
    setFortmatic(newFortmatic())
  }

  return <>
    <FortmaticContext.Provider
      value={fortmatic}
    >
      {children}
    </FortmaticContext.Provider>
  </>
}