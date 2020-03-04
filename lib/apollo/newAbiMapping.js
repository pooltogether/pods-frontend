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

  return abiMapping
}

