import { ethers } from 'ethers'

export function estimatedInterest({ accountedBalance, balance, supplyRatePerBlock, durationSeconds }) {
  if (durationSeconds < 0) {
    durationSeconds = 0
  }
  const blocksRemaining = ethers.utils.bigNumberify(parseInt(durationSeconds / 14, 10))
  const interestRate = blocksRemaining.mul(supplyRatePerBlock)

  const interestAccrued = balance.sub(accountedBalance)

  const remainingInterest =
    accountedBalance
      .mul(
        interestRate
      )
      .div(
        ethers.utils.parseEther('1')
      )

  return interestAccrued.add(remainingInterest)
}