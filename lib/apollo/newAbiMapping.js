import { AbiMapping } from '@pooltogether/tightbeam/abis'
import podAbi from '@pooltogether/pods/abis/Pod'
import poolV2Abi from '@pooltogether/pooltogether-contracts/abis/PoolV2'
import poolV2TokenAbi from '@pooltogether/pooltogether-contracts/abis/PoolToken'

import PoolV21TokenAbi from './abis/PoolV21TokenAbi'

export function newAbiMapping() {
  const abiMapping = new AbiMapping()

  const localNetworkId = process.env.NEXT_JS_LOCALHOST_NETWORK_ID
  const localPodAddress = process.env.NEXT_JS_POD_ADDRESS_LOCALHOST
  const localPoolDaiAddress = process.env.NEXT_JS_POOL_DAI_ADDRESS_LOCALHOST
  const localPoolDaiTokenAddress = process.env.NEXT_JS_POOL_DAI_TOKEN_ADDRESS_LOCALHOST

  const kovanPodAddress = process.env.NEXT_JS_POD_ADDRESS_KOVAN
  const kovanPoolDaiAddress = process.env.NEXT_JS_POOL_DAI_ADDRESS_KOVAN
  const kovanPoolDaiTokenAddress = process.env.NEXT_JS_POOL_DAI_TOKEN_ADDRESS_KOVAN

  try {
    if (localNetworkId) {
      abiMapping.addContract('Pod', localNetworkId, localPodAddress, podAbi)
      abiMapping.addContract('PoolDai', localNetworkId, localPoolDaiAddress, poolV2Abi)
      abiMapping.addContract('PoolDaiToken', localNetworkId, localPoolDaiTokenAddress, poolV2TokenAbi)
    }

    abiMapping.addContract('Pod', 42, kovanPodAddress, podAbi)
    abiMapping.addContract('PoolDai', 42, kovanPoolDaiAddress, poolV2Abi)
    abiMapping.addContract('PoolDaiToken', 42, kovanPoolDaiTokenAddress, poolV2TokenAbi)
  } catch (e) {
    console.error('AbiMapping set up incorrectly!', e)
  }

  return abiMapping
}

