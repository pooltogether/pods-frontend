export const NETWORK_ID_TO_NAME = {
  1: 'mainnet',
  3: 'ropsten',
  4: 'rinkeby',
  42: 'kovan',
  1234: 'localhost',
}

export const DEFAULT_TOKEN_DECIMAL_PRECISION = 18

export const SECTION_CLASSES = 'font-bold text-xl sm:text-2xl lg:text-4xl text-green-300 my-1 sm:my-2 lg:my-4'
export const FAQ_CLASSES = 'text-sm sm:text-base lg:text-xl text-denverPink-400 tracking-wide font-headline my-3 sm:my-5 lg:my-6'
export const PINK_BUTTON_CLASSES = 'font-bold hover:bg-purple-1100 hover:text-white trans hover:border-white text-white rounded-full pb-2 pt-2 px-6 text-lg sm:text-xl lg:text-2xl m-2 neuo-pink'
// export const PINK_BUTTON_CLASSES = 'font-bold hover:bg-purple-1100 hover:text-white trans trans-fast hover:border-white text-denverPink-400 border-4 border-denverPink-400 rounded-full pb-2 pt-2 px-6 text-lg sm:text-xl lg:text-2xl m-2'

export const ABI_MAPPING_CONTRACT_NAMES = {
  dai: 'Dai',
  poolDaiToken: 'PoolDaiToken',
  poolDai: 'PoolDai',
}

export const INT_PRIZE_FREQUENCY_IN_DAYS = {
  [ABI_MAPPING_CONTRACT_NAMES.dai]: 7,
  [ABI_MAPPING_CONTRACT_NAMES.sai]: 7,
  [ABI_MAPPING_CONTRACT_NAMES.usdc]: 1
}


// export const localforageKeys = {
//   LAST_REVEALED_DRAW_ID: 'lastRevealedDrawId'
// }

// export const APP_NAME = 'PoolTogether'

// export const META_MASK = 'MetaMask'
// export const SQUARELINK = 'Squarelink'
// export const WALLET_CONNECT = 'WalletConnect'
// export const WALLET_LINK = 'WalletLink'
// export const PORTIS = 'Portis'

// export const PANEL_CLASSNAMES = 'flex flex-col justify-between align-middle h-full relative mx-auto'

// export const MAX_SAFE_INTEGER = 9007199254740991


// export const CONFETTI_DURATION_MS = 20000

// export const OPEN_DURATION_IN_BLOCKS = 600

// export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'

// export const USER_REJECTED_TX = 'Error: MetaMask Tx Signature: User denied transaction signature.'
// export const STATUS_IS_ZERO = 'Status is 0'
// export const MISSING_VALUE_ERROR_REGEX = /missing value/g
// export const INVALID_DECIMAL_ERROR_REGEX = /invalid decimal/g
// export const CANNOT_READ_PROPERTY_OF_UNDEFINED = /Cannot read property 'toHexString' of undefined/g

// export const BLOCKS_PER_YEAR = 2102400
// export const SECONDS_PER_YEAR = 365 * 24 * 3600
// export const SECONDS_BETWEEN_BLOCKS = 14
// export const MINUTES_PER_HOUR = 60
// export const FORTY_SECONDS = 40000

// export const KEYS = {
//   escape: 27
// }

// export const LOTTERY_STATUS_LABEL = [
//   'Open to Contributions',
//   'Locked',
//   'Unlocked, Ready for Deposit Withdrawals',
//   'Complete, Ready for Withdrawals'
// ]

// export const LOTTERY_STATE_ENUM = {
//   'open': 0,
//   'locked': 1,
//   'unlocked': 2,
//   'withdraw': 3
// }

// export const LOTTERY_TIME_REMAINING_LABEL = {
//   0: 'Time remaining to contribute:',
//   1: 'Time remaining until withdrawals:',
//   2: 'Time until next pool:',
//   3: 'Time until next pool:'
// }

// export const LOTTERY_CONTRIBUTIONS_LABEL = {
//   0: 'Contributions so far:',
//   1: 'Total Contributions:',
//   2: 'Total Contributions:',
//   3: 'Total Contributions:'
// }

// export const LOTTERY_WINNINGS_LABEL = {
//   0: 'Projected Winnings:',
//   1: 'Projected Winnings:',
//   2: 'Winnings:',
//   3: 'Winnings:'
// }

// export const LOTTERY_YOUR_CONTRIBUTION_LABEL = {
//   0: 'Your current contribution amount:',
//   1: 'Your locked in contribution:',
//   2: 'Amount available to withdraw:',
//   3: 'Amount available to withdraw:'
// }

// export const ROUTES = {
//   prizeCurrencyPrizeId: `/[lang]/prizes/[ticker]/[prizeId]`,
//   prizesCurrencyTicker: `/[lang]/prizes/[ticker]`,
// }

// export const ABI_MAPPING_ABI_NAMES = {
//   erc20: 'ERC20',
//   poolV21: 'PoolV21',
//   poolV21Token: 'PoolV21Token',
//   poolV1: 'PoolV1',
//   uniswapExchange: 'UniswapExchange',
// }

// export const DAILY_PRIZE_FREQUENCY = 'daily'
// export const WEEKLY_PRIZE_FREQUENCY = 'weekly'

// export const TOKEN_PRIZE_FREQUENCIES = {
//   [ABI_MAPPING_CONTRACT_NAMES.dai]: WEEKLY_PRIZE_FREQUENCY,
//   [ABI_MAPPING_CONTRACT_NAMES.sai]: WEEKLY_PRIZE_FREQUENCY,
//   [ABI_MAPPING_CONTRACT_NAMES.usdc]: DAILY_PRIZE_FREQUENCY
// }

