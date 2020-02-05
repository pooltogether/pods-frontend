import { stringWithPrecision } from './stringWithPrecision'

export function numberWithCommas (str, options = {}) {
  let precision = 2
  if (options.precision !== undefined) {
    precision = options.precision
  }

  let parts = str.toString().split(".")
  
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")

  if (parts.length > 1 && precision > 0) {
    return stringWithPrecision(
      parts.join('.'),
      {
        precision
      }
    )
  } else {
    return parts[0]
  }
}
