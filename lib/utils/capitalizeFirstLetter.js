export const capitalizeFirstLetter = (str) => {
  if (typeof str !== 'string') {
    return ''
  } 

  str = str.toLowerCase()

  return str.charAt(0).toUpperCase() + str.slice(1)
}