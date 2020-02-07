import React from 'react'

import {
  FAQ_CLASSES,
  SECTION_CLASSES
} from 'lib/constants'

import { DaiPoolEstimatedWinnings } from 'lib/components/DaiPoolEstimatedWinnings'

export function ExplanationBanner() { 
  return <div
    className='text-left bg-denverPurple-700 lg:w-3/4 my-6 mx-auto px-10 pt-2 pb-4 rounded-2xl neuo-purple'
  >
    <div
      className={SECTION_CLASSES}
    >
      What is this?
      <div className='text-sm sm:text-base lg:text-xl tracking-wide font-headline font-normal'>
        <span className='text-white'>
          You've found the EthDenver 2020 PoolTogether Pod!
        </span>
      </div>
    </div>
    

    <div
      className={FAQ_CLASSES}
    >
      What is a Pod?
      <br />
      <span className='text-white'>
        A PoolTogether Pod is a collection of friends who share their chances to win PoolTogether prizes.
      </span>
    </div>

    <div
      className={FAQ_CLASSES}
    >
      What's this mean to me?
      <br />
      <span className='text-white'>
        Holding tickets in this Pod gives you:

        <ul>
          <li
            className='text-sm sm:text-base lg:text-lg text-purple-400 ml-4 mt-1'
          >
            &bull; a chance to win a daily prize
          </li>
          <li
            className='text-sm sm:text-base lg:text-lg text-purple-400 ml-4 mt-1'
          >
            &bull; a chance to win a share of the main PoolTogether weekly prize - currently $X.XX <span
              className='text-green-400'
            >
              <DaiPoolEstimatedWinnings />
            </span> Dai!
          </li>
        </ul>
      </span>
    </div>
  </div>
}
