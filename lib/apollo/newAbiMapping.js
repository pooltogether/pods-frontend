import { AbiMapping } from '@pooltogether/tightbeam/abis'
import podAbi from '@pooltogether/pods/abis/Pod'

import PoolV21TokenAbi from './abis/PoolV21TokenAbi'

export function newAbiMapping() {
  const abiMapping = new AbiMapping()

  const localNetworkId = process.env.NEXT_JS_LOCALHOST_NETWORK_ID
  const localPodAddress = process.env.NEXT_JS_POD_ADDRESS_LOCALHOST
  const localPoolDaiTokenAddress = process.env.NEXT_JS_POOL_DAI_TOKEN_ADDRESS_LOCALHOST

  const kovanPodAddress = process.env.NEXT_JS_POD_ADDRESS_KOVAN
  const kovanPoolDaiTokenAddress = process.env.NEXT_JS_POOL_DAI_TOKEN_ADDRESS_KOVAN

  if (localNetworkId) {
    if (localPodAddress) {
      abiMapping.addContract('Pod', localNetworkId, localPodAddress, podAbi)
    }

    if (localPoolDaiTokenAddress) {
      abiMapping.addContract('Dai', localNetworkId, localPoolDaiTokenAddress, PoolV21TokenAbi)
    }
  }

  
  if (kovanPodAddress) {
    abiMapping.addContract('Pod', 42, kovanPodAddress, podAbi)
  }

  if (kovanPoolDaiTokenAddress) {
    abiMapping.addContract('PoolDaiToken', 42, kovanPoolDaiTokenAddress, PoolV21TokenAbi)
  }

  return abiMapping
}

