import { AbiMapping } from '@pooltogether/tightbeam/abis'
import podAbi from '@pooltogether/pods/abis/Pod'

export function newAbiMapping() {
  const abiMapping = new AbiMapping()

  abiMapping.addContract('Pod', process.env.NEXT_JS_LOCALHOST_NETWORK_ID, process.env.NEXT_JS_POD_ADDRESS_LOCALHOST, podAbi)

  return abiMapping
}

