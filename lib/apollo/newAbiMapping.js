import { AbiMapping } from '@pooltogether/tightbeam/abis'
import erc20Abi from '@pooltogether/pooltogether-contracts/abis/ERC20'
import podAbi from '@pooltogether/pods/abis/Pod'
import poolV2Abi from '@pooltogether/pooltogether-contracts/abis/PoolV2'
import poolV2TokenAbi from '@pooltogether/pooltogether-contracts/abis/PoolToken'

export function newAbiMapping() {
  const abiMapping = new AbiMapping()

  const localNetworkId = process.env.NEXT_JS_LOCALHOST_NETWORK_ID

  const localDaiAddress = process.env.NEXT_JS_DAI_ADDRESS_LOCALHOST
  const localPodAddress = process.env.NEXT_JS_POD_ADDRESS_LOCALHOST
  const localPoolDaiAddress = process.env.NEXT_JS_POOL_DAI_ADDRESS_LOCALHOST
  const localPoolDaiTokenAddress = process.env.NEXT_JS_POOL_DAI_TOKEN_ADDRESS_LOCALHOST

  const kovanDaiAddress = process.env.NEXT_JS_DAI_ADDRESS_KOVAN
  const kovanPodAddress = process.env.NEXT_JS_POD_ADDRESS_KOVAN
  const kovanPoolDaiAddress = process.env.NEXT_JS_POOL_DAI_ADDRESS_KOVAN
  const kovanPoolDaiTokenAddress = process.env.NEXT_JS_POOL_DAI_TOKEN_ADDRESS_KOVAN

  const mainnetDaiAddress = process.env.NEXT_JS_DAI_ADDRESS_MAINNET
  const mainnetPodAddress = process.env.NEXT_JS_POD_ADDRESS_MAINNET
  const mainnetPoolDaiAddress = process.env.NEXT_JS_POOL_DAI_ADDRESS_MAINNET
  const mainnetPoolDaiTokenAddress = process.env.NEXT_JS_POOL_DAI_TOKEN_ADDRESS_MAINNET

  try {
    if (localNetworkId) {
      abiMapping.addContract('Dai', localNetworkId, localDaiAddress, erc20Abi)
      abiMapping.addContract('Pod', localNetworkId, localPodAddress, podAbi)
      abiMapping.addContract('PoolDai', localNetworkId, localPoolDaiAddress, poolV2Abi)
      abiMapping.addContract('PoolDaiToken', localNetworkId, localPoolDaiTokenAddress, poolV2TokenAbi)
    }

    abiMapping.addContract('Dai', 42, kovanDaiAddress, erc20Abi)
    abiMapping.addContract('Pod', 42, kovanPodAddress, podAbi)
    abiMapping.addContract('PoolDai', 42, kovanPoolDaiAddress, poolV2Abi)
    abiMapping.addContract('PoolDaiToken', 42, kovanPoolDaiTokenAddress, poolV2TokenAbi)

    abiMapping.addContract('Dai', 1, mainnetDaiAddress, erc20Abi)
    abiMapping.addContract('Pod', 1, mainnetPodAddress, podAbi)
    abiMapping.addContract('PoolDai', 1, mainnetPoolDaiAddress, poolV2Abi)
    abiMapping.addContract('PoolDaiToken', 1, mainnetPoolDaiTokenAddress, poolV2TokenAbi)
  } catch (e) {
    console.error('AbiMapping set up incorrectly!', e)
  }

  return abiMapping
}

