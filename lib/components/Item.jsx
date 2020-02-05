import React from 'react'

export function Item({ label, value }) { 
  return <div
    className='my-3 w-full sm:w-1/3'
  >
    <span
      className='text-lightPurple-500 font-headline'
    >
      {label}:
    </span>
    <br /> <span
      className='text-green-300 font-headline'
    >
      {value}
    </span>
  </div>
}
