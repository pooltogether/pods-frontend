import { ethers } from 'ethers'

import { DEFAULT_TOKEN_DECIMAL_PRECISION } from 'lib/constants'

export function normalizeTo18Decimals (bn, decimals) {
  if (!decimals) {
    throw new Error("normalizeTo18Decimals: Number of decimals to adjust by needs to be passed in")
  }

  if (typeof bn === 'string') {
    bn = ethers.utils.bigNumberify(bn)
  }

  if (!bn) {
    throw new Error("normalizeTo18Decimals: BigNumber or string needs to be passed in")
  }

  if (decimals === DEFAULT_TOKEN_DECIMAL_PRECISION) {
    return bn
  }

  if (decimals > DEFAULT_TOKEN_DECIMAL_PRECISION) {
    throw new Error("normalizeTo18Decimals currently doesn't support decimals higher than:", DEFAULT_TOKEN_DECIMAL_PRECISION)
  }

  const numZeroes = DEFAULT_TOKEN_DECIMAL_PRECISION - decimals
  const normalizedBN = bn.mul(
    ethers.utils.bigNumberify(
      Math.pow(10, numZeroes)
    )
  )

  return normalizedBN
}
