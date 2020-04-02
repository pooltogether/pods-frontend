import { AbiMapping } from '@pooltogether/tightbeam/abis'
import erc20Abi from '@pooltogether/pooltogether-contracts/abis/ERC20'
import podAbi from '@pooltogether/pods/abis/Pod'
import poolV2Abi from '@pooltogether/pooltogether-contracts/abis/MCDAwarePool'
import poolV2TokenAbi from '@pooltogether/pooltogether-contracts/abis/PoolToken'

export function newAbiMapping() {
  const abiMapping = new AbiMapping()

  abiMapping.addAbi('Pod', podAbi)
  abiMapping.addAbi('PoolV2', poolV2Abi)
  abiMapping.addAbi('PoolV2Token', poolV2TokenAbi)
  abiMapping.addAbi('ERC20', erc20Abi)
  abiMapping.addContract('DaiPod', '42', '0xc2A8F46b2991F322ce233360Bcf15375EB792223', podAbi)
  abiMapping.addContract('UsdcPod', '42', '0xbACF2e665B37F713C159705F59f5349F78858C2d', podAbi)

  return abiMapping
}

