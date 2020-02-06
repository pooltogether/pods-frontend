import { INT_PRIZE_FREQUENCY_IN_DAYS } from 'lib/constants'
import { capitalizeFirstLetter } from 'lib/utils/capitalizeFirstLetter'

export function getNumberOfDaysBetweenPrizesByTicker (ticker) {
  const currencyNameCapitalized = capitalizeFirstLetter(ticker)

  return INT_PRIZE_FREQUENCY_IN_DAYS[currencyNameCapitalized]
}
