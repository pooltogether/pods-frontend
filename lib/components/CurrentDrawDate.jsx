import React from 'react'
import { Query } from 'react-apollo'
import addDays from 'date-fns/addDays'
import parseISO from 'date-fns/parseISO'

import { PoolQuery } from 'lib/components/PoolQuery'
import { DrawQuery } from 'lib/components/DrawQuery'
import { blockQuery } from 'lib/queries/blockQuery'
import { getNumberOfDaysBetweenPrizesByTicker } from 'lib/utils/getNumberOfDaysBetweenPrizesByTicker'

export const CurrentDrawDate = function _CurrentDrawDate({
  children,
  poolAddress,
  ticker
}) {
  // manualDrawDate currently unsupported for DAILY prizes!
  const manualDrawDate = process.env.NEXT_JS_MANUAL_DRAW_DATE_ISO_8601
  // Because something like '2019-12-27T12:00:00' is being treated as
  // 12pm PST December 27th 2019
  // there is an issue with timezones. This should be fixed so 12pm PST is
  // '2019-12-27T20:00:00Z' (utc)

  if (manualDrawDate) {
    return children({
      currentDrawDate: parseISO(manualDrawDate)
    })
  } else {
    return (
      <PoolQuery poolAddress={poolAddress}>
        {({ poolQuery }) => {
          let content = null

          const {
            error,
            currentOpenDrawId
          } = poolQuery || {}

          if (error) {
            console.error(error)
          } else if (currentOpenDrawId) {
            content =
              <DrawQuery
                poolAddress={poolAddress}
                drawId={currentOpenDrawId}
              >
                {({ drawQuery }) => {
                  const { draw, error } = drawQuery || {}

                  let timer = null

                  if (error) {
                    console.error(error)
                  } else if (draw) {
                    const openedBlock = draw.openedBlock.toString()
                    const variables = { blockNumber: parseInt(openedBlock, 10) }

                    timer =
                      <Query
                        query={blockQuery}
                        variables={variables}
                      >
                        {({ data, error }) => {
                          const numberOfDays = getNumberOfDaysBetweenPrizesByTicker(ticker)

                          // estimate
                          const estimatedDays = 3
                          let currentDrawDate = addDays(Date.now(), estimatedDays)

                          if (error) {
                            console.error(error)
                          } else if (data && data.block) {
                            if (typeof children === 'function') {
                              const openDate = new Date(data.block.timestamp * 1000)

                              currentDrawDate = addDays(openDate, numberOfDays)
                            }
                          }

                          return children({ currentDrawDate })
                        }}
                      </Query>
                  }

                  return timer
                }}
              </DrawQuery>
          }

          return content
        }}
      </PoolQuery>
    )
  }
}