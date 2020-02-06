import React from 'react'
import { ethers } from 'ethers'

import { DEFAULT_TOKEN_DECIMAL_PRECISION } from 'lib/constants'
import { CurrentDrawDate } from 'lib/components/CurrentDrawDate'
import { PoolQuery } from 'lib/components/PoolQuery'
import { DrawQuery } from 'lib/components/DrawQuery'
import { ERC20Query } from 'lib/components/ERC20Query'

import { estimatedInterest } from 'lib/utils/estimatedInterest'
import { normalizeTo18Decimals } from 'lib/utils/normalizeTo18Decimals'

const bigNumberify = ethers.utils.bigNumberify

export const EstimatedWinnings =
  ({
    children,
    chainId,
    erc20ContractAddress,
    ticker,
    poolAddress,
  }) => {
    let decimals = DEFAULT_TOKEN_DECIMAL_PRECISION

    if (!chainId) {
      return children(({
        estimatedWinnings: bigNumberify(0)
      }))
    }

    return <ERC20Query
      contractAddress={erc20ContractAddress}
      poolAddress={poolAddress}
    >
      {({ erc20Query }) => {
        if (erc20Query && erc20Query.decimals) {
          decimals = erc20Query.decimals
        }

        return <PoolQuery poolAddress={poolAddress}>
          {(data) => {
            const { poolQuery } = data || {}
            const {
              error,
              accountedBalance,
              balance,
              supplyRatePerBlock,
              currentCommittedDrawId
            } = poolQuery || {}

            if (error) {
              console.error(error)
            } else if (currentCommittedDrawId) {
              return (
                <DrawQuery
                  poolAddress={poolAddress}
                  drawId={currentCommittedDrawId}
                >
                  {({ drawQuery }) => {

                    let feeFraction = ethers.utils.bigNumberify('0')

                    if (drawQuery) {
                      const { draw, error } = drawQuery
                      if (error) {
                        console.error(error)
                      } else if (draw) {
                        feeFraction = draw.feeFraction
                      }
                    }

                    return (
                      <CurrentDrawDate
                        poolAddress={poolAddress}
                        ticker={ticker}
                      >
                        {({ currentDrawDate }) => {
                          let durationSeconds = (currentDrawDate.getTime() - (new Date()).getTime()) / 1000.0

                          let estimatedPrize
                          if (accountedBalance && balance && supplyRatePerBlock) {
                            estimatedPrize = estimatedInterest({
                              balance, accountedBalance, supplyRatePerBlock, durationSeconds
                            })
                          } else {
                            estimatedPrize = ethers.utils.bigNumberify('0')
                          }

                          const fee = estimatedPrize.mul(feeFraction).div(ethers.utils.parseEther('1'))
                          const winnings = estimatedPrize.sub(fee)

                          let normalizedWinnings = normalizeTo18Decimals(
                            winnings,
                            decimals
                          )

                          if (normalizedWinnings.lt(0)) {
                            normalizedWinnings = ethers.utils.bigNumberify(0)
                          }

                          return children({ estimatedWinnings: normalizedWinnings })
                        }}
                      </CurrentDrawDate>
                    )
                  }}
                </DrawQuery>
              )
            }

            return children(({
              estimatedWinnings: bigNumberify(0)
            }))
          }}
        </PoolQuery>
      }}
    </ERC20Query>
  }
