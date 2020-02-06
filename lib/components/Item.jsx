import React from 'react'

export function Item({ label, value }) { 
  return <div
    className='my-3 w-full sm:w-1/3'
  >
    <span
      className='text-lightPurple-500 font-headline tracking-wide'
    >
      {label}:
    </span>
    <br /> <span
      className='text-green-300 font-headline tracking-wide'
    >
      {value}
    </span>
  </div>
}
